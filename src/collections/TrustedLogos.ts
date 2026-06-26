import type { CollectionConfig } from 'payload'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Trusted Logos — the customer "Trusted by" wall.
 *
 * Powers the customer logo wall on the homepage (mirrors the CUSTOMERS block in
 * design-reference/project/assets/partners.jsx). Each record carries the
 * customer's name, an optional brand logo, and an outbound URL.
 *
 * dbName kept short ('t_logos') so Postgres identifiers stay within bounds.
 */
export const TrustedLogos: CollectionConfig = {
  slug: 'trusted-logos',
  dbName: 't_logos',
  labels: {
    singular: 'Trusted Logo',
    plural: 'Trusted Logos',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Written Content',
    defaultColumns: ['name', 'order', 'updatedAt'],
    description: 'Customer logos shown on the homepage "Trusted by" wall.',
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
      admin: { description: 'Customer name, e.g. "Association of American Railroads".' },
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
      admin: { description: 'Optional outbound link to the customer site.' },
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
