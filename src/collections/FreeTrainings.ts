import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Free Trainings — the free, on-demand learning library on /resources/free-trainings:
 * video overviews, introductory presentations, and technical whitepapers covering
 * functional-safety fundamentals. Each entry links out to a video or document.
 */
export const FreeTrainings: CollectionConfig = {
  slug: 'free-trainings',
  labels: {
    singular: 'Free Training',
    plural: 'Free Trainings',
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
    defaultColumns: ['title', 'level', 'duration', '_status'],
    description: 'Free on-demand training videos and briefings in the Resource Center.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Name of the training, video, or presentation.' },
    },
    slugField('title'),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 400,
      admin: { description: 'Short blurb shown on the training card.' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Fuller description of what the training covers.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Length, e.g. "18 min" or "Self-paced".',
          },
        },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Introductory', value: 'introductory' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
          admin: { width: '50%', description: 'Audience level for this material.' },
        },
      ],
    },
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Document', value: 'document' },
        { label: 'Presentation', value: 'presentation' },
      ],
      admin: {
        description:
          'Media type — sets the card icon (video → play, document → file, presentation → slides).',
      },
    },
    {
      name: 'releaseStatus',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Publishing soon', value: 'soon' },
      ],
      admin: {
        description:
          'Published → the card shows a working "Watch/Start free" link (set videoOrLink below). Publishing soon → the card shows the "Coming soon" (clock) treatment and is not clickable.',
      },
    },
    {
      name: 'videoOrLink',
      type: 'text',
      admin: {
        description: 'Link to the video or document (external URL, e.g. a YouTube or Vimeo link).',
        condition: (data) => data?.releaseStatus !== 'soon',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: {
        description:
          'Card button text, e.g. "Watch free", "Read free", "View slides". "Publishing soon" cards always show "Coming soon".',
        condition: (data) => data?.releaseStatus !== 'soon',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Cover image / video poster shown on the training card.' },
    },
    seoField,
  ],
}
