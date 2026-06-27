/**
 * Seed the flagship IFSP Final Assessment into the running DB without touching the
 * course content (the full seed.ts would re-write the course modules and wipe the
 * Phase-B lesson keyPoints/quiz/resources). Upserts the single assessment from
 * src/seed/content/assessments.ts, linked to the iec-61508-ifsp course.
 *
 * SECURITY: answerIndex + explanation are server-only (adminFieldAccess). They live
 * in the seed so server-side grading + the post-grade Review work; Payload strips
 * them from non-admin API responses.
 *
 * Run (container node, avoids host node-26 `payload run` breakage):
 *   docker compose run --rm migrator npm run payload -- run src/scripts/seedAssessment.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seed as assessmentSeed } from '@/seed/content/assessments'

const SLUG = 'iec-61508-ifsp'

const payload = await getPayload({ config })

const courseRes = await payload.find({
  collection: 'courses',
  where: { slug: { equals: SLUG } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
})
const course = courseRes.docs[0] as { id: number | string } | undefined
if (!course) {
  console.error(`Course "${SLUG}" not found.`)
  process.exit(1)
}

const doc = { ...(assessmentSeed.docs[0] as Record<string, unknown>) }
doc.course = course.id // replace the { _ref } marker with the resolved id

const existing = await payload.find({
  collection: 'assessments',
  where: { course: { equals: course.id } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'assessments',
    id: (existing.docs[0] as { id: number | string }).id,
    data: doc as never,
    overrideAccess: true,
  })
  console.log(`Updated assessment for "${SLUG}".`)
} else {
  await payload.create({ collection: 'assessments', data: doc as never, overrideAccess: true })
  console.log(`Created assessment for "${SLUG}".`)
}

process.exit(0)
