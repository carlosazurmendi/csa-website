import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Home — the single landing page, modelled as a one-row page collection so the
 * client edits every band of Home.html from one admin record.
 *
 * Each UNNAMED tab maps to one section the page mounts (see assets/*.jsx):
 * Hero → Case Studies → Partners/Trusted-by → Problem → Services & Industries →
 * Standing Apart (How we work) → About (founder) → News/Insights → closing CTA.
 * Tab fields are flattened into the `home` table; names are section-prefixed to
 * avoid collisions and keep Postgres identifiers short.
 */
export const Home: CollectionConfig = {
  slug: 'home',
  dbName: 'home',
  labels: {
    singular: 'Home Page',
    plural: 'Home Page',
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
    group: 'Home',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    description: 'The home landing page, section by section.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal label for this page record, e.g. "Home".' },
    },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Sort order within the Home group.' },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: { position: 'sidebar', description: 'Optional nav label override.' },
    },
    {
      type: 'tabs',
      tabs: [
        /* ---------------------------------------------------------------- Hero */
        {
          label: 'Hero',
          fields: [
            { name: 'heroTitle', type: 'text', admin: { description: 'Main display headline (line 1).' } },
            {
              name: 'heroTitleAccent',
              type: 'text',
              admin: { description: 'Gold-shimmer accent word in the headline, e.g. "Innovation".' },
            },
            {
              name: 'heroSubhead',
              type: 'textarea',
              admin: { description: 'Bold sub-headline directly under the title.' },
            },
            {
              name: 'heroSub',
              type: 'richText',
              admin: { description: 'Supporting hero paragraph.' },
            },
            { name: 'heroCtaPrimary', type: 'text', admin: { description: 'Primary CTA button label.' } },
            { name: 'heroCtaSecondary', type: 'text', admin: { description: 'Secondary text-link CTA label.' } },
            {
              name: 'heroSystems',
              type: 'array',
              label: 'Safety-critical systems (carousel)',
              admin: { description: 'The rotating subject cards in the hero selector.' },
              fields: [
                { name: 'cat', type: 'text', admin: { description: 'Category label, e.g. "Rail Transit".' } },
                { name: 'name', type: 'text', admin: { description: 'System name, e.g. "High-Speed Trainset".' } },
                { name: 'blurb', type: 'textarea', admin: { description: 'Short description of the system.' } },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Validated against',
                  fields: [{ name: 'code', type: 'text', required: true }],
                },
                { name: 'metricLabel', type: 'text', admin: { description: 'Metric label, e.g. "Safety Integrity".' } },
                { name: 'metricVal', type: 'text', admin: { description: 'Metric value, e.g. "SIL 4".' } },
              ],
            },
            {
              name: 'heroTicker',
              type: 'array',
              label: 'Standards ticker',
              admin: { description: 'Standards crawl along the bottom of the hero.' },
              fields: [{ name: 'code', type: 'text', required: true }],
            },
          ],
        },

        /* -------------------------------------------------------- Case Studies */
        {
          label: 'Case Studies',
          fields: [
            { name: 'csEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "Proof, not promises.".' } },
            { name: 'csHeading', type: 'text', admin: { description: 'Section heading, e.g. "Case studies.".' } },
            { name: 'csSub', type: 'textarea', admin: { description: 'Sub-line under the heading.' } },
            { name: 'csCtaLabel', type: 'text', admin: { description: 'Bottom CTA button label.' } },
            {
              name: 'csItems',
              type: 'array',
              label: 'Case-study cards',
              fields: [
                { name: 'sector', type: 'text', admin: { description: 'Sector label, e.g. "Mining Equipment".' } },
                { name: 'name', type: 'text', admin: { description: 'Card title / client name.' } },
                { name: 'desc', type: 'textarea', admin: { description: 'Card summary description.' } },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Standards',
                  fields: [{ name: 'code', type: 'text', required: true }],
                },
                { name: 'quote', type: 'textarea', admin: { description: 'Testimonial pull-quote.' } },
                { name: 'author', type: 'text', admin: { description: 'Quote author.' } },
                { name: 'affiliation', type: 'text', admin: { description: 'Author affiliation / company.' } },
              ],
            },
          ],
        },

        /* ------------------------------------------------ Partners / Trusted by */
        {
          label: 'Partners',
          fields: [
            { name: 'ptEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "Trusted by.".' } },
            { name: 'ptHeading', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'ptSub', type: 'textarea', admin: { description: 'Sub-line under the heading.' } },
            {
              name: 'ptCustomers',
              type: 'array',
              label: 'Customer logos',
              fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'Customer name caption.' } },
                { name: 'mark', type: 'text', admin: { description: 'Monogram fallback, e.g. "ARR".' } },
                { name: 'domain', type: 'text', admin: { description: 'Domain for the brand icon.' } },
              ],
            },
            { name: 'ptPartnersLabel', type: 'text', admin: { description: 'Partners sub-band label, e.g. "Partners".' } },
            { name: 'ptPartnersIntro', type: 'textarea', admin: { description: 'Intro line above the partner wall.' } },
            {
              name: 'ptPartners',
              type: 'array',
              label: 'Certification & technical partners',
              fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'Partner name.' } },
                { name: 'role', type: 'text', admin: { description: 'Relationship, e.g. "Certification Partner".' } },
                { name: 'mono', type: 'text', admin: { description: 'Monogram fallback.' } },
              ],
            },
          ],
        },

        /* ------------------------------------------------------------- Problem */
        {
          label: 'Problem',
          fields: [
            { name: 'pbEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "The problem".' } },
            { name: 'pbHeading', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'pbLead', type: 'richText', admin: { description: 'Lead paragraph describing the problem.' } },
            { name: 'pbSolveLabel', type: 'text', admin: { description: 'Solution band label, e.g. "The CSA solution".' } },
            {
              name: 'pbSolutions',
              type: 'array',
              label: 'CSA solution principles',
              fields: [
                { name: 'title', type: 'text', required: true, admin: { description: 'Principle title.' } },
                { name: 'desc', type: 'textarea', admin: { description: 'Principle description.' } },
              ],
            },
          ],
        },

        /* ------------------------------------------- Services & Industries */
        {
          label: 'Services',
          fields: [
            { name: 'svEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "What we do".' } },
            { name: 'svServicesHeading', type: 'text', admin: { description: 'Heading on the Services tab.' } },
            { name: 'svServicesLead', type: 'textarea', admin: { description: 'Lead on the Services tab.' } },
            { name: 'svServicesCta', type: 'text', admin: { description: 'Services CTA label.' } },
            { name: 'svIndustriesHeading', type: 'text', admin: { description: 'Heading on the Industries tab.' } },
            { name: 'svIndustriesLead', type: 'textarea', admin: { description: 'Lead on the Industries tab.' } },
            { name: 'svIndustriesCta', type: 'text', admin: { description: 'Industries CTA label.' } },
            {
              name: 'svServices',
              type: 'array',
              label: 'Services',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
                {
                  name: 'points',
                  type: 'array',
                  label: 'Points',
                  fields: [{ name: 'point', type: 'text', required: true }],
                },
                { name: 'bestFor', type: 'textarea', admin: { description: 'Optional "Best for" line.' } },
              ],
            },
            {
              name: 'svIndustries',
              type: 'array',
              label: 'Industries',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
                {
                  name: 'points',
                  type: 'array',
                  label: 'Points',
                  fields: [{ name: 'point', type: 'text', required: true }],
                },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Applicable standards',
                  fields: [{ name: 'code', type: 'text', required: true }],
                },
              ],
            },
          ],
        },

        /* ------------------------------------------- Standing Apart / How we work */
        {
          label: 'Standing Apart',
          fields: [
            { name: 'saEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "Standing apart".' } },
            { name: 'saHeading', type: 'text', admin: { description: 'Section heading, e.g. "How we work.".' } },
            { name: 'saLead', type: 'richText', admin: { description: 'Lead paragraph.' } },
            { name: 'saMandateKey', type: 'text', admin: { description: 'Mandate key line, e.g. "Human expertise + AI acceleration.".' } },
            { name: 'saMandateTag', type: 'text', admin: { description: 'Mandate tag, e.g. "Our human-in-the-loop mandate".' } },
            { name: 'saColOld', type: 'text', admin: { description: 'Old-way column header.' } },
            { name: 'saColNew', type: 'text', admin: { description: 'CSA-way column header.' } },
            {
              name: 'saRows',
              type: 'array',
              label: 'Comparison rows',
              fields: [
                { name: 'theme', type: 'text', required: true, admin: { description: 'Row theme, e.g. "Speed".' } },
                { name: 'oldTitle', type: 'text', admin: { description: 'Old-way title.' } },
                { name: 'oldDesc', type: 'textarea', admin: { description: 'Old-way description.' } },
                { name: 'newTitle', type: 'text', admin: { description: 'CSA-way title.' } },
                { name: 'newDesc', type: 'textarea', admin: { description: 'CSA-way description.' } },
              ],
            },
            { name: 'saNeverLabel', type: 'text', admin: { description: 'Label, e.g. "Where we never rely on AI".' } },
            {
              name: 'saNeverItems',
              type: 'array',
              label: 'Never-rely-on-AI badges',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'saNeverNote', type: 'text', admin: { description: 'Closing note under the badges.' } },
          ],
        },

        /* ------------------------------------------------------- About / Founder */
        {
          label: 'About',
          fields: [
            { name: 'abEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "About CSA".' } },
            { name: 'abHeading', type: 'text', admin: { description: 'Section heading, e.g. "Meet the founder.".' } },
            { name: 'abName', type: 'text', admin: { description: 'Founder name.' } },
            { name: 'abRole', type: 'text', admin: { description: 'Founder role.' } },
            { name: 'abLocation', type: 'text', admin: { description: 'Founder location.' } },
            { name: 'abCallout', type: 'text', admin: { description: 'Portrait callout chip, e.g. "Principal-led".' } },
            {
              name: 'abCerts',
              type: 'array',
              label: 'Certification chips',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'sub', type: 'text' },
              ],
            },
            { name: 'abBio', type: 'richText', admin: { description: 'Founder biography.' } },
            { name: 'abExperienceLabel', type: 'text', admin: { description: 'Experience-tags label.' } },
            {
              name: 'abExperience',
              type: 'array',
              label: 'Experience tags',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'abFieldLabel', type: 'text', admin: { description: 'Active-in-the-field label.' } },
            { name: 'abFieldNote', type: 'textarea', admin: { description: 'Active-in-the-field note.' } },
            {
              name: 'abConferences',
              type: 'array',
              label: 'Conferences',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'abCtaLabel', type: 'text', admin: { description: 'CTA label, e.g. "Meet the Team".' } },
          ],
        },

        /* ----------------------------------------------------- News / Insights */
        {
          label: 'News',
          fields: [
            { name: 'nwEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "Insights".' } },
            { name: 'nwHeading', type: 'text', admin: { description: 'Section heading, e.g. "Latest news.".' } },
            { name: 'nwLead', type: 'textarea', admin: { description: 'Lead paragraph.' } },
            { name: 'nwCtaLabel', type: 'text', admin: { description: 'CTA label, e.g. "Visit the Resource Center".' } },
            {
              name: 'nwArticles',
              type: 'array',
              label: 'Featured articles',
              admin: { description: 'The three most-recent posts surfaced on the home page.' },
              fields: [
                { name: 'category', type: 'text', admin: { description: 'Article category.' } },
                { name: 'date', type: 'text', admin: { description: 'Display date, e.g. "Jun 2026".' } },
                { name: 'title', type: 'text', required: true, admin: { description: 'Article headline.' } },
              ],
            },
          ],
        },

        /* ----------------------------------------------------------- Closing CTA */
        {
          label: 'Closing CTA',
          fields: [
            { name: 'ctaEyebrow', type: 'text', admin: { description: 'Eyebrow, e.g. "Ready when you are.".' } },
            { name: 'ctaHeading', type: 'text', admin: { description: 'Closing headline.' } },
            { name: 'ctaSub', type: 'textarea', admin: { description: 'Closing supporting line.' } },
            { name: 'ctaPrimary', type: 'text', admin: { description: 'Primary CTA label.' } },
            { name: 'ctaSecondary', type: 'text', admin: { description: 'Secondary CTA label.' } },
            { name: 'ctaBlurb', type: 'textarea', admin: { description: 'Footer brand blurb.' } },
          ],
        },

        /* ------------------------------------------------------------------ SEO */
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}
