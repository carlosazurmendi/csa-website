import type { CollectionConfig } from 'payload'

/**
 * Standalone testimonials (quote + attribution + company), reusable across
 * pages. Note: the Home case-study carousel sources its quotes from the
 * caseStudies collection; this collection holds testimonials used elsewhere.
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'attribution',
    defaultColumns: ['attribution', 'company', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'attribution', type: 'text', required: true },
        { name: 'company', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
  ],
}
