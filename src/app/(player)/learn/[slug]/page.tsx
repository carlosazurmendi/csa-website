import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { findBySlug, getPayloadClient } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'
import { mediaUrl } from '@/lib/media'
import { presignProtectedRef, VIDEO_TTL_SECONDS } from '@/lib/protectedMedia'
import { getCurrentCustomer } from '@/lib/customer'
import { CoursePlayer, type PlayerData } from './CoursePlayer'

export const dynamic = 'force-dynamic'

/**
 * Course Player (/learn/[slug]) — port of design-reference/project/Customer Portal
 * /Course Player.html (assets/course-player.jsx): left lesson navigator + final
 * assessment entry · centre video + inline knowledge check · right lesson notes
 * (summary, key points, standards) + downloadable resources, with progress +
 * mark-complete. Gated by middleware (session) AND by enrollment (must own the
 * course). Bound to the CMS course (modules → lessons → keyPoints/quiz/resources).
 * The inline knowledge check is formative (client-graded); the graded course-level
 * final assessment is Phase C.
 */

type MediaRef =
  | { url?: string | null; filename?: string | null; alt?: string | null; filesize?: number | null }
  | number
  | string
  | null
type QuizQuestionDoc = {
  prompt?: string
  options?: { text?: string }[]
  answerIndex?: number
  explanation?: string
}
type LessonDoc = {
  title?: string
  video?: MediaRef
  videoUrl?: string
  body?: unknown
  keyPoints?: { point?: string }[]
  quiz?: { passScore?: number; questions?: QuizQuestionDoc[] }
  resources?: { name?: string; type?: string; sizeLabel?: string; file?: MediaRef }[]
}
type ModuleDoc = { n?: string; title?: string; lessons?: LessonDoc[] }
type CourseDoc = {
  id: number | string
  slug?: string
  title?: string
  code?: string
  standards?: { code?: string }[]
  modules?: ModuleDoc[]
  assessment?: unknown
}

export const metadata: Metadata = {
  title: 'Course Player | CSA',
  robots: { index: false, follow: false },
}

function fmtBytes(n?: number | null): string {
  if (!n || n <= 0) return ''
  if (n >= 1048576) return (n / 1048576).toFixed(1).replace(/\.0$/, '') + ' MB'
  if (n >= 1024) return Math.round(n / 1024) + ' KB'
  return n + ' B'
}

type ResourceDoc = { name?: string; type?: string; sizeLabel?: string; file?: MediaRef }

/** Build a player resource row from CMS metadata, falling back to the uploaded file. */
function resMeta(r: ResourceDoc): { name: string; url: string; type: string; sizeLabel: string } {
  const file = r.file && typeof r.file === 'object' ? r.file : null
  const fileName = file?.filename ?? ''
  const name = r.name || fileName || 'Resource'
  const type = (r.type || (fileName.includes('.') ? fileName.split('.').pop()! : 'FILE')).toUpperCase()
  const sizeLabel = r.sizeLabel || fmtBytes(file?.filesize)
  return { name, url: mediaUrl(r.file as never) ?? '', type, sizeLabel }
}

