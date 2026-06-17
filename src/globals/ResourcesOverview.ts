import type { GlobalConfig } from 'payload'

/**
 * All unique copy for the Resources hub page (Resources/Overview.html). The
 * page links out to the interactive tools (Standards Identifier, Safety Chat)
 * and the knowledge-library listing pages (Downloads, Articles, Events, Free
 * Trainings). The library/tool CARDS' destinations are fixed routes, so the
 * editable copy here is the hero, the two section headings, the per-card
 * title/description/icon, and the closing CTA.
 *
 * Registered in payload.config.ts under slug: 'resourcesOverview'. The seo
 * plugin adds a `meta` group (meta.title / meta.description) consumed by
 * generateMetadata.
 */
export const ResourcesOverview: GlobalConfig = {
  slug: 'resourcesOverview',
  label: 'Resources Overview',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------------- HERO
        {
          label: 'Hero',
          fields: [
            {
              type: 'group',
              name: 'hero',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Functional Safety Resources' },
                { name: 'eyebrowIcon', type: 'text', defaultValue: 'library-big' },
                { name: 'ghost', type: 'text', defaultValue: 'Resources', admin: { description: 'Large background watermark word.' } },
                { name: 'title', type: 'text', defaultValue: 'Tools and knowledge for the safety lifecycle.' },
                { name: 'sub', type: 'textarea' },
                {
                  name: 'jump',
                  type: 'array',
                  label: 'Jump links',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'label', type: 'text', required: true },
                        { name: 'href', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------------------- TOOLS
        {
          label: 'AI Tools',
          fields: [
            {
              type: 'group',
              name: 'tools',
              label: 'AI Tools section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'AI-Augmented Tools' },
                { name: 'title', type: 'text', defaultValue: 'Start with a tool.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Tool cards',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'tag', type: 'text', required: true, defaultValue: 'AI Tool' },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------- LIBRARY
        {
          label: 'Knowledge Library',
          fields: [
            {
              type: 'group',
              name: 'library',
              label: 'Knowledge Library section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Knowledge Library' },
                { name: 'title', type: 'text', defaultValue: 'Go deeper.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Library cards',
                  fields: [
                    { name: 'icon', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------- CLOSING
        {
          label: 'Closing CTA',
          fields: [
            {
              type: 'group',
              name: 'closing',
              label: 'Closing CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Beyond the tools' },
                { name: 'title', type: 'text', defaultValue: 'Need an expert in the room?' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', defaultValue: 'Book a Consultation' },
                    { name: 'ctaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
