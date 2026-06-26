import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'

export const dynamic = 'force-dynamic'

/**
 * Company · Experience — pixel-faithful port of
 * design-reference/project/Company/Experience.html (the `CompanyExperience`
 * component in assets/company.jsx).
 *
 * All editorial copy comes from the single `company` page row with slug
 * `experience` (hero, HUD side panel, the "Where we've delivered" capability
 * grid, the case-study framing + cards, and the closing CTA). The export's
 * team-member listing does not exist on this page, so no `team-members` read is
 * made. Reveal / lucide / csaInit design-tool calls are dropped (handled
 * globally). Pure static markup — no state/effects, so this stays a server
 * component with no co-located client section.
 */

type Action = { label?: string; href?: string; style?: 'gold' | 'silver' | 'link' }
type HudRow = { icon?: string; title?: string; description?: string }
type CapItem = { icon?: string; code?: string; title?: string; description?: string }
type CaseItem = {
  tag?: string
  title?: string
  problem?: string
  solution?: string
  // CMS relationship to the full case-study (id at depth 0, populated object deeper).
  caseStudy?: number | { slug?: string } | null
}

type ExperienceRow = {
  heroGhost?: string
  heroIcon?: string
  heroEyebrow?: string
  heroTitle?: string
  heroTagline?: string
  heroIntro?: string
  heroStandards?: { code?: string }[]
  heroActions?: Action[]
  hudTag?: string
  hudBadge?: string
  hudFoot?: string
  hudRows?: HudRow[]
  capsEyebrow?: string
  capsTitle?: string
  capsLead?: string
  capsItems?: CapItem[]
  caseEyebrow?: string
  caseTitle?: string
  caseLead?: string
  caseItems?: CaseItem[]
  caseNote?: string
  closeEyebrow?: string
  closeTitle?: string
  closeSub?: string
  closeActions?: Action[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<ExperienceRow>('company', 'experience')
  return {
    title: row?.seo?.metaTitle ?? 'Our Experience & Case Studies | CSA',
    description:
      row?.seo?.metaDescription ??
      'Hands-on functional safety certification experience across robotics, transport, and infrastructure — including the first-ever IEC 61508 certification for a collaborative AMR.',
  }
}

// Internal-link map (design export .html → App Router route).
const ROUTE_MAP: Record<string, string> = {
  'Book a Consultation.html': '/book-a-consultation',
  'Company/Overview.html': '/company',
  'Company/Experience.html': '/company/experience',
  'Company/Services.html': '/company/services',
}

const hrefFor = (raw?: string): string => {
  if (!raw) return '#'
  if (raw.startsWith('#') || raw.startsWith('/')) return raw
  return ROUTE_MAP[raw] ?? '/' + raw.replace(/\.html$/, '')
}

const BTN_CLASS: Record<NonNullable<Action['style']>, string> = {
  gold: 'btn btn--gold-pill btn--lg',
  silver: 'btn btn--silver-pill btn--lg',
  link: 'btn btn--link',
}

// Trailing Lucide icon per action style — mirrors the export (gold/silver pills
// carry "arrow-right", text links carry "arrow-right").
const actionIcon = (style?: Action['style']) => (style === 'link' ? 'arrow-right' : 'arrow-right')

function ActionButtons({ actions }: { actions: Action[] }) {
  return (
    <>
      {actions.map((a, i) => (
        <Link className={BTN_CLASS[a.style ?? 'gold']} href={hrefFor(a.href)} key={i}>
          {a.label} <i data-lucide={actionIcon(a.style)}></i>
        </Link>
      ))}
    </>
  )
}

export default async function CompanyExperiencePage() {
  const row = (await findBySlug<ExperienceRow>('company', 'experience')) ?? {}

  const standards = (row.heroStandards ?? []).map((s) => s.code ?? '').filter(Boolean)
  const heroActions = row.heroActions ?? []
  const hudRows = row.hudRows ?? []
  const capsItems = row.capsItems ?? []
  const caseItems = row.caseItems ?? []
  const closeActions = row.closeActions ?? []

  // Resolve each summary card to its full case-study detail page. An explicit CMS
  // relationship (the `caseStudy` field on the case item) wins; otherwise we match
  // on a normalised title (with a small alias for known rewordings); anything
  // unmatched falls back to the case-studies listing.
  const allCases = await findDocs<{ id: number; slug: string; title?: string }>('case-studies', { limit: 50 })
  const norm = (s?: string) => (s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const slugByTitle = new Map(allCases.map((c) => [norm(c.title), c.slug]))
  const slugById = new Map(allCases.map((c) => [c.id, c.slug]))
  const TITLE_ALIAS: Record<string, string> = {
    'collaborative autonomous mobile robot certification': 'collaborative-amr-iec-61508-certification',
  }
  const caseHref = (item: CaseItem): string => {
    const rel = item.caseStudy
    const relSlug = rel && typeof rel === 'object' ? rel.slug : rel != null ? slugById.get(rel) : undefined
    if (relSlug) return `/case-studies/${relSlug}`
    const slug = TITLE_ALIAS[norm(item.title)] ?? slugByTitle.get(norm(item.title))
    return slug ? `/case-studies/${slug}` : '/case-studies'
  }

  return (
    <main className="ip">
      {/* ---------- Hero ---------- */}
      <header className="ip-hero">
        <div className="ip-hero__ghost" aria-hidden="true">{row.heroGhost}</div>
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
            <h1 className="csa-display ip-hero__title">{row.heroTitle}</h1>
            <p className="csa-lead ip-hero__tagline">{row.heroTagline}</p>
            {row.heroIntro && <p className="ip-hero__intro">{row.heroIntro}</p>}
            <div className="ip-hero__cta co-actions">
              <ActionButtons actions={heroActions} />
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
              <span className="ip-hud__tag">{row.hudTag}</span>
              <span className="ip-hud__badge">
                <span className="d"></span> {row.hudBadge}
              </span>
            </div>
            <div className="ip-scope">
              {hudRows.map((r) => (
                <div className="ip-scope__row" key={r.title}>
                  <span className="ip-scope__mark">
                    <i data-lucide={r.icon || 'check'}></i>
                  </span>
                  <div>
                    <p className="ip-scope__t">{r.title}</p>
                    {r.description && <p className="co-scope__d">{r.description}</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="ip-hud__foot">
              Principal-led<span className="sep">&middot;</span>
              {row.hudFoot}
            </p>
          </aside>
        </div>
      </header>

      {/* ---------- Where We've Delivered ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.capsEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.capsTitle}</h2>
          <p className="csa-lead ip-head__lead">{row.capsLead}</p>
        </div>
        <div className="ip-cap__grid ip-reveal" data-reveal="up">
          {capsItems.map((it) => (
            <div className="ip-cap" key={it.title}>
              <div className="ip-cap__icon">
                <i data-lucide={it.icon}></i>
              </div>
              <p className="ip-cap__code">{it.code}</p>
              <h3 className="ip-cap__t">{it.title}</h3>
              <p className="ip-cap__d">{it.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Case Studies ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.caseEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.caseTitle}</h2>
          <p className="csa-lead ip-head__lead">{row.caseLead}</p>
        </div>
        <div className="co-cases ip-reveal" data-reveal="up">
          {caseItems.map((c, i) => (
            <article className="co-case csa-glass" key={c.title}>
              {/* Read-the-full-case-study affordance (added per request — not in the
                  original export): a circular button with the silver liquid-metal
                  edge (data-metal="silver" → the design's lazy silver shader ring,
                  with a brushed-silver CSS hairline as the no-WebGL fallback). */}
              <Link
                className="co-case__more"
                href={caseHref(c)}
                data-metal="silver"
                aria-label={`Read the full case study: ${c.title ?? ''}`}
              >
                <i data-lucide="arrow-up-right"></i>
              </Link>
              <div className="co-case__grid">
                <span className="co-case__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <span className="co-case__tag">
                    <i data-lucide="badge-check"></i> {c.tag}
                  </span>
                  <h3 className="co-case__title">{c.title}</h3>
                  <div className="co-case__ps">
                    <div className="co-ps co-ps--problem">
                      <p className="co-ps__label">
                        <span className="mark">
                          <i data-lucide="alert-triangle"></i>
                        </span>{' '}
                        Problem
                      </p>
                      <p className="co-ps__d">{c.problem}</p>
                    </div>
                    <div className="co-ps co-ps--solution">
                      <p className="co-ps__label">
                        <span className="mark">
                          <i data-lucide="check"></i>
                        </span>{' '}
                        Solution
                      </p>
                      <p className="co-ps__d">{c.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {row.caseNote && (
            <div className="co-note">
              <span className="co-note__icon">
                <i data-lucide="folder-plus"></i>
              </span>
              <p className="co-note__t">{row.caseNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="ip-close">
        <div className="ip-close__haze" aria-hidden="true"></div>
        <div className="ip-close__inner">
          <span className="csa-eyebrow">{row.closeEyebrow}</span>
          <h2 className="csa-display ip-close__title">{row.closeTitle}</h2>
          {row.closeSub && <p className="csa-lead ip-close__sub">{row.closeSub}</p>}
          <div className="ip-hero__cta co-actions" style={{ justifyContent: 'center' }}>
            <ActionButtons actions={closeActions} />
          </div>
        </div>
      </section>
    </main>
  )
}
