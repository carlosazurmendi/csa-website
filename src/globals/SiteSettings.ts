import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Critical Systems Analysis' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'White logo used in the nav and footer.' },
    },
    {
      type: 'group',
      name: 'defaultSeo',
      label: 'Default SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: 'Social links',
      fields: [
        { name: 'linkedin', type: 'text', defaultValue: 'https://www.linkedin.com/' },
        { name: 'x', type: 'text', defaultValue: 'https://x.com/' },
        { name: 'youtube', type: 'text', defaultValue: 'https://www.youtube.com/' },
      ],
    },
  ],
}
