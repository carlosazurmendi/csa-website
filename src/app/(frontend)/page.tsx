import type { Metadata } from 'next'

import { getHome, findDocs } from '@/lib/cms'
import { mediaUrl } from '@/lib/media'
import type { HomeDoc } from './_sections/home/types'
import { HeroSection } from './_sections/home/HeroSection'
import { CaseStudiesCarousel, type CaseCard } from './_sections/case-studies/CaseStudiesCarousel'
import { PartnersSection } from './_sections/home/PartnersSection'
import { ProblemSection } from './_sections/home/ProblemSection'
import { ServicesSection } from './_sections/home/ServicesSection'
import { StandingApartSection } from './_sections/home/StandingApartSection'
import { AboutSection } from './_sections/home/AboutSection'
import { NewsSection } from './_sections/home/NewsSection'

export const dynamic = 'force-dynamic'

type HomeWithSeo = HomeDoc & {
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Case-study cards come from the `case-studies` collection (not home.csItems) so each
// card's CTA links to its real detail page; the carousel is the single shared
// implementation used here and historically on the (now-removed) standalone page.
type Testimonial = { quote?: string; authorName?: string; authorCompany?: string }
type CaseStudyDoc = {
  slug?: string
  title?: string
  sector?: string
  lead?: string
  testimonialRef?: Testimonial | string | null
  heroImage?: { url?: string } | string | number | null
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome<HomeWithSeo>()
  return {
    title: home?.seo?.metaTitle ?? 'Functional Safety Engineering Consulting | CSA',
    description:
      home?.seo?.metaDescription ??
      'Functional safety engineering consulting for autonomous rail, robotics & machinery. Principal-led HARA, FMEA, ISO 26262 & IEC 61508 support. Faster certification.',
  }
}

/**
 * Home — the CSA landing page, ported pixel-faithful from design-reference/project/
 * Home.html. Each band is a section component reading the single `home` page-collection
 * record via the Local API (see src/collections/pages/Home.ts). The closing CTA band +
 * footer are rendered by the layout's SiteFooter.
 */
export default async function HomePage() {
  const [home, caseDocs] = await Promise.all([
    getHome<HomeDoc>().then((h) => h ?? ({} as HomeDoc)),
    findDocs<CaseStudyDoc>('case-studies', { depth: 2, sort: 'createdAt' }),
  ])

  const caseCards: CaseCard[] = caseDocs.map((d, i) => {
    const t = typeof d.testimonialRef === 'object' && d.testimonialRef ? d.testimonialRef : null
    return {
      id: 'cs-' + i,
      slug: d.slug ?? '',
      sector: d.sector ?? '',
      name: d.title ?? '',
      desc: d.lead ?? '',
      quote: t?.quote ?? d.lead ?? '',
      author: t?.authorName ?? d.title ?? '',
      affiliation: t?.authorCompany ?? null,
      cover: mediaUrl(d.heroImage),
    }
  })

  return (
    <>
      {/* Boot-wipe intro fires only on the Home entry point (interactions.js reads
          [data-csa-intro]); inner pages no longer replay it on every full load. */}
      <div data-csa-intro="CRITICAL SYSTEMS ANALYSIS" hidden />
      <HeroSection home={home} />
      <CaseStudiesCarousel
        cards={caseCards}
        heading={{
          eyebrow: home.csEyebrow,
          title: home.csHeading,
          sub: home.csSub,
          ctaLabel: home.csCtaLabel,
          ctaHref: '/company/experience',
        }}
      />
      <PartnersSection home={home} />
      <ProblemSection home={home} />
      <ServicesSection home={home} />
      <StandingApartSection home={home} />
      <AboutSection home={home} />
      <NewsSection home={home} />
    </>
  )
}
