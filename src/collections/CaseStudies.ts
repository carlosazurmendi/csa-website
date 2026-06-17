import type { CollectionConfig } from 'payload'

/**
 * Case studies. The Home "Case studies" carousel renders the card (sector,
 * client, description, standards) alongside the attached testimonial quote.
 * Also used on /company/experience.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'caseStudies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Client / title' },
        { name: 'sector', type: 'text', required: true },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'standards',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    // ---- Attached testimonial (shown beside the card on Home) ----
    {
      type: 'group',
      name: 'testimonial',
      fields: [
        { name: 'quote', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'text' },
            { name: 'affiliation', type: 'text' },
          ],
        },
      ],
    },
    // ---- Long-form fields for /company/experience ----
    { name: 'problem', type: 'textarea' },
    { name: 'solution', type: 'textarea' },
    { name: 'result', type: 'textarea' },
  ],
}
