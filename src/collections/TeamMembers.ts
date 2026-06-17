import type { CollectionConfig } from 'payload'

/**
 * Team members. Used on Company pages (e.g. the team / "Meet the Team" area).
 */
export const TeamMembers: CollectionConfig = {
  slug: 'teamMembers',
  labels: { singular: 'Team Member', plural: 'Team Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: 'Company',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    {
      name: 'credentials',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'location', type: 'text' },
  ],
}
