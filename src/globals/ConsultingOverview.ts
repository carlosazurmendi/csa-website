import type { GlobalConfig } from 'payload'

/**
 * All unique copy for the Consulting overview page (Consulting/Overview.html),
 * grouped by section. The Industries grid cards come from the `industries`
 * collection (this global holds that section's heading only); everything else
 * on the page — hero, lifecycle HUD, quick facts, about, engagement options,
 * contract-engineering capabilities, FAQ, and closing CTA — lives here so the
 * client edits content without touching layout.
 *
 * Registered in payload.config.ts (globals + seo plugin) under
 * slug: 'consultingOverview'. The seo plugin adds a `meta` group
 * (meta.title / meta.description) consumed by generateMetadata.
 */
export const ConsultingOverview: GlobalConfig = {
  slug: 'consultingOverview',
  label: 'Consulting Overview',
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Functional Safety Consulting' },
                { name: 'ghost', type: 'text', defaultValue: 'Consulting', admin: { description: 'Large background watermark word.' } },
                { name: 'title', type: 'textarea', admin: { description: 'Supports a line break (\\n) for the two-line display.' } },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Book a Consultation' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'See How We Work' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#how-we-work' },
                  ],
                },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Hero standards ticker',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                // ---- Lifecycle HUD (right-hand glass panel) ----
                {
                  type: 'group',
                  name: 'hud',
                  label: 'Lifecycle HUD',
                  fields: [
                    { name: 'tag', type: 'text', defaultValue: 'Concept → Certification' },
                    { name: 'badge', type: 'text', defaultValue: 'Independent' },
                    { name: 'foot', type: 'text', defaultValue: 'Principal-led · Decades of combined experience' },
                    {
                      name: 'steps',
                      type: 'array',
                      label: 'Lifecycle steps',
                      fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'description', type: 'textarea', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ----------------------------------------------------------- QUICK FACTS
        {
          label: 'Quick Facts',
          fields: [
            {
              type: 'group',
              name: 'facts',
              label: 'Quick Facts section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Technical Authority' },
                { name: 'title', type: 'text', defaultValue: 'Quick facts.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Facts',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'kicker', type: 'text', required: true },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------------------- ABOUT
        {
          label: 'About',
          fields: [
            {
              type: 'group',
              name: 'about',
              label: 'About section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'About CSA' },
                { name: 'title', type: 'text', defaultValue: 'An independent functional safety firm.' },
                {
                  name: 'prose',
                  type: 'richText',
                  admin: { description: 'Lead paragraph (supports bold).' },
                },
                { name: 'quote', type: 'textarea', label: 'Pull quote' },
                { name: 'credsLabel', type: 'text', defaultValue: 'Why our validation holds' },
                {
                  name: 'creds',
                  type: 'array',
                  label: 'Credentials',
                  fields: [
                    { name: 'icon', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        // -------------------------------------------------- ENGAGEMENT OPTIONS
        {
          label: 'Engagement Options',
          fields: [
            {
              type: 'group',
              name: 'options',
              label: 'How We Provide Consulting',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'How We Provide Consulting' },
                { name: 'title', type: 'text', defaultValue: 'Three ways to work with us.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Options',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "Option 01".' } },
                        { name: 'icon', type: 'text', required: true },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'bestFor', type: 'text', label: 'Best for' },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------- CONTRACT ENGINEERING
        {
          label: 'Contract Engineering',
          fields: [
            {
              type: 'group',
              name: 'capabilities',
              label: 'Contract Engineering capabilities',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Contract Engineering' },
                { name: 'title', type: 'text', defaultValue: 'Expert contract engineering capabilities.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Capabilities',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'code', type: 'text', required: true },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------- INDUSTRIES HEADING
        {
          label: 'Industries',
          fields: [
            {
              type: 'group',
              name: 'industriesSection',
              label: 'Industries section heading',
              admin: { description: 'Cards come from the Industries collection.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Industries We Serve' },
                { name: 'title', type: 'text', defaultValue: 'Tailored to your sector.' },
                { name: 'lead', type: 'textarea' },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- FAQ
        {
          label: 'Common Questions',
          fields: [
            {
              type: 'group',
              name: 'faq',
              label: 'Common Questions',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Common Questions' },
                { name: 'title', type: 'text', defaultValue: 'What teams ask first.' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Questions',
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Concept to certification' },
                { name: 'title', type: 'text', defaultValue: 'Validate with confidence.' },
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
