import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { LucideRefresh } from '@/components/training/LucideRefresh'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const data = (await payload.findGlobal({ slug: 'trainingTemplatesOverview' })) as any
  return {
    title: data?.meta?.title || 'Functional Safety Training & Templates',
    description: data?.meta?.description || undefined,
  }
}

// Render a title that may contain a "\n" line break (design uses <br/>).
const lines = (s?: string | null) => (s || '').split('\n')

export default async function TrainingTemplatesOverviewPage() {
  const payload = await getPayloadClient()
  const data = (await payload.findGlobal({ slug: 'trainingTemplatesOverview', depth: 1 })) as any

  const hero = data?.overviewHero || {}
  const ways = data?.ways || {}
  const standards: { label: string }[] = hero.standards || []
  const wayItems: any[] = ways.items || []

  return (
    <>
      <LucideRefresh />
      <main data-screen-label="Training & Templates — Overview">
        {/* Hero */}
        <section className="tt-hero" data-screen-label="Overview Hero">
          <div className="tt-hero__haze"></div>
          <div className="tt-hero__ghost" aria-hidden="true">
            {hero.ghost}
          </div>
          <div className="tt-hero__inner">
            <p className="tt-crumb">
              Training &amp; Templates <span className="sep">/</span> <span className="cur">{hero.crumb}</span>
            </p>
            <h1 className="csa-display tt-hero__title">
              {lines(hero.title).map((l: string, i: number) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {l}
                </span>
              ))}
            </h1>
            <p className="csa-lead tt-hero__lead">{hero.lead}</p>
            <div className="tt-hero__actions">
              <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref || '#'}>
                {hero.primaryCtaLabel} <i data-lucide="arrow-right"></i>
              </a>
              <a className="btn btn--silver-pill btn--lg" href={hero.secondaryCtaHref || '#'}>
                {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
              </a>
            </div>
            <div className="tt-hero__standards">
              <span className="tt-hero__tick" aria-hidden="true"></span>
              <span className="tt-stdlist">
                {standards.map((s, i) => (
                  <span key={s.label} style={{ display: 'contents' }}>
                    {i > 0 && <span className="dot">&middot;</span>}
                    <span className="csa-mono">{s.label}</span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </section>

        {/* Two Ways to Build Internal Capability */}
        <section className="tt-section tt-ways" data-screen-label="Two Ways to Build Internal Capability">
          <div className="tt-head">
            <span className="csa-eyebrow">{ways.eyebrow}</span>
            <h2 className="csa-h2">{ways.title}</h2>
            <p className="csa-lead tt-head__lead">{ways.lead}</p>
          </div>
          <div className="tt-ways__grid csa-tilt-scene">
            {wayItems.map((w) => (
              <article className="tt-way csa-glass" key={w.num}>
                <p className="tt-way__num csa-mono">{w.num}</p>
                <div className="tt-way__icon">
                  <i data-lucide={w.icon}></i>
                </div>
                <h3 className="csa-h3 tt-way__title">{w.title}</h3>
                <p className="tt-way__desc">{w.description}</p>
                <div className="tt-way__meta">
                  {(w.meta || []).map((m: any) => (
                    <span className="tt-tag" key={m.label}>
                      {m.label}
                    </span>
                  ))}
                </div>
                <a className="tt-way__link" href={w.ctaHref || '#'}>
                  {w.ctaLabel} <i data-lucide="arrow-right"></i>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
