import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

/**
 * End-user (student/customer) account mirror. End users authenticate via
 * Supabase Auth — this row is their app-side profile, keyed by the Supabase
 * `auth.users.id`. ALL other app data (enrollments, progress, certificates,
 * orders, entitlements) references this `authUserId`.
 *
 * API access is locked to authenticated Payload admins only. End users have NO
 * Payload session, so they never read/write profiles through the public REST/
 * GraphQL API — every end-user touch is mediated by trusted server code
 * (`src/lib/auth.ts`) using overrideAccess and filtering by the session user id.
 * (This is the intentional Supabase-auth ↔ Payload-data boundary; do NOT enable
 * Supabase RLS on this Payload-managed table.)
 */
export const Profiles: CollectionConfig = {
  slug: 'profiles',
  labels: { singular: 'Profile', plural: 'Profiles' },
  admin: {
    group: 'App',
    useAsTitle: 'email',
    defaultColumns: ['email', 'fullName', 'authUserId', 'onboarded'],
    description:
      'End-user account mirror (keyed by Supabase auth user id). Managed by server code; not edited by end users directly.',
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'authUserId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Supabase auth.users.id (owner key for all app data).' },
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'fullName', type: 'text', label: 'Full name' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text' },
        { name: 'jobTitle', type: 'text', label: 'Job title' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'country', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    { name: 'plan', type: 'text', defaultValue: 'Customer', admin: { description: 'Account tier label.' } },
    {
      name: 'onboarded',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'First-run onboarding completed.' },
    },
    {
      name: 'tracks',
      type: 'text',
      hasMany: true,
      label: 'Learning tracks',
      admin: { description: 'Sector interests selected during onboarding (Robotics, Rail, …).' },
    },
  ],
}
