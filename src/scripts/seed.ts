import { getPayload } from 'payload'
import config from '@payload-config'

// Page seeds
import { seed as home } from '@/seed/pages/home'
import { seed as consulting } from '@/seed/pages/consulting'
import { seed as training } from '@/seed/pages/training-templates'
import { seed as company } from '@/seed/pages/company'
import { seed as resources } from '@/seed/pages/resources'
// Content seeds
import { seed as instructors } from '@/seed/content/instructors'
import { seed as testimonials } from '@/seed/content/testimonials'
import { seed as products } from '@/seed/content/products'
import { seed as courses } from '@/seed/content/courses'
import { seed as assessments } from '@/seed/content/assessments'
import { seed as caseStudies } from '@/seed/content/case-studies'
import { seed as articles } from '@/seed/content/articles'
import { seed as partnerLogos } from '@/seed/content/partner-logos'
import { seed as trustedLogos } from '@/seed/content/trusted-logos'
import { seed as freeTrainings } from '@/seed/content/free-trainings'
import { seed as downloads } from '@/seed/content/downloads'
import { seed as events } from '@/seed/content/events'
import { seed as jobPostings } from '@/seed/content/job-postings'
import { seed as teamMembers } from '@/seed/content/team-members'
import { seed as legalPages } from '@/seed/content/legal-pages'
// Site-config globals (header, footer, site settings)
import { globals } from '@/seed/globals/site'

type SeedModule = { collection: string; docs: Record<string, unknown>[] }

// Dependency order: referenced collections before the ones that reference them; pages last.
const MODULES: SeedModule[] = [
  instructors, testimonials, products, courses, assessments, caseStudies, articles,
  partnerLogos, trustedLogos, freeTrainings, downloads, events, jobPostings, teamMembers,
  legalPages, home, consulting, training, company, resources,
] as SeedModule[]

const NATURAL_KEYS = ['slug', 'email', 'certificateId', 'orderNumber', 'name', 'title', 'code']

const payload = await getPayload({ config })

const idMap: Record<string, Record<string, number | string>> = {}

const isRef = (v: unknown): v is { _ref: { collection: string; slug: string } } =>
  !!v && typeof v === 'object' && '_ref' in (v as object)

/** Recursively resolve { _ref:{collection,slug} } markers to ids; unresolved refs are dropped. */
const resolve = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(resolve).filter((v) => v !== undefined)
  if (isRef(value)) {
    const { collection, slug } = value._ref
    return idMap[collection]?.[slug]
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const r = resolve(v)
      if (r !== undefined) out[k] = r
    }
    return out
  }
  return value
}

const fieldNames = (slug: string): Set<string> => {
  const cfg = (payload.collections as Record<string, { config?: { flattenedFields?: { name?: string }[]; fields?: { name?: string }[] } }>)[slug]?.config
  const flat = cfg?.flattenedFields || cfg?.fields || []
  const names = new Set<string>()
  for (const f of flat) if (f?.name) names.add(f.name)
  return names
}

const naturalKey = (
  doc: Record<string, unknown>,
  names: Set<string>,
): { field: string; value: unknown } | null => {
  for (const k of NATURAL_KEYS) if (doc[k] && names.has(k)) return { field: k, value: doc[k] }
  return null
}

const draftEnabled = (slug: string): boolean =>
  !!(payload.collections as Record<string, { config?: { versions?: { drafts?: unknown } } }>)[slug]
    ?.config?.versions?.drafts

// Wrap the whole run so a failure is LOUD and NON-ZERO. `payload run` catches a
// thrown error but still exits 0, which once let a half-applied schema slip through
// to a silent, half-built site. Catching here + process.exit(1) makes the bootstrap
// (set -e) abort with the real error instead.
try {
let created = 0
let updated = 0

// Pass 1 — upsert skeletons (relationships stripped), record ids by natural key.
for (const mod of MODULES) {
  idMap[mod.collection] ||= {}
  const names = fieldNames(mod.collection)
  for (const raw of mod.docs) {
    const data = resolve(raw) as Record<string, unknown>
    if (draftEnabled(mod.collection)) data._status = 'published'
    const nk = naturalKey(data, names)
    const existing = nk
      ? (
          await payload.find({
            collection: mod.collection as never,
            where: { [nk.field]: { equals: nk.value } } as never,
            limit: 1,
            depth: 0,
            overrideAccess: true,
          })
        ).docs[0]
      : null

    let doc
    if (existing) {
      doc = await payload.update({
        collection: mod.collection as never,
        id: (existing as { id: number | string }).id,
        data: data as never,
        overrideAccess: true,
      })
      updated++
    } else {
      doc = await payload.create({
        collection: mod.collection as never,
        data: data as never,
        overrideAccess: true,
      })
      created++
    }
    if (nk) idMap[mod.collection][String(nk.value)] = (doc as { id: number | string }).id
  }
}

// Pass 2 — resolve and set relationships now that every id is known.
for (const mod of MODULES) {
  const names = fieldNames(mod.collection)
  for (const raw of mod.docs) {
    const hasRefs = JSON.stringify(raw).includes('"_ref"')
    if (!hasRefs) continue
    const data = resolve(raw) as Record<string, unknown>
    const nk = naturalKey(data, names)
    if (!nk) continue
    const id = idMap[mod.collection]?.[String(nk.value)]
    if (!id) continue
    await payload.update({
      collection: mod.collection as never,
      id,
      data: data as never,
      overrideAccess: true,
    })
  }
}

// Globals — header, footer, site settings (structural; always live).
let globalCount = 0
for (const [slug, data] of Object.entries(globals)) {
  await payload.updateGlobal({ slug: slug as never, data: data as never, overrideAccess: true })
  globalCount++
}

const summary = `Seed complete — ${created} created, ${updated} updated across ${MODULES.length} collections; ${globalCount} globals set.`
payload.logger.info(summary)
// Synchronous write too, so the line isn't lost to the immediate process.exit below
// (payload's async logger can be truncated by exit) — this is the success sentinel.
console.log(summary)
process.exit(0)
} catch (err) {
  console.error('[seed] FAILED — the content seed did not complete:')
  console.error(err instanceof Error ? (err.stack ?? err.message) : err)
  process.exit(1)
}
