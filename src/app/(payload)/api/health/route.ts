import { NextResponse } from 'next/server'
import Redis from 'ioredis'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Container/orchestrator health probe at /api/health.
 * Fail-closed on BOTH dependencies:
 *  • Redis — a 503 keeps Traefik from routing to a node whose rate-limiter / cache
 *    store is unreachable (rate limiting is auth-sensitive, M5).
 *  • Postgres — a cheap `SELECT 1` so the probe also fails when the database is
 *    unreachable or unmigrated. Without it the app could report healthy while every
 *    CMS read fails (the #1 first-deploy failure mode: app up, DB not migrated).
 */
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  connectTimeout: 1500,
  enableOfflineQueue: false,
})

// Mirror payload.config.ts SSL handling. Small dedicated pool (max 1) so the 30s
// probe never competes with the app pool.
const databaseSsl =
  process.env.DATABASE_SSL === 'false'
    ? false
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' }

let pool: Pool | null = null
function db(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URI,
      ssl: databaseSsl,
      max: 1,
      connectionTimeoutMillis: 2000,
      idleTimeoutMillis: 10_000,
    })
  }
  return pool
}

export async function GET() {
  let redisUp = false
  try {
    if (redis.status === 'wait' || redis.status === 'end') {
      await redis.connect()
    }
    const pong = await redis.ping()
    if (pong !== 'PONG') throw new Error('unexpected ping reply')
    redisUp = true
  } catch (err) {
    return NextResponse.json(
      { status: 'degraded', redis: 'down', db: 'unknown', error: (err as Error).message },
      { status: 503 },
    )
  }

  try {
    await db().query('SELECT 1')
  } catch (err) {
    return NextResponse.json(
      { status: 'degraded', redis: 'up', db: 'down', error: (err as Error).message },
      { status: 503 },
    )
  }

  return NextResponse.json(
    { status: 'ok', redis: redisUp ? 'up' : 'down', db: 'up', ts: new Date().toISOString() },
    { status: 200 },
  )
}
