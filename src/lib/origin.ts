import 'server-only'

/**
 * Trusted-origin resolution for OUTBOUND redirect URLs (Stripe Checkout
 * success/cancel, the Supabase auth callback). M9 / M7-debt #2.
 *
 * The inbound request Host / X-Forwarded-Host header is attacker-controllable, so
 * it must never be echoed unvalidated into a redirect that sits in the payment or
 * auth flow (host poisoning / open redirect). The rule here: honour the inbound
 * host ONLY if it is on an explicit allowlist; otherwise fall back to the primary
 * canonical origin (`NEXT_PUBLIC_SERVER_URL`). In production with no canonical
 * origin configured we return `null` so callers FAIL CLOSED rather than trust the
 * header — a missing config can never silently degrade into header trust.
 */

const stripTrailingSlash = (s: string): string => s.replace(/\/+$/, '')

/** Primary canonical origin, normalised (no trailing slash). '' if unset. */
export function primaryOrigin(): string {
  return stripTrailingSlash(process.env.NEXT_PUBLIC_SERVER_URL ?? '')
}

/**
 * The set of trusted origins: the primary canonical origin plus any extra hosts
 * in `CHECKOUT_ALLOWED_ORIGINS` (comma-separated, e.g. an apex + www, or a staging
 * host). Each entry is normalised to `scheme://host[:port]` with no trailing slash.
 */
function allowedOrigins(): Set<string> {
  const set = new Set<string>()
  const primary = primaryOrigin()
  if (primary) set.add(primary)
  for (const raw of (process.env.CHECKOUT_ALLOWED_ORIGINS ?? '').split(',')) {
    const o = stripTrailingSlash(raw.trim())
    if (o) set.add(o)
  }
  return set
}

const isProd = (): boolean => process.env.NODE_ENV === 'production'

export type OriginCandidate = { host?: string | null; proto?: string | null }

/**
 * Resolve a TRUSTED absolute origin (no trailing slash) for building outbound
 * redirect URLs. The inbound candidate host is accepted only if it is on the
 * allowlist; otherwise the primary canonical origin is used. Returns `null` when
 * nothing trusted is available (production with no `NEXT_PUBLIC_SERVER_URL`) — the
 * caller MUST fail closed. In non-production a localhost fallback is allowed for
 * developer convenience only.
 */
export function resolveTrustedOrigin(candidate?: OriginCandidate): string | null {
  const allow = allowedOrigins()

  const host = candidate?.host?.trim()
  if (host) {
    const proto = (candidate?.proto?.trim() || (host.startsWith('localhost') ? 'http' : 'https')).replace(/:$/, '')
    const cand = stripTrailingSlash(`${proto}://${host}`)
    if (allow.has(cand)) return cand
  }

  const primary = primaryOrigin()
  if (primary) return primary

  if (!isProd()) return 'http://localhost:3000'
  return null
}

/**
 * Constrain a `next` redirect target to a same-site PATH. Rejects absolute URLs,
 * protocol-relative (`//host`), and backslash tricks (`/\host`) that browsers
 * normalise to off-site navigations. Anything not a clean single-leading-slash
 * path collapses to '/'.
 */
export function sanitizeNextPath(raw: string | null | undefined): string {
  if (!raw) return '/'
  if (raw[0] !== '/') return '/' // must be site-relative
  if (raw[1] === '/' || raw[1] === '\\' || raw[1] === '\t' || raw[1] === ' ') return '/' // //host, /\host, control tricks
  if (/[\r\n]/.test(raw)) return '/'
  return raw
}
