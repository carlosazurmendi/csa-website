import { getPayloadClient, findBySlug } from '@/lib/cms'
import type { CurrentCustomer } from '@/lib/customer'
import { countLessons, type CourseLite } from '@/lib/lms'
import { loadAssessmentByCourse } from '@/lib/assessment'

/** Canonical public verification base (mirrors design certificates-data.js). */
export const VERIFY_BASE = 'https://verify.criticalsystems.io/'

/** Display-shaped certificate the certificate page binds to (no internal ids). */
export type CertData = {
  id: string
  recipientName: string
  recipientCompany: string
  courseTitle: string
  credential: string
  standards: string[]
  score: number
  hours: string
  issuedLabel: string
  expiresLabel: string
  verifyUrl: string
  instructorName: string
  instructorTitle: string
}

/**
 * Certificate issuance (server-only, M6 Phase C). A Certificate of Completion is
 * issued the moment a student BOTH reaches 100% lesson completion AND has a passing
 * final-assessment attempt. Issuance is idempotent (one cert per user+course) and
 * is invoked from the grading action (on pass) and from lesson-complete (on
 * reaching 100% when an earlier attempt already passed). The certificate page that
 * renders the issued record is Phase D — this only writes the data.
 */

type CourseDoc = CourseLite & { standards?: { code?: string }[] }

