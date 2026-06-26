import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Legal Pages — the Legal & Trust documents (Terms of Service, Privacy Policy,
 * Digital Refund Policy), each rendered at /legal/[slug] as a long-form document
 * with a "last updated" date and an on-page table of contents built from the body
 * headings. Each document is individually publishable (drafts on).
 */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: {
    singular: 'Legal Document',
    plural: 'Legal Documents',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Legal',
    defaultColumns: ['title', 'lastUpdated', '_status'],
    description: 'Terms of Service, Privacy Policy, and the Digital Refund Policy.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Document title, e.g. "Terms of Service".' },
    },
    slugField('title'),
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'One-line summary shown under the title at the top of the document.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lastUpdated',
          type: 'date',
          required: true,
          admin: {
            width: '50%',
            description: 'Shown as "Last updated" at the top of the document.',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'MMMM d, yyyy' },
          },
        },
        {
          name: 'effectiveDate',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Optional "Effective" date shown alongside the last-updated date.',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'MMMM d, yyyy' },
          },
        },
      ],
    },
    {
      name: 'version',
      type: 'text',
      admin: {
        description: 'Optional document version label, e.g. "v1.0".',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: {
        description:
          'The full legal text. Section headings here become the on-page table of contents.',
      },
    },
    seoField,
  ],
}
