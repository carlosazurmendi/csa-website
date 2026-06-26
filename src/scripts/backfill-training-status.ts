/**
 * One-off: set the existing "Technical whitepaper series" Free Training to
 * releaseStatus 'soon' (it was the coming-soon card before the status moved onto
 * the doc). All other trainings default to 'published'. Run via `npx tsx`.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const res = await payload.find({
  collection: 'free-trainings',
  where: { title: { equals: 'Technical whitepaper series' } },
  limit: 1,
})
const doc: any = res.docs[0]
if (!doc) {
  console.log('Whitepaper doc not found — nothing to do.')
  process.exit(0)
}

await payload.update({ collection: 'free-trainings', id: doc.id, data: { releaseStatus: 'soon' } })
console.log('Set "Technical whitepaper series" → releaseStatus: soon')
process.exit(0)
