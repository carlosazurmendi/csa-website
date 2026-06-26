import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Consulting — nav page-collection.
 *
 * Each ROW is a sub-page of the Consulting nav section. Nine rows in nav order:
 * Overview, Rail, Robotics, Machinery, Physical AI, Construction & Mining Equipment,
 * Automotive, Defense, Process.
 *
 * Two layouts share one schema:
 *   • The 8 INDUSTRY pages use the locked industry-page template
 *     (Hero w/ HUD scope · Capabilities · Primary Standards · optional Feature
 *     [hands-on experience OR case study] · Closing CTA).
 *   • OVERVIEW has its own layout (Hero w/ lifecycle HUD · Quick facts · About ·
 *     three engagement options · contract-engineering capabilities · the 8-industry
 *     grid · common questions · Closing CTA).
 *
 * Tabs cover BOTH layouts; each row fills only the tabs its page uses. Field names
 * are section-prefixed to avoid collisions, and the tabs are UNNAMED so every field
 * flattens into the `cons` table (keeps Postgres identifiers short).
 */
export const Consulting: CollectionConfig = {
  slug: 'consulting',
  dbName: 'cons',
  labels: {
    singular: 'Consulting Page',
    plural: 'Consulting Pages',
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
    group: 'Consulting',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    description:
      'Sub-pages of the Consulting nav section — the Overview plus the eight industry pages.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Page title, e.g. "Rail" or "Overview".' },
    },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Nav order within the Consulting section (lower = earlier).',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional nav-label override. Defaults to the title.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        /* ---------- Hero (shared) ---------- */
        {
          label: 'Hero',
          description:
            'Top of every page. Industry pages render the HUD scope panel; the Overview renders its lifecycle HUD.',
          fields: [
            {
              name: 'heroIcon',
              type: 'text',
              admin: { description: 'Lucide icon name, e.g. "train-front", "bot".' },
            },
            {
              name: 'heroEyebrow',
              type: 'text',
              admin: { description: 'Small label above the headline, e.g. "Functional Safety · Rail".' },
            },
            {
              name: 'heroHeadline',
              type: 'text',
              required: true,
              admin: { description: 'Main hero headline (h1).' },
            },
            {
              name: 'heroGhost',
              type: 'text',
              admin: { description: 'Oversized faded watermark word behind the hero, e.g. "Rail".' },
            },
            {
              name: 'heroTagline',
              type: 'textarea',
              admin: { description: 'Lead sentence under the headline.' },
            },
            {
              name: 'heroIntro',
              type: 'richText',
              admin: { description: 'Longer intro paragraph beneath the tagline (industry pages).' },
            },
            {
              name: 'heroStandards',
              type: 'array',
              labels: { singular: 'Standard', plural: 'Standards' },
              admin: { description: 'Standard codes ticked under the hero copy.' },
              fields: [{ name: 'code', type: 'text', required: true }],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroCtaLabel',
                  type: 'text',
                  admin: { width: '50%', description: 'Primary hero button label.' },
                },
                {
                  name: 'heroCtaHref',
                  type: 'text',
                  admin: { width: '50%', description: 'Primary hero button target, e.g. "Book a Consultation".' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroScopeLabel',
                  type: 'text',
                  admin: { width: '33%', description: 'HUD top-left tag, e.g. "Engagement scope".' },
                },
                {
                  name: 'heroScopeBadge',
                  type: 'text',
                  admin: { width: '33%', description: 'HUD badge, e.g. "Independent assessor".' },
                },
                {
                  name: 'heroScopeFoot',
                  type: 'text',
                  admin: { width: '34%', description: 'HUD footer line after "Principal-led".' },
                },
              ],
            },
            {
              name: 'heroLifecycle',
              type: 'array',
              labels: { singular: 'Lifecycle step', plural: 'Lifecycle steps' },
              admin: {
                description: 'Overview-only: the numbered concept→certification steps in the hero HUD.',
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- Capabilities (shared) ---------- */
        {
          label: 'Capabilities',
          description:
            'The "what we deliver" / contract-engineering capability grid. Used by every page.',
          fields: [
            {
              name: 'capsEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow, e.g. "Core Deliverables & Project Support".' },
            },
            {
              name: 'capsHeading',
              type: 'text',
              admin: { description: 'Section heading.' },
            },
            {
              name: 'capsLead',
              type: 'textarea',
              admin: { description: 'Section lead paragraph.' },
            },
            {
              name: 'capsItems',
              type: 'array',
              labels: { singular: 'Capability', plural: 'Capabilities' },
              admin: { description: 'Capability cards.' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'code', type: 'text', admin: { description: 'Short standards/method code, e.g. "HARA", "FMEA".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- Primary Standards (industry pages) ---------- */
        {
          label: 'Standards',
          description: 'Industry pages only: the "Primary Standards We Navigate" grid.',
          fields: [
            {
              name: 'stdEyebrow',
              type: 'text',
              admin: { description: 'Section eyebrow, e.g. "Primary Standards We Navigate".' },
            },
            {
              name: 'stdHeading',
              type: 'text',
              admin: { description: 'Section heading, e.g. "The rail safety framework.".' },
            },
            {
              name: 'stdLead',
              type: 'textarea',
              admin: { description: 'Section lead paragraph.' },
            },
            {
              name: 'stdItems',
              type: 'array',
              labels: { singular: 'Standard', plural: 'Standards' },
              admin: { description: 'Standard cards (numbered STD 01, STD 02…).' },
              fields: [
                { name: 'code', type: 'text', required: true, admin: { description: 'Standard code, e.g. "EN 50126".' } },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- Feature (industry pages, optional) ---------- */
        {
          label: 'Feature',
          description:
            'Industry pages only, optional. Either a hands-on experience list OR a case-study highlight.',
          fields: [
            {
              name: 'featKind',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Hands-on experience', value: 'experience' },
                { label: 'Case study', value: 'caseStudy' },
              ],
              defaultValue: 'none',
              admin: { description: 'Which feature block this page renders (if any).' },
            },
            {
              name: 'featEyebrow',
              type: 'text',
              admin: { description: 'Feature section eyebrow.' },
            },
            {
              name: 'featHeading',
              type: 'text',
              admin: { description: 'Feature section heading.' },
            },
            {
              name: 'featNote',
              type: 'textarea',
              admin: { description: 'Experience variant: intro note under the heading.' },
            },
            {
              name: 'featItems',
              type: 'array',
              labels: { singular: 'Experience item', plural: 'Experience items' },
              admin: { description: 'Experience variant: numbered project-experience rows.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
            {
              name: 'featTag',
              type: 'text',
              admin: { description: 'Case-study variant: small badge label, e.g. "Case study".' },
            },
            {
              name: 'featHeadline',
              type: 'text',
              admin: { description: 'Case-study variant: the highlight headline.' },
            },
            {
              name: 'featBody',
              type: 'textarea',
              admin: { description: 'Case-study variant: the highlight body paragraph.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'featStatValue',
                  type: 'text',
                  admin: { width: '30%', description: 'Case-study variant: big stat figure, e.g. "1st".' },
                },
                {
                  name: 'featStatLabel',
                  type: 'text',
                  admin: { width: '70%', description: 'Case-study variant: stat caption.' },
                },
              ],
            },
          ],
        },

        /* ---------- Quick Facts (Overview) ---------- */
        {
          label: 'Quick Facts',
          description: 'Overview only: the "Quick facts." technical-authority grid.',
          fields: [
            { name: 'factsEyebrow', type: 'text' },
            { name: 'factsHeading', type: 'text' },
            { name: 'factsLead', type: 'textarea' },
            {
              name: 'factsItems',
              type: 'array',
              labels: { singular: 'Fact', plural: 'Facts' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'kicker', type: 'text', admin: { description: 'Small label, e.g. "Established 2023".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- About (Overview) ---------- */
        {
          label: 'About',
          description: 'Overview only: the "About CSA" prose block, quote, and credentials panel.',
          fields: [
            { name: 'aboutEyebrow', type: 'text' },
            { name: 'aboutHeading', type: 'text' },
            {
              name: 'aboutBody',
              type: 'richText',
              admin: { description: 'About prose paragraph.' },
            },
            {
              name: 'aboutQuote',
              type: 'textarea',
              admin: { description: 'Pull-quote under the prose.' },
            },
            {
              name: 'aboutCredsLabel',
              type: 'text',
              admin: { description: 'Credentials panel label, e.g. "Why our validation holds".' },
            },
            {
              name: 'aboutCreds',
              type: 'array',
              labels: { singular: 'Credential', plural: 'Credentials' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- Engagement Options (Overview) ---------- */
        {
          label: 'Engagement Options',
          description: 'Overview only: the "Three ways to work with us." consulting frameworks.',
          fields: [
            { name: 'optsEyebrow', type: 'text' },
            { name: 'optsHeading', type: 'text' },
            { name: 'optsLead', type: 'textarea' },
            {
              name: 'optsItems',
              type: 'array',
              labels: { singular: 'Option', plural: 'Options' },
              fields: [
                { name: 'num', type: 'text', admin: { description: 'Option label, e.g. "Option 01".' } },
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
                { name: 'best', type: 'text', admin: { description: '"Best for" caption.' } },
              ],
            },
          ],
        },

        /* ---------- Industries Grid (Overview) ---------- */
        {
          label: 'Industries Grid',
          description: 'Overview only: the "Tailored to your sector." 8-industry link grid.',
          fields: [
            { name: 'indEyebrow', type: 'text' },
            { name: 'indHeading', type: 'text' },
            { name: 'indLead', type: 'textarea' },
            {
              name: 'indItems',
              type: 'array',
              labels: { singular: 'Industry', plural: 'Industries' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'standards', type: 'text', admin: { description: 'Standards caption, e.g. "EN 50126/8/9".' } },
                { name: 'href', type: 'text', admin: { description: 'Target page, e.g. "Consulting/Rail".' } },
              ],
            },
          ],
        },

        /* ---------- Questions (Overview) ---------- */
        {
          label: 'Questions',
          description: 'Overview only: the "What teams ask first." FAQ accordion.',
          fields: [
            { name: 'faqEyebrow', type: 'text' },
            { name: 'faqHeading', type: 'text' },
            {
              name: 'faqItems',
              type: 'array',
              labels: { singular: 'Question', plural: 'Questions' },
              fields: [
                { name: 'q', type: 'text', required: true },
                { name: 'a', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------- Closing CTA (shared) ---------- */
        {
          label: 'Closing CTA',
          description: 'The bottom call-to-action band on every page.',
          fields: [
            { name: 'ctaEyebrow', type: 'text' },
            { name: 'ctaHeading', type: 'text' },
            { name: 'ctaSub', type: 'textarea' },
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaLabel',
                  type: 'text',
                  admin: { width: '50%', description: 'CTA button label.' },
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  admin: { width: '50%', description: 'CTA button target, e.g. "Book a Consultation".' },
                },
              ],
            },
          ],
        },

        /* ---------- SEO (must be last) ---------- */
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}
