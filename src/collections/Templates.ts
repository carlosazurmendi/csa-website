import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/**
 * Purchasable documentation templates and bundles (the storefront "products").
 * Phase 1: price is a placeholder and there is no checkout — the buy affordance
 * links to "#". Drives /training-templates/templates (listing) and
 * /training-templates/templates/[slug] (detail).
 */
export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'format', 'price', 'order'],
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
    { name: 'description', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Compliance Bundle', value: 'compliance-bundle' },
            { label: 'QMS', value: 'qms' },
            { label: 'Functional Safety', value: 'fs' },
          ],
        },
        {
          name: 'format',
          type: 'select',
          options: [
            { label: 'Word', value: 'word' },
            { label: 'Excel', value: 'excel' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'standardFocus', type: 'text', admin: { description: 'e.g. "ISO 26262", "IEC 61508".' } },
        { name: 'documentType', type: 'text', admin: { description: 'e.g. "Plan", "Checklist", "Report template".' } },
      ],
    },
    {
      name: 'price',
      type: 'text',
      admin: { description: 'Placeholder price (no checkout in Phase 1), e.g. "$149".' },
    },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'whatsIncluded',
      type: 'array',
      label: "What's included",
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'isBundle',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark bundles so the storefront can group them.' },
    },
  ],
}
