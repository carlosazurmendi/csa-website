'use server'

import { headers } from 'next/headers'

import { getCurrentCustomer } from '@/lib/customer'
import { getOrCreateStripeCustomer, getStripe, stripeConfigured } from '@/lib/stripe'
import { resolveCartItems, type CompactItem } from '@/lib/commerce'
import { resolveTrustedOrigin } from '@/lib/origin'

/**
 * Checkout server action (M7) — turns the client cart into a Stripe Hosted
 * Checkout session and hands back the redirect URL. Pricing is re-resolved from
 * the CMS here (the client cart is never trusted). Env-gated: returns a
 * `not-configured` result (no throw) when Stripe keys are absent, so the cart UI
 * degrades gracefully. Login-gated: a signed-in Supabase user is required.
 */

export type CheckoutResult = {
  url?: string
  error?: string
  code?: 'not-configured' | 'sign-in-required' | 'empty-cart' | 'unavailable'
}

/**
 * Trusted origin for the Stripe success/cancel redirect. Pinned to the canonical
 * `NEXT_PUBLIC_SERVER_URL` (+ optional `CHECKOUT_ALLOWED_ORIGINS` allowlist); the
 * inbound Host header is honoured only if allow-listed, else the canonical origin
 * is used. Returns null in production when no canonical origin is configured so
 * the caller fails closed instead of echoing an attacker-controlled host into a
 * payment redirect. See src/lib/origin.ts.
 */
async function getOrigin(): Promise<string | null> {
  const h = await headers()
  return resolveTrustedOrigin({
    host: h.get('x-forwarded-host') ?? h.get('host'),
    proto: h.get('x-forwarded-proto'),
  })
}

export async function createCheckoutSession(items: CompactItem[]): Promise<CheckoutResult> {
  if (!stripeConfigured()) {
    return { error: 'Online checkout isn’t enabled yet. Please contact us to complete your purchase.', code: 'not-configured' }
  }

  const customer = await getCurrentCustomer()
  if (!customer) {
    return { error: 'Please sign in to check out.', code: 'sign-in-required' }
  }

  const compact = (items ?? []).filter((i) => i && typeof i.slug === 'string' && i.slug)
  if (compact.length === 0) {
    return { error: 'Your cart is empty.', code: 'empty-cart' }
  }

  const lines = await resolveCartItems(compact)
  if (lines.length === 0) {
    return { error: 'These items are no longer available.', code: 'unavailable' }
  }

  const origin = await getOrigin()
  if (!origin) {
    // No trusted canonical origin configured (prod) — never build a Stripe
    // redirect from an unvalidated Host header.
    return { error: 'Checkout is temporarily unavailable. Please contact us to complete your purchase.', code: 'unavailable' }
  }
  const stripe = getStripe()
  const stripeCustomerId = await getOrCreateStripeCustomer(
    customer.userId,
    customer.email,
    customer.profile.fullName ?? undefined,
  )

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer: stripeCustomerId,
    // Instant-settlement methods only. The webhook grants on a single
    // checkout.session.completed/paid event; delayed-settlement methods (which
    // settle later via async_payment_succeeded) would be paid-but-never-granted.
    payment_method_types: ['card'],
    line_items: lines.map((l) => ({
      quantity: l.qty,
      price_data: {
        currency: 'usd',
        unit_amount: l.unitAmount,
        product_data: {
          name: l.name,
          metadata: { slug: l.slug, kind: l.kind },
        },
      },
    })),
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
    success_url: `${origin}/training/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: {
      userId: customer.userId,
      // Compact line list the webhook re-resolves + grants against.
      items: JSON.stringify(lines.map((l) => ({ slug: l.slug, kind: l.kind, qty: l.qty }))),
    },
  })

  if (!session.url) {
    return { error: 'Could not start checkout. Please try again.', code: 'unavailable' }
  }
  return { url: session.url }
}
