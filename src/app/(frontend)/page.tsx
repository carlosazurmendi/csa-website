import type { Metadata } from 'next'

import { getHome } from '@/lib/cms'
import type { HomeDoc } from './_sections/home/types'
import { HeroSection } from './_sections/home/HeroSection'
import { CaseStudiesSection } from './_sections/home/CaseStudiesSection'
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
  const home = (await getHome<HomeDoc>()) ?? {}
  return (
    <>
      {/* Boot-wipe intro fires only on the Home entry point (interactions.js reads
          [data-csa-intro]); inner pages no longer replay it on every full load. */}
      <div data-csa-intro="CRITICAL SYSTEMS ANALYSIS" hidden />
      <HeroSection home={home} />
      <CaseStudiesSection home={home} />
      <PartnersSection home={home} />
      <ProblemSection home={home} />
      <ServicesSection home={home} />
      <StandingApartSection home={home} />
      <AboutSection home={home} />
      <NewsSection home={home} />
    </>
  )
}
