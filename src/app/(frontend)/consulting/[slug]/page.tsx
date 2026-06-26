import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'

export const dynamic = 'force-dynamic'

/**
 * Consulting industry sub-page (/consulting/[slug]) — pixel-faithful port of the
 * locked Industry template (design-reference/project/assets/industry-page.jsx),
 * the single component every one of the eight industry pages renders. Canonical
 * data examples: Consulting/Rail.html (experience feature + intro) and
 * Consulting/Automotive.html (no feature). Robotics supplies the caseStudy
 * feature variant.
 *
 * ONE template, eight rows — Rail, Robotics, Machinery, Physical AI,
 * Construction & Mining Equipment, Automotive, Defense, Process. Editorial copy
 * comes from the `consulting` page-collection row matching params.slug (see
 * src/collections/pages/Consulting.ts + src/seed/pages/consulting.ts); the
 * Overview row has its own layout and lives at /consulting (not this route),
 * so generateStaticParams lists only the eight industry slugs.
 *
 * Structure (locked):
 *   Hero (HUD scope) → Core Capabilities → Primary Standards →
 *   optional Feature (experience | caseStudy) → Closing CTA.
 *
 * Pure static markup — no state/effects — so this stays a server component with
 * no co-located client section. The export's useReveal sets data-reveal="up" on
 * each .ip-reveal block and calls csaInit; here the reveal/lucide design system
 * is wired globally, so we put data-reveal="up" directly in markup and drop the
 * csaInit / window.lucide.createIcons calls. Design-only constants the CMS
 * doesn't carry (the hero's "See How We Work" secondary link → /consulting) are
 * kept inline, matching the export. Global nav/footer are rendered by the layout.
 */

type Standard = { code?: string }
type Capability = { icon?: string; code?: string; title?: string; desc?: string }
type StdItem = { code?: string; desc?: string }
type FeatItem = { title?: string; desc?: string }

type IndustryRow = {
  // Hero
  heroIcon?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroGhost?: string
  heroTagline?: string
  heroIntro?: unknown
  heroStandards?: Standard[]
  heroCtaLabel?: string
  heroCtaHref?: string
  heroScopeLabel?: string
  heroScopeBadge?: string
  heroScopeFoot?: string
  // Capabilities
  capsEyebrow?: string
  capsHeading?: string
  capsLead?: string
  capsItems?: Capability[]
  // Standards
  stdEyebrow?: string
  stdHeading?: string
  stdLead?: string
  stdItems?: StdItem[]
  // Feature (optional)
  featKind?: 'none' | 'experience' | 'caseStudy'
  featEyebrow?: string
  featHeading?: string
  featNote?: string
  featItems?: FeatItem[]
  featTag?: string
  featHeadline?: string
  featBody?: string
  featStatValue?: string
  featStatLabel?: string
  // Closing CTA
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSub?: string
  ctaLabel?: string
  ctaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
  title?: string
  navLabel?: string
}

// The eight industry slugs (NOT "overview", which has its own layout at /consulting).
const INDUSTRY_SLUGS = [
  'rail',
  'robotics',
  'machinery',
  'physical-ai',
  'construction-mining-equipment',
  'automotive',
  'defense',
  'process',
]

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const row = await findBySlug<IndustryRow>('consulting', slug)
  return {
    title: row?.seo?.metaTitle ?? `${row?.title ?? 'Functional Safety Consulting'} | CSA`,
    description:
      row?.seo?.metaDescription ??
      'Independent functional safety consulting and contract engineering for autonomous and safety-critical systems — concept to certification.',
  }
}

