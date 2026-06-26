// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Stripe Customers — the link between a Supabase end user and their Stripe
 * Customer, plus display-safe default-card details for the Billing screen.
 * One row per user.
 *
 * SECURITY: store ONLY opaque Stripe references plus the display-safe last4 /
 * brand / expiry (treated as personal data). NEVER store a full card number (PAN)
 * or CVV — those live exclusively with Stripe.
 *
 * Mirrors the Stripe Customer / PaymentMethod shape documented in
 * design-reference/project/assets/portal-data.js.
 */
export const StripeCustomers: CollectionConfig = {
  slug: 'stripe-customers',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'stripeCustomerId', 'defaultPaymentBrand', 'defaultPaymentLast4'],
    description: 'Links a customer to their Stripe Customer. Stores only display-safe card details — never PAN/CVV.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Supabase auth.users.id — unique per user.' },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stripe Customer id (cus_…), opaque reference.' },
    },
    {
      name: 'defaultPaymentBrand',
      type: 'text',
      admin: { description: 'Default card brand for display (e.g. visa, mastercard).' },
    },
    {
      name: 'defaultPaymentLast4',
      type: 'text',
      admin: { description: 'Last 4 digits of the default card (display only).' },
    },
    {
      name: 'defaultPaymentExpMonth',
      type: 'number',
      min: 1,
      max: 12,
      admin: { description: 'Default card expiry month (display only).' },
    },
    {
      name: 'defaultPaymentExpYear',
      type: 'number',
      admin: { description: 'Default card expiry year (display only).' },
    },
  ],
}
