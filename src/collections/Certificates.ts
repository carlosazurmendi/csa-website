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
      name: 'recipientCompany',
      type: 'text',
      admin: { description: 'The recipient’s company at the time of issue (snapshot).' },
    },
    {
      name: 'courseTitle',
      type: 'text',
      admin: { description: 'Snapshot of the course title at issue (printed on the certificate).' },
    },
    {
      name: 'credential',
      type: 'text',
      defaultValue: 'Certificate of Completion',
      admin: { description: 'Credential name, e.g. "Certificate of Completion".' },
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standards',
      admin: { description: 'Standards covered, rendered as mono chips on the certificate.' },
      fields: [{ name: 'code', type: 'text', required: true }],
    },
    {
      name: 'score',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Final assessment score (%) printed on the certificate.' },
    },
    {
      name: 'hours',
      type: 'text',
      admin: { description: 'Nominal learning hours, e.g. "6.0".' },
    },
    {
      name: 'issuedAt',
      type: 'date',
      admin: { description: 'The date the certificate was issued.' },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: { description: 'Expiry date, or empty for "No expiry".' },
    },
    {
      name: 'instructorName',
      type: 'text',
      defaultValue: 'Ben Twombly',
      admin: { description: 'Signatory name printed on the certificate.' },
    },
    {
      name: 'instructorTitle',
      type: 'text',
      defaultValue: 'Founder & Principal Safety Engineer · TÜV FS Eng., IFSP',
      admin: { description: 'Signatory title printed on the certificate.' },
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
