/**
 * Reseed ONLY the site-config globals (header, footer, site-settings) from the
 * canonical seed in src/seed/globals/site.ts. Collections are left untouched, so
 * this is safe to run against a populated DB to push corrected nav hrefs without
 * disturbing content. Run: npm run reseed:globals
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { globals } from '@/seed/globals/site'

const payload = await getPayload({ config })

let n = 0
for (const [slug, data] of Object.entries(globals)) {
  await payload.updateGlobal({ slug: slug as never, data: data as never, overrideAccess: true })
  console.log('· updated global:', slug)
  n++
}

console.log(`Reseeded ${n} globals (header, footer, site-settings) — nav hrefs reconciled.`)
process.exit(0)
