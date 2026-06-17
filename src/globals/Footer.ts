import type { GlobalConfig } from 'payload'

/**
 * Footer content. Link columns are derived in the component from the Header
 * nav (mirroring the prototype); this global holds the brand blurb, the closing
 * CTA band, legal links, and the copyright line.
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Navigation' },
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'closingCta',
      label: 'Closing CTA band',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Ready when you are.' },
        {
          name: 'title',
          type: 'textarea',
          admin: { description: 'Use a line break for two lines.' },
          defaultValue: 'Build Safer.\nScale Confidently.',
        },
        { name: 'sub', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'primaryLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'primaryHref', type: 'text', defaultValue: '#' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'secondaryLabel', type: 'text', defaultValue: 'See Our Services' },
            { name: 'secondaryHref', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
    { name: 'brandBlurb', type: 'textarea' },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true, defaultValue: '#' },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Critical Systems Analysis · All rights reserved.',
    },
  ],
}
