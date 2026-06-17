import type { GlobalConfig } from 'payload'

/**
 * Company → Services page copy ("Flexible Functional Safety Engineering
 * Services"). The four engagement models are an array so the client edits copy
 * without touching layout. Source: design Company/Services.html + company.jsx.
 */
export const CompanyServices: GlobalConfig = {
  slug: 'companyServices',
  label: 'Company — Services',
  admin: { group: 'Company', hidden: true },
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
                { name: 'ghost', type: 'text', defaultValue: 'SERVICES' },
                { name: 'icon', type: 'text', defaultValue: 'settings-2' },
                { name: 'eyebrow', type: 'text', defaultValue: 'Company · Services' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Flexible Functional Safety Engineering Services',
                },
                { name: 'tagline', type: 'textarea' },
                { name: 'intro', type: 'textarea' },
                {
                  name: 'standards',
                  type: 'array',
                  label: 'Hero standards strip',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
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
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'See Our Experience' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/company/experience' },
                  ],
                },
                {
                  type: 'group',
                  name: 'hud',
                  label: 'Hero HUD panel',
                  fields: [
                    { name: 'tag', type: 'text', defaultValue: 'How we engage' },
                    { name: 'badge', type: 'text', defaultValue: 'Flexible' },
                    { name: 'foot', type: 'text', defaultValue: 'Senior capacity, on your terms' },
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
        // --------------------------------------------------- ENGAGEMENT MODELS
        {
          label: 'Engagement Models',
          fields: [
            {
              type: 'group',
              name: 'models',
              label: 'Engagement Models section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Engagement Models' },
                { name: 'title', type: 'text', defaultValue: 'Four ways to bring CSA in.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Model cards',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 't', type: 'text', required: true, label: 'Title' },
                      ],
                    },
                    { name: 'd', type: 'textarea', required: true, label: 'Description' },
                    { name: 'best', type: 'textarea', required: true, label: 'Best for' },
                  ],
                },
              ],
            },
          ],
        },
        // --------------------------------------------------------- CLOSING CTA
        {
          label: 'Closing',
          fields: [
            {
              type: 'group',
              name: 'closing',
              label: 'Closing CTA',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Services · Scope your engagement' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Find the right model for your team.',
                },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Book a Consultation' },
                    { name: 'primaryHref', type: 'text', defaultValue: '#' },
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
                  defaultValue: 'Our Services | Functional Safety Engagement Models',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Flexible functional safety engagement models — independent safety audits, embedded engineering support, technical liaison for assessors, and expert contract engagements.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
