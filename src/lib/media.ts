/**
 * Media helpers (dependency-free → safe to import in client components).
 *
 * A Payload `upload` field is either a resolved media object (when fetched with
 * enough depth) or a bare id (number/string) when unresolved. These helpers pull
 * the public URL / alt text off a resolved object and return undefined otherwise,
 * so a missing or unresolved image degrades to a graceful empty state.
 */
export type MediaLike =
  | { url?: string | null; alt?: string | null }
  | number
  | string
  | null
  | undefined

export function mediaUrl(m: MediaLike): string | undefined {
  return m && typeof m === 'object' && typeof m.url === 'string' && m.url ? m.url : undefined
}

export function mediaAlt(m: MediaLike, fallback = ''): string {
  return m && typeof m === 'object' && typeof m.alt === 'string' && m.alt ? m.alt : fallback
}
