import type { GlobalConfig } from 'payload'

/**
 * Copy for the interactive Standards Identifier tool page
 * (Resources/Standards Identifier.html). Phase 1 ships the tool area as a
 * STATIC UI SHELL — the selector chips toggle visually but no standards-mapping
 * logic is wired, and the "Identify My Standards" action is disabled. This
 * global holds the hero copy, the tool-shell labels/options, the sample
 * roadmap, the regulatory-framework grid, the how-it-works steps, and the
 * closing CTA.
 *
 * Registered in payload.config.ts under slug: 'standardsIdentifierPage'. The
 * seo plugin adds a `meta` group (meta.title / meta.description) consumed by
 * generateMetadata.
 */
export const StandardsIdentifierPage: GlobalConfig = {
  slug: 'standardsIdentifierPage',
  label: 'Standards Identifier Page',
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Standards Identifier' },
                { name: 'eyebrowIcon', type: 'text', defaultValue: 'crosshair' },
                { name: 'ghost', type: 'text', defaultValue: 'Standards', admin: { description: 'Large background watermark word.' } },
                { name: 'title', type: 'text', defaultValue: 'Which safety standard applies to your project?' },
                { name: 'sub1', type: 'textarea', label: 'Sub paragraph 1' },
                { name: 'sub2', type: 'textarea', label: 'Sub paragraph 2' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Try the Standards Identifier' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#tool' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Talk to an Engineer' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
        // ----------------------------------------------------------- TOOL SHELL
        {
          label: 'Tool Shell',
          fields: [
            {
              type: 'group',
              name: 'tool',
              label: 'Tool shell (static UI preview)',
              admin: { description: 'Phase 1: visual selection only — no live AI mapping.' },
              fields: [
                { name: 'name', type: 'text', defaultValue: 'AI Standards Identifier' },
                { name: 'sub', type: 'text', defaultValue: 'Industry · Mobility · Environment' },
                { name: 'badge', type: 'text', defaultValue: 'UI Preview' },
                {
                  name: 'selectors',
                  type: 'array',
                  label: 'Selector fields',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'step', type: 'text', required: true, admin: { description: 'e.g. "01".' } },
                        { name: 'label', type: 'text', required: true },
                      ],
                    },
                    {
                      name: 'options',
                      type: 'array',
                      fields: [{ name: 'label', type: 'text', required: true }],
                    },
                  ],
                },
                { name: 'submitLabel', type: 'text', defaultValue: 'Identify My Standards' },
                { name: 'submitNote', type: 'text', defaultValue: 'Interactive preview — full AI mapping connects at launch.' },
                { name: 'resultLabel', type: 'text', defaultValue: 'Compliance roadmap' },
                { name: 'resultPreviewLabel', type: 'text', defaultValue: 'Sample output' },
                {
                  name: 'roadmap',
                  type: 'array',
                  label: 'Sample roadmap items',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'code', type: 'text', required: true },
                        { name: 'pill', type: 'text', required: true },
                      ],
                    },
                    { name: 'meta', type: 'text', required: true },
                  ],
                },
                { name: 'veilText', type: 'textarea', label: 'Result veil text' },
              ],
            },
          ],
        },
        // ---------------------------------------------------------- FRAMEWORKS
        {
          label: 'Frameworks',
          fields: [
            {
              type: 'group',
              name: 'frameworks',
              label: 'Primary Regulatory Frameworks',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Primary Regulatory Frameworks' },
                { name: 'title', type: 'text', defaultValue: 'Covered by our independent audits.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Framework cards',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'title', type: 'text', required: true },
                      ],
                    },
                    {
                      name: 'codes',
                      type: 'array',
                      fields: [{ name: 'label', type: 'text', required: true }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // -------------------------------------------------------- HOW IT WORKS
        {
          label: 'How It Works',
          fields: [
            {
              type: 'group',
              name: 'howItWorks',
              label: 'How It Works',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'How It Works' },
                { name: 'title', type: 'text', defaultValue: 'From parameters to roadmap in three steps.' },
                {
                  name: 'steps',
                  type: 'array',
                  label: 'Steps',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'number', type: 'text', required: true },
                        { name: 'title', type: 'text', required: true },
                      ],
                    },
                    { name: 'description', type: 'textarea', required: true },
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Isolate your targets' },
                { name: 'title', type: 'text', defaultValue: 'Try the Standards Identifier.' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', defaultValue: 'Try the Standards Identifier' },
                    { name: 'ctaHref', type: 'text', defaultValue: '#tool' },
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
