import type { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
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
    {
      name: 'body',
      type: 'richText',
      label: 'Article body',
      // Full rich-text editor with a persistent (fixed) toolbar so it's clearly
      // an editor: headings, lists, links, blockquote, bold/italic, etc.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
  ],
}
