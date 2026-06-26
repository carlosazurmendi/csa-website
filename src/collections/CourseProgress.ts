// Locked down — Milestone 5 replaces this with owner-scoped, server-only access.
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Course Progress — a student's per-course completion state for the Course Player
 * and the Dashboard "resume / % complete" widgets. One row per user per course.
 *
 * Mirrors the Supabase `lesson_progress` / enrollment-resume shapes documented in
 * design-reference/project/assets/course-player-data.js and enrollments.js.
 */
export const CourseProgress: CollectionConfig = {
  slug: 'course-progress',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'course', 'percentComplete', 'updatedAt'],
    description: 'Per-student lesson completion and resume point for a course.',
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
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: { description: 'The course this progress record tracks.' },
    },
    {
      name: 'completedLessons',
      type: 'array',
      admin: { description: 'Every lesson the student has marked complete.' },
      fields: [
        {
          name: 'lessonId',
          type: 'text',
          admin: { description: 'Stable lesson id (when available).' },
        },
        {
          name: 'moduleIndex',
          type: 'number',
          admin: { description: '0-based module index in the course outline.' },
        },
        {
          name: 'lessonIndex',
          type: 'number',
          admin: { description: '0-based lesson index within the module.' },
        },
      ],
    },
    {
      name: 'percentComplete',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: { description: 'Overall completion percentage (0–100).' },
    },
    {
      name: 'lastLessonRef',
      type: 'text',
      admin: { description: 'Pointer to the last lesson the student worked on (e.g. "moduleIndex.lessonIndex").' },
    },
    {
      name: 'resumeHref',
      type: 'text',
      admin: { description: 'Deep link back into the Course Player at the last lesson.' },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: { description: 'Last time the student made progress (drives resume sort).' },
    },
  ],
}