export default async function CoursePlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ m?: string; l?: string }>
}) {
  const { slug } = await params
  const course = await findBySlug<CourseDoc>('courses', slug, 2)
  if (!course) redirect('/dashboard')

  // Must own the course to enter the player.
  const customer = await getCurrentCustomer()
  if (!customer) redirect(`/login?next=${encodeURIComponent('/learn/' + slug)}`)
  const payload = await getPayloadClient()
  const enr = await payload.find({
    collection: 'enrollments',
    // An 'expired' enrollment (access lapsed OR revoked after a refund/chargeback)
    // no longer grants entry — only active/completed do.
    where: {
      and: [
        { userId: { equals: customer.userId } },
        { course: { equals: course.id } },
        { status: { not_equals: 'expired' } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  if (enr.docs.length === 0) redirect(`/training/courses/${slug}`)

  // Build a flat, serializable lesson list + module outline. Uploaded lesson videos
  // live in the PRIVATE bucket, so each is resolved to a short-lived presigned URL
  // server-side (the enrollment was already verified above) — never a public link.
  const lessons: PlayerData['lessons'] = []
  const modules: PlayerData['modules'] = []
  const courseModules = course.modules ?? []
  for (let mi = 0; mi < courseModules.length; mi++) {
    const mod = courseModules[mi]
    const modLessons: { global: number; title: string }[] = []
    const lessonDocs = mod.lessons ?? []
    for (let li = 0; li < lessonDocs.length; li++) {
      const lesson = lessonDocs[li]
      const global = lessons.length
      modLessons.push({ global, title: lesson.title ?? `Lesson ${li + 1}` })
      lessons.push({
        global,
        moduleIndex: mi,
        lessonIndex: li,
        moduleN: mod.n ?? String(mi + 1).padStart(2, '0'),
        moduleTitle: mod.title ?? '',
        title: lesson.title ?? `Lesson ${li + 1}`,
        uploadUrl: await presignProtectedRef(lesson.video as never, { expiresIn: VIDEO_TTL_SECONDS }),
        videoUrl: lesson.videoUrl ?? null,
        bodyParas: lexicalToParagraphs(lesson.body),
        keyPoints: (lesson.keyPoints ?? []).map((k) => k.point ?? '').filter(Boolean),
        quiz:
          lesson.quiz?.questions && lesson.quiz.questions.length > 0
            ? {
                passScore: lesson.quiz.passScore ?? 100,
                questions: lesson.quiz.questions.map((q) => ({
                  prompt: q.prompt ?? '',
                  options: (q.options ?? []).map((o) => o.text ?? ''),
                  answerIndex: q.answerIndex ?? 0,
                  explanation: q.explanation ?? '',
                })),
              }
            : null,
        resources: (lesson.resources ?? []).map(resMeta).filter((r) => r.name),
      })
    }
    modules.push({ moduleIndex: mi, n: mod.n ?? String(mi + 1).padStart(2, '0'), title: mod.title ?? '', lessons: modLessons })
  }

  // Progress (owner-scoped).
  const progRes = await payload.find({
    collection: 'course-progress',
    where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: course.id } }] },
    limit: 1,
    overrideAccess: true,
  })
  const prog = progRes.docs[0] as { completedLessons?: { moduleIndex: number; lessonIndex: number }[] } | undefined
  const completed = (prog?.completedLessons ?? []).map((c) => ({ moduleIndex: c.moduleIndex, lessonIndex: c.lessonIndex }))

  // Start lesson: ?m&l deep-link → else first incomplete → else 0.
  const sp = await searchParams
  const m = Number(sp.m)
  const l = Number(sp.l)
  let startGlobal = 0
  if (!Number.isNaN(m) && !Number.isNaN(l)) {
    const idx = lessons.findIndex((x) => x.moduleIndex === m && x.lessonIndex === l)
    if (idx >= 0) startGlobal = idx
  } else {
    const firstIncomplete = lessons.findIndex(
      (x) => !completed.some((c) => c.moduleIndex === x.moduleIndex && c.lessonIndex === x.lessonIndex),
    )
    startGlobal = firstIncomplete >= 0 ? firstIncomplete : 0
  }

  const data: PlayerData = {
    courseId: course.id,
    slug: course.slug ?? slug,
    title: course.title ?? '',
    code: course.code ?? '',
    standards: (course.standards ?? []).map((s) => s.code ?? '').filter(Boolean),
    modules,
    lessons,
    completed,
    startGlobal,
    hasAssessment: Boolean(course.assessment),
  }

  if (lessons.length === 0) {
    return (
      <div className="cp">
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '160px 30px', textAlign: 'center' }}>
          <h1 className="csa-h2" style={{ marginBottom: 12 }}>No lessons yet.</h1>
          <p className="csa-lead" style={{ color: 'var(--fg-3)', marginBottom: 26 }}>
            This course doesn&rsquo;t have any lessons published yet. Check back soon.
          </p>
          <a className="btn btn--gold-pill btn--lg" href="/dashboard">
            Back to Dashboard <i data-lucide="arrow-right"></i>
          </a>
        </main>
      </div>
    )
  }

  return <CoursePlayer data={data} userInitials={customer.profile.fullName?.[0]?.toUpperCase() ?? 'U'} />
}
