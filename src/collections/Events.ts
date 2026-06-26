import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Events — conference appearances, keynotes, and webinars shown on
 * /resources/events. Upcoming entries get a registration link; past sessions and
 * webinars get a recording link. Each has a type, dates, and location.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event / Webinar',
    plural: 'Events & Webinars',
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
    group: 'Events',
    defaultColumns: ['title', 'type', 'startDate', 'location', '_status'],
    description: 'Conference appearances, keynotes, and webinars in the Resource Center.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Name of the event, keynote, or webinar.' },
    },
    slugField('title'),
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Upcoming Event', value: 'upcoming-event' },
        { label: 'Past Keynote', value: 'past-keynote' },
        { label: 'Technical Webinar', value: 'technical-webinar' },
      ],
      admin: { description: 'Drives the listing filter chips and which links are shown.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: {
            width: '50%',
            description: 'When the event begins. Leave blank for "Date to be announced".',
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'MMM d, yyyy h:mm a' },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Optional end date/time for multi-day or timed sessions.',
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'MMM d, yyyy h:mm a' },
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Venue and city, or "Online / Virtual" for webinars.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Details about the session — what it covers and who should attend.' },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Cover image shown on the event card.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'registerUrl',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Registration link for upcoming events (external URL).',
          },
        },
        {
          name: 'recordingUrl',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Link to the recording for past keynotes / on-demand webinars.',
          },
        },
      ],
    },
    seoField,
  ],
}
