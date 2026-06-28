// NOTE: intentionally NOT `import 'server-only'` — this module is pulled into
// payload.config (via the revalidate hooks), and `payload generate:importmap`
// runs in plain Node where server-only's default export throws, failing the build.
// It is server-only in practice (ioredis is a Node-only module).
import Redis from 'ioredis'

/**
 * Shared Redis client (server-only). Backs the CMS read cache (src/lib/cache.ts).
 * Mirrors the health route's connection options: lazyConnect + offline-queue OFF
 * so a down Redis fails fast (callers fall back to a live read) instead of hanging
 * requests — which means commands must be issued through `redisReady()`, which
 * explicitly connects first (with the queue off, an un-connected client rejects
 * commands). Best-effort throughout: a Redis outage never throws to the caller.
 */
let _redis: Redis | null = null

export function getRedis(): Redis {
  if (_redis) return _redis
  _redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    connectTimeout: 1500,
    enableOfflineQueue: false,
  })
  // Swallow connection errors so an unavailable Redis never crashes the process.
  _redis.on('error', () => {})
  return _redis
}

/** Return a connected client, or null if Redis can't be reached (caller skips cache). */
export async function redisReady(): Promise<Redis | null> {
  const r = getRedis()
  try {
    if (r.status === 'wait' || r.status === 'end') await r.connect()
    return r
  } catch {
    return null
  }
}
