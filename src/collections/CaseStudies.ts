import type { CollectionConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { ctaField } from '@/fields/link'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Case Studies — client proof pieces.
 *
 * Each entry renders a /case-studies/[slug] detail page (Hero → At-a-glance →
 * Problem / Solution / Result → pull-quote → related → CTA) and feeds the
 * Case Studies carousel and the Company → Experience page. Structured so the
 * client edits each section without the layout ever breaking.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Written Content',
    defaultColumns: ['title', 'sector', 'slug', 'updatedAt'],
    description: 'Client success stories. Each one is a full case-study page and a card in the carousel / Experience page.',
  },
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Case study headline, e.g. "Collaborative AMR Certification".' },
    },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'sector',
          type: 'text',
          admin: { width: '50%', description: 'Sector label, e.g. "Mining Equipment", "Robotics".' },
        },
        {
          name: 'heroBadge',
          type: 'text',
          admin: { width: '50%', description: 'Optional badge over the hero image, e.g. "First-of-its-kind".' },
        },
      ],
    },
    {
      name: 'client',
      type: 'group',
      label: 'Client',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          admin: { description: 'Client / company name. Use a generic label if anonymised.' },
        },
        { name: 'role', type: 'text', admin: { description: 'Author role or company descriptor under the name.' } },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Client logo (shown in hero and related cards).' },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Main project image for the case-study hero.' },
    },
    {
      name: 'lead',
      type: 'textarea',
      admin: { description: 'Hero summary sentence beneath the title.' },
    },
    {
      name: 'glance',
      type: 'group',
      label: 'At a glance',
      admin: { description: 'The four-cell summary panel under the hero.' },
      fields: [
        { name: 'industry', type: 'text' },
        { name: 'engagement', type: 'text', admin: { description: 'Engagement type, e.g. "Embedded support".' } },
        { name: 'outcome', type: 'text', admin: { description: 'Headline outcome, e.g. "Certified".' } },
        { name: 'outcomeSub', type: 'text', admin: { description: 'Sub-label under the outcome.' } },
      ],
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standards',
      admin: { description: 'Standard codes shown in the at-a-glance panel, e.g. "IEC 61508".' },
      fields: [{ name: 'code', type: 'text', required: true }],
    },
    {
      name: 'problem',
      type: 'group',
      label: 'Problem — the challenge',
      fields: [
        { name: 'body', type: 'richText', admin: { description: 'What the client was up against.' } },
        {
          name: 'points',
          type: 'array',
          label: 'Problem points',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'solution',
      type: 'group',
      label: 'Solution — how we worked',
      fields: [
        { name: 'body', type: 'richText', admin: { description: 'What CSA did.' } },
        {
          name: 'points',
          type: 'array',
          label: 'Solution points',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'result',
      type: 'group',
      label: 'Result — the outcome',
      fields: [
        { name: 'body', type: 'richText', admin: { description: 'The result delivered.' } },
        {
          name: 'metrics',
          type: 'array',
          label: 'Result metrics',
          admin: { description: 'Highlight numbers, e.g. value "1st", label "IEC 61508 collaborative AMR".' },
          fields: [
            { name: 'value', type: 'text', required: true, admin: { description: 'The big number/figure.' } },
            { name: 'label', type: 'text', required: true, admin: { description: 'What the figure measures.' } },
          ],
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      admin: { description: 'Optional long-form narrative beyond the Problem / Solution / Result sections.' },
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Headline metrics',
      admin: { description: 'Top-level metric tiles for cards / summaries.' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'testimonialRef',
      type: 'relationship',
      relationTo: 'testimonials',
      admin: { description: 'Pull-quote testimonial to feature in this case study.' },
    },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: { description: 'Other case studies to suggest at the bottom (pick up to 3).' },
    },
    {
      name: 'closing',
      type: 'group',
      label: 'Closing call-to-action',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'sub', type: 'textarea' },
        ctaField('buttons', 'Buttons'),
      ],
    },
    seoField,
  ],
}
