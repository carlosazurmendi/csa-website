import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Company — one row per sub-page of the Company nav section
 * (Overview, Experience, Services, Careers). Each row is a structured,
 * section-by-section copy document; the front-end composes the page from
 * whichever tabs that row fills.
 *
 * Unnamed tabs flatten their fields into the collection table to keep the
 * Postgres identifiers short (dbName 'comp'). Field names are prefixed by
 * section (hero*, mission*, phil*, val*, iso*, caps*, case*, metric*, eng*,
 * svc*, why*, role*, close*) to avoid collisions across tabs.
 *
 * Services content is folded into the Services row here (no separate services
 * collection): the four high-level service categories live in `svcCategories`
 * and the four engagement models in `engModels`.
 */
export const Company: CollectionConfig = {
  slug: 'company',
  dbName: 'comp',
  labels: {
    singular: 'Company Page',
    plural: 'Company Pages',
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
    group: 'Company',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    description:
      'Sub-pages of the Company nav section: Overview, Experience, Services, Careers. One row each.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Page title, e.g. "Overview", "Experience", "Services", "Careers".' },
    },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Sort order within the Company nav section (1 = first).',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional nav label override. Falls back to the title when empty.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        /* ---------------------------------------------------------------
           HERO — shared by every Company sub-page
           --------------------------------------------------------------- */
        {
          label: 'Hero',
          description: 'Top-of-page hero, shared by every Company sub-page.',
          fields: [
            {
              name: 'heroGhost',
              type: 'text',
              admin: { description: 'Oversized ghost watermark word behind the hero, e.g. "CSA".' },
            },
            {
              name: 'heroIcon',
              type: 'text',
              admin: { description: 'Lucide icon name for the eyebrow, e.g. "compass".' },
            },
            {
              name: 'heroEyebrow',
              type: 'text',
              admin: { description: 'Small label above the headline, e.g. "About CSA".' },
            },
            {
              name: 'heroTitle',
              type: 'text',
              admin: { description: 'Hero headline.' },
            },
            {
              name: 'heroTagline',
              type: 'textarea',
              admin: { description: 'Lead sentence under the headline.' },
            },
            {
              name: 'heroIntro',
              type: 'textarea',
              admin: { description: 'Optional secondary paragraph under the tagline.' },
            },
            {
              name: 'heroStandards',
              type: 'array',
              label: 'Hero standards',
              admin: { description: 'Standards codes shown as a row under the hero, e.g. "IEC 61508".' },
              fields: [{ name: 'code', type: 'text', required: true }],
            },
            {
              name: 'heroActions',
              type: 'array',
              label: 'Hero buttons',
              admin: { description: 'Call-to-action buttons in the hero, in order.' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', admin: { description: 'Link target, e.g. "Company/Experience.html".' } },
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'gold',
                  options: [
                    { label: 'Gold pill (primary)', value: 'gold' },
                    { label: 'Silver pill (secondary)', value: 'silver' },
                    { label: 'Text link', value: 'link' },
                  ],
                },
              ],
            },
            /* HUD side panel */
            {
              name: 'hudTag',
              type: 'text',
              admin: { description: 'HUD panel top-left tag, e.g. "Operating principle".' },
            },
            {
              name: 'hudBadge',
              type: 'text',
              admin: { description: 'HUD panel status badge, e.g. "Technical objectivity".' },
            },
            {
              name: 'hudFoot',
              type: 'text',
              admin: { description: 'HUD footer text (follows the "Principal-led ·" prefix).' },
            },
            {
              name: 'hudRows',
              type: 'array',
              label: 'HUD rows',
              admin: { description: 'Bullet rows inside the hero HUD side panel.' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           MISSION — Overview only
           --------------------------------------------------------------- */
        {
          label: 'Mission',
          description: 'Mission statement (Overview page).',
          fields: [
            { name: 'missionNum', type: 'text', admin: { description: 'Section number label, e.g. "01 — Mission".' } },
            { name: 'missionEyebrow', type: 'text' },
            { name: 'missionTitle', type: 'text', admin: { description: 'Mission heading.' } },
            { name: 'missionBody', type: 'richText', admin: { description: 'Mission prose.' } },
          ],
        },

        /* ---------------------------------------------------------------
           PHILOSOPHY — Overview only
           --------------------------------------------------------------- */
        {
          label: 'Philosophy',
          description: 'The CSA philosophy + professional boundary (Overview page).',
          fields: [
            { name: 'philNum', type: 'text', admin: { description: 'Section number label, e.g. "02 — Philosophy".' } },
            { name: 'philEyebrow', type: 'text' },
            { name: 'philTitle', type: 'text', admin: { description: 'Philosophy heading.' } },
            { name: 'philBody', type: 'richText', admin: { description: 'Philosophy prose.' } },
            { name: 'philBoundaryTitle', type: 'text', admin: { description: 'Professional-boundary callout title.' } },
            { name: 'philBoundaryBody', type: 'richText', admin: { description: 'Professional-boundary callout body.' } },
          ],
        },

        /* ---------------------------------------------------------------
           VALUES — Overview only
           --------------------------------------------------------------- */
        {
          label: 'Values',
          description: 'Core values grid (Overview page).',
          fields: [
            { name: 'valEyebrow', type: 'text' },
            { name: 'valTitle', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'valLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'valItems',
              type: 'array',
              label: 'Value items',
              admin: { description: 'The core-value cards, in order.' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           QUALITY / ISO — Overview only
           --------------------------------------------------------------- */
        {
          label: 'Quality',
          description: 'ISO 9001 intent / quality-management panel (Overview page).',
          fields: [
            { name: 'isoEyebrow', type: 'text', admin: { description: 'Panel eyebrow, e.g. "Quality management".' } },
            { name: 'isoBody', type: 'richText', admin: { description: 'Quality-management panel body.' } },
          ],
        },

        /* ---------------------------------------------------------------
           CAPABILITIES — Experience & Careers (shared "cap grid" layout)
           --------------------------------------------------------------- */
        {
          label: 'Capabilities',
          description:
            'Capability / "why" cards grid. Experience uses it for sectors delivered; Careers uses it for reasons to join.',
          fields: [
            { name: 'capsEyebrow', type: 'text' },
            { name: 'capsTitle', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'capsLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'capsItems',
              type: 'array',
              label: 'Capability cards',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'code', type: 'text', admin: { description: 'Small code label above the title.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           CASE STUDIES — Experience only (framing copy)
           --------------------------------------------------------------- */
        {
          label: 'Case Studies',
          description: 'Case-study framing copy (Experience page). Problem/solution per study.',
          fields: [
            { name: 'caseEyebrow', type: 'text' },
            { name: 'caseTitle', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'caseLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'caseItems',
              type: 'array',
              label: 'Case studies',
              fields: [
                { name: 'tag', type: 'text', admin: { description: 'Sector / standard tag, e.g. "Robotics · IEC 61508".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'problem', type: 'textarea', required: true },
                { name: 'solution', type: 'textarea', required: true },
                {
                  name: 'caseStudy',
                  type: 'relationship',
                  relationTo: 'case-studies',
                  admin: {
                    description:
                      'Full case study this summary links to (the "Read the full case study" button). If empty, the button falls back to a title match, then the /case-studies listing.',
                  },
                },
              ],
            },
            { name: 'caseNote', type: 'textarea', admin: { description: 'Footnote under the case list, e.g. "More case studies on the way."' } },
          ],
        },

        /* ---------------------------------------------------------------
           SERVICE CATEGORIES — Services only (high-level offerings)
           --------------------------------------------------------------- */
        {
          label: 'Service Categories',
          description:
            'High-level service offerings (Engineering / Consulting / Auditing / Training) folded into the Services page.',
          fields: [
            { name: 'svcEyebrow', type: 'text' },
            { name: 'svcTitle', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'svcLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'svcCategories',
              type: 'array',
              label: 'Service offerings',
              admin: { description: 'The headline service categories CSA provides.' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'points',
                  type: 'array',
                  label: 'Points',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                { name: 'bestFor', type: 'textarea', admin: { description: 'Optional "Best for" line.' } },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           ENGAGEMENT MODELS — Services only
           --------------------------------------------------------------- */
        {
          label: 'Engagement Models',
          description: 'The flexible engagement models (Services page).',
          fields: [
            { name: 'engEyebrow', type: 'text' },
            { name: 'engTitle', type: 'text', admin: { description: 'Section heading.' } },
            { name: 'engLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'engModels',
              type: 'array',
              label: 'Engagement models',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Lucide icon name.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'bestFor', type: 'textarea', admin: { description: '"Best for" line.' } },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           OPENINGS — Careers only (intro + role cards)
           --------------------------------------------------------------- */
        {
          label: 'Openings',
          description: 'Open-positions intro and illustrative role cards (Careers page).',
          fields: [
            { name: 'roleEyebrow', type: 'text' },
            { name: 'roleTitle', type: 'text', admin: { description: 'Section heading, e.g. "Find your role.".' } },
            { name: 'roleLead', type: 'textarea', admin: { description: 'Section lead sentence.' } },
            {
              name: 'roleItems',
              type: 'array',
              label: 'Roles',
              admin: { description: 'Illustrative open-role cards (live roles populate from the hiring system).' },
              fields: [
                { name: 'dept', type: 'text', admin: { description: 'Department chip, e.g. "Robotics".' } },
                { name: 'loc', type: 'text', admin: { description: 'Location chip.' } },
                { name: 'type', type: 'text', admin: { description: 'Employment type, e.g. "Full-time".' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            { name: 'roleNote', type: 'textarea', admin: { description: 'Footnote under the roles list.' } },
          ],
        },

        /* ---------------------------------------------------------------
           CLOSING CTA — shared by every Company sub-page
           --------------------------------------------------------------- */
        {
          label: 'Closing CTA',
          description: 'Bottom-of-page call-to-action band, shared by every Company sub-page.',
          fields: [
            { name: 'closeEyebrow', type: 'text' },
            { name: 'closeTitle', type: 'text', admin: { description: 'Closing heading.' } },
            { name: 'closeSub', type: 'textarea', admin: { description: 'Closing sub-sentence.' } },
            {
              name: 'closeActions',
              type: 'array',
              label: 'Closing buttons',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text' },
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'gold',
                  options: [
                    { label: 'Gold pill (primary)', value: 'gold' },
                    { label: 'Silver pill (secondary)', value: 'silver' },
                    { label: 'Text link', value: 'link' },
                  ],
                },
              ],
            },
          ],
        },

        /* ---------------------------------------------------------------
           SEO — must be last
           --------------------------------------------------------------- */
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}
