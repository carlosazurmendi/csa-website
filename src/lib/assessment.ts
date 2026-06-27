import { getPayloadClient } from '@/lib/cms'

/**
 * Assessment data layer (server-only, M6 Phase C). The graded end-of-course exam.
 *
 * SECURITY: the assessment is loaded with overrideAccess so the server can see the
 * answer keys + explanations needed for grading, but `toClientAssessment` strips
 * BOTH before anything reaches the browser. The keys/explanations only ever leave
 * the server inside a graded `submitAssessment` response (the post-submit Review
 * payload) — never on the page-load read. Quiz attempts are owner-scoped reads via
 * the server-only Payload client filtered by the Supabase user id.
 */

export type RawQuestion = {
  id?: string
  prompt?: string
  topic?: string
  standard?: string
  options?: { text?: string }[]
  answerIndex?: number
  explanation?: string
}
export type RawAssessment = {
  id: number | string
  title?: string
  passScore?: number
  recommendAfter?: number
  shuffle?: boolean
  questions?: RawQuestion[]
}

/** A question with NO answer key — safe to send to the client. */
export type ClientQuestion = {
  id: string
  prompt: string
  topic: string
  standard: string
  options: string[]
}
/** The assessment shaped for the browser. Contains NO answer keys / explanations. */
export type ClientAssessment = {
  id: number | string
  title: string
  passScore: number
  recommendAfter: number
  shuffle: boolean
  questions: ClientQuestion[]
}
export type PriorAttempt = { attemptNo: number; score: number; passed: boolean }

/** Load a course's assessment WITH answer keys (server-only). Returns null if none. */
export async function loadAssessmentByCourse(
  courseId: number | string,
): Promise<RawAssessment | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'assessments',
    where: { course: { equals: courseId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs[0] as unknown as RawAssessment) ?? null
}

/** Strip the server-only answer keys + explanations for the browser. */
export function toClientAssessment(a: RawAssessment): ClientAssessment {
  return {
    id: a.id,
    title: a.title ?? '',
    passScore: a.passScore ?? 80,
    recommendAfter: a.recommendAfter ?? 3,
    shuffle: a.shuffle ?? true,
    questions: (a.questions ?? []).map((q) => ({
      id: q.id ?? '',
      prompt: q.prompt ?? '',
      topic: q.topic ?? '',
      standard: q.standard ?? '',
      options: (q.options ?? []).map((o) => o.text ?? ''),
    })),
  }
}

/** The signed-in user's completed attempts for an assessment, oldest first. */
export async function getMyAttempts(
  userId: string,
  assessmentId: number | string,
): Promise<PriorAttempt[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'quiz-attempts',
    where: { and: [{ userId: { equals: userId } }, { assessment: { equals: assessmentId } }] },
    sort: 'attemptNo',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })
  return (res.docs as unknown as Array<Record<string, unknown>>)
    .filter((d) => Boolean(d.submittedAt))
    .map((d) => ({
      attemptNo: typeof d.attemptNo === 'number' ? d.attemptNo : 0,
      score: typeof d.score === 'number' ? d.score : 0,
      passed: Boolean(d.passed),
    }))
}
