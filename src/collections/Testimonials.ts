import type { CollectionConfig } from 'payload'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Testimonials — client quotes.
 *
 * Reusable across the homepage case-study carousel, individual case-study
 * pull-quotes, and any "what clients say" band. Mark `featured` to surface a
 * quote in the highlighted rotations.
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'authorName',
    group: 'Written Content',
    defaultColumns: ['authorName', 'authorCompany', 'rating', 'featured', 'updatedAt'],
    description: 'Client quotes shown across the site. Tick "Featured" to include one in highlighted rotations.',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: { description: 'The testimonial text (without surrounding quotation marks).' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Person or organisation credited, e.g. "Erin Dalby".' },
        },
        {
          name: 'authorRole',
          type: 'text',
          admin: { width: '50%', description: 'Job title, e.g. "Director of Engineering".' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'authorCompany',
          type: 'text',
          admin: { width: '50%', description: 'Company / affiliation, e.g. "Liebherr Mining Equipment".' },
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: { width: '50%', description: 'Optional star rating, 1–5.' },
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional company logo to display with the quote.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show this quote in featured / highlighted rotations.' },
    },
  ],
}
