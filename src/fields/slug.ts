import type { Field } from 'payload'

/**
 * A slug field with a small auto-generate-from-title affordance.
 * Kept intentionally simple for Phase 1 (no external slugify dep).
 */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `URL segment. Lowercase, hyphenated. Derived from "${from}" if left blank.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return value
        const source = (data?.[from] as string) || ''
        return source
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      },
    ],
  },
})
