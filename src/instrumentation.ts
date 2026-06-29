/**
 * Cloudflare cache purge on app boot — i.e. on every deploy.
 *
 * WHY: `/csa/*` assets (the shader engine, hero images, vendored JS/fonts) are
 * fixed-name and CDN/browser-cached but NOT hash-busted, so a deploy's new files
 * do not reach users until the cache expires. This flushes the cache the moment
 * the new container is live, after a short delay so Traefik has routed traffic to
 * it before Cloudflare re-fetches origin (otherwise the CDN could re-cache the old
 * container during a rolling swap).
 *
 * Fire-and-forget: it never blocks boot and never fails the process. Credentials
 * come from env, set by the operator in dockhand — this code only references them
 * (CLOUDFLARE_API_TOKEN must be a SCOPED token with Zone → Cache Purge only).
 * No env configured → silent no-op, so non-Cloudflare environments are unaffected.
 *
 * Default action is purge-everything (simplest, guarantees /csa/* freshness; deploys
 * are infrequent). Set CLOUDFLARE_PURGE_FILES to a comma-separated list of absolute
 * URLs to purge only those instead.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NODE_ENV !== 'production') return

  const token = process.env.CLOUDFLARE_API_TOKEN
  const zone = process.env.CLOUDFLARE_ZONE_ID
  if (!token || !zone) return // not configured → no-op

  const delayMs = Number(process.env.CLOUDFLARE_PURGE_DELAY_MS || 10_000)
  const files = (process.env.CLOUDFLARE_PURGE_FILES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const body = files.length ? { files } : { purge_everything: true }

  setTimeout(() => {
    fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(async (r) => {
        const j = (await r.json().catch(() => ({}))) as { success?: boolean; errors?: unknown }
        if (!r.ok || !j.success) {
          throw new Error(`HTTP ${r.status} ${JSON.stringify(j.errors ?? j)}`)
        }
        console.log(`[cache-purge] Cloudflare purged ${files.length ? `${files.length} files` : 'everything'}`)
      })
      .catch((e: unknown) => {
        console.warn('[cache-purge] Cloudflare purge failed:', e instanceof Error ? e.message : e)
      })
  }, delayMs)
}
