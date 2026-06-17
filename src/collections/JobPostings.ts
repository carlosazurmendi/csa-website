import type { CollectionConfig } from 'payload'

/**
 * Open positions. Drives the listing on /company/careers. Phase 1: applying
 * links out via `applyLink` (no in-app application flow).
 */
export const JobPostings: CollectionConfig = {
  slug: 'jobPostings',
  labels: { singular: 'Job Posting', plural: 'Job Postings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'order'],
    group: 'Company',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'location', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '120px' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'applyLink', type: 'text', defaultValue: '#' },
  ],
}
