import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'

import { getPayloadClient } from '@/lib/cms'
import { getStripe, stripeConfigured } from '@/lib/stripe'
import { grantPurchase } from '@/lib/orders'
import type { CompactItem } from '@/lib/commerce'

/**
 * Stripe webhook (M7). Lives at /stripe/webhook — OUTSIDE Payload's
 * /api/[...slug] catch-all — in its own (stripe) route group so Payload never
 * intercepts it. Security: the raw body is signature-verified with
 * STRIPE_WEBHOOK_SECRET; handling is idempotent via the processed-stripe-events
 * ledger; the event is only marked processed AFTER a successful grant, so a
 * transient failure returns 500 and Stripe retries. Inert (200) without keys.
 *
 * This is the ONLY entry point that grants access — grantPurchase() writes the
 * Order + Enrollment/Entitlement rows. The client can never grant itself access.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!stripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    // Inert until configured — acknowledge so Stripe (if ever pointed here) is happy.
    return NextResponse.json({ received: true, inert: true })
  }

  const stripe = getStripe()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 })

  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  const payload = await getPayloadClient()

  // Idempotency — a re-delivered event we have already handled is a no-op.
  const seen = await payload.find({
    collection: 'processed-stripe-events',
    where: { eventId: { equals: event.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (seen.docs.length > 0) return NextResponse.json({ received: true, duplicate: true })

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.payment_status === 'paid') {
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent?.id ?? null)

        // Best-effort receipt URL from the PaymentIntent's latest charge.
        let receiptUrl: string | null = null
        if (paymentIntentId) {
          try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
              expand: ['latest_charge'],
            })
            const charge = pi.latest_charge as Stripe.Charge | null
            receiptUrl = charge?.receipt_url ?? null
          } catch {
            // Non-fatal — the order is still recorded without a receipt link.
          }
        }

        const userId = session.metadata?.userId
        const itemsJson = session.metadata?.items
        if (userId && itemsJson) {
          let items: CompactItem[] = []
          try {
            items = JSON.parse(itemsJson) as CompactItem[]
          } catch {
            items = []
          }
          if (items.length > 0) {
            await grantPurchase({
              id: session.id,
              userId,
              items,
              amountTotal: session.amount_total,
              currency: session.currency,
              paymentIntentId,
              receiptUrl,
            })
          }
        }
      }
    }

    // Record AFTER successful handling so a thrown error → 500 → Stripe retry.
    await payload.create({
      collection: 'processed-stripe-events',
      overrideAccess: true,
      data: { eventId: event.id, type: event.type, processedAt: new Date().toISOString() },
    })

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[stripe webhook] handler error', err)
    return NextResponse.json({ error: 'handler error' }, { status: 500 })
  }
}
