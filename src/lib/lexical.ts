/**
 * Pure Lexical → plain-text helpers. Dependency-free so they can be imported by
 * BOTH server and client components (unlike @/lib/cms, which pulls in the Payload
 * Local API and must stay server-only).
 */

type LexNode = { type?: string; text?: string; children?: LexNode[] }

/**
 * Flatten a Lexical rich-text value to plain-text paragraphs (one per block).
 * Forgiving: accepts a Lexical value, a plain string (returned as one paragraph),
 * or nullish (returns []). HomeDoc rich-text fields are typed `unknown`, so
 * callers don't need to narrow.
 */
export function lexicalToParagraphs(value: unknown): string[] {
  if (typeof value === 'string') {
    const t = value.trim()
    return t ? [t] : []
  }
  const root = (value as { root?: LexNode } | null | undefined)?.root
  if (!root?.children) return []
  const text = (node: LexNode): string =>
    (node.text ?? '') + (node.children ?? []).map(text).join('')
  return root.children
    .map((block) => text(block).trim())
    .filter((s) => s.length > 0)
}

/** First paragraph of a Lexical value (convenience for single-paragraph fields). */
export function lexicalToText(value: unknown): string {
  return lexicalToParagraphs(value)[0] ?? ''
}
