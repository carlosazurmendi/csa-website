import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Training & Templates — the landing / listing pages of the "Training & Templates"
 * nav section. One row per sub-page (Overview, Digital Courses, Course Catalog,
 * Purchase Templates, Browse All Templates). The actual courses + templates are
 * separate Storefront collections that these pages render; here we hold only the
 * editorial landing copy (hero, value props, filter-section copy, the founder/
 * instructor band, the "Request a Private Course" CTA, etc.).
 *
 * Tabs are UNNAMED so every section's fields flatten into one Postgres table. Each
 * field name is prefixed by its section. Each row fills only the tabs its page uses.
 */
export const TrainingTemplates: CollectionConfig = {
  slug: 'training-templates',
  dbName: 'trn',
  labels: {
    singular: 'Training & Templates Page',
    plural: 'Training & Templates Pages',
  },
  versions: { drafts: true },
  defaultSort: 'order',
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Training & Templates',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    description:
      'Landing & listing pages for the Training & Templates nav section. Courses and templates themselves live in their own Storefront collections.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal/admin page title, e.g. "Course Catalog".' },
    },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Sort order within the nav section (lower = earlier).',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional nav-label override. Defaults to the title when empty.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        /* ---------------------------------------------------------------- HERO */
        {
          label: 'Hero',
          description: 'Top-of-page hero band (every sub-page).',
          fields: [
            {
              name: 'heroCrumb',
              type: 'text',
              admin: { description: 'Breadcrumb current-page label, e.g. "Overview".' },
            },
            {
              name: 'heroGhost',
              type: 'text',
              admin: {
                description: 'Large decorative ghost word behind the hero, e.g. "TRAIN".',
              },
            },
            {
              name: 'heroTitle',
              type: 'textarea',
              admin: {
                description: 'Hero headline. Use a line break for the two-line display.',
              },
            },
            {
              name: 'heroLead',
              type: 'richText',
              admin: { description: 'Hero intro paragraph under the headline.' },
            },
            {
              name: 'heroPrimaryCta',
              type: 'text',
              admin: { description: 'Primary (gold) CTA button label.' },
            },
            {
              name: 'heroSecondaryCta',
              type: 'text',
              admin: { description: 'Secondary (silver) CTA button label.' },
            },
            {
              name: 'heroStandards',
              type: 'array',
              labels: { singular: 'Item', plural: 'Items' },
              admin: {
                description:
                  'Mono "tick" line under the hero — standards codes and/or trust signals.',
              },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },

        /* --------------------------------------------------- TWO WAYS (Overview) */
        {
          label: 'Two Ways',
          description: 'Overview only — "Two ways to build internal capability".',
          fields: [
            {
              name: 'waysEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow.' },
            },
            {
              name: 'waysHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'waysLead',
              type: 'textarea',
              admin: { description: 'Section intro paragraph.' },
            },
            {
              name: 'waysItems',
              type: 'array',
              labels: { singular: 'Way', plural: 'Ways' },
              fields: [
                { name: 'num', type: 'text', admin: { description: 'e.g. "01".' } },
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
                {
                  name: 'meta',
                  type: 'array',
                  labels: { singular: 'Tag', plural: 'Tags' },
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                { name: 'cta', type: 'text', admin: { description: 'Link label.' } },
              ],
            },
          ],
        },

        /* ----------------------------------- WHY / VALUE (Courses + Catalog) */
        {
          label: 'Value Props',
          description: '"Why train with CSA" value cards (Digital Courses + Course Catalog).',
          fields: [
            {
              name: 'valEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow, e.g. "Why train with CSA".' },
            },
            {
              name: 'valHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'valItems',
              type: 'array',
              labels: { singular: 'Value', plural: 'Values' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------------------------------------- LEARNING TRACKS (Courses) */
        {
          label: 'Learning Tracks',
          description: 'Digital Courses only — "Choose your industry track".',
          fields: [
            {
              name: 'trkEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow.' },
            },
            {
              name: 'trkHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'trkLead',
              type: 'textarea',
              admin: { description: 'Section intro paragraph.' },
            },
            {
              name: 'trkItems',
              type: 'array',
              labels: { singular: 'Track', plural: 'Tracks' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                {
                  name: 'standards',
                  type: 'text',
                  admin: { description: 'Standards line, e.g. "ISO 10218 · ISO 3691-4".' },
                },
                { name: 'desc', type: 'textarea' },
                { name: 'linkLabel', type: 'text', admin: { description: 'Explore-link label.' } },
              ],
            },
          ],
        },

        /* ------------------------------------------ INSTRUCTOR BAND (Courses) */
        {
          label: 'Instructor',
          description: 'Digital Courses only — the founder / instructor credentials band.',
          fields: [
            {
              name: 'instrEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow, e.g. "Taught by the founder".' },
            },
            {
              name: 'instrHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'instrPortraitTag',
              type: 'text',
              admin: { description: 'Small tag on the portrait, e.g. "Your instructor".' },
            },
          ],
        },

        /* ----------------------------- FILTER SECTION (Catalog + Templates) */
        {
          label: 'Filter Section',
          description:
            'Copy for the filter/storefront band (Course Catalog + Templates Storefront).',
          fields: [
            {
              name: 'filtEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow, e.g. "Find your course".' },
            },
            {
              name: 'filtHeading',
              type: 'text',
              admin: { description: 'Section heading, e.g. "Filter courses.".' },
            },
            {
              name: 'filtLead',
              type: 'textarea',
              admin: { description: 'Section intro paragraph.' },
            },
            {
              name: 'filtNote',
              type: 'textarea',
              admin: {
                description:
                  'Small note shown in/near the filter sidebar (e.g. pricing/Payload note).',
              },
            },
          ],
        },

        /* --------------------------------- CORE OFFERINGS (Course Catalog) */
        {
          label: 'Core Offerings',
          description: 'Course Catalog only — "Core educational offerings".',
          fields: [
            {
              name: 'offEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow.' },
            },
            {
              name: 'offHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'offItems',
              type: 'array',
              labels: { singular: 'Offering', plural: 'Offerings' },
              fields: [
                { name: 'num', type: 'text', admin: { description: 'e.g. "01".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
                { name: 'badge', type: 'text', admin: { description: 'Badge label.' } },
                { name: 'meta', type: 'text', admin: { description: 'Meta line.' } },
              ],
            },
          ],
        },

        /* ----------------------- SHOP BY CATEGORY (Templates Storefront) */
        {
          label: 'Categories',
          description: 'Templates Storefront only — "Shop by category".',
          fields: [
            {
              name: 'catEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow.' },
            },
            {
              name: 'catHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'catItems',
              type: 'array',
              labels: { singular: 'Category', plural: 'Categories' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'name', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* --------------------------- CLOSING / PRIVATE-COURSE CTA BAND */
        {
          label: 'Closing CTA',
          description:
            'The closing band — "Request a Private Course" (courses) or the templates closing band.',
          fields: [
            {
              name: 'ctaEyebrow',
              type: 'text',
              admin: { description: 'Band eyebrow.' },
            },
            {
              name: 'ctaHeading',
              type: 'text',
              admin: { description: 'Band heading.' },
            },
            {
              name: 'ctaSub',
              type: 'textarea',
              admin: { description: 'Band supporting paragraph.' },
            },
            {
              name: 'ctaPrimary',
              type: 'text',
              admin: { description: 'Primary (gold) CTA button label.' },
            },
            {
              name: 'ctaSecondary',
              type: 'text',
              admin: { description: 'Secondary (link) CTA label.' },
            },
            {
              name: 'ctaStats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              admin: { description: 'Optional stat chips in the band (templates closing band).' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },

        /* ----------------------------------------------------------- SEO */
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}
