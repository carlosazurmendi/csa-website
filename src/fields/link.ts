import type { Field } from 'payload'

/** A single CTA/link sub-field set (label + href + visual style). */
export const linkSubFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  {
    name: 'href',
    type: 'text',
    required: true,
    admin: { description: 'Internal path (e.g. /consulting) or a full external URL.' },
  },
  {
    name: 'style',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primary — gold pill', value: 'primary' },
      { label: 'Secondary — text + arrow', value: 'secondary' },
      { label: 'Glass — frosted', value: 'glass' },
    ],
  },
]

/** Repeatable CTA buttons. Pass a custom `name`/`label` when a section needs its own. */
export const ctaField = (name = 'ctas', label = 'Call-to-action buttons'): Field => ({
  name,
  type: 'array',
  label,
  fields: linkSubFields,
})
