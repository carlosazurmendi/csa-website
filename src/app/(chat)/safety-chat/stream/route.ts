import Anthropic from '@anthropic-ai/sdk'

import { getCurrentCustomer } from '@/lib/customer'
import {
  startTurn,
  finishTurn,
  buildUserContent,
  historyToMessages,
  chatConfigured,
  SYSTEM_PROMPT,
  SAFETY_CHAT_MODEL,
  SAFE_EXT,
  MAX_BYTES,
  type ChatAtt,
} from '@/lib/safetyChat'

/**
 * Safety Chat streaming endpoint (M6.5). POST multipart/form-data:
 *   text, threadId ("new" or numeric), projectId (numeric or ""), files[]
 * Owner-gated. Persists the user turn (creating the thread on first send), streams
 * the assistant reply token-by-token (text/plain), then persists the reply. The new
 * thread id + title come back as response headers so the client can adopt them.
 * SERVER-ONLY: the Anthropic key and all uploaded file content stay here. Without a
 * key the endpoint streams a configured-soon notice (and still persists it).
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

  // Accepted files only (allowlist + size), and their display metadata.
  const files = form.getAll('files').filter((f): f is File => f instanceof File)
  const accepted = files.filter((f) => SAFE_EXT.includes(extOf(f.name)) && f.size <= MAX_BYTES)
  const atts: ChatAtt[] = accepted.map((f) => ({
    name: f.name,
    ext: extOf(f.name),
    sizeLabel: fmtSize(f.size),
  }))

  if (!text.trim() && accepted.length === 0) return new Response('Empty message.', { status: 400 })

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
        return
      }

      let full = ''
      try {
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
        const content = await buildUserContent(text, accepted)
        const messages = [
          ...historyToMessages(turn.history),
          { role: 'user' as const, content: content as never },
        ]

        const modelStream = client.messages.stream({
          model: SAFETY_CHAT_MODEL,
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: messages as never,
        })

        for await (const event of modelStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            full += event.delta.text
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
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
      }
    },
  })

  return new Response(stream, { headers })
}
