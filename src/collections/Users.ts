import type { CollectionConfig } from 'payload'

/**
 * Admin users for the Payload dashboard. This is the ONLY auth in Phase 1 —
 * site-visitor auth (login/cart/portal) is Phase 2 and stays out of scope.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
