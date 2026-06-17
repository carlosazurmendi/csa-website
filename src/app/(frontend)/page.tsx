import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'
import { Hero } from '@/components/home/Hero'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Partners } from '@/components/home/Partners'
import { Problem } from '@/components/home/Problem'
import { Services } from '@/components/home/Services'
import { StandingApart } from '@/components/home/StandingApart'
import { About } from '@/components/home/About'
import { News } from '@/components/home/News'

// Rendered per request via the Local API, so CMS edits are always live and the
// Docker image builds without a database connection.
export const dynamic = 'force-dynamic'

const mediaUrl = (m: unknown): string | undefined =>
  m && typeof m === 'object' && 'url' in m ? ((m as { url?: string }).url ?? undefined) : undefined

const monthYear = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : ''

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const home = (await payload.findGlobal({ slug: 'homePage' })) as any
  return {
    title: home?.meta?.title || 'Functional Safety Engineering Consulting',
    description: home?.meta?.description || undefined,
  }
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [home, industriesRes, servicesRes, partnersRes, articlesRes, caseStudiesRes] = await Promise.all([
    payload.findGlobal({ slug: 'homePage', depth: 2 }) as Promise<any>,
    payload.find({ collection: 'industries', sort: 'order', limit: 100, depth: 1 }),
    payload.find({ collection: 'services', sort: 'order', limit: 100, depth: 1 }),
    payload.find({ collection: 'partners', sort: 'order', limit: 200, depth: 1 }),
    payload.find({
      collection: 'articles',
      sort: '-publishedDate',
      limit: 3,
      depth: 1,
      where: { _status: { equals: 'published' } },
    }),
    payload.find({ collection: 'caseStudies', sort: 'order', limit: 100, depth: 1 }),
  ])

  const hero = home?.hero || {}
  const problem = home?.problem || {}
  const sv = home?.servicesSection || {}
  const sa = home?.standingApart || {}
  const about = home?.about || {}
  const csSec = home?.caseStudiesSection || {}
  const ptSec = home?.partnersSection || {}
  const nwSec = home?.newsSection || {}

  // ---- Collection → component-prop mapping ----
  const industries = industriesRes.docs.map((d: any) => ({
    title: d.title,
    icon: d.icon,
    shortDescription: d.shortDescription || '',
    highlights: (d.highlights || []).map((h: any) => ({ text: h.text })),
    standards: (d.standards || []).map((s: any) => ({ label: s.label })),
  }))

  const services = servicesRes.docs.map((d: any) => ({
    title: d.title,
    icon: d.icon,
    description: d.description || '',
    points: (d.points || []).map((p: any) => ({ text: p.text })),
    bestFor: d.bestFor,
  }))

  const partnerDocs = partnersRes.docs as any[]
  const customers = partnerDocs
    .filter((p) => p.type === 'customer')
    .map((p) => ({ name: p.name, domain: p.domain, mono: p.mono, logoUrl: mediaUrl(p.logo) }))
  const partners = partnerDocs
    .filter((p) => p.type === 'partner')
    .map((p) => ({ name: p.name, role: p.role, mono: p.mono, domain: p.domain, logoUrl: mediaUrl(p.logo) }))

  const articles = articlesRes.docs.map((a: any) => ({
    category: a.category,
    date: monthYear(a.publishedDate),
    title: a.title,
    href: `/resources/articles/${a.slug}`,
  }))

  const cases = caseStudiesRes.docs.map((c: any) => ({
    sector: c.sector,
    name: c.name,
    description: c.description || '',
    standards: (c.standards || []).map((s: any) => ({ label: s.label })),
    coverUrl: mediaUrl(c.coverImage),
    quote: c.testimonial?.quote,
    author: c.testimonial?.author,
    affiliation: c.testimonial?.affiliation,
  }))

  return (
    <>
      <Hero
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        highlightWord={hero.highlightWord}
        subhead={hero.subhead}
        sub={hero.sub}
        primaryCtaLabel={hero.primaryCtaLabel}
        primaryCtaHref={hero.primaryCtaHref}
        secondaryCtaLabel={hero.secondaryCtaLabel}
        secondaryCtaHref={hero.secondaryCtaHref}
        backgroundVideoUrl={hero.backgroundVideoUrl}
        systems={(hero.systems || []).map((s: any) => ({
          category: s.category,
          name: s.name,
          blurb: s.blurb,
          videoUrl: s.videoUrl,
          posterUrl: s.posterUrl,
          isGif: s.isGif,
          metricLabel: s.metricLabel,
          metricValue: s.metricValue,
          standards: (s.standards || []).map((x: any) => ({ label: x.label })),
          sizeK: s.sizeK,
          offsetY: s.offsetY,
          activeRY: s.activeRY,
        }))}
        tickerStandards={(hero.tickerStandards || []).map((t: any) => ({ label: t.label }))}
      />

      <CaseStudies
        eyebrow={csSec.eyebrow}
        title={csSec.title}
        sub={csSec.sub}
        ctaLabel={csSec.ctaLabel}
        cases={cases}
      />

      <Partners
        eyebrow={ptSec.eyebrow}
        title={ptSec.title}
        sub={ptSec.sub}
        partnersLabel={ptSec.partnersLabel}
        partnersIntro={ptSec.partnersIntro}
        customers={customers}
        partners={partners}
      />

      <Problem
        eyebrow={problem.eyebrow}
        title={problem.title}
        lead={problem.lead}
        solutionLabel={problem.solutionLabel}
        solutions={(problem.solutions || []).map((s: any) => ({
          icon: s.icon,
          title: s.title,
          description: s.description,
        }))}
      />

      <Services
        eyebrow={sv.eyebrow}
        servicesTitle={sv.servicesTitle}
        industriesTitle={sv.industriesTitle}
        servicesLead={sv.servicesLead}
        industriesLead={sv.industriesLead}
        servicesCta={sv.servicesCta}
        industriesCta={sv.industriesCta}
        services={services}
        industries={industries}
      />

      <StandingApart
        eyebrow={sa.eyebrow}
        title={sa.title}
        lead={sa.lead}
        mandateKicker={sa.mandateKicker}
        mandateTag={sa.mandateTag}
        oldWayLabel={sa.oldWayLabel}
        newWayLabel={sa.newWayLabel}
        rows={(sa.rows || []).map((r: any) => ({
          theme: r.theme,
          oldTitle: r.oldTitle,
          oldDesc: r.oldDesc,
          newTitle: r.newTitle,
          newDesc: r.newDesc,
        }))}
        neverAiLabel={sa.neverAiLabel}
        neverAi={(sa.neverAi || []).map((b: any) => ({ icon: b.icon, label: b.label }))}
        humanNote={sa.humanNote}
      />

      <About
        eyebrow={about.eyebrow}
        title={about.title}
        portraitUrl={mediaUrl(about.portrait)}
        portraitAlt={about.name}
        name={about.name}
        role={about.role}
        location={about.location}
        calloutLabel={about.calloutLabel}
        bio={about.bio ? <RichText data={about.bio} /> : null}
        certs={(about.certs || []).map((c: any) => ({ icon: c.icon, title: c.title, subtitle: c.subtitle }))}
        experienceLabel={about.experienceLabel}
        experienceTags={(about.experienceTags || []).map((t: any) => ({ label: t.label }))}
        activeLabel={about.activeLabel}
        activeNote={about.activeNote}
        conferences={(about.conferences || []).map((c: any) => ({ icon: c.icon, label: c.label }))}
        ctaLabel={about.ctaLabel}
        ctaHref={about.ctaHref}
      />

      <News
        eyebrow={nwSec.eyebrow}
        title={nwSec.title}
        lead={nwSec.lead}
        ctaLabel={nwSec.ctaLabel}
        ctaHref={nwSec.ctaHref}
        articles={articles}
      />
    </>
  )
}
