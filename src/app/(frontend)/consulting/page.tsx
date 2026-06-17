import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'
import { OverviewFaq } from '@/components/consulting/OverviewFaq'
import { OverviewReveal } from '@/components/consulting/OverviewReveal'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // `consultingOverview` is registered in payload.config.ts; cast the client so
  // the call compiles before `payload generate:types` is re-run.
  const co = (await (payload as any).findGlobal({ slug: 'consultingOverview' })) as any
  return {
    title: co?.meta?.title || 'Functional Safety Consulting & Contract Engineering',
    description: co?.meta?.description || undefined,
  }
}

export default async function ConsultingOverviewPage() {
  const payload = await getPayloadClient()

  const [coRaw, industriesRes] = await Promise.all([
    (payload as any).findGlobal({ slug: 'consultingOverview', depth: 1 }) as Promise<any>,
    payload.find({ collection: 'industries', sort: 'order', limit: 100, depth: 1 }),
  ])

  const co = coRaw || {}
  const hero = co.hero || {}
  const hud = hero.hud || {}
  const facts = co.facts || {}
  const about = co.about || {}
  const options = co.options || {}
  const capabilities = co.capabilities || {}
  const industriesSection = co.industriesSection || {}
  const faq = co.faq || {}
  const closing = co.closing || {}

  const standards = (hero.standards || []) as { label: string }[]
  const steps = (hud.steps || []) as { title: string; description: string }[]
  const factItems = (facts.items || []) as { icon: string; kicker: string; title: string; description: string }[]
  const creds = (about.creds || []) as { icon: string; title: string; description: string }[]
  const optionItems = (options.items || []) as { number: string; icon: string; title: string; description: string; bestFor?: string }[]
  const capItems = (capabilities.items || []) as { icon: string; code: string; title: string; description: string }[]
  const faqItems = ((faq.items || []) as { question: string; answer: string }[]).map((q) => ({ question: q.question, answer: q.answer }))

  // Industries grid cards come from the collection. The prototype shows a short
  // standards line under each title — derive it from the first standards chips.
  const industries = industriesRes.docs.map((d: any) => ({
    slug: d.slug,
    icon: d.icon,
    title: d.title,
    standards: (d.standards || [])
      .slice(0, 2)
      .map((s: any) => s.label)
      .join(' · '),
  }))

  // Title supports a manual line break (\n) for the two-line hero display.
  const titleLines = (hero.title || '').split('\n')

  return (
    <>
      <OverviewReveal />
      <main className="co">
        {/* ---------- 1 · Hero ---------- */}
        <header className="co-hero" data-screen-label="Hero">
          <div className="co-hero__ghost" aria-hidden="true">
            {hero.ghost}
          </div>
          <div className="co-hero__inner">
            <div className="co-hero__copy">
              <p className="csa-eyebrow">{hero.eyebrow}</p>
              <h1 className="csa-display co-hero__title">
                {titleLines.map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="csa-lead co-hero__sub">{hero.sub}</p>
              <div className="co-hero__cta">
                <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref || '#'}>
                  {hero.primaryCtaLabel} <i data-lucide="arrow-right"></i>
                </a>
                <a className="btn btn--link" href={hero.secondaryCtaHref || '#'}>
                  {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
                </a>
              </div>
              <div className="co-hero__standards">
                <span className="co-hero__tick"></span>
                <div className="co-hero__std-list csa-mono">
                  {standards.map((s, i) => (
                    <Fragment key={s.label}>
                      <span>{s.label}</span>
                      {i < standards.length - 1 && <span className="dot">&middot;</span>}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <aside className="co-hud csa-glass">
              <div className="co-hud__top">
                <span className="co-hud__tag">{hud.tag}</span>
                <span className="co-hud__badge">
                  <span className="d"></span> {hud.badge}
                </span>
              </div>
              <div className="co-steps">
                {steps.map((s, i) => (
                  <div className="co-step" key={s.title}>
                    <div className="co-step__rail">
                      <span className="co-step__node"></span>
                    </div>
                    <div>
                      <p className="co-step__n">{String(i + 1).padStart(2, '0')}</p>
                      <p className="co-step__t">{s.title}</p>
                      <p className="co-step__d">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="co-hud__foot">{hud.foot}</p>
            </aside>
          </div>
        </header>

        {/* ---------- 2 · Quick Facts ---------- */}
        <section className="co-sec co-facts co-band-top" data-screen-label="Technical Authority">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{facts.eyebrow}</span>
            <h2 className="csa-h2 co-head__title">{facts.title}</h2>
            <p className="csa-lead co-head__lead">{facts.lead}</p>
          </div>
          <div className="co-facts__grid co-reveal">
            {factItems.map((f) => (
              <div className="co-fact" key={f.kicker}>
                <div className="co-fact__icon">
                  <i data-lucide={f.icon}></i>
                </div>
                <p className="co-fact__k">{f.kicker}</p>
                <h3 className="co-fact__t">{f.title}</h3>
                <p className="co-fact__d">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 3 · About ---------- */}
        <section className="co-sec" data-screen-label="About CSA">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{about.eyebrow}</span>
            <h2 className="csa-h2 co-head__title">{about.title}</h2>
          </div>
          <div className="co-about__grid">
            <div className="co-about__prose co-reveal">
              {about.prose ? <RichText data={about.prose} /> : null}
              <blockquote className="co-about__quote">{about.quote}</blockquote>
            </div>
            <aside className="co-creds csa-glass co-reveal">
              <p className="co-creds__label">{about.credsLabel}</p>
              {creds.map((c) => (
                <div className="co-cred" key={c.title}>
                  <span className="co-cred__icon">
                    <i data-lucide={c.icon}></i>
                  </span>
                  <div>
                    <p className="co-cred__t">{c.title}</p>
                    <p className="co-cred__d">{c.description}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ---------- 4 · Engagement options ---------- */}
        <section className="co-sec co-band-top" data-screen-label="How We Provide Consulting">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{options.eyebrow}</span>
            <h2 className="csa-h2 co-head__title">{options.title}</h2>
            <p className="csa-lead co-head__lead">{options.lead}</p>
          </div>
          <div className="co-opts__grid co-reveal">
            {optionItems.map((o) => (
              <div className="co-opt" key={o.number}>
                <div className="co-opt__top">
                  <span className="co-opt__n">{o.number}</span>
                  <span className="co-opt__icon">
                    <i data-lucide={o.icon}></i>
                  </span>
                </div>
                <h3 className="co-opt__t">{o.title}</h3>
                <p className="co-opt__d">{o.description}</p>
                {o.bestFor && (
                  <div className="co-opt__meta">
                    <span className="co-opt__meta-l">Best for</span>
                    <span className="co-opt__meta-t">{o.bestFor}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 5 · Contract engineering capabilities ---------- */}
        <section className="co-sec co-sec--alt co-band-top" data-screen-label="Contract Engineering">
          <div className="co-sec__inner">
            <div className="co-head co-reveal">
              <span className="csa-eyebrow">{capabilities.eyebrow}</span>
              <h2 className="csa-h2 co-head__title">{capabilities.title}</h2>
              <p className="csa-lead co-head__lead">{capabilities.lead}</p>
            </div>
            <div className="co-cap__grid co-reveal">
              {capItems.map((c) => (
                <div className="co-cap" key={c.code}>
                  <span className="co-cap__icon">
                    <i data-lucide={c.icon}></i>
                  </span>
                  <div>
                    <p className="co-cap__code">{c.code}</p>
                    <h3 className="co-cap__t">{c.title}</h3>
                    <p className="co-cap__d">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 6 · Industries ---------- */}
        <section className="co-sec co-band-top" data-screen-label="Industries We Serve">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{industriesSection.eyebrow}</span>
            <h2 className="csa-h2 co-head__title">{industriesSection.title}</h2>
            <p className="csa-lead co-head__lead">{industriesSection.lead}</p>
          </div>
          <div className="co-ind__grid co-reveal">
            {industries.map((ind: any) => (
              <Link className="co-ind" key={ind.slug} href={`/consulting/${ind.slug}`}>
                <div className="co-ind__top">
                  <span className="co-ind__icon">
                    <i data-lucide={ind.icon}></i>
                  </span>
                  <span className="co-ind__arrow">
                    <i data-lucide="arrow-up-right"></i>
                  </span>
                </div>
                <h3 className="co-ind__t">{ind.title}</h3>
                <p className="co-ind__d">{ind.standards}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- 7 · Common Questions (interactive) ---------- */}
        <OverviewFaq eyebrow={faq.eyebrow} title={faq.title} items={faqItems} />

        {/* ---------- 8 · Closing CTA ---------- */}
        <section className="co-close" data-screen-label="Closing CTA">
          <div className="co-close__haze" aria-hidden="true"></div>
          <div className="co-close__inner">
            <span className="csa-eyebrow">{closing.eyebrow}</span>
            <h2 className="csa-display co-close__title">{closing.title}</h2>
            <p className="csa-lead co-close__sub">{closing.sub}</p>
            <a className="btn btn--gold-pill btn--lg" href={closing.ctaHref || '#'}>
              {closing.ctaLabel} <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
