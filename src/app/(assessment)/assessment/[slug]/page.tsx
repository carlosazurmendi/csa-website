import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { findBySlug, getPayloadClient } from '@/lib/cms'
import { getCurrentCustomer } from '@/lib/customer'
import {
  loadAssessmentByCourse,
  toClientAssessment,
  getMyAttempts,
  type ClientAssessment,
  type PriorAttempt,
} from '@/lib/assessment'
import { getMyCertificateId } from '@/lib/certificate'
import { AssessmentClient, type AssessmentData } from './AssessmentClient'

/**
 * Final Assessment (/assessment/[slug]) — port of design-reference/project/Training
 * - Templates/Assessment.html (assets/assessment.jsx): a dedicated full-screen
 * graded exam that gates the Certificate of Completion. Gated by middleware
 * (session) AND by enrollment (must own the course). Grading is SERVER-SIDE: the
 * page ships prompts + options only (no answer keys); the keys are applied in the
 * submitAssessment action, which returns the post-grade Review payload.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Final Assessment | CSA Academy',
  robots: { index: false, follow: false },
}

type CourseDoc = {
  id: number | string
  slug?: string
  title?: string
  code?: string
  standards?: { code?: string }[]
}

function initialsOf(name?: string | null): string {
  return (
    (name || 'U')
      .split(' ')
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'
  )
}

export default async function AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const customer = await getCurrentCustomer()
  if (!customer) redirect(`/login?next=${encodeURIComponent('/assessment/' + slug)}`)

  const course = await findBySlug<CourseDoc>('courses', slug, 0)

  // Enrollment gate (own the course to enter the assessment).
  let assessment: ClientAssessment | null = null
  let priorAttempts: PriorAttempt[] = []
  let certificateId: string | null = null
  if (course) {
    const payload = await getPayloadClient()
    const enr = await payload.find({
      collection: 'enrollments',
      where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: course.id } }] },
      limit: 1,
      overrideAccess: true,
    })
    if (enr.docs.length === 0) redirect(`/training/courses/${slug}`)

    const raw = await loadAssessmentByCourse(course.id)
    if (raw && (raw.questions?.length ?? 0) > 0) {
      assessment = toClientAssessment(raw) // strips answer keys + explanations
      priorAttempts = await getMyAttempts(customer.userId, raw.id)
      certificateId = await getMyCertificateId(customer.userId, course.id)
    }
  }

  const data: AssessmentData = {
    course: course
      ? {
          slug: course.slug ?? slug,
          title: course.title ?? '',
          code: course.code ?? '',
          standards: (course.standards ?? []).map((s) => s.code ?? '').filter(Boolean),
        }
      : null,
    assessment,
    priorAttempts,
    certificateId,
    resumeCourseHref: `/learn/${slug}`,
    initials: initialsOf(customer.profile.fullName),
    fullName: customer.profile.fullName ?? 'You',
  }

  return <AssessmentClient data={data} />
}
