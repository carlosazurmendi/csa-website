import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Articles — the Resource Center publication library (the "Latest news" cards on
 * the home page + the /resources/articles index + each long-form /articles/[slug]
 * reading page). Each entry is a functional-safety insight piece: category-tagged,
 * with a hero image, structured rich-text body, byline, and related-article links.
 */
export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
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
    group: 'Written Content',
    defaultColumns: ['title', 'category', 'date', '_status'],
    description: 'Functional-safety articles and insights shown in the Resource Center.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Headline shown on the article card and the reading page.' },
    },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Robotics', value: 'robotics' },
            { label: 'Automotive', value: 'automotive' },
            { label: 'Rail', value: 'rail' },
            { label: 'Off-Road & Agriculture', value: 'off-road-agriculture' },
            { label: 'Philosophy', value: 'philosophy' },
            { label: 'Standards', value: 'standards' },
            { label: 'Field Notes', value: 'field-notes' },
            { label: 'Company', value: 'company' },
          ],
          admin: {
            width: '50%',
            description: 'Drives the listing filter chips and the "More in …" related band.',
          },
        },
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            width: '50%',
            description: 'Publication date shown in the byline and on the card.',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'MMMM d, yyyy' },
          },
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: {
        description: 'Short summary / dek used on cards and as the lead-in on the reading page.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Large image at the top of the reading page.' },
    },
    {
      name: 'heroCaption',
      type: 'text',
      admin: { description: 'Optional caption shown beneath the hero image.' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: { description: 'The full article. Headings here become the on-page table of contents.' },
    },
    {
      type: 'collapsible',
      label: 'Byline & Reading Details',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'authorMember',
          type: 'relationship',
          relationTo: 'team-members',
          admin: {
            description: 'Pick the author from the team. Leave blank to type a name manually below.',
          },
        },
        {
          name: 'authorName',
          type: 'text',
          admin: {
            description: 'Author name to show when the writer is not a listed team member.',
          },
        },
        {
          name: 'readingTime',
          type: 'text',
          admin: { description: 'Human-friendly read length, e.g. "9 min read".' },
        },
      ],
    },
    {
      name: 'topics',
      type: 'array',
      labels: { singular: 'Topic tag', plural: 'Topic tags' },
      admin: { description: 'Small tags shown under the title, e.g. "V-Model", "IEC 61508".' },
      fields: [{ name: 'topic', type: 'text', required: true }],
    },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Up to three related articles shown in the "Related articles" band.',
      },
    },
    seoField,
  ],
}
