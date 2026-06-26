// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Certificates — a Certificate of Completion issued when a student reaches 100%
 * and passes the final assessment. `certificateId` is the public verification key
 * a third party can look up. The PDF is server-rendered (Milestone 6).
 *
 * Mirrors the Supabase `certificates` shape documented in
 * design-reference/project/assets/certificates-data.js.
 */
export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'certificateId',
    defaultColumns: ['certificateId', 'recipientName', 'course', 'issuedAt', 'verified'],
    description: 'Issued Certificates of Completion. The Certificate ID is the public verification key.',
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
      admin: { description: 'Supabase auth.users.id of the recipient.' },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: { description: 'The course this certificate was awarded for.' },
    },
    {
      name: 'recipientName',
      type: 'text',
      admin: { description: 'The recipient’s full name at the time of issue (printed on the certificate).' },
    },
    {
      name: 'issuedAt',
      type: 'date',
      admin: { description: 'The date the certificate was issued.' },
    },
    {
      name: 'certificateId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Public verification ID (e.g. CSA-RSF-2026-0214). Unique — anyone can verify a certificate by this key.',
      },
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'The server-rendered certificate PDF.' },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Whether the certificate is currently valid (uncheck to revoke).' },
    },
  ],
}
