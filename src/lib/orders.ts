import 'server-only'

import type { Payload } from 'payload'

import { getPayloadClient } from '@/lib/cms'
import { resolveForFulfilment, linesSubtotal, type ResolvedLine, type CompactItem } from '@/lib/commerce'

/**
 * Fulfilment (M7) — the ONLY path that grants access. Called exclusively from the
 * verified Stripe webhook (never the client). Creates the Order snapshot and the
 * matching access rows: a COURSE → an Enrollment (unlocks the LMS player); a
 * TEMPLATE/BUNDLE → an Entitlement (unlocks the template download), plus an
 * Entitlement for every member of a bundle.
 *
 * Idempotency is enforced at the GRANT level, not just the order level: a
 * re-delivered or retried webhook re-finds the existing order and ALWAYS re-runs
 * the (dedupe-guarded) grant loop, so a partial failure on the first attempt is
 * completed on retry. A DB unique index on orders.stripeSessionId is the
 * authoritative backstop against a concurrent double-delivery creating two orders.
 */

const ORDER_NUMBER_BASE = 10427

/** Recognise a Postgres/Payload unique-constraint violation. */
function isUniqueViolation(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /duplicate key value|unique constraint|already exists/i.test(msg)
}

type OrderRow = { id: number | string }

/** Create an Enrollment for a course unless the user already has one. */
async function grantEnrollment(
  payload: Payload,
  userId: string,
  courseId: number | string,
  orderId: number | string,
): Promise<void> {
  const existing = await payload.find({
    collection: 'enrollments',
    where: { and: [{ userId: { equals: userId } }, { course: { equals: courseId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs.length > 0) return

  try {
    await payload.create({
      collection: 'enrollments',
      overrideAccess: true,
      data: {
        userId,
        course: courseId as number,
        status: 'active',
        source: 'purchase',
        order: orderId as number,
        enrolledAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    if (!isUniqueViolation(err)) throw err // a concurrent grant won the race — already granted
  }
}

/** Create an Entitlement for a product unless the user already has an active one. */
async function grantEntitlement(
  payload: Payload,
  userId: string,
  productId: number | string,
  orderId: number | string,
): Promise<void> {
  const existing = await payload.find({
    collection: 'entitlements',
    where: {
      and: [{ userId: { equals: userId } }, { product: { equals: productId } }, { active: { equals: true } }],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs.length > 0) return

  try {
    await payload.create({
      collection: 'entitlements',
      overrideAccess: true,
      data: {
        userId,
        product: productId as number,
        order: orderId as number,
        active: true,
        grantedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    if (!isUniqueViolation(err)) throw err
  }
}

/** Grant every access row for a resolved cart (idempotent / safe to re-run). */
async function grantAccess(
  payload: Payload,
  userId: string,
  orderId: number | string,
  lines: ResolvedLine[],
): Promise<void> {
  for (const line of lines) {
    if (line.kind === 'COURSE' && line.courseId != null) {
      await grantEnrollment(payload, userId, line.courseId, orderId)
      continue
    }
    if (line.productId == null) continue

    await grantEntitlement(payload, userId, line.productId, orderId)

    // A bundle also grants each member document individually.
    if (line.kind === 'BUNDLE') {
      const product = (await payload.findByID({
        collection: 'products',
        id: line.productId,
        depth: 1,
        overrideAccess: true,
      })) as { includes?: Array<{ id: number | string } | number | string> } | null
      const members = Array.isArray(product?.includes) ? product!.includes : []
      for (const m of members) {
        const memberId = typeof m === 'object' && m !== null ? m.id : m
        if (memberId != null) await grantEntitlement(payload, userId, memberId, orderId)
      }
    }
  }
}

/**
 * Create the Order row, allocating a unique human order number. Retries on an
 * order-number collision (the count basis is not atomic); if a concurrent
 * delivery already created this session's order (unique stripeSessionId), returns
 * that one instead of duplicating.
 */
async function createOrder(
  payload: Payload,
  session: CheckoutSessionLike,
  lines: ResolvedLine[],
): Promise<OrderRow> {
  const nowIso = new Date().toISOString()
  const amountTotal = typeof session.amountTotal === 'number' ? session.amountTotal : linesSubtotal(lines)
  const data = {
    userId: session.userId,
    stripeSessionId: session.id,
    stripePaymentIntentId: session.paymentIntentId ?? undefined,
    items: lines.map((l) => ({
      productSlug: l.slug,
      name: l.name,
      kind: l.kind,
      qty: l.qty,
      unitAmount: l.unitAmount,
    })),
    amountTotal,
    currency: session.currency ?? 'usd',
    status: 'paid' as const,
    createdAt: nowIso,
    receiptUrl: session.receiptUrl ?? undefined,
  }

  for (let attempt = 0; attempt < 6; attempt++) {
    const count = await payload.count({ collection: 'orders', overrideAccess: true })
    const orderNumber = `#CSA-${ORDER_NUMBER_BASE + (count.totalDocs ?? 0) + 1 + attempt}`
    try {
      return (await payload.create({
        collection: 'orders',
        overrideAccess: true,
        data: { ...data, orderNumber },
      })) as OrderRow
    } catch (err) {
      if (!isUniqueViolation(err)) throw err
      // A concurrent delivery may have created THIS session's order — reuse it.
      const existing = (
        await payload.find({
          collection: 'orders',
          where: { stripeSessionId: { equals: session.id } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })
      ).docs[0] as OrderRow | undefined
      if (existing) return existing
      // Otherwise the order NUMBER collided — loop retries with a bumped number.
    }
  }
  throw new Error('Unable to allocate a unique order number after retries')
}

type CheckoutSessionLike = {
  /** Stripe Checkout Session id — the idempotency key. */
  id: string
  userId: string
  items: CompactItem[]
  amountTotal?: number | null
  currency?: string | null
  paymentIntentId?: string | null
  receiptUrl?: string | null
}

/**
 * Fulfil a paid Checkout Session: write the Order (once) + grant access. Safe to
 * call repeatedly for the same session — grants are re-run idempotently so a
 * partial first attempt is completed on Stripe's retry.
 */
export async function grantPurchase(session: CheckoutSessionLike): Promise<void> {
  const payload = await getPayloadClient()

  // Re-resolve every line from the CMS (overrideAccess — a since-unpublished
  // product must still be granted to a buyer who already paid).
  const lines = await resolveForFulfilment(session.items)
  if (lines.length === 0) return

  const existing = (
    await payload.find({
      collection: 'orders',
      where: { stripeSessionId: { equals: session.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
  ).docs[0] as OrderRow | undefined

  const order = existing ?? (await createOrder(payload, session, lines))

  // Always (re-)run grants — dedupe-guarded, so completing a partial prior attempt.
  await grantAccess(payload, session.userId, order.id, lines)
}
