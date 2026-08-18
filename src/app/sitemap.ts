import type { MetadataRoute } from 'next'

import { findDocs } from '@/lib/cms'
import { primaryOrigin } from '@/lib/origin'

export const dynamic = 'force-dynamic'

/**
 * /sitemap.xml — discovery surface for search engines and AI crawlers. Static
 * marketing routes plus every published slug in the collections that have a
 * public detail page. Slugs come through the same cached, access-checked CMS
 * fetchers the pages use, so the sitemap can never list unpublished content.
 */

/** Public marketing routes without a backing slug collection. */
const STATIC_PATHS = [
  '/',
  '/consulting',
  '/company',
  '/company/services',
  '/company/experience',
  '/company/careers',
  '/resources',
  '/resources/articles',
  '/resources/events-webinars',
  '/resources/free-trainings',
  '/resources/downloadable-resources',
  '/training',
  '/training/course-catalog',
  '/training/digital-courses',
  '/training/browse-all-templates',
  '/training/purchase-templates',
  '/training/request-a-private-course',
  '/book-a-consultation',
]

/** Collections with a public /prefix/[slug] detail route. */
const SLUG_ROUTES: { collection: string; prefix: string; exclude?: string[] }[] = [
  // The 'overview' row renders /consulting itself (already in STATIC_PATHS).
  { collection: 'consulting', prefix: '/consulting', exclude: ['overview'] },
  { collection: 'articles', prefix: '/resources/articles' },
  { collection: 'case-studies', prefix: '/case-studies' },
  { collection: 'courses', prefix: '/training/courses' },
  { collection: 'legal-pages', prefix: '/legal' },
]

type SlugDoc = { slug?: string; updatedAt?: string }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = primaryOrigin()

  const slugLists = await Promise.all(
    SLUG_ROUTES.map(({ collection }) =>
      findDocs<SlugDoc>(collection, { limit: 500, depth: 0 }),
    ),
  )

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: origin + path,
  }))

  SLUG_ROUTES.forEach(({ prefix, exclude }, i) => {
    for (const doc of slugLists[i]) {
      if (typeof doc.slug !== 'string' || !doc.slug) continue
      if (exclude?.includes(doc.slug)) continue
      entries.push({
        url: `${origin}${prefix}/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
      })
    }
  })

  return entries
}
