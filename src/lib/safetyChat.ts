import 'server-only'
import mammoth from 'mammoth'

import { getPayloadClient } from '@/lib/cms'

/**
 * Safety Chat data + LLM helpers (server-only, M6.5). Owner-scoped reads/writes of
 * the chat-projects and chat-threads collections (locked on the public API) and the
 * Anthropic request-building used by the streaming route. The Anthropic API key is
 * server-only (ANTHROPIC_API_KEY) — it never reaches the browser; grading-style
 * isolation is not needed here, but the key and all file content stay on the server.
 */

export type ChatAtt = { name: string; ext: string; sizeLabel: string }
export type ChatMessage = { role: 'user' | 'bot'; text: string; atts?: ChatAtt[] }
export type ChatProject = { id: number; name: string; icon: string; sortOrder: number }
export type ChatThread = {
  id: number
  projectId: number | null
  title: string
  messages: ChatMessage[]
}

/** Safe-file allowlist (mirrors the client + design policy). */
export const SAFE_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt', 'md', 'rtf', 'png', 'jpg', 'jpeg', 'webp']
export const MAX_BYTES = 25 * 1024 * 1024 // 25 MB
const MAX_TEXT_CHARS = 200_000 // per-file extraction cap

export const SAFETY_CHAT_MODEL = process.env.SAFETY_CHAT_MODEL || 'claude-sonnet-4-6'

/** True when the Anthropic key is configured — otherwise Safety Chat stays inert. */
export const chatConfigured = (): boolean => Boolean(process.env.ANTHROPIC_API_KEY)

export const SYSTEM_PROMPT = `You are Safety Chat, the AI-augmented functional-safety assistant for Critical Systems Analysis (CSA), a functional-safety engineering consultancy.

Your role: give quick, high-level engineering ORIENTATION on functional safety — Safety Integrity Levels (SIL, IEC 61508 / IEC 62061), Performance Levels (PL, ISO 13849), automotive ASIL (ISO 26262), mobile-robot and AGV/AMR standards (ISO 3691-4, ISO 10218), HARA / hazard-and-risk-assessment structure, the safety lifecycle, verification & validation, and certification readiness.

How to answer:
- Be concise and practical. Lead with the orientation, then one or two supporting points.
- Reference the governing standard by its code (e.g. IEC 61508-2, ISO 13849-1).
- Where a file is attached, ground your answer in it, but say what you can and cannot determine from it.
- ALWAYS frame answers as a starting point, NOT a compliance determination. The correct target or architecture depends on the specific application, the risk assessment / HARA, and the validation evidence — and should be reviewed by a qualified functional-safety engineer.
- For a live program, suggest booking a consultation with a CSA principal engineer for a HARA-through-certification review.
- If asked something outside functional safety, briefly say it's outside scope and steer back.

Never invent standard clause numbers or fabricate requirements. If unsure, say so.`

/* ---------------- owner-scoped reads/writes ---------------- */

export async function getMyProjects(userId: string): Promise<ChatProject[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'chat-projects',
    where: { userId: { equals: userId } },
    sort: 'sortOrder',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs as unknown as Array<Record<string, unknown>>).map((p) => ({
    id: p.id as number,
    name: (p.name as string) ?? 'Project',
    icon: (p.icon as string) ?? 'folder',
    sortOrder: typeof p.sortOrder === 'number' ? p.sortOrder : 0,
  }))
}

export async function getMyThreads(userId: string): Promise<ChatThread[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'chat-threads',
    where: { userId: { equals: userId } },
    sort: '-updatedAt',
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs as unknown as Array<Record<string, unknown>>).map((t) => {
    const projectId =
      typeof t.project === 'object' && t.project ? ((t.project as { id: number }).id ?? null) : (t.project as number | null) ?? null
    const messages = Array.isArray(t.messages) ? (t.messages as ChatMessage[]) : []
    return {
      id: t.id as number,
      projectId,
      title: (t.title as string) ?? 'New chat',
      messages,
    }
  })
}

export async function createProject(userId: string, name: string): Promise<ChatProject> {
  const payload = await getPayloadClient()
  const existing = await getMyProjects(userId)
  const doc = (await payload.create({
    collection: 'chat-projects',
    overrideAccess: true,
    data: { userId, name: name.slice(0, 80), icon: 'folder', sortOrder: existing.length },
  })) as unknown as Record<string, unknown>
  return { id: doc.id as number, name: doc.name as string, icon: (doc.icon as string) ?? 'folder', sortOrder: existing.length }
}

