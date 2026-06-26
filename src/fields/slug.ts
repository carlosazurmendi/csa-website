import type { Field } from 'payload'

export const slugify = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

/**
 * Sidebar slug field. Auto-fills from a source field (default `title`) when empty,
 * but the editor can override. Unique + indexed for URL lookups.
 */
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL segment. Auto-filled from the title; change with care once published.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) =>
        value || (data?.[source] ? slugify(String(data[source])) : value),
    ],
  },
})
