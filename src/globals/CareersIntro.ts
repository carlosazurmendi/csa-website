import type { GlobalConfig } from 'payload'

/**
 * Company → Careers page copy ("Build the Future of Safe Automation"). The open
 * roles come from the `jobPostings` collection; this global holds the hero, the
 * "Why build a career at CSA" cards, the open-positions section headings + note
 * and the closing CTA. Source: design Company/Careers.html + company.jsx.
 */
export const CareersIntro: GlobalConfig = {
  slug: 'careersIntro',
  label: 'Company — Careers',
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
                { name: 'ghost', type: 'text', defaultValue: 'CAREERS' },
                { name: 'icon', type: 'text', defaultValue: 'compass' },
                { name: 'eyebrow', type: 'text', defaultValue: 'Company · Careers' },
                { name: 'title', type: 'text', defaultValue: 'Build the Future of Safe Automation' },
                { name: 'tagline', type: 'textarea' },
                { name: 'intro', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'View Open Roles' },
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Why CSA' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/company' },
                  ],
                },
                {
                  type: 'group',
                  name: 'hud',
                  label: 'Hero HUD panel',
                  fields: [
                    { name: 'tag', type: 'text', defaultValue: 'Who we hire' },
                    { name: 'badge', type: 'text', defaultValue: "We're hiring" },
                    { name: 'foot', type: 'text', defaultValue: 'Independence, applied' },
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
        // ------------------------------------------------------------- WHY CSA
        {
          label: 'Why CSA',
          fields: [
            {
              type: 'group',
              name: 'why',
              label: 'Why build a career at CSA section',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Why Elite Engineers Build Careers at CSA',
                },
                { name: 'title', type: 'text', defaultValue: 'Ownership, impact, and autonomy.' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Why cards',
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
        // ------------------------------------------------------ OPEN POSITIONS
        {
          label: 'Open Positions',
          fields: [
            {
              type: 'group',
              name: 'roles',
              label: 'Open Positions section',
              admin: { description: 'Role cards come from the Job Postings collection.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Open Positions' },
                { name: 'title', type: 'text', defaultValue: 'Find your role.' },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'group',
                  name: 'note',
                  label: 'Trailing note',
                  fields: [
                    { name: 'icon', type: 'text', defaultValue: 'briefcase' },
                    { name: 'bold', type: 'text', defaultValue: 'Roles update as we grow.' },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue:
                        'Live openings are populated from the CSA hiring system — check back, or reach out if you believe you belong here.',
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
                { name: 'eyebrow', type: 'text', defaultValue: 'Careers · Join CSA' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Apply rigorous engineering to what matters.',
                },
                { name: 'sub', type: 'textarea' },
                { name: 'primaryLabel', type: 'text', defaultValue: 'View Open Roles' },
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
                  defaultValue: 'Careers | Build the Future of Safe Automation',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Join CSA. We seek elite engineers, independent technical minds, and safety authorities who want to apply rigorous systems engineering to the world’s most innovative autonomous platforms.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
