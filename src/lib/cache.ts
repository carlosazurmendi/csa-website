// NOTE: intentionally NOT `import 'server-only'` — pulled into payload.config via
// the revalidate hooks; `payload generate:importmap` (plain Node) would throw on
// server-only's default export and fail the build. Server-only in practice.
import { redisReady } from './redis'

/**
 * Redis-backed read cache for PUBLIC CMS content (M8). Hot Payload Local-API reads
 * (src/lib/cms.ts) are wrapped in `cached()` so repeated server renders serve from
 * Redis instead of re-querying Postgres. Entries are grouped by tag (collection /
 * global slug); a publish in the admin purges that tag via `purgeTags()` from a
 * Payload afterChange/afterDelete hook (src/lib/revalidate.ts), so edits appear
 * without a redeploy. Best-effort throughout — any Redis failure falls back to a
 * live read and never throws.
 *
 * Only PUBLIC published content is cached here (cms.ts reads with
 * overrideAccess:false); owner-scoped reads use the Payload client directly and are
 * never cached.
 */

const PREFIX = 'csa:cache:'
const TAG_PREFIX = 'csa:tag:'
const DEFAULT_TTL = 300 // seconds — a safety net; publish hooks purge sooner

/** Coarse tag applied to every cached entry so any publish can purge everything —
 *  guarantees relationship-embedded reads (e.g. an instructor inside a course doc)
 *  go stale on edit. Publishes are rare on a marketing site, so this is cheap. */
export const CACHE_ALL_TAG = 'all'

export async function cached<T>(
  key: string,
  tags: string[],
  fn: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  const redis = await redisReady()
  const cacheKey = PREFIX + key

  if (redis) {
    try {
      const hit = await redis.get(cacheKey)
      if (hit != null) return JSON.parse(hit) as T
    } catch {
      // Redis hiccup — fall through to a live read.
    }
  }

  const value = await fn()

  if (redis) {
    try {
      const pipe = redis.pipeline()
      pipe.set(cacheKey, JSON.stringify(value), 'EX', ttl)
      for (const tag of tags) {
        pipe.sadd(TAG_PREFIX + tag, cacheKey)
        // Keep the tag set from outliving its members.
        pipe.expire(TAG_PREFIX + tag, ttl + 60)
      }
      await pipe.exec()
    } catch {
      // Non-fatal — the value is still returned, just not cached.
    }
  }

  return value
}

/** Invalidate every cached entry tagged with any of `tags` (called on publish). */
export async function purgeTags(tags: string[]): Promise<void> {
  if (tags.length === 0) return
  const redis = await redisReady()
  if (!redis) return
  try {
    for (const tag of tags) {
      const setKey = TAG_PREFIX + tag
      const members = await redis.smembers(setKey)
      if (members.length > 0) await redis.del(...members)
      await redis.del(setKey)
    }
  } catch {
    // Best-effort — a missed purge self-heals at TTL.
  }
}
