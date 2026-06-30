import { AwsClient } from 'aws4fetch'

import { getCurrentCustomer } from '@/lib/customer'
import {
  startTurn,
  finishTurn,
  buildUserText,
  historyToMessages,
  chatConfigured,
  SYSTEM_PROMPT,
  SAFETY_CHAT_MODEL,
  SAFETY_CHAT_ENDPOINT,
  SAFETY_CHAT_AWS_SERVICE,
  SAFETY_CHAT_REGION,
  SAFETY_CHAT_MAX_TOKENS,
  MAX_FILES,
  MAX_PROMPT_CHARS,
  HISTORY_TURNS,
  SAFE_EXT,
  MAX_BYTES,
  type ChatAtt,
} from '@/lib/safetyChat'
import { acquireChatTurn } from '@/lib/safetyChatLimit'

/** One-shot 200 text/plain stream — used for refusals (rate limit) so the client,
 *  which only renders 2xx bodies, shows the notice in the reply bubble. */
function noticeStream(message: string): Response {
  const enc = new TextEncoder()
  return new Response(
    new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(enc.encode(message))
        c.close()
      },
    }),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } },
  )
}

/**
 * Safety Chat streaming endpoint. POST multipart/form-data:
 *   text, threadId ("new" or numeric), projectId (numeric or ""), files[]
 * Owner-gated. Persists the user turn (creating the thread on first send), streams
 * the assistant reply token-by-token (text/plain), then persists the reply. The new
 * thread id + title come back as response headers so the client can adopt them.
 *
 * The assistant is a CUSTOM LLM deployed on AWS, reached via an OpenAI-compatible
 * /chat/completions endpoint and SigV4-signed with the IAM access key/secret (aws4fetch).
 * SERVER-ONLY: the AWS credentials and all uploaded file content stay here. Until the
 * endpoint + creds are configured the route streams a configured-soon notice (and
 * still persists it). See src/lib/safetyChat.ts for the env contract.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const extOf = (n: string) => (n.split('.').pop() || '').toLowerCase()
const fmtSize = (b: number) =>
  b < 1024 ? b + ' B' : b < 1048576 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1) + ' MB'

const INERT_NOTICE =
  'Safety Chat isn’t fully switched on yet — the assistant model hasn’t been connected in this environment. ' +
  'Your conversation is saved, so once it’s enabled you can pick up right here. In the meantime, for anything live, ' +
  'book a consultation and a CSA engineer will take it from your HARA through to the certification file.'

export async function POST(req: Request): Promise<Response> {
  const customer = await getCurrentCustomer()
  if (!customer) return new Response('Not signed in.', { status: 401 })

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return new Response('Bad request.', { status: 400 })
  }

  const text = String(form.get('text') ?? '')
  const threadIdRaw = String(form.get('threadId') ?? 'new')
  const threadId = threadIdRaw === 'new' || threadIdRaw === '' ? null : Number(threadIdRaw)
  const projectIdRaw = String(form.get('projectId') ?? '')
  const projectId = projectIdRaw === '' ? null : Number(projectIdRaw)

  // Accepted files only (allowlist + size), capped in count, with display metadata.
  const files = form.getAll('files').filter((f): f is File => f instanceof File)
  const accepted = files
    .filter((f) => SAFE_EXT.includes(extOf(f.name)) && f.size <= MAX_BYTES)
    .slice(0, MAX_FILES)
  const atts: ChatAtt[] = accepted.map((f) => ({
    name: f.name,
    ext: extOf(f.name),
    sizeLabel: fmtSize(f.size),
  }))

  if (!text.trim() && accepted.length === 0) return new Response('Empty message.', { status: 400 })

  // Rate limiting + concurrency (per user). A refused turn is NOT persisted — we stream
  // the notice back as a 200 so the client renders it in the reply bubble.
  const gate = await acquireChatTurn(customer.userId)
  if (!gate.ok) return noticeStream(gate.message)

  // Persist the user turn (creates the thread on first send).
  let turn: { threadId: number; title: string; history: Awaited<ReturnType<typeof startTurn>>['history'] }
  try {
    turn = await startTurn(customer.userId, {
      threadId: threadId != null && !Number.isNaN(threadId) ? threadId : null,
      projectId: projectId != null && !Number.isNaN(projectId) ? projectId : null,
      text,
      atts,
    })
  } catch {
    await gate.release()
    return new Response('Could not start the conversation.', { status: 500 })
  }

  const headers = new Headers({
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Thread-Id': String(turn.threadId),
    'X-Thread-Title': encodeURIComponent(turn.title),
  })

  const encoder = new TextEncoder()
  const userId = customer.userId

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Inert path: no model configured.
      if (!chatConfigured()) {
        controller.enqueue(encoder.encode(INERT_NOTICE))
        controller.close()
        await finishTurn(userId, turn.threadId, INERT_NOTICE).catch(() => {})
        await gate.release()
        return
      }

      let full = ''
      try {
        const aws = new AwsClient({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          sessionToken: process.env.AWS_SESSION_TOKEN,
          region: SAFETY_CHAT_REGION,
          service: SAFETY_CHAT_AWS_SERVICE,
        })

        // Guardrails: cap the assembled prompt length and how much history is replayed,
        // so a single turn can't run up an unbounded token bill on the AWS model.
        const userText = (await buildUserText(text, accepted)).slice(0, MAX_PROMPT_CHARS)
        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...historyToMessages(turn.history.slice(-HISTORY_TURNS)),
          { role: 'user', content: userText },
        ]

        const res = await aws.fetch(SAFETY_CHAT_ENDPOINT, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
          body: JSON.stringify({
            model: SAFETY_CHAT_MODEL || undefined,
            messages,
            stream: true,
            max_tokens: SAFETY_CHAT_MAX_TOKENS,
          }),
        })

        if (!res.ok || !res.body) throw new Error(`assistant endpoint returned ${res.status}`)

        // Parse an OpenAI-style SSE stream: lines "data: {json}", terminated by
        // "data: [DONE]". Accumulate the raw body too, so a non-streaming JSON
        // response (endpoint ignored stream:true) still yields the full reply.
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buf = ''
        let raw = ''
        let sawDelta = false

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          raw += chunk
          buf += chunk
          for (let nl = buf.indexOf('\n'); nl >= 0; nl = buf.indexOf('\n')) {
            const line = buf.slice(0, nl).trim()
            buf = buf.slice(nl + 1)
            if (!line.startsWith('data:')) continue
            const data = line.slice(5).trim()
            if (data === '[DONE]') continue
            try {
              const json = JSON.parse(data)
              const delta: string =
                json?.choices?.[0]?.delta?.content ?? json?.choices?.[0]?.message?.content ?? ''
              if (delta) {
                sawDelta = true
                full += delta
                controller.enqueue(encoder.encode(delta))
              }
            } catch {
              /* keep-alive / partial line — ignore */
            }
          }
        }

        // Non-streaming fallback: parse the whole body as one OpenAI completion.
        if (!sawDelta) {
          try {
            const json = JSON.parse(raw)
            const whole: string = json?.choices?.[0]?.message?.content ?? json?.choices?.[0]?.text ?? ''
            if (whole) {
              full += whole
              controller.enqueue(encoder.encode(whole))
            }
          } catch {
            /* not JSON either — handled by the empty-response guard below */
          }
        }

        if (!full) throw new Error('empty response from assistant endpoint')
      } catch {
        const errNote =
          full.length > 0
            ? '\n\n…[the response was interrupted. Please try again.]'
            : 'Something went wrong reaching the assistant. Please try again in a moment.'
        full += errNote
        controller.enqueue(encoder.encode(errNote))
      } finally {
        controller.close()
        await finishTurn(userId, turn.threadId, full).catch(() => {})
        await gate.release()
      }
    },
  })

  return new Response(stream, { headers })
}
