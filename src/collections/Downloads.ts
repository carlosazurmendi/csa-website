import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Downloads — the actual downloadable Resource assets (checklists, framework guides,
 * template overviews, standards guides) listed on the Resources › Downloadable Resources
 * page. This is the CONTENT collection, distinct from the `resource-pages` page-collection.
 * Each entry is a file with a category, file type, thumbnail, and an optional "gated" flag.
 */
export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: {
    singular: 'Download',
    plural: 'Downloads',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Free Resources',
    defaultColumns: ['title', 'category', 'fileType', 'gated', '_status'],
    description: 'Downloadable checklists, guides, and templates in the Resource Center.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Name of the download as shown on the resource card.' },
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 400,
      admin: { description: 'Short blurb describing what the download contains.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Checklists', value: 'checklists' },
            { label: 'Guidebooks', value: 'guidebooks' },
            { label: 'Free Templates', value: 'free-templates' },
            { label: 'Standards Guides', value: 'standards-guides' },
          ],
          admin: { width: '50%', description: 'Drives the listing filter chips.' },
        },
        {
          name: 'fileType',
          type: 'select',
          required: true,
          defaultValue: 'pdf',
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Excel spreadsheet (XLSX)', value: 'xlsx' },
            { label: 'Word document (DOCX)', value: 'docx' },
            { label: 'CSV', value: 'csv' },
            { label: 'ZIP archive', value: 'zip' },
          ],
          admin: { width: '50%', description: 'Shown on the card, e.g. "PDF · Checklist".' },
        },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Preview image / cover shown on the resource card.' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'The downloadable file (upload in admin). Gated downloads are served via signed, access-checked URLs in Milestone 6.',
      },
    },
    {
      name: 'gated',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'When on, the visitor must submit their details before downloading (lead capture). Enforced in Milestone 6.',
      },
    },
    seoField,
  ],
}
