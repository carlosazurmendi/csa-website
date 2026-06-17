import type { GlobalConfig } from 'payload'

/**
 * Company → Experience page copy. The case-study cards on this page come from
 * the `caseStudies` collection (problem/solution long-form). This global holds
 * the hero, the "Where We've Delivered" capability cards, the case-studies
 * section headings and the trailing note + closing CTA.
 * Source: design Company/Experience.html + company.jsx.
 */
export const CompanyExperience: GlobalConfig = {
  slug: 'companyExperience',
  label: 'Company — Experience',
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
                { name: 'ghost', type: 'text', defaultValue: 'EXPERIENCE' },
                { name: 'icon', type: 'text', defaultValue: 'award' },
                { name: 'eyebrow', type: 'text', defaultValue: 'Company · Experience' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Deep, Hands-On Certification Experience',
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
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Discuss Your Project' },
                    { name: 'primaryCtaHref', type: 'text', defaultValue: '#' },
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
                    { name: 'tag', type: 'text', defaultValue: 'Systems we have certified' },
                    { name: 'badge', type: 'text', defaultValue: 'Proven record' },
                    { name: 'foot', type: 'text', defaultValue: 'Decades of combined experience' },
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
        // ---------------------------------------------------- WHERE WE'VE DELIVERED
        {
          label: 'Where We Delivered',
          fields: [
            {
              type: 'group',
              name: 'delivered',
              label: "Where We've Delivered section",
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: "Where We've Delivered" },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Certification across high-stakes sectors.',
                },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Capability cards',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'code', type: 'text', required: true, label: 'Code / kicker' },
                      ],
                    },
                    { name: 't', type: 'text', required: true, label: 'Title' },
                    { name: 'd', type: 'textarea', required: true, label: 'Detail' },
                  ],
                },
              ],
            },
          ],
        },
        // -------------------------------------------------------- CASE STUDIES
        {
          label: 'Case Studies',
          fields: [
            {
              type: 'group',
              name: 'cases',
              label: 'Case Studies section',
              admin: { description: 'Cards come from the Case Studies collection.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Case Studies' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Independent validation, proven in the field.',
                },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'group',
                  name: 'note',
                  label: 'Trailing note',
                  fields: [
                    { name: 'icon', type: 'text', defaultValue: 'folder-plus' },
                    { name: 'bold', type: 'text', defaultValue: 'More case studies on the way.' },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Additional case studies to be added from the CSA case study library.',
                    },
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Experience · Your program next' },
                { name: 'title', type: 'text', defaultValue: 'Put this experience to work.' },
                { name: 'sub', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryLabel', type: 'text', defaultValue: 'Discuss Your Project' },
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
                  defaultValue: 'Our Experience | Functional Safety Certification',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Proven functional safety certification experience across robotics, transport, and infrastructure — including a first-of-its-kind collaborative AMR certification under IEC 61508.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
