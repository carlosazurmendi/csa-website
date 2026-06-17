import type { GlobalConfig } from 'payload'

/**
 * Primary navigation + utility CTAs. The footer mirrors this structure (its
 * link columns are the nav groups that have children), matching the prototype's
 * single-source-of-truth route model.
 *
 * Note (Phase 1 scope): Login and Cart are static affordances that link to "#".
 * The "Training Schedule" slot is a CTA button ("Request a Private Course"),
 * not a page — model it as a child with isCTA = true.
 */
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  admin: { group: 'Navigation' },
  access: { read: () => true },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'Primary navigation',
      labels: { singular: 'Nav item', plural: 'Nav items' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true, defaultValue: '#' },
          ],
        },
        {
          name: 'children',
          type: 'array',
          labels: { singular: 'Sub-item', plural: 'Sub-items' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true, defaultValue: '#' },
                {
                  name: 'isCTA',
                  type: 'checkbox',
                  label: 'Render as CTA button',
                  defaultValue: false,
                  admin: { width: '180px' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'utility',
      label: 'Utility actions',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'loginLabel', type: 'text', defaultValue: 'Login' },
            { name: 'loginHref', type: 'text', defaultValue: '#' },
            { name: 'cartHref', type: 'text', defaultValue: '#' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'consultationLabel', type: 'text', defaultValue: 'Book a Consultation' },
            { name: 'consultationHref', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
  ],
}