export default async function ConsultingIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const row = await findBySlug<IndustryRow>('consulting', slug)
  if (!row) notFound()

  const standards = (row.heroStandards ?? []).map((s) => s.code).filter(Boolean) as string[]
  const capabilities = row.capsItems ?? []
  const stdItems = row.stdItems ?? []
  const intro = lexicalToParagraphs(row.heroIntro)

  // HUD scope rows fall back to capability titles (matches the export's Hero).
  const scope = capabilities.map((c) => c.title).filter(Boolean) as string[]

  const featKind = row.featKind ?? 'none'
  const featItems = row.featItems ?? []

  return (
    <main className="ip">
      {/* ---------- 1 · Hero ---------- */}
      <header className="ip-hero">
        <div className="ip-hero__ghost" aria-hidden="true">
          {row.heroGhost ?? row.title}
        </div>
        <div className="ip-hero__inner">
          <div className="ip-hero__copy">
            <p className="csa-eyebrow ip-hero__eyebrow">
              {row.heroIcon && (
                <span className="ip-hero__ico">
                  <i data-lucide={row.heroIcon}></i>
                </span>
              )}
              {row.heroEyebrow}
            </p>
            <h1 className="csa-display ip-hero__title">{row.heroHeadline}</h1>
            <p className="csa-lead ip-hero__tagline">{row.heroTagline}</p>
            {intro.map((p, i) => (
              <p className="ip-hero__intro" key={i}>
                {p}
              </p>
            ))}
            <div className="ip-hero__cta">
              <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
                {row.heroCtaLabel} <i data-lucide="arrow-right"></i>
              </Link>
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
              <span className="ip-hud__tag">{row.heroScopeLabel ?? 'Engagement scope'}</span>
              <span className="ip-hud__badge">
                <span className="d"></span> {row.heroScopeBadge ?? 'Independent'}
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
              Principal-led<span className="sep">&middot;</span>
              {row.heroScopeFoot ?? 'Decades of combined experience'}
            </p>
          </aside>
        </div>
      </header>

      {/* ---------- 2 · Core Capabilities / Deliverables ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.capsEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.capsHeading}</h2>
          {row.capsLead && <p className="csa-lead ip-head__lead">{row.capsLead}</p>}
        </div>
        <div className="ip-cap__grid ip-reveal" data-reveal="up">
          {capabilities.map((it) => (
            <div className="ip-cap" key={it.title}>
              <div className="ip-cap__icon">
                <i data-lucide={it.icon}></i>
              </div>
              {it.code && <p className="ip-cap__code">{it.code}</p>}
              <h3 className="ip-cap__t">{it.title}</h3>
              <p className="ip-cap__d">{it.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 3 · Primary Standards We Navigate ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.stdEyebrow ?? 'Primary Standards We Navigate'}</span>
          <h2 className="csa-h2 ip-head__title">{row.stdHeading}</h2>
          {row.stdLead && <p className="csa-lead ip-head__lead">{row.stdLead}</p>}
        </div>
        <div className="ip-std__grid ip-reveal" data-reveal="up">
          {stdItems.map((it, i) => (
            <div className="ip-std" key={it.code}>
              <p className="ip-std__n">{'STD ' + String(i + 1).padStart(2, '0')}</p>
              <p className="ip-std__code">{it.code}</p>
              <p className="ip-std__d">{it.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 4 · Feature (optional) ---------- */}
      {featKind === 'experience' && (
        <section className="ip-sec--alt ip-band-top">
          <div className="ip-sec ip-sec__inner">
            <div className="ip-feat__grid">
              <div className="ip-feat__head ip-reveal" data-reveal="up">
                <span className="csa-eyebrow">{row.featEyebrow}</span>
                <h2 className="csa-h2 ip-feat__title">{row.featHeading}</h2>
                {row.featNote && <p className="ip-feat__note">{row.featNote}</p>}
              </div>
              <div className="ip-exp ip-reveal" data-reveal="up">
                {featItems.map((it, i) => (
                  <div className="ip-exp__row" key={it.title}>
                    <span className="ip-exp__n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="ip-exp__t">{it.title}</h3>
                      <p className="ip-exp__d">{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {featKind === 'caseStudy' && (
        <section className="ip-sec ip-band-top">
          <div className="ip-head ip-reveal" data-reveal="up">
            <span className="csa-eyebrow">{row.featEyebrow}</span>
            <h2 className="csa-h2 ip-head__title">{row.featHeading}</h2>
          </div>
          <div className="ip-case csa-glass ip-reveal" data-reveal="up">
            <div className="ip-case__grid">
              <div>
                <span className="ip-case__tag">
                  <i data-lucide="badge-check"></i> {row.featTag ?? 'Case study'}
                </span>
                <h3 className="ip-case__title">{row.featHeadline}</h3>
                <p className="ip-case__d">{row.featBody}</p>
              </div>
              {row.featStatValue && (
                <div className="ip-case__stat">
                  <div className="ip-case__stat-n">{row.featStatValue}</div>
                  <p className="ip-case__stat-l">{row.featStatLabel}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- 5 · Closing CTA ---------- */}
      <section className="ip-close">
        <div className="ip-close__haze" aria-hidden="true"></div>
        <div className="ip-close__inner">
          <span className="csa-eyebrow">{row.ctaEyebrow ?? 'Concept to certification'}</span>
          <h2 className="csa-display ip-close__title">{row.ctaHeading ?? 'Validate with confidence.'}</h2>
          {row.ctaSub && <p className="csa-lead ip-close__sub">{row.ctaSub}</p>}
          <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
            {row.ctaLabel} <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </section>
    </main>
  )
}
