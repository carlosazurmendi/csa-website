import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Instructors — the people who teach CSA courses. Surfaced on course landing
 * pages and the course catalog (bio, credentials, headline stats). Each course
 * relates to one instructor record. Mirrors the INSTRUCTORS block in
 * design-reference/project/assets/courses-data.js.
 */
export const Instructors: CollectionConfig = {
  slug: 'instructors',
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Storefront',
    defaultColumns: ['name', 'role', 'location', 'slug'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full name shown on the course pages.' },
    },
    {
      name: 'role',
      type: 'text',
      admin: { description: 'Job title / role line, e.g. "Founder & CEO · Principal Safety Engineer".' },
    },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'City / region, e.g. "Sarasota, Florida".' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Headshot / portrait photo.' },
    },
    {
      name: 'bioShort',
      type: 'textarea',
      admin: { description: 'One-paragraph summary used in compact cards and previews.' },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: { description: 'Full biography shown on the instructor / course detail page.' },
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credentials',
      admin: { description: 'Certifications and qualifications (icon + title + subtitle).' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Lucide icon name, e.g. "badge-check", "award", "graduation-cap".' },
        },
        { name: 'title', type: 'text', required: true, admin: { description: 'Credential name, e.g. "FS Engineer".' } },
        { name: 'subtitle', type: 'text', admin: { description: 'Issuing body / detail, e.g. "Certified by TÜV Rheinland".' } },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Headline stats',
      admin: { description: 'Big-number highlights, e.g. "6 yrs — Senior Safety Engineer".' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'The number / figure, e.g. "6", "3", "1st".' } },
        { name: 'suffix', type: 'text', admin: { description: 'Unit appended to the value, e.g. " yrs".' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'What the stat describes.' } },
      ],
    },
    slugField('name'),
  ],
}
