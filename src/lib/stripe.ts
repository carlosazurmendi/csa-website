import Stripe from 'stripe'

import { getPayloadClient } from '@/lib/cms'

/**
 * Server-side Stripe (M5 payment methods, M7 commerce). Env-gated: the integration
 * stays inert until STRIPE_SECRET_KEY is set, so the build/runtime work without it.
 * The secret key lives only in real env — never the repo or the client bundle.
 */
let _stripe: Stripe | null = null

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Stripe is not configured (STRIPE_SECRET_KEY missing).')
  if (!_stripe) _stripe = new Stripe(key)
  return _stripe
}

type StripeCustomerRow = {
  id: number | string
  userId: string
  stripeCustomerId?: string | null
}

/**
 * The Stripe Customer id for a Supabase user, creating the Stripe customer + the
 * stripe-customers mapping row on first use. Stored via the server-only Payload
 * client (the collection is locked on the public API).
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string,
): Promise<string> {
  const payload = await getPayloadClient()
  const existing = (
    await payload.find({
      collection: 'stripe-customers',
      where: { userId: { equals: userId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
  ).docs[0] as StripeCustomerRow | undefined

  if (existing?.stripeCustomerId) return existing.stripeCustomerId

  const stripe = getStripe()
  const customer = await stripe.customers.create({
    email: email || undefined,
    name: name || undefined,
    metadata: { supabaseUserId: userId },
  })

  if (existing) {
    await payload.update({
      collection: 'stripe-customers',
      id: existing.id,
      overrideAccess: true,
      data: { stripeCustomerId: customer.id },
    })
  } else {
    await payload.create({
      collection: 'stripe-customers',
      overrideAccess: true,
      data: { userId, stripeCustomerId: customer.id },
    })
  }
  return customer.id
}
