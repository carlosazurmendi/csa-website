import type { Field } from 'payload'

/**
 * Reusable SEO field group. Added to every page-level global and every collection
 * that has its own URL. Meta title + description + Open Graph image.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO & Social',
  admin: {
    description: 'Search-engine and social-sharing metadata for this page.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
      admin: { description: 'Browser tab + search-result title (~60 characters).' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 200,
      admin: { description: 'Search-result snippet (~155 characters).' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Social share image (Open Graph / Twitter card).' },
    },
  ],
}
