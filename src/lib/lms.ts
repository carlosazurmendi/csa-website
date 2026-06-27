import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'

/**
 * Owner-scoped LMS reads (M6). Enrollments / CourseProgress are locked on the
 * public API and read here with the server-only Payload client, filtered by the
 * signed-in Supabase user id.
 */

type LessonLite = { title?: string }
type ModuleLite = { n?: string; title?: string; lessons?: LessonLite[] }
export type CourseLite = {
  id: number | string
  slug?: string
  title?: string
  code?: string
  track?: string[]
  credential?: string
  modules?: ModuleLite[]
  media?: { url?: string | null } | number | string | null
}

export type DashboardCourse = {
  enrollmentId: number | string
  status: 'active' | 'completed' | 'expired'
  slug: string
  title: string
  code: string
  track: string[]
  credential: string
  totalLessons: number
  completedLessons: number
  percent: number
  /** Deep-link into the player at the next incomplete lesson. */
  resumeHref: string
  /** "Up next" pointer — the next incomplete lesson (or the first lesson). */
  resume: { moduleN: string; lessonTitle: string }
  /** Human label for the last time this course was touched (active cards). */
  lastActiveLabel: string
  /** Human date the course was completed (certificate cards). */
  completedLabel: string
  /** Issued certificate verification id (Phase C issuance); null while none. */
  certificateId: string | null
}

export function countLessons(course: CourseLite | null | undefined): number {
  if (!course?.modules) return 0
  return course.modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0)
}

/** True if the signed-in user has an enrollment for the given course id. */
export async function isEnrolled(courseId: number | string): Promise<boolean> {
  const customer = await getCurrentCustomer()
  if (!customer) return false
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'enrollments',
    where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: courseId } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return res.docs.length > 0
}

type CompletedPair = { moduleIndex: number; lessonIndex: number }

/** First incomplete lesson → the "Up next" / resume pointer. Falls back to lesson 1. */
function computeResume(course: CourseLite, completed: CompletedPair[]) {
  const mods = course.modules ?? []
  const isDone = (mi: number, li: number) =>
    completed.some((c) => c.moduleIndex === mi && c.lessonIndex === li)
  for (let mi = 0; mi < mods.length; mi++) {
    const lessons = mods[mi].lessons ?? []
    for (let li = 0; li < lessons.length; li++) {
      if (!isDone(mi, li)) {
        return {
          mi,
          li,
          moduleN: mods[mi].n || String(mi + 1).padStart(2, '0'),
          lessonTitle: lessons[li].title || `Lesson ${li + 1}`,
        }
      }
    }
  }
  // All complete (or no lessons) — point at the first lesson.
  const first = mods[0]?.lessons?.[0]
  return { mi: 0, li: 0, moduleN: mods[0]?.n || '01', lessonTitle: first?.title || 'Lesson 1' }
}

/** "today" / "yesterday" / "N days ago" / "Mon D, YYYY" for a timestamp. */
function relativeLabel(iso: string | undefined): string {
  if (!iso) return 'recently'
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'recently'
  const days = Math.floor((Date.now() - then) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  return dateLabel(iso)
}

/** "Jun 26, 2026" for a timestamp. */
function dateLabel(iso: string | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** The signed-in user's enrolled courses + progress, shaped for the dashboard. */
export async function getMyDashboardCourses(): Promise<DashboardCourse[]> {
  const customer = await getCurrentCustomer()
  if (!customer) return []
  const payload = await getPayloadClient()

  const [enr, prog, certs] = await Promise.all([
    payload.find({
      collection: 'enrollments',
      where: { userId: { equals: customer.userId } },
      limit: 100,
      depth: 1,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'course-progress',
      where: { userId: { equals: customer.userId } },
      limit: 100,
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'certificates',
      where: { userId: { equals: customer.userId } },
      limit: 100,
      depth: 0,
      overrideAccess: true,
    }),
  ])

  // Map courseId → issued certificate id (real issuance, Phase C). No cert ⇒ null.
  const certByCourse = new Map<string, string>()
  for (const c of certs.docs as unknown as Array<Record<string, unknown>>) {
    const courseId = typeof c.course === 'object' && c.course ? (c.course as { id: unknown }).id : c.course
    const id = typeof c.certificateId === 'string' ? c.certificateId : null
    if (id) certByCourse.set(String(courseId), id)
  }

  type ProgRow = {
    percent: number
    completed: CompletedPair[]
    resumeHref?: string
    updatedAt?: string
  }
  const progByCourse = new Map<string, ProgRow>()
  for (const p of prog.docs as unknown as Array<Record<string, unknown>>) {
    const courseId = typeof p.course === 'object' && p.course ? (p.course as { id: unknown }).id : p.course
    const pairs = Array.isArray(p.completedLessons)
      ? (p.completedLessons as CompletedPair[]).map((c) => ({
          moduleIndex: c.moduleIndex,
          lessonIndex: c.lessonIndex,
        }))
      : []
    progByCourse.set(String(courseId), {
      percent: typeof p.percentComplete === 'number' ? p.percentComplete : 0,
      completed: pairs,
      resumeHref: typeof p.resumeHref === 'string' ? p.resumeHref : undefined,
      updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : undefined,
    })
  }

  const out: DashboardCourse[] = []
  for (const e of enr.docs as unknown as Array<Record<string, unknown>>) {
    const course = (typeof e.course === 'object' ? e.course : null) as CourseLite | null
    if (!course) continue
    const total = countLessons(course)
    const p = progByCourse.get(String(course.id)) ?? { percent: 0, completed: [] as CompletedPair[] }
    const r = computeResume(course, p.completed)
    const status = (e.status as DashboardCourse['status']) ?? 'active'
    const touchedAt = p.updatedAt || (e.updatedAt as string | undefined) || (e.createdAt as string | undefined)

    out.push({
      enrollmentId: e.id as number | string,
      status,
      slug: course.slug ?? '',
      title: course.title ?? '',
      code: course.code ?? '',
      track: course.track ?? [],
      credential: course.credential ?? 'Certificate of completion',
      totalLessons: total,
      completedLessons: p.completed.length,
      percent: p.percent,
      resumeHref: p.resumeHref || `/learn/${course.slug ?? ''}?m=${r.mi}&l=${r.li}`,
      resume: { moduleN: r.moduleN, lessonTitle: r.lessonTitle },
      lastActiveLabel: relativeLabel(touchedAt),
      completedLabel: dateLabel(touchedAt),
      certificateId: certByCourse.get(String(course.id)) ?? null,
    })
  }

  return out
}
