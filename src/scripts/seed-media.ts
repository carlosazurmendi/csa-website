/**
 * M4 media seed — fills the (formerly <image-slot>) image fields with on-brand
 * placeholder images so every card/hero/portrait reads as intended. Placeholders
 * are generated with sharp (dark CSA gradient + gold label) and uploaded through
 * the Payload Local API, so they land in the configured bucket (MinIO in dev,
 * Supabase Storage in prod) and get the responsive imageSizes generated.
 *
 * Idempotent: a placeholder is keyed by its `alt`; an existing one is reused.
 * Run on the HOST via npx tsx with the S3 endpoint pointed at the published
 * MinIO port:
 *   set -a && . ./.env && set +a \
 *     && export DATABASE_URI="$(echo "$DATABASE_URI" | sed 's#@postgres:#@localhost:#')" \
 *     && export SUPABASE_S3_ENDPOINT=http://localhost:9000 \
 *     && NODE_ENV=development npx tsx src/scripts/seed-media.ts
 */
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

type Variant = 'cover' | 'portrait' | 'logo' | 'avatar'
const DIMS: Record<Variant, { w: number; h: number }> = {
  cover: { w: 1200, h: 750 },
  portrait: { w: 800, h: 1000 },
  logo: { w: 480, h: 240 },
  avatar: { w: 480, h: 480 },
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function svg(variant: Variant, label: string): string {
  const { w, h } = DIMS[variant]
  const logo = variant === 'logo'
  const bgA = logo ? '#1b2330' : '#131923'
  const bgB = logo ? '#0e131c' : '#0b0f16'
  const text = label.length > 26 ? label.slice(0, 25) + '…' : label
  const size = Math.round(Math.min(w, h) / (logo ? 9 : 11))
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="none" stroke="#46505F" stroke-opacity="0.45"/>
  <text x="50%" y="50%" fill="#C9A227" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="${size}" font-weight="700" letter-spacing="0.5" text-anchor="middle" dominant-baseline="middle">${esc(text)}</text>
</svg>`
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48) || 'img'

let created = 0
let reused = 0
const cacheByAlt = new Map<string, number>()

async function placeholder(variant: Variant, label: string, altPrefix: string): Promise<number> {
  const alt = `${altPrefix}: ${label}`
  if (cacheByAlt.has(alt)) return cacheByAlt.get(alt)!
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    const id = existing.docs[0].id as number
    cacheByAlt.set(alt, id)
    reused++
    return id
  }
  const buf = await sharp(Buffer.from(svg(variant, label))).png().toBuffer()
  const name = `${variant}-${slug(label)}.png`
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buf, mimetype: 'image/png', name, size: buf.length },
  })
  const id = doc.id as number
  cacheByAlt.set(alt, id)
  created++
  return id
}

// ---- Case studies: hero image + client logo + related covers (same heroImage) ----
const caseStudies = await payload.find({ collection: 'case-studies', limit: 100, depth: 0 })
for (const cs of caseStudies.docs as any[]) {
  const heroId = await placeholder('cover', cs.title || 'Case study', 'Case study cover')
  const client = cs.client || {}
  const logoId = await placeholder('logo', client.clientName || cs.title || 'Client', 'Client logo')
  await payload.update({
    collection: 'case-studies',
    id: cs.id,
    draft: false,
    data: {
      heroImage: heroId,
      client: { clientName: client.clientName, role: client.role, logo: logoId },
    },
  })
  console.log('· case study', String(cs.title).slice(0, 30))
}

// ---- Articles: hero image ----
const articles = await payload.find({ collection: 'articles', limit: 100, depth: 0 })
for (const a of articles.docs as any[]) {
  const heroId = await placeholder('cover', a.title || 'Article', 'Article hero')
  await payload.update({ collection: 'articles', id: a.id, draft: false, data: { heroImage: heroId } })
  console.log('· article', String(a.title).slice(0, 30))
}

// ---- Team members: portrait (drives article author byline/bio photos) ----
const team = await payload.find({ collection: 'team-members', limit: 100, depth: 0 })
for (const m of team.docs as any[]) {
  const photoId = await placeholder('avatar', m.name || 'Team member', 'Team portrait')
  await payload.update({ collection: 'team-members', id: m.id, draft: false, data: { photo: photoId } })
  console.log('· team', String(m.name).slice(0, 30))
}

// ---- Instructors: avatar (course instructor + digital-courses "Ben") ----
const instructors = await payload.find({ collection: 'instructors', limit: 100, depth: 0 })
for (const ins of instructors.docs as any[]) {
  const avId = await placeholder('portrait', ins.name || 'Instructor', 'Instructor portrait')
  await payload.update({ collection: 'instructors', id: ins.id, draft: false, data: { avatar: avId } })
  console.log('· instructor', String(ins.name).slice(0, 30))
}

// ---- Home: founder portrait + per-card covers on the Case Studies carousel ----
const homeRes = await payload.find({ collection: 'home', limit: 1, depth: 0 })
const home = homeRes.docs[0] as any
if (home) {
  const portraitId = await placeholder('portrait', home.abName || 'Founder', 'Founder portrait')
  const csItems = Array.isArray(home.csItems) ? home.csItems : []
  const itemsWithCovers = []
  for (const it of csItems) {
    const coverId = await placeholder('cover', it.name || it.sector || 'Case study', 'Home case cover')
    itemsWithCovers.push({ ...it, cover: coverId })
  }
  await payload.update({
    collection: 'home',
    id: home.id,
    draft: false,
    data: { _status: 'published', abPortrait: portraitId, csItems: itemsWithCovers } as any,
  })
  console.log('· home portrait + ' + itemsWithCovers.length + ' case covers')
}

console.log(`\nDone. media created=${created} reused=${reused}`)
process.exit(0)