/** The signed-in user's issued certificate id for a course, or null. */
export async function getMyCertificateId(
  userId: string,
  courseId: number | string,
): Promise<string | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'certificates',
    where: { and: [{ userId: { equals: userId } }, { course: { equals: courseId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const doc = res.docs[0] as { certificateId?: string } | undefined
  return doc?.certificateId ?? null
}

/** A short alpha prefix derived from the course code (e.g. "IFSP"), fallback "GEN". */
function certPrefix(code: string): string {
  const clean = (code || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  return clean ? clean.slice(0, 4) : 'GEN'
}

/** Next public verification id: CSA-<CODE>-<YEAR>-<seq>, sequence per calendar year. */
async function nextCertificateId(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  code: string,
): Promise<string> {
  const year = new Date().getFullYear()
  const yearStart = new Date(year, 0, 1).toISOString()
  const res = await payload.find({
    collection: 'certificates',
    where: { issuedAt: { greater_than_equal: yearStart } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const seq = String((res.totalDocs ?? 0) + 1).padStart(4, '0')
  return `CSA-${certPrefix(code)}-${year}-${seq}`
}

/** Nominal learning hours from lesson count, e.g. "6.3". */
function estimateHours(course: CourseDoc): string {
  return Math.max(1, countLessons(course) * 0.3).toFixed(1)
}

/**
 * Issue the certificate if (and only if) both gates are met. Idempotent: returns
 * the existing certificate id if one was already issued. Returns null if not yet
 * earned (not 100%, or no passing attempt).
 */
export async function issueCertificateIfEarned(
  customer: CurrentCustomer,
  courseId: number | string,
): Promise<string | null> {
  const payload = await getPayloadClient()

  // Already issued — idempotent.
  const existing = await getMyCertificateId(customer.userId, courseId)
  if (existing) return existing

  // Gate 1: 100% lesson completion.
  const progRes = await payload.find({
    collection: 'course-progress',
    where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: courseId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const prog = progRes.docs[0] as { percentComplete?: number } | undefined
  if (!prog || (prog.percentComplete ?? 0) < 100) return null

  // Gate 2: a passing final-assessment attempt.
  const asmt = await loadAssessmentByCourse(courseId)
  if (!asmt) return null
  const passRes = await payload.find({
    collection: 'quiz-attempts',
    where: {
      and: [
        { userId: { equals: customer.userId } },
        { assessment: { equals: asmt.id } },
        { passed: { equals: true } },
      ],
    },
    sort: '-score',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const best = passRes.docs[0] as { score?: number } | undefined
  if (!best) return null

  // Snapshot the course details onto the certificate.
  const course = (await payload.findByID({
    collection: 'courses',
    id: courseId,
    depth: 0,
    overrideAccess: true,
  })) as unknown as CourseDoc
  const standards = Array.isArray(course.standards)
    ? course.standards.map((s) => ({ code: s.code ?? '' })).filter((s) => s.code)
    : []
  const certificateId = await nextCertificateId(payload, course.code ?? '')

  await payload.create({
    collection: 'certificates',
    overrideAccess: true,
    data: {
      userId: customer.userId,
      course: Number(courseId),
      recipientName: customer.profile.fullName || customer.email,
      recipientCompany: customer.profile.company ?? '',
      courseTitle: course.title ?? '',
      credential: course.credential || 'Certificate of Completion',
      standards,
      score: best.score ?? 0,
      hours: estimateHours(course),
      issuedAt: new Date().toISOString(),
      certificateId,
      verified: true,
    } as never,
  })

  // Reflect completion on the enrollment (idempotent).
  const enrRes = await payload.find({
    collection: 'enrollments',
    where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: courseId } }] },
    limit: 1,
    overrideAccess: true,
  })
  const enr = enrRes.docs[0] as { id: number | string; status?: string } | undefined
  if (enr && enr.status !== 'completed') {
    await payload.update({
      collection: 'enrollments',
      id: enr.id,
      overrideAccess: true,
      data: { status: 'completed' },
    })
  }

  return certificateId
}

/* ---------------------------------------------------------------------------
 * Certificate page reads (M6 Phase D). Render-only; the page resolves a cert by
 * public verification id (?cert=) or by the owner's course (?course=), or shows
 * the locked / not-yet-earned state.
 * ------------------------------------------------------------------------- */

const DATE_OPTS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
/** "March 9, 2026" (en-US long); empty string for missing dates. */
function fmtDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', DATE_OPTS)
}

type CertRow = {
  certificateId?: string
  userId?: string
  recipientName?: string
  recipientCompany?: string
  courseTitle?: string
  credential?: string
  standards?: { code?: string }[]
  score?: number
  hours?: string
  issuedAt?: string
  expiresAt?: string | null
  instructorName?: string
  instructorTitle?: string
  verified?: boolean
}

/** Shape a stored certificate row into the display contract. */
function shapeCert(row: CertRow): CertData {
  const id = row.certificateId ?? ''
  return {
    id,
    recipientName: row.recipientName ?? '',
    recipientCompany: row.recipientCompany ?? '',
    courseTitle: row.courseTitle ?? '',
    credential: row.credential || 'Certificate of Completion',
    standards: Array.isArray(row.standards) ? row.standards.map((s) => s.code ?? '').filter(Boolean) : [],
    score: typeof row.score === 'number' ? row.score : 0,
    hours: row.hours ?? '',
    issuedLabel: fmtDate(row.issuedAt),
    expiresLabel: row.expiresAt ? fmtDate(row.expiresAt) : 'No expiry',
    verifyUrl: VERIFY_BASE + id,
    instructorName: row.instructorName ?? 'Ben Twombly',
    instructorTitle: row.instructorTitle ?? '',
  }
}

/** Look up a certificate by its public verification id. Server-only. */
export async function getCertByPublicId(
  certId: string,
): Promise<{ userId: string; verified: boolean; data: CertData } | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'certificates',
    where: { certificateId: { equals: certId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const row = res.docs[0] as CertRow | undefined
  if (!row) return null
  return { userId: row.userId ?? '', verified: row.verified !== false, data: shapeCert(row) }
}

/** The signed-in user's certificate for a course (full display data), or null. */
export async function getMyCertificate(
  userId: string,
  courseId: number | string,
): Promise<CertData | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'certificates',
    where: { and: [{ userId: { equals: userId } }, { course: { equals: courseId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const row = res.docs[0] as CertRow | undefined
  return row ? shapeCert(row) : null
}

/** True if the user has a passing attempt for the course's final assessment. */
export async function hasPassedAssessment(
  userId: string,
  courseId: number | string,
): Promise<boolean> {
  const asmt = await loadAssessmentByCourse(courseId)
  if (!asmt) return false
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'quiz-attempts',
    where: {
      and: [
        { userId: { equals: userId } },
        { assessment: { equals: asmt.id } },
        { passed: { equals: true } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return res.docs.length > 0
}

export type LockedState = {
  course: { slug: string; title: string; code: string }
  percent: number
  done: number
  total: number
  passed: boolean
  resumeHref: string
}

type CourseDocL = CourseLite & { standards?: { code?: string }[] }

/** Resolve the locked / not-yet-earned state for a course the user owns. */
export async function getLockedState(
  userId: string,
  courseSlug: string,
): Promise<LockedState | null> {
  const course = await findBySlug<CourseDocL>('courses', courseSlug, 0)
  if (!course) return null
  const total = countLessons(course)

  const payload = await getPayloadClient()
  const progRes = await payload.find({
    collection: 'course-progress',
    where: { and: [{ userId: { equals: userId } }, { course: { equals: course.id } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const prog = progRes.docs[0] as
    | { percentComplete?: number; completedLessons?: unknown[]; resumeHref?: string }
    | undefined
  const done = Array.isArray(prog?.completedLessons) ? prog!.completedLessons!.length : 0
  const percent = typeof prog?.percentComplete === 'number' ? prog!.percentComplete! : 0
  const passed = await hasPassedAssessment(userId, course.id)

  return {
    course: { slug: course.slug ?? courseSlug, title: course.title ?? '', code: course.code ?? '' },
    percent,
    done,
    total,
    passed,
    resumeHref: prog?.resumeHref || `/learn/${course.slug ?? courseSlug}`,
  }
}
