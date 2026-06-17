import type { CollectionConfig } from 'payload'

/**
 * Downloadable resources (checklists, guidebooks, free templates, standards
 * guides). Drives /resources/downloads. The file is an uploaded asset.
 */
export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
    group: 'Resources',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Checklist', value: 'checklist' },
            { label: 'Guidebook', value: 'guidebook' },
            { label: 'Free Template', value: 'free-template' },
            { label: 'Standards Guide', value: 'standards-guide' },
          ],
        },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'The downloadable file (PDF, Word, Excel).' },
    },
  ],
}
