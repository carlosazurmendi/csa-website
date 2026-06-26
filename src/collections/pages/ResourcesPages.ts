import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Resources — the seven landing sub-pages of the Resources nav section:
 * Overview, Standards Identifier, Safety Chat, Downloadable Resources, Articles,
 * Events & Webinars, and Free Trainings.
 *
 * Each row is one sub-page. The actual articles / downloads / events / free
 * trainings live in their own content collections (the listing pages render
 * those); this collection holds only the LANDING copy for each sub-page —
 * heroes, intro bands, the AI-tool intros + disclaimers, framework lists, the
 * "how it works" steps, the listing filter/empty copy, the featured-events band,
 * and the closing CTAs.
 *
 * The sub-pages share one schema (a single tabs field, one unnamed tab per
 * section) so the section fields flatten into the collection table; each row
 * fills only the tabs its layout uses.
 */
export const ResourcesPages: CollectionConfig = {
  slug: 'resources',
  dbName: 'res',
  labels: {
    singular: 'Resources Page',
    plural: 'Resources Pages',
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
    group: 'Resources',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    description:
      'Landing pages for the Resources nav section (Overview, AI tools, and the four library listings).',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Sub-page title, e.g. "Standards Identifier".' },
    },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Position of this page within the Resources nav (ascending).',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional nav-label override. Falls back to the title when empty.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        /* ---------------- Hero ---------------- */
        {
          label: 'Hero',
          description: 'Top-of-page hero. Used by every sub-page.',
          fields: [
            { name: 'heroEyebrow', type: 'text', admin: { description: 'Small label above the headline.' } },
            { name: 'heroEyebrowIcon', type: 'text', admin: { description: 'Lucide icon name for the eyebrow, e.g. "library-big".' } },
            { name: 'heroGhost', type: 'text', admin: { description: 'Large faint ghost word behind the hero, e.g. "Resources".' } },
            { name: 'heroHeadline', type: 'text', admin: { description: 'Main hero H1.' } },
            { name: 'heroSub', type: 'textarea', admin: { description: 'Hero lead / supporting paragraph.' } },
            {
              name: 'heroSub2',
              type: 'textarea',
              admin: { description: 'Optional second hero paragraph (Standards Identifier uses two).' },
            },
            {
              name: 'heroNote',
              type: 'textarea',
              admin: {
                description:
                  'Optional inline disclaimer note shown in the hero (e.g. Safety Chat’s "AI-augmented, supplement not replace" note).',
              },
            },
            {
              name: 'heroJumpLinks',
              type: 'array',
              label: 'Hero jump links',
              admin: { description: 'In-page anchor chips (Overview hero uses these).' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'anchor', type: 'text', admin: { description: 'Target anchor or href, e.g. "#tools".' } },
              ],
            },
            {
              name: 'heroCtaLabel',
              type: 'text',
              admin: { description: 'Primary hero button label (listing / tool pages).' },
            },
            {
              name: 'heroCtaHref',
              type: 'text',
              admin: { description: 'Primary hero button target, e.g. "#library" or "#tool".' },
            },
            {
              name: 'heroSecondaryLabel',
              type: 'text',
              admin: { description: 'Secondary hero link label, e.g. "Talk to an Engineer".' },
            },
          ],
        },

        /* ---------------- AI Tools band (Overview) ---------------- */
        {
          label: 'AI Tools Band',
          description: 'Overview-only band introducing the two embedded AI tools.',
          fields: [
            { name: 'toolsEyebrow', type: 'text' },
            { name: 'toolsHeading', type: 'text' },
            { name: 'toolsLead', type: 'textarea' },
            {
              name: 'toolsItems',
              type: 'array',
              label: 'Tool cards',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'tag', type: 'text', admin: { description: 'Card tag, e.g. "AI Tool".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------------- Knowledge Library band (Overview) ---------------- */
        {
          label: 'Library Band',
          description: 'Overview-only band linking the four knowledge-library pages.',
          fields: [
            { name: 'libEyebrow', type: 'text' },
            { name: 'libHeading', type: 'text' },
            { name: 'libLead', type: 'textarea' },
            {
              name: 'libItems',
              type: 'array',
              label: 'Library cards',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------------- Identifier tool intro (Standards Identifier) ---------------- */
        {
          label: 'Identifier Tool',
          description:
            'Standards Identifier tool shell intro: tool name, the AI-augmented disclaimer, and the CTA.',
          fields: [
            {
              name: 'toolName',
              type: 'text',
              admin: { description: 'Embedded tool display name, e.g. "AI Standards Identifier".' },
            },
            {
              name: 'toolSub',
              type: 'text',
              admin: { description: 'Tool sub-line, e.g. "Industry · Mobility · Environment".' },
            },
            {
              name: 'toolBadge',
              type: 'text',
              admin: { description: 'Tool shell badge, e.g. "UI Preview".' },
            },
            {
              name: 'toolCtaLabel',
              type: 'text',
              admin: { description: 'Main tool button label, e.g. "Identify My Standards".' },
            },
            {
              name: 'toolNote',
              type: 'textarea',
              admin: {
                description:
                  'AI-augmented disclaimer / preview note, e.g. "Interactive preview — full AI mapping connects at launch."',
              },
            },
            {
              name: 'toolResultLabel',
              type: 'text',
              admin: { description: 'Result panel label, e.g. "Compliance roadmap".' },
            },
            {
              name: 'toolResultVeil',
              type: 'textarea',
              admin: { description: 'Veil copy over the sample roadmap explaining the live engine.' },
            },
          ],
        },

        /* ---------------- Frameworks (Standards Identifier) ---------------- */
        {
          label: 'Frameworks',
          description: 'Standards Identifier: primary regulatory frameworks covered by the audits.',
          fields: [
            { name: 'fwEyebrow', type: 'text' },
            { name: 'fwHeading', type: 'text' },
            { name: 'fwLead', type: 'textarea' },
            {
              name: 'fwItems',
              type: 'array',
              label: 'Framework groups',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                {
                  name: 'codes',
                  type: 'array',
                  label: 'Standard codes',
                  fields: [{ name: 'code', type: 'text', required: true }],
                },
              ],
            },
          ],
        },

        /* ---------------- How it works (Standards Identifier) ---------------- */
        {
          label: 'How It Works',
          description: 'Standards Identifier: the three-step "parameters to roadmap" explainer.',
          fields: [
            { name: 'howEyebrow', type: 'text' },
            { name: 'howHeading', type: 'text' },
            {
              name: 'howSteps',
              type: 'array',
              label: 'Steps',
              fields: [
                { name: 'num', type: 'text', admin: { description: 'Step number label, e.g. "1".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------------- Listing (Downloads / Articles / Events / Free Trainings) ---------------- */
        {
          label: 'Listing',
          description:
            'Filter bar + placeholder cards + empty-state copy for the four library listing pages.',
          fields: [
            {
              name: 'listFilters',
              type: 'array',
              label: 'Filter chips',
              admin: { description: 'Filter labels, first is the default "All".' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'listEmptyTitle', type: 'text', admin: { description: 'Empty-state heading.' } },
            { name: 'listEmptyText', type: 'textarea', admin: { description: 'Empty-state body copy.' } },
            {
              name: 'listCards',
              type: 'array',
              label: 'Placeholder cards',
              admin: {
                description:
                  'Seeded placeholder cards shown until real content collections populate the listing.',
              },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'cat', type: 'text', admin: { description: 'Category / filter this card belongs to.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
                { name: 'meta', type: 'text', admin: { description: 'Meta line, e.g. "PDF · Checklist".' } },
                { name: 'metaIcon', type: 'text', admin: { description: 'Lucide icon name for the meta line.' } },
                { name: 'ctaLabel', type: 'text', admin: { description: 'Card CTA, e.g. "Download", "Coming soon".' } },
                { name: 'soon', type: 'checkbox', admin: { description: 'Mark as a coming-soon placeholder card.' } },
              ],
            },
          ],
        },

        /* ---------------- Featured band (Events & Webinars) ---------------- */
        {
          label: 'Featured Band',
          description: 'Events & Webinars: the "where you’ll find us each year" annual-appearances band.',
          fields: [
            { name: 'featEyebrow', type: 'text' },
            { name: 'featHeading', type: 'text' },
            { name: 'featLead', type: 'textarea' },
            {
              name: 'featItems',
              type: 'array',
              label: 'Featured appearances',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
          ],
        },

        /* ---------------- Closing CTA ---------------- */
        {
          label: 'Closing CTA',
          description: 'Bottom-of-page call-to-action band. Used by every sub-page.',
          fields: [
            { name: 'closeEyebrow', type: 'text' },
            { name: 'closeHeading', type: 'text' },
            { name: 'closeSub', type: 'textarea' },
            { name: 'closeCtaLabel', type: 'text' },
            { name: 'closeCtaHref', type: 'text', admin: { description: 'CTA target, e.g. a consultation page or "#tool".' } },
          ],
        },

        /* ---------------- SEO ---------------- */
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}
