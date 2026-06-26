import type { CollectionConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Products — the downloadable compliance templates and bundles sold in the
 * Templates store. Drives the storefront, the searchable Templates listing, and
 * the Template detail page. Mirrors the documented Payload `templates` fields in
 * design-reference/project/assets/templates-data.js.
 *
 * A product is either a single `document` (Word / Excel template) or a `bundle`
 * that groups other products via the `includes` relationship. Price is an integer
 * in CENTS (Stripe unit_amount). The actual deliverable file is gated — see
 * `downloadableFile`.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Template', plural: 'Templates' },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Storefront',
    defaultColumns: ['title', 'code', 'type', 'category', 'price', 'featured', 'slug'],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      admin: { description: 'Short product code shown as a mono chip, e.g. "FSMP", "SUITE-17".' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Product title.' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'document',
      admin: { description: 'Single document or a bundle of documents.' },
      options: [
        { label: 'Document — single template', value: 'document' },
        { label: 'Bundle — multiple templates', value: 'bundle' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      admin: { description: 'Storefront category — drives the "By Category" filter.' },
      options: [
        { label: 'Compliance Bundles', value: 'Compliance Bundles' },
        { label: 'Quality Management System (QMS)', value: 'Quality Management System (QMS)' },
        { label: 'Functional Safety Engineering (FS)', value: 'Functional Safety Engineering (FS)' },
      ],
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standard focus',
      admin: { description: 'Standards this template addresses — drives the "By Standard Focus" filter.' },
      fields: [{ name: 'code', type: 'text', required: true }],
    },
    {
      name: 'docType',
      type: 'select',
      label: 'Document type',
      admin: { description: 'Document type — drives the "By Document Type" filter.' },
      options: [
        { label: 'Plans', value: 'Plans' },
        { label: 'Reports & Concepts', value: 'Reports & Concepts' },
        { label: 'Analytical Models & Tools', value: 'Analytical Models & Tools' },
      ],
    },
    {
      name: 'format',
      type: 'select',
      admin: { description: 'File format of the deliverable.' },
      options: [
        { label: 'Word', value: 'Word' },
        { label: 'Excel', value: 'Excel' },
        { label: 'Bundle', value: 'Bundle' },
      ],
    },
    {
      name: 'pages',
      type: 'number',
      admin: { description: 'Nominal page / sheet count shown in the detail meta.' },
    },
    {
      name: 'price',
      type: 'number',
      admin: { description: 'One-time price in CENTS (Stripe unit_amount).' },
    },
    {
      name: 'priceNote',
      type: 'text',
      admin: { description: 'Pricing caveat shown under the price.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'One-line card summary used in the store grid.' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Detail-page lead paragraph.' },
    },
    {
      name: 'whatsIncluded',
      type: 'array',
      label: "What's included",
      admin: { description: 'Checklist shown on the detail page.' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'includes',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'For bundles only — the member templates this bundle contains.',
        condition: (data) => data?.type === 'bundle',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Lucide icon name, e.g. "shield", "calculator", "library".' },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Preview / cover image for the store card and detail page.' },
    },
    {
      name: 'badge',
      type: 'text',
      admin: { description: 'Optional ribbon, e.g. "Best value", "Most popular".' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Surface in the storefront hero / highlight.' },
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show a "popular" highlight ribbon in the catalog.' },
    },
    {
      name: 'downloadableFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'PROTECTED deliverable — the actual purchasable file. Gated: never served from the public API. Delivered only via short-lived signed URLs after a verified purchase (Milestone 6). Do not link to this directly.',
      },
    },
    seoField,
    slugField('title'),
  ],
}
