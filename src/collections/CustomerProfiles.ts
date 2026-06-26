// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Customer Profiles — the account-level details for a Supabase end user, surfaced
 * in the Customer Portal "Account Settings". One row per user, keyed to the
 * Supabase auth user id.
 *
 * Mirrors the Supabase `profiles` row documented in
 * design-reference/project/assets/portal-data.js and store.js.
 */
export const CustomerProfiles: CollectionConfig = {
  slug: 'customer-profiles',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'company', 'plan', 'createdAt'],
    description: 'Account details for a signed-in customer (name, company, contact, plan).',
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
      admin: { description: 'Supabase auth.users.id — the unique key for this profile.' },
    },
    { name: 'fullName', type: 'text', admin: { description: 'Customer’s full name.' } },
    { name: 'email', type: 'email', admin: { description: 'Account email (from Supabase auth).' } },
    { name: 'company', type: 'text', admin: { description: 'Company / organization name.' } },
    { name: 'jobTitle', type: 'text', admin: { description: 'Customer’s job title.' } },
    { name: 'country', type: 'text', admin: { description: 'Country.' } },
    { name: 'phone', type: 'text', admin: { description: 'Contact phone number.' } },
    { name: 'plan', type: 'text', admin: { description: 'Account tier label (e.g. Customer).' } },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether the account email has been verified.' },
    },
    { name: 'createdAt', type: 'date', admin: { description: 'Account creation date ("Member since").' } },
  ],
}
