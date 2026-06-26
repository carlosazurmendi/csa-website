import type { CollectionConfig } from 'payload'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Partner Logos — certification bodies and technical collaborators.
 *
 * Powers the "Partners" wall on the homepage (mirrors the PARTNERS block in
 * design-reference/project/assets/partners.jsx). Each record carries the
 * partner's name, an optional brand logo, an outbound URL, and a short role
 * note (e.g. "Certification Partner", "Technical Collaboration").
 *
 * dbName kept short ('p_logos') so Postgres identifiers stay within bounds.
 */
export const PartnerLogos: CollectionConfig = {
  slug: 'partner-logos',
  dbName: 'p_logos',
  labels: {
    singular: 'Partner Logo',
    plural: 'Partner Logos',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Written Content',
    defaultColumns: ['name', 'role', 'order', 'updatedAt'],
    description:
      'Certification bodies and technical partners shown on the homepage Partners wall.',
  },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Partner / accreditation name, e.g. "TÜV Rheinland".' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional brand logo. Falls back to a monogram if absent.' },
    },
    {
      name: 'url',
      type: 'text',
      admin: { description: 'Optional outbound link to the partner site.' },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description:
          'Relationship note, e.g. "Certification Partner", "Technical Collaboration".',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
