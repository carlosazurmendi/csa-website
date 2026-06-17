import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/**
 * Course catalog entries. Drives /training-templates/courses (filterable grid).
 * Phase 1: catalog/marketing only — no enrollment, player, or checkout.
 */
export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'track', 'format', 'credential', 'order'],
    group: 'Training & Templates',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    slugField(),
    { name: 'summary', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'track', type: 'text', admin: { description: 'Track or industry, e.g. "Rail", "Robotics".' } },
        {
          name: 'format',
          type: 'select',
          options: [
            { label: 'Online', value: 'online' },
            { label: 'In-person', value: 'in-person' },
            { label: 'Hybrid', value: 'hybrid' },
            { label: 'Self-paced', value: 'self-paced' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'credential', type: 'text', admin: { description: 'e.g. "Certificate of completion".' } },
        { name: 'price', type: 'text', admin: { description: 'Placeholder price (no checkout in Phase 1).' } },
      ],
    },
    { name: 'instructor', type: 'text' },
    { name: 'media', type: 'upload', relationTo: 'media' },
    {
      name: 'modules',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
