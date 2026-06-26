// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Processed Stripe Events — a ledger of Stripe webhook event ids we have already
 * handled, used for idempotency so a re-delivered webhook is never processed
 * twice (Milestone 7). Not per-user — keyed by the Stripe event id.
 */
export const ProcessedStripeEvents: CollectionConfig = {
  slug: 'processed-stripe-events',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'eventId',
    defaultColumns: ['eventId', 'type', 'processedAt'],
    description: 'Ledger of handled Stripe webhook events. Prevents the same event being processed twice.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'eventId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stripe event id (evt_…) — unique idempotency key.' },
    },
    {
      name: 'type',
      type: 'text',
      admin: { description: 'Stripe event type (e.g. checkout.session.completed).' },
    },
    {
      name: 'processedAt',
      type: 'date',
      admin: { description: 'When this event was processed.' },
    },
  ],
}
