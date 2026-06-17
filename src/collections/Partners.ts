import type { CollectionConfig } from 'payload'

/**
 * Certification partners AND customer logos. A `type` field distinguishes the
 * two walls on the Home "Trusted by" / Partners section.
 *
 * Brand marks load from the DuckDuckGo icon service by `domain` (the prototype's
 * approach), falling back to the `mono` monogram. An optional uploaded `logo`
 * overrides the icon service when provided.
 */
export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'customer',
          options: [
            { label: 'Customer logo', value: 'customer' },
            { label: 'Certification / technical partner', value: 'partner' },
          ],
        },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'domain',
          type: 'text',
          admin: { description: 'e.g. "deere.com" — used to fetch the brand icon.' },
        },
        {
          name: 'mono',
          type: 'text',
          label: 'Monogram fallback',
          admin: { description: 'Shown if the icon fails to load, e.g. "JD".' },
        },
      ],
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Partner role, e.g. "Certification Partner". (Partners only.)',
        condition: (data) => data?.type === 'partner',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: { description: 'Optional outbound link.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional uploaded logo (overrides the icon service).' },
    },
  ],
}
