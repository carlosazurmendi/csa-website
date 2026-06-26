// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Orders — a completed (or attempted) purchase. Backs the Customer Portal "Order
 * History" and the receipts in Billing. Line items snapshot what was bought so the
 * record stays correct even if a product later changes.
 *
 * SECURITY: entitlements (download/course access) are granted ONLY via the
 * verified Stripe webhook (Milestone 7) — never from the client.
 *
 * Mirrors the Payload/Stripe order shape documented in
 * design-reference/project/assets/portal-data.js and store.js.
 */
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'userId', 'amountTotal', 'status', 'createdAt'],
    description: 'Customer purchases and receipts. Entitlements are granted only by the verified Stripe webhook.',
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
      index: true,
      admin: { description: 'Supabase auth.users.id of the buyer.' },
    },
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Human-readable order number (e.g. #CSA-10428).' },
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      admin: { description: 'Stripe Checkout Session id (opaque reference).' },
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      admin: { description: 'Stripe PaymentIntent id (opaque reference).' },
    },
    {
      name: 'items',
      type: 'array',
      admin: { description: 'Line items purchased (snapshotted at checkout).' },
      fields: [
        {
          name: 'productSlug',
          type: 'text',
          admin: { description: 'Slug of the purchased product (when applicable).' },
        },
        { name: 'name', type: 'text', admin: { description: 'Product name as shown to the buyer.' } },
        {
          name: 'kind',
          type: 'text',
          admin: { description: 'Type of item: TEMPLATE, BUNDLE, or COURSE.' },
        },
        { name: 'qty', type: 'number', min: 1, defaultValue: 1, admin: { description: 'Quantity purchased.' } },
        {
          name: 'unitAmount',
          type: 'number',
          admin: { description: 'Unit price in CENTS (Stripe amount).' },
        },
      ],
    },
    {
      name: 'amountTotal',
      type: 'number',
      admin: { description: 'Order total in CENTS.' },
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'usd',
      admin: { description: 'ISO currency code (e.g. usd).' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: { description: 'Payment status of the order.' },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: { description: 'When the order was placed.' },
    },
    {
      name: 'receiptUrl',
      type: 'text',
      admin: { description: 'Stripe-hosted receipt URL.' },
    },
  ],
}
