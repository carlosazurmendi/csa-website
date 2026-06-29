#!/usr/bin/env node
/**
 * Manual Cloudflare cache purge — `npm run purge:cache`.
 *
 * The app already purges automatically on boot (see src/instrumentation.ts); this is
 * for ad-hoc flushes (e.g. after editing a /csa/* asset without a redeploy). Reads the
 * same env the app does — credentials are NEVER hardcoded:
 *
 *   CLOUDFLARE_API_TOKEN   scoped token, Zone → Cache Purge only (required)
 *   CLOUDFLARE_ZONE_ID     the zone id (required)
 *   CLOUDFLARE_PURGE_FILES optional comma-separated absolute URLs; default = purge everything
 *
 * Exits 0 on success or when unconfigured (so it never breaks a pipeline), non-zero on
 * an actual API failure.
 */
const token = process.env.CLOUDFLARE_API_TOKEN
const zone = process.env.CLOUDFLARE_ZONE_ID

if (!token || !zone) {
  console.warn('[purge-cache] CLOUDFLARE_API_TOKEN / CLOUDFLARE_ZONE_ID not set — skipping.')
  process.exit(0)
}

const files = (process.env.CLOUDFLARE_PURGE_FILES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const body = files.length ? { files } : { purge_everything: true }

const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})
const json = await res.json().catch(() => ({}))

if (!res.ok || !json.success) {
  console.error('[purge-cache] failed:', res.status, JSON.stringify(json.errors || json))
  process.exit(1)
}
console.log(`[purge-cache] Cloudflare purged ${files.length ? `${files.length} files` : 'everything'}.`)
