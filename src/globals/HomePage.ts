import type { GlobalConfig } from 'payload'

/**
 * All unique copy for the homepage, grouped by section. Repeatable lists
 * (hero systems, problem principles, comparison rows, etc.) are arrays so the
 * client edits content without touching layout. Cards in the Case Studies,
 * Partners, Services/Industries and News sections come from their respective
 * collections — this global holds those sections' headings only.
 */
export const HomePage: GlobalConfig = {
  slug: 'homePage',
  label: 'Home Page',
  admin: { group: 'Pages', hidden: true },
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
                { name: 'titleLine1', type: 'text', defaultValue: 'Safer Systems.' },
                { name: 'titleLine2', type: 'text', defaultValue: 'Accelerated Innovation.' },
                {
                  name: 'highlightWord',
                  type: 'text',
                  defaultValue: 'Innovation',
                  admin: { description: 'Word within line 2 rendered with the gold shimmer.' },
                },
                { name: 'subhead', type: 'textarea' },
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
                    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Explore Our Services' },
                    { name: 'secondaryCtaHref', type: 'text', defaultValue: '#' },
                  ],
                },
                {
                  name: 'backgroundVideoUrl',
                  type: 'text',
                  defaultValue: '/assets/hero.mp4',
                  admin: { description: 'Full-bleed background video.' },
                },
                {
                  name: 'systems',
                  type: 'array',
                  label: 'Showcase systems (carousel)',
                  admin: { description: 'The rotating safety-critical systems in the hero.' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'category', type: 'text', required: true },
                        { name: 'name', type: 'text', required: true },
                      ],
                    },
                    { name: 'blurb', type: 'textarea', required: true },
                    {
                      type: 'row',
                      fields: [
                        { name: 'videoUrl', type: 'text', admin: { description: 'e.g. /assets/sys-1.webm' } },
                        { name: 'posterUrl', type: 'text', admin: { description: 'e.g. /assets/sys-1-fit.png' } },
                        { name: 'isGif', type: 'checkbox', defaultValue: false, admin: { width: '120px' } },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'metricLabel', type: 'text' },
                        { name: 'metricValue', type: 'text' },
                      ],
                    },
                    {
                      name: 'standards',
                      type: 'array',
                      fields: [{ name: 'label', type: 'text', required: true }],
                    },
                    {
                      type: 'collapsible',
                      label: 'Layout tuning (advanced)',
                      admin: { initCollapsed: true },
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            { name: 'sizeK', type: 'number', defaultValue: 1 },
                            { name: 'offsetY', type: 'number', defaultValue: 0 },
                            { name: 'activeRY', type: 'number', defaultValue: 0 },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'tickerStandards',
                  type: 'array',
                  label: 'Bottom ticker standards',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------- PROBLEM
        {
          label: 'Problem',
          fields: [
            {
              type: 'group',
              name: 'problem',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'The problem' },
                { name: 'title', type: 'text' },
                { name: 'lead', type: 'textarea' },
                { name: 'solutionLabel', type: 'text', defaultValue: 'The CSA solution' },
                {
                  name: 'solutions',
                  type: 'array',
                  label: 'Solution principles',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
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
        // ------------------------------------------------- SERVICES / INDUSTRIES
        {
          label: 'Services & Industries',
          fields: [
            {
              type: 'group',
              name: 'servicesSection',
              label: 'Services / Industries section',
              admin: { description: 'Cards come from the Services and Industries collections.' },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'What we do' },
                {
                  type: 'row',
                  fields: [
                    { name: 'servicesTitle', type: 'text', defaultValue: 'Functional safety services.' },
                    { name: 'industriesTitle', type: 'text', defaultValue: 'Industries we serve.' },
                  ],
                },
                { name: 'servicesLead', type: 'textarea' },
                { name: 'industriesLead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'servicesCta', type: 'text', defaultValue: 'See All Services' },
                    { name: 'industriesCta', type: 'text', defaultValue: 'Explore Industries' },
                  ],
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------- STANDING APART
        {
          label: 'Standing Apart',
          fields: [
            {
              type: 'group',
              name: 'standingApart',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Standing apart' },
                { name: 'title', type: 'text', defaultValue: 'How we work.' },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'mandateKicker', type: 'text', defaultValue: 'Human expertise + AI acceleration.' },
                    { name: 'mandateTag', type: 'text', defaultValue: 'Our human-in-the-loop mandate' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'oldWayLabel', type: 'text', defaultValue: 'The old way' },
                    { name: 'newWayLabel', type: 'text', defaultValue: 'The CSA AI-augmented way' },
                  ],
                },
                {
                  name: 'rows',
                  type: 'array',
                  label: 'Comparison rows',
                  fields: [
                    { name: 'theme', type: 'text', required: true },
                    {
                      type: 'row',
                      fields: [
                        { name: 'oldTitle', type: 'text', required: true },
                        { name: 'newTitle', type: 'text', required: true },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        { name: 'oldDesc', type: 'textarea', required: true },
                        { name: 'newDesc', type: 'textarea', required: true },
                      ],
                    },
                  ],
                },
                { name: 'neverAiLabel', type: 'text', defaultValue: 'Where we never rely on AI' },
                {
                  name: 'neverAi',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'label', type: 'text', required: true },
                      ],
                    },
                  ],
                },
                { name: 'humanNote', type: 'text', defaultValue: 'A qualified safety engineer is always in the loop.' },
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
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'About CSA' },
                { name: 'title', type: 'text', defaultValue: 'Meet the founder.' },
                { name: 'portrait', type: 'upload', relationTo: 'media' },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', defaultValue: 'Ben Twombly' },
                    { name: 'role', type: 'text', defaultValue: 'Founder & CEO' },
                    { name: 'location', type: 'text', defaultValue: 'Sarasota, FL' },
                  ],
                },
                { name: 'calloutLabel', type: 'text', defaultValue: 'Principal-led' },
                {
                  name: 'bio',
                  type: 'richText',
                  admin: { description: 'Founder biography (supports bold).' },
                },
                {
                  name: 'certs',
                  type: 'array',
                  label: 'Certifications',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'title', type: 'text', required: true },
                      ],
                    },
                    { name: 'subtitle', type: 'text', required: true },
                  ],
                },
                { name: 'experienceLabel', type: 'text', defaultValue: 'Hands-on certification experience' },
                {
                  name: 'experienceTags',
                  type: 'array',
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                { name: 'activeLabel', type: 'text', defaultValue: 'Active in the field' },
                { name: 'activeNote', type: 'textarea' },
                {
                  name: 'conferences',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'icon', type: 'text', required: true },
                        { name: 'label', type: 'text', required: true },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', defaultValue: 'Meet the Team' },
                    { name: 'ctaHref', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },
        // ----------------------------------------------- SECTION HEADINGS (rest)
        {
          label: 'Section headings',
          fields: [
            {
              type: 'group',
              name: 'caseStudiesSection',
              label: 'Case Studies section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Proof, not promises.' },
                { name: 'title', type: 'text', defaultValue: 'Case studies.' },
                { name: 'sub', type: 'textarea' },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Read the Full Case Studies' },
              ],
            },
            {
              type: 'group',
              name: 'partnersSection',
              label: 'Partners / Trusted-by section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Trusted by.' },
                { name: 'title', type: 'text' },
                { name: 'sub', type: 'textarea' },
                { name: 'partnersLabel', type: 'text', defaultValue: 'Partners' },
                { name: 'partnersIntro', type: 'textarea' },
              ],
            },
            {
              type: 'group',
              name: 'newsSection',
              label: 'Latest News section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Insights' },
                { name: 'title', type: 'text', defaultValue: 'Latest news.' },
                { name: 'lead', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', defaultValue: 'Visit the Resource Center' },
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
