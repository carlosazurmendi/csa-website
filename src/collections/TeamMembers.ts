import type { CollectionConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Team Members — the people behind CSA.
 *
 * Powers the Company → Overview "Meet the team" section and any per-person
 * profile at /team-members/[slug]. Credentials are structured rows so each
 * person's certifications render consistently.
 */
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Company',
    defaultColumns: ['name', 'role', 'location', 'order', 'updatedAt'],
    description: 'The people on the team. Shown on the Company / About page and individual bio pages.',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full name, e.g. "Ben Twombly".' },
    },
    slugField('name'),
    {
      type: 'row',
      fields: [
        {
          name: 'role',
          type: 'text',
          admin: { width: '50%', description: 'Title, e.g. "Founder & CEO".' },
        },
        {
          name: 'location',
          type: 'text',
          admin: { width: '50%', description: 'Base location, e.g. "Sarasota, FL".' },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait photo.' },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: { description: 'Biography / background.' },
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credentials',
      admin: { description: 'Certifications and qualifications, e.g. FS Engineer (TÜV Rheinland).' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Lucide icon name, e.g. "badge-check", "award".' },
        },
        { name: 'title', type: 'text', required: true, admin: { description: 'Credential name, e.g. "FS Engineer".' } },
        {
          name: 'subtitle',
          type: 'text',
          admin: { description: 'Issuer / detail, e.g. "Certified by TÜV Rheinland".' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
    seoField,
  ],
}
