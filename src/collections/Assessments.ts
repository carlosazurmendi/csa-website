// SECURITY: Grading is SERVER-SIDE ONLY (Milestone 6). Answer keys live server-only.
// The correct-answer index AND the per-question explanation must NEVER reach the client —
// each carries field-level read access (adminFieldAccess) so Payload strips them from
// every non-admin REST/GraphQL response. The client renders prompts + options only;
// submissions are graded against the server-held key and the certificate is issued there.
import type { CollectionConfig } from 'payload'
import { adminOnly, adminFieldAccess } from '@/access'

/**
 * Assessments — the graded end-of-course exam that gates a Certificate of
 * Completion. Mirrors the documented Payload `assessments` shape in
 * design-reference/project/assets/assessment-data.js.
 *
 * These are NOT public content (no drafts, admin-only collection access). The
 * answer key (answerIndex) and explanation are additionally protected at the
 * field level so they never leak to learners even if the records are queried.
 */
export const Assessments: CollectionConfig = {
  slug: 'assessments',
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Storefront',
    defaultColumns: ['title', 'course', 'passScore', 'shuffle'],
  },
  fields: [
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      admin: { description: 'The course this assessment belongs to.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Assessment title, e.g. "IFSP Final Assessment".' },
    },
    {
      name: 'passScore',
      type: 'number',
      defaultValue: 80,
      admin: { description: 'Percentage required to pass (e.g. 80).' },
    },
    {
      name: 'shuffle',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Re-order questions and options on each attempt.' },
    },
    {
      name: 'recommendAfter',
      type: 'number',
      defaultValue: 3,
      admin: {
        description:
          'After this many attempts, surface a "contact CSA" prompt. Retries stay unlimited.',
      },
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Questions',
      admin: { description: 'Multiple-choice questions. Answer keys and explanations are server-only.' },
      fields: [
        { name: 'id', type: 'text', admin: { description: 'Stable question id, e.g. "q1".' } },
        { name: 'prompt', type: 'textarea', required: true, admin: { description: 'The question text.' } },
        {
          name: 'options',
          type: 'array',
          label: 'Answer options',
          admin: { description: 'Answer choices in canonical order.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'answerIndex',
          type: 'number',
          // SECURITY: correct-answer key — stripped from all non-admin API responses.
          access: { read: adminFieldAccess },
          admin: {
            description:
              'Index (0-based) of the correct option in canonical order. SERVER-ONLY — never sent to learners.',
          },
        },
        {
          name: 'explanation',
          type: 'textarea',
          // SECURITY: review-state rationale — stripped from all non-admin API responses.
          access: { read: adminFieldAccess },
          admin: {
            description:
              'Rationale shown in the post-grading Review state. SERVER-ONLY — never sent to learners before grading.',
          },
        },
        { name: 'standard', type: 'text', admin: { description: 'Standard referenced, e.g. "IEC 61508-1".' } },
        { name: 'topic', type: 'text', admin: { description: 'Module / topic label.' } },
      ],
    },
  ],
}
