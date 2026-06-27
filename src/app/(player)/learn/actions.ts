'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'
import { countLessons, type CourseLite } from '@/lib/lms'
import { issueCertificateIfEarned } from '@/lib/certificate'

/**
 * Course Player progress (M6), owner-scoped. Toggling a lesson updates the
 * caller's CourseProgress row (created on first write) and recomputes percent +
 * resume pointer. Reaching 100% marks the enrollment completed. Enrollments /
 * CourseProgress are locked on the public API — written here via the server-only
 * Payload client filtered by the Supabase user id.
 */
type CompletedLesson = { moduleIndex: number; lessonIndex: number }

export async function markLessonComplete(
  courseId: number | string,
  moduleIndex: number,
  lessonIndex: number,
  done: boolean,
): Promise<{ ok?: true; percent?: number; completed?: CompletedLesson[]; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'You are not signed in.' }

  try {
    const payload = await getPayloadClient()

    // Must own the course (purchase or grant) to record progress.
    const enr = await payload.find({
      collection: 'enrollments',
      where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: courseId } }] },
      limit: 1,
      overrideAccess: true,
    })
    if (enr.docs.length === 0) return { error: 'You are not enrolled in this course.' }

    const course = (await payload.findByID({
      collection: 'courses',
      id: courseId,
      depth: 0,
      overrideAccess: true,
    })) as unknown as CourseLite & { slug?: string }
    const total = countLessons(course)

    const progRes = await payload.find({
      collection: 'course-progress',
      where: { and: [{ userId: { equals: customer.userId } }, { course: { equals: courseId } }] },
      limit: 1,
      overrideAccess: true,
    })
    const row = progRes.docs[0] as { id: number | string; completedLessons?: CompletedLesson[] } | undefined

    let completed: CompletedLesson[] = (row?.completedLessons ?? []).map((c) => ({
      moduleIndex: c.moduleIndex,
      lessonIndex: c.lessonIndex,
    }))
    const isSame = (c: CompletedLesson) => c.moduleIndex === moduleIndex && c.lessonIndex === lessonIndex
    const exists = completed.some(isSame)
    if (done && !exists) completed.push({ moduleIndex, lessonIndex })
    if (!done && exists) completed = completed.filter((c) => !isSame(c))

    const percent = total ? Math.round((completed.length / total) * 100) : 0
    const data = {
      userId: customer.userId,
      course: Number(courseId),
      completedLessons: completed,
      percentComplete: percent,
      lastLessonRef: `${moduleIndex}.${lessonIndex}`,
      resumeHref: `/learn/${course.slug ?? ''}?m=${moduleIndex}&l=${lessonIndex}`,
      updatedAt: new Date().toISOString(),
    }

    if (row) {
      await payload.update({ collection: 'course-progress', id: row.id, overrideAccess: true, data })
    } else {
      await payload.create({ collection: 'course-progress', overrideAccess: true, data })
    }

    // Completion flips the enrollment to "completed".
    const enrollment = enr.docs[0] as { id: number | string; status?: string }
    const nextStatus = percent >= 100 ? 'completed' : 'active'
    if (enrollment.status !== nextStatus) {
      await payload.update({
        collection: 'enrollments',
        id: enrollment.id,
        overrideAccess: true,
        data: { status: nextStatus },
      })
    }

    // At 100%, issue the certificate IF the final assessment was already passed
    // (covers the pass-then-finish-lessons path; the grading action covers the
    // finish-then-pass path). Idempotent + no-op until both gates are met.
    if (percent >= 100) await issueCertificateIfEarned(customer, courseId)

    revalidatePath('/dashboard')
    return { ok: true, percent, completed }
  } catch {
    return { error: 'Could not save your progress. Please try again.' }
  }
}
