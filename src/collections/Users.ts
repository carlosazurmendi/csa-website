import type { CollectionConfig } from 'payload'

/**
 * Payload ADMIN users (the content team) — distinct from Supabase end users.
 * This is the collection backing /admin auth. Roles drive access control,
 * which is fully enforced per-collection in Milestone 5.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    defaultColumns: ['name', 'email', 'roles'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Instructor', value: 'instructor' },
      ],
      admin: {
        description:
          'Admin = full access · Editor = content only · Instructor = courses/lessons/assessments only.',
      },
    },
  ],
}
