import type { CollectionConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { publishedOrAdmin, editorWrite, adminOnly } from '@/access'

/**
 * Courses — CSA's functional-safety training programs. Drives three surfaces:
 * the Digital Courses hub, the filterable Course Catalog, and the Course landing
 * template, plus the in-app Course Player. Mirrors the documented Payload
 * `courses` fields in design-reference/project/assets/courses-data.js.
 *
 * Curriculum is modelled as nested arrays (modules → lessons) so the catalog and
 * the course player bind cleanly. Price is an integer in CENTS (nullable = "request
 * a quote"). Each course relates to one instructor and an optional graded assessment.
 */
export const Courses: CollectionConfig = {
  slug: 'courses',
  versions: { drafts: true },
  access: {
    read: publishedOrAdmin,
    create: editorWrite,
    update: editorWrite,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Storefront',
    defaultColumns: ['title', 'code', 'level', 'price', 'popular', 'slug'],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      admin: { description: 'Short standard / credential code shown as a mono chip, e.g. "IEC 61508 · IFSP".' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Course title.' },
    },
    {
      name: 'track',
      type: 'select',
      hasMany: true,
      admin: { description: 'Industry tracks — drives the catalog "By Industry" filter.' },
      options: [
        { label: 'Robotics', value: 'Robotics' },
        { label: 'Rail', value: 'Rail' },
        { label: 'Industrial Machinery', value: 'Industrial Machinery' },
      ],
    },
    {
      name: 'format',
      type: 'select',
      hasMany: true,
      admin: { description: 'Delivery formats — drives the catalog "By Format" filter.' },
      options: [
        { label: 'Private Virtual Team Session', value: 'Private Virtual Team Session' },
        { label: 'In-Person Custom Workshop', value: 'In-Person Custom Workshop' },
        { label: 'On-Demand', value: 'On-Demand' },
        { label: 'Group', value: 'Group' },
        { label: 'Private', value: 'Private' },
      ],
    },
    {
      name: 'credential',
      type: 'text',
      defaultValue: 'Certificate of completion',
      admin: { description: 'Awarded credential, e.g. "Certificate of completion".' },
    },
    {
      name: 'level',
      type: 'select',
      admin: { description: 'Difficulty / audience level.' },
      options: [
        { label: 'Introductory', value: 'Introductory' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
        { label: 'Tailored', value: 'Tailored' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      admin: { description: 'Nominal length, e.g. "12 modules · ~16 hrs" or "Scoped to your program".' },
    },
    {
      name: 'lessons',
      type: 'number',
      admin: { description: 'Total lessons / modules count (0 = custom / scoped).' },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'One-time price in CENTS per seat. Leave empty for "request a quote" / custom pricing.',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      admin: { description: 'Pricing caveat under the price, e.g. "Per seat · team & site licenses available".' },
    },
    {
      name: 'enrollCtaLabel',
      type: 'text',
      defaultValue: 'Enroll Now',
      admin: {
        description: 'Label for the purchase / enroll button on the course page, e.g. "Enroll Now", "Buy Course", "Get Access".',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'One-line card summary used in the hub and catalog grid.' },
    },
    {
      name: 'blurb',
      type: 'richText',
      admin: { description: 'Landing-page lead paragraph.' },
    },
    {
      name: 'outcomes',
      type: 'array',
      label: "What you'll learn",
      admin: { description: 'Learning outcomes bullet list.' },
      fields: [{ name: 'outcome', type: 'text', required: true }],
    },
    {
      name: 'modules',
      type: 'array',
      label: 'Curriculum modules',
      admin: { description: 'Course outline. Each module groups a set of lessons.' },
      fields: [
        { name: 'n', type: 'text', admin: { description: 'Module number / label, e.g. "01".' } },
        { name: 'title', type: 'text', required: true, admin: { description: 'Module title.' } },
        {
          name: 'lessons',
          type: 'array',
          label: 'Lessons',
          admin: { description: 'Lessons within this module — bind to the course player.' },
          fields: [
            { name: 'title', type: 'text', required: true, admin: { description: 'Lesson title.' } },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'protected-media',
              admin: {
                description:
                  'Uploaded lesson video — stored in the PRIVATE bucket and streamed to enrolled students via a short-lived signed URL (never a public link). Takes precedence over Video URL.',
              },
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: {
                description:
                  'External video URL (YouTube / Vimeo / direct MP4) embedded by the player when no video is uploaded.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              admin: { description: 'Lesson notes / written content — the "In this lesson" summary in the player sidebar.' },
            },
            {
              name: 'keyPoints',
              type: 'array',
              label: 'Key points',
              admin: { description: 'Bullet takeaways shown under "In this lesson" in the player sidebar.' },
              fields: [{ name: 'point', type: 'text', required: true }],
            },
            {
              name: 'quiz',
              type: 'group',
              label: 'Knowledge check',
              admin: {
                description:
                  'Formative self-check shown below the video (client-graded, with explanations). Not the graded final assessment.',
              },
              fields: [
                {
                  name: 'passScore',
                  type: 'number',
                  defaultValue: 100,
                  admin: { description: '% correct required to pass the check.' },
                },
                {
                  name: 'questions',
                  type: 'array',
                  label: 'Questions',
                  fields: [
                    { name: 'prompt', type: 'text', required: true },
                    {
                      name: 'options',
                      type: 'array',
                      minRows: 2,
                      admin: { description: 'Answer options.' },
                      fields: [{ name: 'text', type: 'text', required: true }],
                    },
                    {
                      name: 'answerIndex',
                      type: 'number',
                      defaultValue: 0,
                      admin: { description: 'Index (0-based) of the correct option.' },
                    },
                    { name: 'explanation', type: 'textarea', admin: { description: 'Shown after grading.' } },
                  ],
                },
              ],
            },
            {
              name: 'resources',
              type: 'array',
              label: 'Downloadable resources',
              admin: { description: 'Handouts / worksheets shown in the player sidebar.' },
              fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'Display file name, e.g. "Checklist.pdf".' } },
                { name: 'type', type: 'text', admin: { description: 'File-type chip, e.g. PDF / XLSX / DOCX / ZIP.' } },
                { name: 'sizeLabel', type: 'text', admin: { description: 'Human size, e.g. "318 KB".' } },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'The downloadable file (optional until uploaded; download is disabled without it).' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standards covered',
      admin: { description: 'Standards codes shown as mono chips, e.g. "IEC 61508".' },
      fields: [{ name: 'code', type: 'text', required: true }],
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'instructors',
      admin: { description: 'Who teaches this course.' },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Cinematic hero plate / cover image for the course.' },
    },
    {
      name: 'badge',
      type: 'text',
      admin: { description: 'Optional ribbon, e.g. "Flagship · SGS-TÜV Saar".' },
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Highlight this course in the hub / catalog.' },
    },
    {
      name: 'assessment',
      type: 'relationship',
      relationTo: 'assessments',
      admin: { description: 'Graded end-of-course assessment that gates the certificate.' },
    },
    seoField,
    slugField('title'),
  ],
}
