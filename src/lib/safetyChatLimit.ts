import { redisReady } from './redis'

/**
 * Safety Chat rate limiting + concurrency guard (server-only, best-effort).
 *
 * Protects the AWS model from one user eating the budget:
 *  - concurrency: at most ONE in-flight stream per user (a short-lived Redis lock),
 *  - burst: a per-user per-minute cap,
 *  - quota: a per-user per-day cap (resets at 00:00 UTC).
 *
 * Backed by Redis (ioredis) via redisReady(). FAIL-OPEN: if Redis is unreachable the
 * request is allowed (consistent with the CMS cache) — availability over throttling,
 * and the per-request prompt/history caps still bound cost. Counters are simple atomic
 * fixed-window INCR+EXPIRE keys; good enough for cost control without a Lua script.
 */

const RPM = Number(process.env.SAFETY_CHAT_RPM) || 8 // messages / user / minute
const RPD = Number(process.env.SAFETY_CHAT_RPD) || 150 // messages / user / day
const LOCK_TTL = 180 // seconds a single stream may hold the per-user slot

export type ChatTurn =
  | { ok: true; release: () => Promise<void> }
  | { ok: false; message: string }

const noop = async () => {}

/**
 * Try to start a chat turn for `userId`. On success returns a `release()` the caller
 * MUST invoke when the stream ends (frees the concurrency slot). On refusal returns a
 * user-facing message to stream back (no thread is persisted for a refused turn).
 */
export async function acquireChatTurn(userId: string): Promise<ChatTurn> {
  const redis = await redisReady()
  if (!redis) return { ok: true, release: noop } // Redis down → fail-open

  const lockKey = `scrl:lock:${userId}`
  try {
    // One in-flight stream per user. NX + EX so a crashed stream self-heals at TTL.
    const got = await redis.set(lockKey, '1', 'EX', LOCK_TTL, 'NX')
    if (got !== 'OK') {
      return {
        ok: false,
        message:
          'You already have a response in progress. Please wait for it to finish before sending another message.',
      }
    }
  } catch {
    return { ok: true, release: noop } // Redis hiccup → fail-open
  }

  const release = async () => {
    try {
      await redis.del(lockKey)
    } catch {
      /* TTL will reclaim it */
    }
  }

  try {
    const nowSec = Math.floor(Date.now() / 1000)
    const minKey = `scrl:m:${userId}:${Math.floor(nowSec / 60)}`
    const dayKey = `scrl:d:${userId}:${Math.floor(nowSec / 86400)}`
    const res = await redis
      .pipeline()
      .incr(minKey)
      .expire(minKey, 60)
      .incr(dayKey)
      .expire(dayKey, 86400)
      .exec()
    const minCount = Number(res?.[0]?.[1] ?? 0)
    const dayCount = Number(res?.[2]?.[1] ?? 0)

    if (minCount > RPM) {
      await release()
      return {
        ok: false,
        message: `You're sending messages too quickly (limit ${RPM}/min). Give it a few seconds and try again.`,
      }
    }
    if (dayCount > RPD) {
      await release()
      return {
        ok: false,
        message: `You've reached today's Safety Chat limit (${RPD} messages). It resets at 00:00 UTC. For a live program, book a consultation and a CSA engineer will pick it up.`,
      }
    }
  } catch {
    // Counter failure — keep the lock and allow the turn (fail-open on the quota only).
  }

  return { ok: true, release }
}
