/**
 * One-off: set the full card state (resourceType, ctaLabel, releaseStatus,
 * cleared videoOrLink placeholder) on the seeded Free Trainings to match their
 * original chrome. Sets every defaulted field explicitly in one update so Payload
 * doesn't re-default omitted fields. New trainings default to Video / Published.
 * Run via `npx tsx`.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const MAP = [
  { match: 'Introduction to Probabilistic', resourceType: 'video', ctaLabel: 'Watch free', releaseStatus: 'published' },
  { match: 'Defining the Architectural', resourceType: 'presentation', ctaLabel: 'Start free', releaseStatus: 'published' },
  { match: 'Technical whitepaper series', resourceType: 'document', ctaLabel: 'Read free', releaseStatus: 'soon' },
] as const

const all = await payload.find({ collection: 'free-trainings', limit: 100, depth: 0 })
for (const m of MAP) {
  const doc: any = all.docs.find((d: any) => (d.title || '').includes(m.match))
  if (!doc) {
    console.log('· not found:', m.match)
    continue
  }
  await payload.update({
    collection: 'free-trainings',
    id: doc.id,
    data: {
      resourceType: m.resourceType,
      ctaLabel: m.ctaLabel,
      releaseStatus: m.releaseStatus,
      videoOrLink: '',
    },
  })
  console.log('· set', String(doc.title).slice(0, 34), '→', m.resourceType, '/', m.ctaLabel, '/', m.releaseStatus)
}
process.exit(0)