/** Fetch an owned thread doc, or null if not found / not owned. */
async function ownThread(userId: string, threadId: number) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'chat-threads',
    where: { and: [{ id: { equals: threadId } }, { userId: { equals: userId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs[0] as unknown as { id: number; title: string; messages: ChatMessage[]; project?: unknown }) ?? null
}

export async function renameThread(userId: string, threadId: number, title: string): Promise<boolean> {
  const t = await ownThread(userId, threadId)
  if (!t) return false
  const payload = await getPayloadClient()
  await payload.update({ collection: 'chat-threads', id: threadId, overrideAccess: true, data: { title: title.slice(0, 120) } })
  return true
}

export async function moveThread(userId: string, threadId: number, projectId: number | null): Promise<boolean> {
  const t = await ownThread(userId, threadId)
  if (!t) return false
  // If a target project is given, confirm the caller owns it.
  if (projectId != null) {
    const owned = await getMyProjects(userId)
    if (!owned.some((p) => p.id === projectId)) return false
  }
  const payload = await getPayloadClient()
  await payload.update({ collection: 'chat-threads', id: threadId, overrideAccess: true, data: { project: projectId } })
  return true
}

export async function deleteThread(userId: string, threadId: number): Promise<boolean> {
  const t = await ownThread(userId, threadId)
  if (!t) return false
  const payload = await getPayloadClient()
  await payload.delete({ collection: 'chat-threads', id: threadId, overrideAccess: true })
  return true
}

/* ---------------- LLM request building ---------------- */

const extOf = (n: string) => (n.split('.').pop() || '').toLowerCase()
const imageMime: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' }

/** Build the Anthropic user-turn content from the typed text + uploaded files. */
export async function buildUserContent(
  text: string,
  files: File[],
): Promise<Array<Record<string, unknown>>> {
  const blocks: Array<Record<string, unknown>> = []

  for (const file of files) {
    const name = file.name || 'file'
    const ext = extOf(name)
    if (!SAFE_EXT.includes(ext) || file.size > MAX_BYTES) continue
    const buf = Buffer.from(await file.arrayBuffer())

    if (imageMime[ext]) {
      blocks.push({ type: 'image', source: { type: 'base64', media_type: imageMime[ext], data: buf.toString('base64') } })
    } else if (ext === 'pdf') {
      // Claude reads PDFs natively as a document block.
      blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: buf.toString('base64') } })
    } else if (ext === 'docx') {
      try {
        const { value } = await mammoth.extractRawText({ buffer: buf })
        blocks.push({ type: 'text', text: `[Attached document: ${name}]\n${value.slice(0, MAX_TEXT_CHARS)}` })
      } catch {
        blocks.push({ type: 'text', text: `[Attached document: ${name} — could not extract text.]` })
      }
    } else if (['txt', 'md', 'csv', 'rtf'].includes(ext)) {
      blocks.push({ type: 'text', text: `[Attached file: ${name}]\n${buf.toString('utf8').slice(0, MAX_TEXT_CHARS)}` })
    } else {
      // doc / xls / xlsx — not extracted (no safe server-side parser); note it.
      blocks.push({
        type: 'text',
        text: `[Attached file: ${name} (${ext.toUpperCase()}) — its contents could not be read automatically. Please paste the relevant rows/text, or attach a PDF or CSV export.]`,
      })
    }
  }

  if (text.trim()) blocks.push({ type: 'text', text: text.trim() })
  if (blocks.length === 0) blocks.push({ type: 'text', text: '(no message)' })
  return blocks
}

/** Map persisted history to Anthropic messages (bot → assistant). */
export function historyToMessages(messages: ChatMessage[]): Array<{ role: 'user' | 'assistant'; content: string }> {
  return messages
    .filter((m) => (m.text ?? '').trim().length > 0)
    .map((m) => ({ role: m.role === 'bot' ? ('assistant' as const) : ('user' as const), content: m.text }))
}

/* ---------------- thread persistence (used by the streaming route) ---------------- */

/** Append the user's message, creating the thread if needed. Returns the thread id + prior history. */
export async function startTurn(
  userId: string,
  input: { threadId: number | null; projectId: number | null; text: string; atts: ChatAtt[] },
): Promise<{ threadId: number; title: string; history: ChatMessage[] }> {
  const payload = await getPayloadClient()
  const userMsg: ChatMessage = { role: 'user', text: input.text || '(see attachments)', atts: input.atts }

  if (input.threadId != null) {
    const t = await ownThread(userId, input.threadId)
    if (t) {
      const history = Array.isArray(t.messages) ? t.messages : []
      const title = history.length === 0 ? deriveTitle(input.text) : t.title
      await payload.update({
        collection: 'chat-threads',
        id: t.id,
        overrideAccess: true,
        data: { title, messages: [...history, userMsg] },
      })
      return { threadId: t.id, title, history }
    }
  }

  // New thread.
  const title = deriveTitle(input.text)
  const created = (await payload.create({
    collection: 'chat-threads',
    overrideAccess: true,
    data: { userId, project: input.projectId, title, messages: [userMsg] },
  })) as unknown as { id: number }
  return { threadId: created.id, title, history: [] }
}

/** Append the assistant's reply to a thread (bumps updatedAt). */
export async function finishTurn(userId: string, threadId: number, botText: string): Promise<void> {
  const t = await ownThread(userId, threadId)
  if (!t) return
  const payload = await getPayloadClient()
  const history = Array.isArray(t.messages) ? t.messages : []
  await payload.update({
    collection: 'chat-threads',
    id: threadId,
    overrideAccess: true,
    data: { messages: [...history, { role: 'bot', text: botText, atts: [] }] },
  })
}

function deriveTitle(text: string): string {
  const t = (text || '').trim()
  return t ? t.slice(0, 42) : 'Attachment review'
}
