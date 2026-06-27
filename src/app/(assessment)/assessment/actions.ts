'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'
import { loadAssessmentByCourse, getMyAttempts } from '@/lib/assessment'
import { issueCertificateIfEarned } from '@/lib/certificate'

/**
 * Final-assessment grading (M6 Phase C), owner-scoped + SERVER-SIDE ONLY.
 *
 * The client submits only its chosen option indices ({ questionId: optionIndex });
 * it never sees the answer keys. Here we re-load the assessment WITH keys
 * (overrideAccess), grade against them, persist a quiz-attempts row, and — on a
 * pass — issue the Certificate of Completion if the course is 100% complete. The
 * per-question correct index + explanation are returned ONLY in this graded
 * response (the post-submit Review payload), never on the page-load read.
 */

export type ReviewItem = { questionId: string; correctIndex: number; explanation: string }

export type SubmitResult = {
  ok: true
  score: number
  passed: boolean
  attemptNo: number
  total: number
  correct: number
  review: ReviewItem[]
  /** Set when a certificate was issued (or already existed) on this pass. */
  certificateId: string | null
}

export async function submitAssessment(input: {
  courseSlug: string
  answers: Record<string, number>
  startedAt: string
}): Promise<SubmitResult | { error: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }

  try {
    const payload = await getPayloadClient()

    // Resolve the course by slug.
    const courseRes = await payload.find({
      collection: 'courses',
      where: { slug: { equals: input.courseSlug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const course = courseRes.docs[0] as { id: number | string } | undefined
    if (!course) return { error: 'Course not found.' }

    // Must own the course to be graded.
    const enr = await payload.find({
      collection: 'enrollments',
      where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: course.id } }] },
      limit: 1,
      overrideAccess: true,
    })
    if (enr.docs.length === 0) return { error: 'You are not enrolled in this course.' }

    // Load the assessment WITH the server-held answer keys.
    const asmt = await loadAssessmentByCourse(course.id)
    const questions = asmt?.questions ?? []
    if (!asmt || questions.length === 0) return { error: 'This assessment is unavailable.' }

    // Grade against the keys. Submissions are keyed by stable question id and the
    // CANONICAL option index (the client maps its shuffled display order back).
    const answers = input.answers || {}
    const total = questions.length
    const passScore = asmt.passScore ?? 80
    let correct = 0
    const review: ReviewItem[] = []
    for (const q of questions) {
      const qid = q.id ?? ''
      const key = typeof q.answerIndex === 'number' ? q.answerIndex : -1
      if (answers[qid] === key) correct++
      review.push({ questionId: qid, correctIndex: key, explanation: q.explanation ?? '' })
    }
    const score = total ? Math.round((correct / total) * 100) : 0
    const passed = score >= passScore

    // Authoritative attempt number (server-derived).
    const prior = await getMyAttempts(customer.userId, asmt.id)
    const attemptNo = prior.length + 1

    await payload.create({
      collection: 'quiz-attempts',
      overrideAccess: true,
      data: {
        userId: customer.userId,
        assessment: Number(asmt.id),
        course: Number(course.id),
        attemptNo,
        startedAt: input.startedAt || new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        score,
        passed,
        answers,
      } as never,
    })

    // Issue the certificate when earned (passed + 100% complete). Idempotent.
    let certificateId: string | null = null
    if (passed) certificateId = await issueCertificateIfEarned(customer, course.id)

    revalidatePath('/dashboard')
    revalidatePath(`/assessment/${input.courseSlug}`)

    return { ok: true, score, passed, attemptNo, total, correct, review, certificateId }
  } catch {
    return { error: 'Could not submit your assessment. Please try again.' }
  }
}
