import type { GlobalConfig } from 'payload'

/**
 * All unique copy for the Training & Templates section, grouped by page and
 * section (Training - Templates/Overview.html, Course Catalog.html, and
 * Purchase Templates.html). Repeatable lists (the "two ways", why-train cards,
 * core offerings, etc.) are arrays so the client edits content without touching
 * layout. The Course cards come from the `courses` collection and the template
 * products/bundles come from the `templates` collection — this global holds the
 * surrounding page copy, section headings, and editorial blocks only.
 *
 * Registered in payload.config.ts (globals + seo plugin) under
 * slug: 'trainingTemplatesOverview'. The seo plugin adds a `meta` group
 * (meta.title / meta.description) consumed by generateMetadata.
 */
export const TrainingTemplatesOverview: GlobalConfig = {
  slug: 'trainingTemplatesOverview',
  label: 'Training & Templates',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ====================================================== OVERVIEW PAGE
        {
          label: 'Overview Page',
          fields: [
            // ---- Hero ----
            {
              type: 'group',
              name: 'overviewHero',
              label: 'Overview hero',
              fields: [
                { name: 'crumb', type: 'text', defaultValue: 'Overview', admin: { description: 'Breadcrumb current-page label.' } },
                { name: 'ghost', type: 'text', defaultValue: 'TRAIN', admin: { description: 'Large background watermark word.' } },
                { name: 'title', type: 'textarea', admin: { description: 'Supports a line break (\\n) for the two-line display.' } },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Browse Courses' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '/training-templates/courses' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Shop Templates' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/training-templates/templates' },
                  ],
                },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Hero standards ticker',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
              ],
            },
            // ---- Two ways to build internal capability ----
            {
              type: 'group',
              name: 'ways',
              label: 'Two ways to build internal capability',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Build internal capability' },
                { name: 'title', type: 'text', defaultValue: 'Two ways to build internal capability.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Ways',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'num', type: 'text', required: true, admin: { description: 'e.g. "01".' } },
                        { name: 'icon', type: 'text', required: true },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    {
                      name: 'meta',
                      type: 'array',
                      label: 'Meta tags',
                      fields: [{ name: 'label', type: 'text', required: true }],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'ctaLabel', type: 'text', required: true },
                        { name: 'ctaHref', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ================================================ COURSE CATALOG PAGE
        {
          label: 'Course Catalog Page',
          fields: [
            // ---- Hero ----
            {
              type: 'group',
              name: 'coursesHero',
              label: 'Course catalog hero',
              fields: [
                { name: 'crumb', type: 'text', defaultValue: 'Course Catalog' },
                { name: 'ghost', type: 'text', defaultValue: 'COURSES' },
                { name: 'title', type: 'textarea', admin: { description: 'Supports a line break (\\n).' } },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Explore Courses' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#catalog' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Request a Private Course' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
            // ---- Why train with CSA ----
            {
              type: 'group',
              name: 'why',
              label: 'Why train with CSA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Why train with CSA' },
                { name: 'title', type: 'text', defaultValue: 'Training from engineers who certify real systems.' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Reasons',
                  fields: [
                    { name: 'icon', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                },
              ],
            },
            // ---- Filter section heading (cards come from `courses`) ----
            {
              type: 'group',
              name: 'catalog',
              label: 'Catalog section heading',
              admin: { description: 'Course cards come from the Courses collection.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Find your course' },
                { name: 'title', type: 'text', defaultValue: 'Filter courses.' },
                { name: 'lead', type: 'textarea' },
              ],
            },
            // ---- Core educational offerings (editorial) ----
            {
              type: 'group',
              name: 'offerings',
              label: 'Core educational offerings',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Core educational offerings' },
                { name: 'title', type: 'text', defaultValue: 'Three programs that translate standards into practice.' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Offerings',
                  fields: [
                    { name: 'num', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                    {
                      type: 'row',
                      fields: [
                        { name: 'badge', type: 'text', required: true },
                        { name: 'meta', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
            // ---- Request a private course CTA ----
            {
              type: 'group',
              name: 'coursesPrivate',
              label: 'Request a private course CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Private & custom delivery' },
                { name: 'title', type: 'text', defaultValue: 'Request a private course.' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Request a Private Course' },
                    { name: 'primaryHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryLabel', type: 'text', defaultValue: 'Talk to an instructor' },
                    { name: 'secondaryHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
        // ============================================ PURCHASE TEMPLATES PAGE
        {
          label: 'Purchase Templates Page',
          fields: [
            // ---- Hero ----
            {
              type: 'group',
              name: 'templatesHero',
              label: 'Purchase templates hero',
              fields: [
                { name: 'crumb', type: 'text', defaultValue: 'Purchase Templates' },
                { name: 'ghost', type: 'text', defaultValue: 'TEMPLATES' },
                { name: 'title', type: 'textarea', admin: { description: 'Supports a line break (\\n).' } },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Shop All Templates' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#store' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Talk to an Engineer' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Hero standards ticker',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
              ],
            },
            // ---- Featured bundle (right-hand glass panel) ----
            {
              type: 'group',
              name: 'featured',
              label: 'Featured bundle panel',
              fields: [
                { name: 'badge', type: 'text', defaultValue: 'Featured Bundle' },
                { name: 'icon', type: 'text', defaultValue: 'library' },
                { name: 'tag', type: 'text', defaultValue: '17 templates' },
                { name: 'title', type: 'text', defaultValue: 'Full Standards Compliance Suite' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'chips',
                  type: 'array',
                  label: 'Included chips',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                { name: 'priceMeta', type: 'text', defaultValue: '17 templates · best value' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Quick Checkout' },
                    { name: 'secondaryLabel', type: 'text', defaultValue: 'Add to Cart' },
                  ],
                },
              ],
            },
            // ---- Storefront section heading (cards come from `templates`) ----
            {
              type: 'group',
              name: 'store',
              label: 'Storefront section heading',
              admin: { description: 'Template products & bundles come from the Templates collection.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Filter templates' },
                { name: 'title', type: 'text', defaultValue: 'Build your documentation set.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'pricingNote',
                  type: 'textarea',
                  defaultValue:
                    'Pricing to be added. Every template is available as part of a bundle or as an individual document.',
                },
              ],
            },
            // ---- Closing CTA ----
            {
              type: 'group',
              name: 'templatesClosing',
              label: 'Closing CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Shop all templates' },
                { name: 'title', type: 'text', defaultValue: 'Buy as a bundle, or one document at a time.' },
                { name: 'sub', type: 'textarea' },
                {
                  name: 'stats',
                  type: 'array',
                  label: 'Stat line',
                  fields: [
                    { name: 'value', type: 'text', admin: { description: 'Bold figure, e.g. "4". Leave blank for a plain label.' } },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Shop All Templates' },
                    { name: 'primaryHref', type: 'text', defaultValue: '#store' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryLabel', type: 'text', defaultValue: 'Scope a custom bundle' },
                    { name: 'secondaryHref', type: 'text', defaultValue: '#' },
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
