import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/**
 * Simple rich-text legal pages (Terms, Privacy, Refund Policy). Drives
 * /legal/[slug]. Linked from the footer. Placeholder body for Phase 1.
 */
export const LegalPages: CollectionConfig = {
  slug: 'legalPages',
  labels: { singular: 'Legal Page', plural: 'Legal Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Pages',
    // Reached via the custom "Pages" sidebar tree (Legal → each page).
    hidden: true,
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'lastUpdated', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'body', type: 'richText' },
  ],
}
