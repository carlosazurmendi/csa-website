// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Enrollments — a student's access to a course (from a purchase, a manual grant,
 * or a free training). One row per user per course. Keyed to the Supabase auth
 * user id via `userId`. Drives the Student Dashboard "My Courses" list.
 *
 * Mirrors the Supabase `enrollments` shape documented in
 * design-reference/project/assets/enrollments.js.
 */
export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'course', 'status', 'source', 'enrolledAt'],
    description: 'Per-student course access. Granted by purchase, manual grant, or free training.',
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
      admin: { description: 'Supabase auth.users.id of the student who owns this enrollment.' },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: { description: 'The course this enrollment grants access to.' },
    },
    {
      name: 'enrolledAt',
      type: 'date',
      admin: { description: 'When access was granted (purchase / grant date).' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Expired', value: 'expired' },
      ],
      admin: { description: 'Active = in progress · Completed = certificate earned · Expired = access lapsed.' },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'purchase',
      options: [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Grant', value: 'grant' },
        { label: 'Free', value: 'free' },
      ],
      admin: { description: 'How the student got access: a paid purchase, a manual grant, or a free training.' },
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      admin: { description: 'The order this enrollment came in on, if it was a purchase.' },
    },
  ],
}
