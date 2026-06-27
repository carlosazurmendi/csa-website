'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'
import { getStripe, stripeConfigured, getOrCreateStripeCustomer } from '@/lib/stripe'

/**
 * Payment-method management via embedded Stripe Elements + a SetupIntent. Card data
 * is entered in Stripe's iframe and saved to the Stripe Customer — it never touches
 * our servers. We persist only display-safe details (brand / last4 / expiry) on the
 * stripe-customers row. All of this is inert until STRIPE_SECRET_KEY is set.
 */
export type DisplayCard = {
  brand: string
  last4: string
  expMonth: number
  expYear: number
} | null

type StripeRow = {
  id: number | string
  stripeCustomerId?: string | null
  defaultPaymentBrand?: string | null
  defaultPaymentLast4?: string | null
  defaultPaymentExpMonth?: number | null
  defaultPaymentExpYear?: number | null
}

async function rowForUser(userId: string): Promise<StripeRow | undefined> {
  const payload = await getPayloadClient()
  return (
    await payload.find({
      collection: 'stripe-customers',
      where: { userId: { equals: userId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
  ).docs[0] as StripeRow | undefined
}

function cardFromRow(row?: StripeRow): DisplayCard {
  if (!row?.defaultPaymentLast4) return null
  return {
    brand: row.defaultPaymentBrand ?? 'card',
    last4: row.defaultPaymentLast4,
    expMonth: row.defaultPaymentExpMonth ?? 0,
    expYear: row.defaultPaymentExpYear ?? 0,
  }
}

/** Billing UI state for the portal: is Stripe configured + the saved default card. */
export async function getBillingState(): Promise<{ configured: boolean; card: DisplayCard }> {
  if (!stripeConfigured()) return { configured: false, card: null }
  const customer = await getCurrentCustomer()
  if (!customer) return { configured: true, card: null }
  return { configured: true, card: cardFromRow(await rowForUser(customer.userId)) }
}

/** Create a SetupIntent so Elements can collect + save a card to the customer. */
export async function createSetupIntent(): Promise<{ clientSecret?: string; error?: string }> {
  if (!stripeConfigured()) return { error: 'Billing is not configured yet.' }
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }
  try {
    const customerId = await getOrCreateStripeCustomer(
      customer.userId,
      customer.email,
      customer.profile.fullName ?? undefined,
    )
    const stripe = getStripe()
    const si = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
    })
    return { clientSecret: si.client_secret ?? undefined }
  } catch {
    return { error: 'Could not start the card form. Please try again.' }
  }
}

/** After Elements confirms the SetupIntent: set the card as default + sync display details. */
export async function saveCardFromSetupIntent(
  setupIntentId: string,
): Promise<{ ok?: true; card?: DisplayCard; error?: string }> {
  if (!stripeConfigured()) return { error: 'Billing is not configured yet.' }
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }
  try {
    const stripe = getStripe()
    const si = await stripe.setupIntents.retrieve(setupIntentId)
    const pmId = typeof si.payment_method === 'string' ? si.payment_method : si.payment_method?.id
    const customerId = typeof si.customer === 'string' ? si.customer : si.customer?.id
    if (!pmId || !customerId) return { error: 'No payment method to save.' }

    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: pmId } })
    const pm = await stripe.paymentMethods.retrieve(pmId)
    const card = pm.card

    const row = await rowForUser(customer.userId)
    const payload = await getPayloadClient()
    if (row) {
      await payload.update({
        collection: 'stripe-customers',
        id: row.id,
        overrideAccess: true,
        data: {
          defaultPaymentBrand: card?.brand ?? null,
          defaultPaymentLast4: card?.last4 ?? null,
          defaultPaymentExpMonth: card?.exp_month ?? null,
          defaultPaymentExpYear: card?.exp_year ?? null,
        },
      })
    }
    revalidatePath('/portal')
    return {
      ok: true,
      card: card ? { brand: card.brand, last4: card.last4, expMonth: card.exp_month, expYear: card.exp_year } : null,
    }
  } catch {
    return { error: 'Could not save the card. Please try again.' }
  }
}

/** Detach the default card from the customer + clear the display details. */
export async function removeCard(): Promise<{ ok?: true; error?: string }> {
  if (!stripeConfigured()) return { error: 'Billing is not configured yet.' }
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }
  try {
    const stripe = getStripe()
    const row = await rowForUser(customer.userId)
    if (row?.stripeCustomerId) {
      const sc = await stripe.customers.retrieve(row.stripeCustomerId)
      const pm =
        !('deleted' in sc) && sc.invoice_settings?.default_payment_method
          ? sc.invoice_settings.default_payment_method
          : null
      const pmId = typeof pm === 'string' ? pm : pm?.id
      if (pmId) await stripe.paymentMethods.detach(pmId)
    }
    const payload = await getPayloadClient()
    if (row) {
      await payload.update({
        collection: 'stripe-customers',
        id: row.id,
        overrideAccess: true,
        data: {
          defaultPaymentBrand: null,
          defaultPaymentLast4: null,
          defaultPaymentExpMonth: null,
          defaultPaymentExpYear: null,
        },
      })
    }
    revalidatePath('/portal')
    return { ok: true }
  } catch {
    return { error: 'Could not remove the card. Please try again.' }
  }
}
