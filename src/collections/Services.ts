import type { CollectionConfig } from 'payload'

/**
 * Service offerings (Engineering, Consulting, Auditing, Training, + engagement
 * models). Used on Home ("Services" tab) and Company → Services.
 */
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    group: 'Consulting',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: { description: 'lucide icon name, e.g. "wrench", "compass".' },
        },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'points',
      type: 'array',
      label: 'What we deliver',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'bestFor',
      type: 'textarea',
      label: 'Best for (optional)',
    },
  ],
}
