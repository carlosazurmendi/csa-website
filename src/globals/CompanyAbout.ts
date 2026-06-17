import type { GlobalConfig } from 'payload'

/**
 * Company → Overview ("About CSA: Engineering a Safer Future") page copy.
 * Cards in the Core Values section are an array so the client edits content
 * without touching layout. The HUD scope rows, mission/philosophy statements
 * and ISO panel are grouped. Source: design Company/Overview.html + company.jsx.
 */
export const CompanyAbout: GlobalConfig = {
  slug: 'companyAbout',
  label: 'Company — Overview',
  admin: { group: 'Company' },
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
                { name: 'ghost', type: 'text', defaultValue: 'CSA' },
                { name: 'icon', type: 'text', defaultValue: 'compass' },
                { name: 'eyebrow', type: 'text', defaultValue: 'About CSA' },
                { name: 'title', type: 'text', defaultValue: 'Engineering a Safer Future.' },
                { name: 'tagline', type: 'textarea' },
                { name: 'intro', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'See Our Experience' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '/company/experience' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Our Services' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/company/services' },
                  ],
                },
                {
                  type: 'group',
                  name: 'hud',
                  label: 'Hero HUD panel',
                  fields: [
                    { name: 'tag', type: 'text', defaultValue: 'Operating principle' },
                    { name: 'badge', type: 'text', defaultValue: 'Technical objectivity' },
                    { name: 'foot', type: 'text', defaultValue: 'Independent by design' },
                    {
                      name: 'rows',
                      type: 'array',
                      label: 'Scope rows',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            { name: 'icon', type: 'text', required: true },
                            { name: 't', type: 'text', required: true, label: 'Title' },
                          ],
                        },
                        { name: 'd', type: 'textarea', label: 'Detail' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------- MISSION / PHILOSOPHY
        {
          label: 'Mission & Philosophy',
          fields: [
            {
              type: 'group',
              name: 'mission',
              fields: [
                { name: 'num', type: 'text', defaultValue: '01 — Mission' },
                { name: 'eyebrow', type: 'text', defaultValue: 'Our Mission' },
                { name: 'title', type: 'text', defaultValue: 'Democratizing functional safety.' },
                { name: 'body', type: 'richText', admin: { description: 'Mission prose (supports bold/italic).' } },
              ],
            },
            {
              type: 'group',
              name: 'philosophy',
              fields: [
                { name: 'num', type: 'text', defaultValue: '02 — Philosophy' },
                { name: 'eyebrow', type: 'text', defaultValue: 'The CSA Philosophy' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Safety is a design feature, not a cost center.',
                },
                { name: 'body', type: 'richText', admin: { description: 'Philosophy prose (supports bold).' } },
                {
                  type: 'group',
                  name: 'boundary',
                  label: 'Professional boundary callout',
                  fields: [
                    { name: 'icon', type: 'text', defaultValue: 'git-fork' },
                    { name: 'title', type: 'text', defaultValue: 'A clear professional boundary' },
                    { name: 'body', type: 'richText', admin: { description: 'Boundary detail (supports bold).' } },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------------- CORE VALUES
        {
          label: 'Core Values',
          fields: [
            {
              type: 'group',
              name: 'values',
              label: 'Core Values section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Core Values' },
                { name: 'title', type: 'text', defaultValue: 'What we hold ourselves to.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Value cards',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 't', type: 'text', required: true, label: 'Title' },
                      ],
                    },
                    { name: 'd', type: 'textarea', required: true, label: 'Detail' },
                  ],
                },
              ],
            },
          ],
        },
        // ----------------------------------------------- ISO PANEL + CLOSING CTA
        {
          label: 'ISO & Closing',
          fields: [
            {
              type: 'group',
              name: 'iso',
              label: 'ISO 9001 intent panel',
              fields: [
                { name: 'icon', type: 'text', defaultValue: 'badge-check' },
                { name: 'eyebrow', type: 'text', defaultValue: 'Quality management' },
                { name: 'body', type: 'richText', admin: { description: 'ISO panel prose (supports bold).' } },
              ],
            },
            {
              type: 'group',
              name: 'closing',
              label: 'Closing CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'About CSA · Get to know us' },
                { name: 'title', type: 'text', defaultValue: 'Trusted systems safety, end to end.' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Meet the Team' },
                    { name: 'primaryHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'secondaryLabel', type: 'text', defaultValue: 'See Our Experience' },
                    { name: 'secondaryHref', type: 'text', defaultValue: '/company/experience' },
                  ],
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- META
        {
          label: 'SEO',
          fields: [
            {
              type: 'group',
              name: 'meta',
              label: 'SEO metadata',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'About CSA | Independent Functional Safety Firm',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Critical Systems Analysis is an independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
