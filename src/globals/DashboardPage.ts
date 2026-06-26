import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'

/**
 * Student Dashboard (slug 'dashboard-page') — the post-login learning home.
 * All the copy around the (dynamic) enrollment data: the welcome band, the
 * section headings (continue learning, enrolled, completed, certificates),
 * the no-courses empty state, and the first-run onboarding stepper.
 */
export const DashboardPage: GlobalConfig = {
  slug: 'dashboard-page',
  dbName: 'dash',
  label: 'Student Dashboard Page',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the student dashboard — welcome band, section headings, onboarding.',
  },
  fields: [
    {
      type: 'group',
      name: 'welcome',
      label: 'Welcome band',
      fields: [
        { name: 'breadcrumb', type: 'text', defaultValue: 'CSA Academy / Student Dashboard' },
        { name: 'eyebrow', type: 'text', defaultValue: 'Welcome back' },
        {
          name: 'greetingPrefix',
          type: 'text',
          label: 'Greeting prefix',
          admin: { description: 'Shown before the student’s first name (e.g. "Good to see you,").' },
          defaultValue: 'Good to see you,',
        },
        {
          name: 'subWithCourses',
          type: 'textarea',
          label: 'Sub-copy (has courses)',
          defaultValue:
            'Pick up where you left off, track your progress, and grab your certificates — all in one place.',
        },
        {
          name: 'subNoCourses',
          type: 'textarea',
          label: 'Sub-copy (no courses)',
          defaultValue:
            'This is your learning home. Enroll in a course and your progress, lessons, and certificates will live here.',
        },
        {
          name: 'tourLabel',
          type: 'text',
          label: 'Product-tour button label',
          defaultValue: 'Take the product tour',
        },
        {
          name: 'statLabels',
          type: 'group',
          label: 'At-a-glance stat labels',
          fields: [
            { name: 'inProgress', type: 'text', defaultValue: 'Courses in progress' },
            { name: 'lessonsCompleted', type: 'text', defaultValue: 'Lessons completed' },
            { name: 'certificates', type: 'text', defaultValue: 'Certificates earned' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'sections',
      label: 'Section headings',
      fields: [
        {
          type: 'group',
          name: 'continueLearning',
          label: 'Continue learning',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Jump back in' },
            { name: 'heading', type: 'text', defaultValue: 'Continue learning.' },
          ],
        },
        {
          type: 'group',
          name: 'enrolled',
          label: 'Enrolled courses',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Your courses' },
            { name: 'heading', type: 'text', defaultValue: 'Enrolled courses.' },
          ],
        },
        {
          type: 'group',
          name: 'completed',
          label: 'Completed & certified',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Earned' },
            { name: 'heading', type: 'text', defaultValue: 'Completed & certified.' },
          ],
        },
        {
          type: 'group',
          name: 'portalLinks',
          label: 'Customer Portal quick links',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Account' },
            { name: 'heading', type: 'text', defaultValue: 'Your Customer Portal.' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'emptyState',
      label: 'No-courses empty state',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Your learning starts here' },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'You’re not enrolled in any courses yet.',
        },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'Browse the catalog to find practical, on-demand functional-safety training — grounded in the standards and hazards of your sector. Enroll once and your progress shows up right here.',
        },
      ],
    },
    {
      type: 'group',
      name: 'onboarding',
      label: 'Welcome & onboarding stepper',
      admin: { description: 'First-run product tour shown over the dashboard.' },
      fields: [
        {
          type: 'group',
          name: 'welcomeStep',
          label: 'Step 1 — Welcome',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Welcome to CSA Academy' },
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Functional safety training, built for working engineers.',
            },
            {
              name: 'body',
              type: 'textarea',
              defaultValue:
                'You’re in. CSA Academy turns dense standards into practical, on-demand training you can apply on real hardware. This 60-second tour shows you how courses work, where to find resources, and how to set up your profile.',
            },
          ],
        },
        {
          type: 'group',
          name: 'coursesStep',
          label: 'Step 2 — How courses work',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'How courses work' },
            { name: 'heading', type: 'text', defaultValue: 'Learn, check, certify.' },
            {
              name: 'intro',
              type: 'textarea',
              defaultValue:
                'Every program follows the same simple loop — watch, confirm, and earn proof you can show an assessor.',
            },
            {
              name: 'points',
              type: 'array',
              label: 'Points',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
              defaultValue: [
                {
                  icon: 'play-circle',
                  title: 'Video lessons, grouped into modules',
                  description:
                    'Each course is a sequence of short video lessons. Your place is saved automatically — pick up exactly where you left off.',
                },
                {
                  icon: 'list-checks',
                  title: 'Quick quizzes check your understanding',
                  description:
                    'Short assessments after key lessons reinforce the material, with immediate pass/fail feedback.',
                },
                {
                  icon: 'gauge',
                  title: 'Progress tracked on your dashboard',
                  description:
                    'A progress bar on every course shows exactly how far you are. Resume the most recent lesson in one click.',
                },
                {
                  icon: 'award',
                  title: 'Earn a certificate at 100%',
                  description:
                    'Finish a course and we generate a personalized, verifiable certificate of completion — downloadable as a PDF.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'resourcesStep',
          label: 'Step 3 — Resources & tools',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Resources & tools' },
            { name: 'heading', type: 'text', defaultValue: 'Everything you need, close at hand.' },
            {
              name: 'intro',
              type: 'textarea',
              defaultValue:
                'Reference material, your template library, and an AI assistant are never more than a click away.',
            },
            {
              name: 'points',
              type: 'array',
              label: 'Points',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
              defaultValue: [
                {
                  icon: 'panel-right',
                  title: 'Lesson resources sit beside the player',
                  description:
                    'Every lesson screen has a sidebar with reference notes, worked examples, and downloadable resources for that topic.',
                },
                {
                  icon: 'folder-down',
                  title: 'Your purchased templates live in the Customer Portal',
                  description:
                    'Word & Excel functional-safety templates you own are in your Customer Portal library — alongside billing and order history.',
                },
                {
                  icon: 'message-square',
                  title: 'Safety Chat for quick questions',
                  description:
                    'Stuck on a SIL or a clause in a standard? Safety Chat gives immediate, high-level engineering insight as you learn.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'profileStep',
          label: 'Step 4 — Set up your profile',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Set up your profile' },
            { name: 'heading', type: 'text', defaultValue: 'Tailor your learning.' },
            {
              name: 'intro',
              type: 'textarea',
              defaultValue:
                'Confirm your details and pick the tracks you care about — we’ll surface the most relevant courses first.',
            },
          ],
        },
        {
          type: 'group',
          name: 'completeStep',
          label: 'Completion screen',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'You’re all set' },
            { name: 'heading', type: 'text', defaultValue: 'Welcome aboard.' },
            {
              name: 'body',
              type: 'textarea',
              defaultValue:
                'Your learning home is ready. Jump back into a course, or browse the catalog to add another.',
            },
          ],
        },
        {
          name: 'skipLabel',
          type: 'text',
          label: 'Skip link label',
          defaultValue: 'Skip for now — explore the dashboard',
        },
      ],
    },
    seoField,
  ],
}
