import type { CollectionConfig } from 'payload'

/**
 * "Trusted By" customer logos (the Home customer wall). Separate from the
 * `partners` collection (certification/technical partners).
 *
 * Brand marks load from the DuckDuckGo icon service by `domain`, falling back to
 * the `mono` monogram; an optional uploaded `logo` overrides the icon service.
 */
export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: { singular: 'Trusted-by logo', plural: 'Trusted By' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
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
    { name: 'url', type: 'text', admin: { description: 'Optional outbound link.' } },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional uploaded logo (overrides the icon service).' },
    },
  ],
}
