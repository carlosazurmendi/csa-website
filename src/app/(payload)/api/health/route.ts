import { NextResponse } from 'next/server'
import Redis from 'ioredis'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Container/orchestrator health probe at /api/health.
 * Fail-closed on Redis: a 503 keeps Traefik from routing traffic to a node whose
 * rate-limiter / cache store is unreachable (rate limiting is auth-sensitive, M5).
 */
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  connectTimeout: 1500,
  enableOfflineQueue: false,
})

export async function GET() {
  try {
    if (redis.status === 'wait' || redis.status === 'end') {
      await redis.connect()
    }
    const pong = await redis.ping()
    if (pong !== 'PONG') throw new Error('unexpected ping reply')
    return NextResponse.json(
      { status: 'ok', redis: 'up', ts: new Date().toISOString() },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { status: 'degraded', redis: 'down', error: (err as Error).message },
      { status: 503 },
    )
  }
}
