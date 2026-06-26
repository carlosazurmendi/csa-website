import type { CollectionConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Job Postings — open roles for the Company → Careers page.
 *
 * Each entry is a role card (and optional /job-postings/[slug] detail) with a
 * direct apply link. Untick `active` to retire a role without deleting it.
 */
export const JobPostings: CollectionConfig = {
  slug: 'job-postings',
  labels: {
    singular: 'Job Posting',
    plural: 'Job Postings',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Company',
    defaultColumns: ['title', 'location', 'type', 'active', 'postedAt'],
    description: 'Open roles shown on the Careers page. Untick "Active" to hide a role without deleting it.',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  defaultSort: '-postedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Role title, e.g. "Senior Functional Safety Engineer — Robotics".' },
    },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'department',
          type: 'text',
          admin: { width: '34%', description: 'Team / discipline, e.g. "Robotics", "Rail".' },
        },
        {
          name: 'location',
          type: 'text',
          admin: { width: '33%', description: 'e.g. "Remote · U.S. / Canada / Europe".' },
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'full-time',
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship', value: 'internship' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short blurb shown on the role card.' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Full job description: responsibilities, requirements, etc.' },
    },
    {
      name: 'applyUrl',
      type: 'text',
      admin: { description: 'Where the "Apply" button links (application form or email link).' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'postedAt',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Date the role was opened.',
            date: { pickerAppearance: 'dayOnly' },
          },
        },
        {
          name: 'active',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '50%', description: 'Show this role on the Careers page.' },
        },
      ],
    },
    seoField,
  ],
}
