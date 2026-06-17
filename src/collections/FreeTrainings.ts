import type { CollectionConfig } from 'payload'

/**
 * Free trainings (video overviews, whitepapers, core intros). Drives
 * /resources/free-trainings.
 */
export const FreeTrainings: CollectionConfig = {
  slug: 'freeTrainings',
  labels: { singular: 'Free Training', plural: 'Free Trainings' },
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
            { label: 'Video Overview', value: 'video-overview' },
            { label: 'Whitepaper', value: 'whitepaper' },
            { label: 'Core Intro', value: 'core-intro' },
          ],
        },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'link', type: 'text', admin: { description: 'External video/whitepaper link, if any.' } },
  ],
}
