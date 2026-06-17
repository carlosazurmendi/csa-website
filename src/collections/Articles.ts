import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/**
 * Articles / insights. The Home "Latest news" section pulls the 3 most recent
 * published entries; /resources/articles lists all; /resources/articles/[slug]
 * renders one.
 */
export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
    group: 'Resources',
  },
  access: {
    read: () => true,
  },
  versions: { drafts: true },
  defaultSort: '-publishedDate',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Standards", "Field Notes", "Company".' },
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayOnly' } },
        },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText' },
  ],
}
