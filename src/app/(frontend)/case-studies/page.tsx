import type { Metadata } from 'next'

import { findDocs } from '@/lib/cms'
import { mediaUrl } from '@/lib/media'
import { CaseStudiesCarousel, type CaseCard } from '../_sections/case-studies/CaseStudiesCarousel'

export const dynamic = 'force-dynamic'

type Code = { code?: string }
type Testimonial = { quote?: string; authorName?: string; authorCompany?: string }
type CaseStudyDoc = {
  slug?: string
  title?: string
  sector?: string
  lead?: string
  standards?: Code[]
  testimonialRef?: Testimonial | string | null
  heroImage?: { url?: string } | string | number | null
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Case Studies | Critical Systems Analysis',
    description: 'Real results from teams shipping safety-critical systems — proof, not promises.',
  }
}

/**
 * Case Studies — listing/carousel page, ported pixel-faithful from
 * design-reference/project/Case Studies.html (which mounts assets/case-studies.jsx's
 * CaseStudiesSection). The carousel cards come from the `case-studies` collection;
 * each card's pull-quote is resolved from its linked testimonial (testimonialRef,
 * depth 2). Card CTAs link to the detail page at /case-studies/<slug>. The
 * interactive carousel lives in the co-located client component.
 */
export default async function CaseStudiesPage() {
  const docs = await findDocs<CaseStudyDoc>('case-studies', { depth: 2, sort: 'createdAt' })

  const cards: CaseCard[] = docs.map((d, i) => {
    const t = typeof d.testimonialRef === 'object' && d.testimonialRef ? d.testimonialRef : null
    return {
      id: 'cs-' + i,
      slug: d.slug ?? '',
      sector: d.sector ?? '',
      name: d.title ?? '',
      desc: d.lead ?? '',
      standards: (d.standards ?? []).map((s) => s.code).filter((c): c is string => Boolean(c)),
      quote: t?.quote ?? d.lead ?? '',
      author: t?.authorName ?? d.title ?? '',
      affiliation: t?.authorCompany ?? null,
      cover: mediaUrl(d.heroImage),
    }
  })

  if (cards.length === 0) return null

  return <CaseStudiesCarousel cards={cards} />
}
