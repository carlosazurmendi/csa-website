// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Quiz Attempts — a student's submissions of a graded end-of-course assessment.
 * One row per attempt. Unlimited re-shuffled retries; an 80% pass mark gates the
 * Certificate of Completion.
 *
 * SECURITY: grading is server-side only (Milestone 6). The student's selected
 * `answers` are stored for review, but the assessment answer keys are NEVER sent
 * to the client and scoring is re-run on the server before a certificate issues.
 *
 * Mirrors the Supabase `assessment_attempts` shape documented in
 * design-reference/project/assets/assessment-data.js.
 */
export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'assessment', 'attemptNo', 'score', 'passed', 'submittedAt'],
    description: 'Each submission of a graded course assessment. Grading is re-run server-side.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Supabase auth.users.id of the student.' },
    },
    {
      name: 'assessment',
      type: 'relationship',
      relationTo: 'assessments',
      required: true,
      admin: { description: 'The assessment that was attempted.' },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      admin: { description: 'The course this assessment belongs to.' },
    },
    {
      name: 'attemptNo',
      type: 'number',
      min: 1,
      admin: { description: '1-based attempt counter for this student + assessment.' },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: { description: 'When the attempt was started.' },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: { description: 'When the attempt was submitted (empty while in progress).' },
    },
    {
      name: 'score',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Final score 0–100, computed server-side.' },
    },
    {
      name: 'passed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether the attempt met the pass mark.' },
    },
    {
      name: 'answers',
      type: 'json',
      admin: {
        description:
          'The student’s selected option per question { [questionId]: optionIndex }. Stored for review only; answer keys are never sent to the client.',
      },
    },
  ],
}
