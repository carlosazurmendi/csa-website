import type { GlobalConfig } from 'payload'
import { editorWrite } from '@/access'
import { seoField } from '@/fields/seo'

/**
 * Site Settings — the one place to edit the brand identity that appears on every
 * page: name, logo, tagline, contact details, social links, the default SEO that
 * pages inherit, and the optional site-wide announcement bar.
 *
 * Site-config global: structural and always live (no drafts). Mirrors the brand /
 * social / legal data in design-reference/project/assets/routes.js + footer.jsx.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  dbName: 'site_set',
  access: {
    read: () => true,
    update: editorWrite,
  },
  admin: {
    group: 'Site Configuration',
    description: 'Brand name, logo, contact info, social links, and the announcement bar.',
  },
  fields: [
    {
      type: 'group',
      name: 'brand',
      label: 'Brand',
      admin: { description: 'Name, logo, and one-line description used across the site.' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          defaultValue: 'Critical Systems Analysis',
          admin: { description: 'Full company name.' },
        },
        {
          name: 'shortName',
          type: 'text',
          defaultValue: 'CSA',
          admin: { description: 'Abbreviation used in tight spaces, e.g. "CSA".' },
        },
        {
          name: 'tagline',
          type: 'text',
          defaultValue:
            'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
          admin: { description: 'Short descriptive line shown in the footer and meta tags.' },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Primary logo (white version used on the dark nav + footer).' },
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact',
      admin: { description: 'How customers reach CSA.' },
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { description: 'Primary contact email address.' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { description: 'Primary contact phone number.' },
        },
        {
          name: 'address',
          type: 'textarea',
          admin: { description: 'Mailing / office address, e.g. "Sarasota, Florida".' },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social links',
      admin: { description: 'Social profiles shown in the footer (LinkedIn, X, YouTube, …).' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          defaultValue: 'linkedin',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'GitHub', value: 'github' },
          ],
          admin: { description: 'Which platform this link points to (sets the icon).' },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { description: 'Full profile URL.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'announcementBar',
      label: 'Announcement bar',
      admin: {
        description: 'Optional thin banner shown at the very top of every page. Leave disabled to hide.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Turn the announcement bar on or off site-wide.' },
        },
        {
          name: 'message',
          type: 'text',
          admin: { description: 'The text shown in the bar.' },
        },
        {
          name: 'linkLabel',
          type: 'text',
          admin: { description: 'Optional link text, e.g. "Learn more".' },
        },
        {
          name: 'linkHref',
          type: 'text',
          admin: { description: 'Where the link goes (internal path or external URL).' },
        },
      ],
    },
    // Site-wide SEO defaults that individual pages inherit unless they override them.
    seoField,
  ],
}
