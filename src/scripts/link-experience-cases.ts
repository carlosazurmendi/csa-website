/**
 * One-off data backfill: set the `caseStudy` relationship on the Experience page's
 * case items to their full case-study doc, so the "read full case study" buttons
 * use the CMS relationship rather than the title-match fallback. Idempotent — only
 * fills items that don't already have it. Run via `npx tsx` with env sourced.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const norm = (s?: string) => (s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const ALIAS: Record<string, string> = {
  'collaborative autonomous mobile robot certification': 'collaborative-amr-iec-61508-certification',
}

const cases = await payload.find({ collection: 'case-studies', limit: 100, depth: 0 })
const slugToId = new Map(cases.docs.map((d: any) => [d.slug, d.id]))
const titleToSlug = new Map(cases.docs.map((d: any) => [norm(d.title), d.slug]))

const exp = await payload.find({
  collection: 'company',
  where: { slug: { equals: 'experience' } },
  limit: 1,
  depth: 0,
})
const doc: any = exp.docs[0]
if (!doc) {
  console.error('No company doc with slug "experience" found.')
  process.exit(1)
}

const caseItems = (doc.caseItems ?? []).map((ci: any) => {
  if (ci.caseStudy) return ci
  const slug = ALIAS[norm(ci.title)] ?? titleToSlug.get(norm(ci.title))
  const id = slug ? slugToId.get(slug) : undefined
  return id ? { ...ci, caseStudy: id } : ci
})

await payload.update({ collection: 'company', id: doc.id, data: { caseItems } })

console.log('Linked Experience case items:')
caseItems.forEach((c: any) => console.log('  ·', c.title, '→', c.caseStudy ?? 'none'))
process.exit(0)
