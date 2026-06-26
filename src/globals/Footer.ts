import type { GlobalConfig } from 'payload'
import { editorWrite } from '@/access'
import { ctaField } from '@/fields/link'

/**
 * Footer — the bottom of every page: the closing call-to-action band, the link
 * columns, the legal links, copyright line, and social icons.
 *
 * Mirrors design-reference/project/assets/footer.jsx (the closing CTA, the column
 * grid mirroring the nav sections, the LEGAL links, and the standards strip).
 *
 * Site-config global: structural and always live (no drafts).
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  dbName: 'nav_ftr',
  access: {
    read: () => true,
    update: editorWrite,
  },
  admin: {
    group: 'Site Configuration',
    description: 'Footer columns, legal links, copyright, and the closing call-to-action.',
  },
  fields: [
    {
      type: 'group',
      name: 'closingCta',
      label: 'Closing call-to-action',
      admin: {
        description: 'The large prompt above the footer columns ("Build Safer. Scale Confidently.").',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Ready when you are.',
          admin: { description: 'Small label above the heading.' },
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Build Safer. Scale Confidently.',
          admin: { description: 'Large display heading.' },
        },
        {
          name: 'subtext',
          type: 'textarea',
          defaultValue:
            'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.',
          admin: { description: 'Supporting paragraph.' },
        },
        ctaField('ctas', 'Buttons'),
      ],
    },
    {
      name: 'blurb',
      type: 'textarea',
      label: 'Brand blurb',
      defaultValue:
        'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
      admin: { description: 'Short description shown beside the logo in the footer.' },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      admin: { description: 'Grouped link columns (one heading + a list of links each).' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: { description: 'Column heading, e.g. "Consulting".' },
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { description: 'Link text.' } },
            { name: 'href', type: 'text', required: true, admin: { description: 'Link destination.' } },
          ],
        },
      ],
    },
    {
      name: 'standardsStrip',
      type: 'array',
      label: 'Standards strip',
      admin: {
        description:
          'Small list of standards codes shown in the footer (e.g. ISO 13849, IEC 61508). Codes are plain text.',
      },
      fields: [
        { name: 'code', type: 'text', required: true, admin: { description: 'A standard code, e.g. "ISO 13849".' } },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      admin: { description: 'Bottom-bar legal links (Terms, Privacy, Refund Policy).' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'Link text.' } },
        { name: 'href', type: 'text', required: true, admin: { description: 'Link destination.' } },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Critical Systems Analysis. All rights reserved.',
      admin: { description: 'Copyright line shown in the bottom bar.' },
    },
  ],
}
