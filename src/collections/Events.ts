import type { CollectionConfig } from 'payload'

/**
 * Events & webinars. Drives /resources/events. `type` distinguishes upcoming
 * events from past keynotes and webinars for filtering.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date'],
    group: 'Resources',
  },
  access: { read: () => true },
  defaultSort: '-date',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Past Keynote', value: 'past-keynote' },
            { label: 'Webinar', value: 'webinar' },
          ],
        },
        { name: 'date', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
    { name: 'description', type: 'textarea' },
    { name: 'link', type: 'text', admin: { description: 'Registration or recording link.' } },
  ],
}
