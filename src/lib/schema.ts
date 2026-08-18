import 'server-only'

import { primaryOrigin } from './origin'
import { mediaUrl, type MediaLike } from './media'

/**
 * Schema.org JSON-LD builders (server-only). Pure functions: CMS docs in,
 * plain schema objects out — rendered by <JsonLd> as application/ld+json for
 * AI-driven search and classic rich results. Every value is CMS-driven; the
 * only literals here are schema.org vocabulary. All URLs are absolutized
 * against the canonical origin (NEXT_PUBLIC_SERVER_URL via primaryOrigin);
 * with no origin configured the paths degrade to site-relative, which only
 * happens outside production.
 */

type Dict = Record<string, unknown>

/** Drop empty members so the emitted JSON carries only real data. */
const compact = (obj: Dict): Dict => {
  const out: Dict = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(v) && v.length === 0) continue
    out[k] = v
  }
  return out
}

/** Site-relative path (or already-absolute URL) → absolute URL. */
export const absUrl = (pathOrUrl: string): string => {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return primaryOrigin() + pathOrUrl
}

/** Stable @id for the Organization node — page-level blobs reference it. */
export const orgId = (): string => absUrl('/#organization')

const centsToPrice = (cents: number): string => (cents / 100).toFixed(2)

/* ---------- site-wide (frontend layout) ---------- */

export type SiteSettingsDoc = {
  brand?: { name?: string; shortName?: string; tagline?: string; logo?: MediaLike }
  contact?: { email?: string; phone?: string; address?: string }
  socialLinks?: { url?: string }[]
}

export function orgSchema(s: SiteSettingsDoc | null): Dict {
  const logo = mediaUrl(s?.brand?.logo)
  return compact({
    '@type': 'Organization',
    '@id': orgId(),
    name: s?.brand?.name,
    alternateName: s?.brand?.shortName,
    description: s?.brand?.tagline,
    url: absUrl('/'),
    logo: logo ? absUrl(logo) : undefined,
    email: s?.contact?.email,
    telephone: s?.contact?.phone,
    address: s?.contact?.address,
    sameAs: (s?.socialLinks ?? []).map((l) => l.url).filter(Boolean),
  })
}

export function webSiteSchema(s: SiteSettingsDoc | null): Dict {
  return compact({
    '@type': 'WebSite',
    '@id': absUrl('/#website'),
    url: absUrl('/'),
    name: s?.brand?.name,
    publisher: { '@id': orgId() },
  })
}

/* ---------- shared ---------- */

export type Crumb = { name: string; path: string }

export function breadcrumbSchema(crumbs: Crumb[]): Dict {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  }
}

export function itemListSchema(items: Dict[]): Dict {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
  }
}

/* ---------- articles + case studies ---------- */

export function articleSchema(a: {
  title?: string
  description?: string
  path: string
  datePublished?: string
  image?: string
  authorName?: string
  section?: string
  keywords?: string[]
}): Dict {
  return compact({
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absUrl(a.path),
    url: absUrl(a.path),
    datePublished: a.datePublished,
    image: a.image ? absUrl(a.image) : undefined,
    author: a.authorName ? { '@type': 'Person', name: a.authorName } : { '@id': orgId() },
    publisher: { '@id': orgId() },
    articleSection: a.section,
    keywords: a.keywords,
  })
}

/* ---------- commerce ---------- */

const offer = (priceCents: number, path: string): Dict => ({
  '@type': 'Offer',
  price: centsToPrice(priceCents),
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  url: absUrl(path),
})

export function courseSchema(c: {
  title?: string
  summary?: string
  code?: string
  level?: string
  price?: number | null
  outcomes?: { outcome?: string }[]
  instructorName?: string
  path: string
}): Dict {
  return compact({
    '@type': 'Course',
    name: c.title,
    description: c.summary,
    courseCode: c.code,
    educationalLevel: c.level,
    url: absUrl(c.path),
    provider: { '@id': orgId() },
    instructor: c.instructorName ? { '@type': 'Person', name: c.instructorName } : undefined,
    teaches: (c.outcomes ?? []).map((o) => o.outcome).filter(Boolean),
    offers: typeof c.price === 'number' && c.price > 0 ? offer(c.price, c.path) : undefined,
  })
}

export function productSchema(p: {
  title?: string
  summary?: string
  code?: string
  category?: string
  price?: number | null
  path: string
  brandName?: string
}): Dict {
  return compact({
    '@type': 'Product',
    name: p.title,
    description: p.summary,
    sku: p.code,
    category: p.category,
    url: absUrl(p.path),
    brand: p.brandName ? { '@type': 'Brand', name: p.brandName } : undefined,
    offers: typeof p.price === 'number' && p.price > 0 ? offer(p.price, p.path) : undefined,
  })
}

/* ---------- events + hiring ---------- */

export function eventSchema(e: {
  title?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: string
  registerUrl?: string
  path: string
}): Dict {
  const virtual = /online|virtual|webinar/i.test(e.location ?? '')
  return compact({
    '@type': 'Event',
    name: e.title,
    description: e.description,
    startDate: e.startDate,
    endDate: e.endDate,
    eventAttendanceMode: e.location
      ? virtual
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode'
      : undefined,
    location: e.location
      ? virtual
        ? { '@type': 'VirtualLocation', url: e.registerUrl ? absUrl(e.registerUrl) : absUrl(e.path) }
        : { '@type': 'Place', name: e.location, address: e.location }
      : undefined,
    url: e.registerUrl || absUrl(e.path),
    organizer: { '@id': orgId() },
  })
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  contract: 'CONTRACTOR',
  internship: 'INTERN',
}

export function jobPostingSchema(j: {
  title?: string
  summary?: string
  department?: string
  location?: string
  type?: string
  postedAt?: string
  applyUrl?: string
  orgName?: string
  path: string
}): Dict {
  const remote = /remote/i.test(j.location ?? '')
  return compact({
    '@type': 'JobPosting',
    title: j.title,
    description: j.summary,
    datePosted: j.postedAt,
    employmentType: j.type ? EMPLOYMENT_TYPE[j.type] : undefined,
    industry: j.department,
    hiringOrganization: compact({ '@type': 'Organization', name: j.orgName, url: absUrl('/') }),
    jobLocationType: remote ? 'TELECOMMUTE' : undefined,
    jobLocation: !remote && j.location ? { '@type': 'Place', address: j.location } : undefined,
    applicantLocationRequirements:
      remote && j.location
        ? { '@type': 'AdministrativeArea', name: j.location.replace(/remote\s*[·:,-]?\s*/i, '') || j.location }
        : undefined,
    directApply: j.applyUrl ? true : undefined,
    url: j.applyUrl || absUrl(j.path),
  })
}
