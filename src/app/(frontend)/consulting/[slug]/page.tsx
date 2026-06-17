import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'
import { IndustryReveal } from '@/components/consulting/IndustryReveal'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

async function findIndustry(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] as any
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = await findIndustry(slug)
  if (!industry) return {}
  return {
    title: industry.meta?.title || industry.title,
    description: industry.meta?.description || industry.shortDescription || undefined,
  }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = await findIndustry(slug)
  if (!industry) notFound()

  const hero = industry.hero || {}
  const title = hero.headline || industry.title
  const tagline = industry.shortDescription || ''
  const intro = hero.intro || ''
  const standards = ((industry.standards || []) as { label: string }[]).map((s) => s.label)
  const capabilities = (industry.capabilities || []) as { title: string; description?: string }[]
  // The detail-page hero scope list mirrors the capability titles (template
  // behaviour when no explicit scope is supplied).
  const scope = capabilities.map((c) => c.title).filter(Boolean)
  const experienceHighlight = industry.experienceHighlight as string | undefined
  const ctaLabel = industry.ctaLabel || 'Book a Consultation'
  const ctaHref = industry.ctaHref || '#'

  return (
    <>
      <IndustryReveal />
      <main className="ip">
        {/* ---------- 1 · Hero ---------- */}
        <header className="ip-hero" data-screen-label="Hero">
          <div className="ip-hero__ghost" aria-hidden="true">
            {industry.title}
          </div>
          <div className="ip-hero__inner">
            <div className="ip-hero__copy">
              <p className="csa-eyebrow ip-hero__eyebrow">
                <span className="ip-hero__ico">
                  <i data-lucide={industry.icon}></i>
                </span>
                Functional Safety · {industry.title}
              </p>
              <h1 className="csa-display ip-hero__title">{title}</h1>
              {tagline && <p className="csa-lead ip-hero__tagline">{tagline}</p>}
              {intro && <p className="ip-hero__intro">{intro}</p>}
              <div className="ip-hero__cta">
                <a className="btn btn--gold-pill btn--lg" href={ctaHref}>
                  {ctaLabel} <i data-lucide="arrow-right"></i>
                </a>
                <Link className="btn btn--link" href="/consulting">
                  See How We Work <i data-lucide="arrow-right"></i>
                </Link>
              </div>
              {standards.length > 0 && (
                <div className="ip-hero__standards">
                  <span className="ip-hero__tick"></span>
                  <div className="ip-hero__std-list csa-mono">
                    {standards.map((s, i) => (
                      <Fragment key={s}>
                        <span>{s}</span>
                        {i < standards.length - 1 && <span className="dot">&middot;</span>}
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="ip-hud csa-glass">
              <div className="ip-hud__top">
                <span className="ip-hud__tag">Engagement scope</span>
                <span className="ip-hud__badge">
                  <span className="d"></span> Independent
                </span>
              </div>
              <div className="ip-scope">
                {scope.map((t) => (
                  <div className="ip-scope__row" key={t}>
                    <span className="ip-scope__mark">
                      <i data-lucide="check"></i>
                    </span>
                    <p className="ip-scope__t">{t}</p>
                  </div>
                ))}
              </div>
              <p className="ip-hud__foot">
                Principal-led<span className="sep">&middot;</span>Decades of combined experience
              </p>
            </aside>
          </div>
        </header>

        {/* ---------- 2 · Core Capabilities / Deliverables ---------- */}
        {capabilities.length > 0 && (
          <section className="ip-sec ip-band-top" data-screen-label="Core Capabilities">
            <div className="ip-head ip-reveal">
              <span className="csa-eyebrow">Core Capabilities</span>
              <h2 className="csa-h2 ip-head__title">What we deliver for {industry.title.toLowerCase()} programs.</h2>
            </div>
            <div className="ip-cap__grid ip-reveal">
              {capabilities.map((it) => (
                <div className="ip-cap" key={it.title}>
                  <div className="ip-cap__icon">
                    <i data-lucide={industry.icon}></i>
                  </div>
                  <h3 className="ip-cap__t">{it.title}</h3>
                  <p className="ip-cap__d">{it.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- 3 · Primary Standards We Navigate ---------- */}
        {standards.length > 0 && (
          <section className="ip-sec ip-band-top" data-screen-label="Primary Standards">
            <div className="ip-head ip-reveal">
              <span className="csa-eyebrow">Primary Standards We Navigate</span>
              <h2 className="csa-h2 ip-head__title">The {industry.title.toLowerCase()} safety framework.</h2>
            </div>
            <div className="ip-std__grid ip-reveal">
              {standards.map((code, i) => (
                <div className="ip-std" key={code}>
                  <p className="ip-std__n">{'STD ' + String(i + 1).padStart(2, '0')}</p>
                  <p className="ip-std__code">{code}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- 4 · Experience highlight (optional) ---------- */}
        {experienceHighlight && (
          <section className="ip-sec ip-band-top" data-screen-label="Case Study Highlight">
            <div className="ip-head ip-reveal">
              <span className="csa-eyebrow">Hands-On Experience</span>
              <h2 className="csa-h2 ip-head__title">Proof in the field.</h2>
            </div>
            <div className="ip-case csa-glass ip-reveal">
              <div className="ip-case__grid">
                <div>
                  <span className="ip-case__tag">
                    <i data-lucide="badge-check"></i> Experience
                  </span>
                  <p className="ip-case__d">{experienceHighlight}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------- 5 · Closing CTA ---------- */}
        <section className="ip-close" data-screen-label="Closing CTA">
          <div className="ip-close__haze" aria-hidden="true"></div>
          <div className="ip-close__inner">
            <span className="csa-eyebrow">{industry.title} · Concept to certification</span>
            <h2 className="csa-display ip-close__title">Discuss your {industry.title.toLowerCase()} program.</h2>
            <a className="btn btn--gold-pill btn--lg" href={ctaHref}>
              {ctaLabel} <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
