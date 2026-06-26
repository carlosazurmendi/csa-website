// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Entitlements — a user's ownership of a purchased product (template / bundle
 * document), surfaced in the Customer Portal "Purchased Template Library".
 * Each entitlement points at the storage object the owner may download.
 *
 * SECURITY: downloads are served via short-lived signed URLs gated on the owning
 * user (Milestone 6/7). The `storageKey` is the object key, never a public URL.
 *
 * Mirrors the Payload entitlement shape documented in
 * design-reference/project/assets/portal-data.js.
 */
export const Entitlements: CollectionConfig = {
  slug: 'entitlements',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'product', 'version', 'active', 'grantedAt'],
    description: 'A customer’s ownership of a purchased document. Downloads are signed-URL gated.',
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
      admin: { description: 'Supabase auth.users.id of the owner.' },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: { description: 'The product (template/bundle) this entitlement grants.' },
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      admin: { description: 'The order this entitlement was granted by.' },
    },
    {
      name: 'grantedAt',
      type: 'date',
      admin: { description: 'When access was granted.' },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: { description: 'When access was revoked (e.g. after a refund), if applicable.' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether the owner can currently download this product.' },
    },
    {
      name: 'storageKey',
      type: 'text',
      admin: { description: 'Storage object key for the downloadable file (never a public URL).' },
    },
    {
      name: 'version',
      type: 'text',
      admin: { description: 'Document revision the owner is entitled to (e.g. v3.2).' },
    },
  ],
}
