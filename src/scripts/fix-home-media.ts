/**
 * Re-applies the Home founder portrait + Case-Studies card covers (the home seed
 * didn't persist them) and reads the published doc back to confirm. Media already
 * exists from seed-media.ts — looked up by alt. Run on host via npx tsx (same env
 * preamble as seed-media.ts).
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

async function mediaIdByAlt(alt: string): Promise<number | undefined> {
  const r = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1, depth: 0 })
  return r.docs[0]?.id as number | undefined
}

const res = await payload.find({ collection: 'home', limit: 1, depth: 0 })
const home = res.docs[0] as any
if (!home) {
  console.log('no home doc')
  process.exit(1)
}

const portraitId = await mediaIdByAlt(`Founder portrait: ${home.abName || 'Founder'}`)
const csItems = Array.isArray(home.csItems) ? home.csItems : []
const itemsWithCovers = []
for (const it of csItems) {
  const coverId = await mediaIdByAlt(`Home case cover: ${it.name || it.sector || 'Case study'}`)
  itemsWithCovers.push({ ...it, cover: coverId ?? it.cover ?? null })
}
console.log('portraitId=', portraitId, 'coverIds=', itemsWithCovers.map((i) => i.cover))

try {
  await payload.update({
    collection: 'home',
    id: home.id,
    draft: false,
    data: { _status: 'published', abPortrait: portraitId, csItems: itemsWithCovers } as any,
  })
} catch (e: any) {
  console.error('UPDATE THREW:', e?.message || e)
  if (e?.data) console.error('details:', JSON.stringify(e.data))
  process.exit(1)
}

// Read back the PUBLISHED doc (what the site reads).
const back = await payload.find({ collection: 'home', limit: 1, depth: 2, draft: false })
const d = back.docs[0] as any
console.log('after update — _status:', d._status)
console.log('abPortrait url:', d.abPortrait?.url)
console.log('csItems covers:', (d.csItems || []).map((i: any) => i.cover?.url || i.cover))
process.exit(0)
