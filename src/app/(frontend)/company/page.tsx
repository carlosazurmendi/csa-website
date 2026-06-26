import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'

export const dynamic = 'force-dynamic'

/**
 * Company · Overview ("About CSA") — pixel-faithful port of
 * design-reference/project/Company/Overview.html (the `CompanyOverview`
 * component in assets/company.jsx).
 *
 * All editorial copy comes from the single `company` page row with slug
 * `overview`: hero + HUD side panel, the Mission and Philosophy editorial
 * statements (rich text), the professional-boundary callout, the Core Values
 * grid, the ISO-9001 quality panel, and the closing CTA. Rich-text fields are
 * flattened to plain-text paragraphs via lexicalToParagraphs (one <p> each);
 * the export's inline <strong>/<em> emphasis is design-only and not carried by
 * the CMS. Reveal / lucide / csaInit design-tool calls are dropped (handled
 * globally). Pure static markup — no state/effects — so this stays a server
 * component with no co-located client section.
 */

type Action = { label?: string; href?: string; style?: 'gold' | 'silver' | 'link' }
type HudRow = { icon?: string; title?: string; description?: string }
type ValItem = { icon?: string; title?: string; description?: string }

type OverviewRow = {
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
  missionNum?: string
  missionEyebrow?: string
  missionTitle?: string
  missionBody?: unknown
  philNum?: string
  philEyebrow?: string
  philTitle?: string
  philBody?: unknown
  philBoundaryTitle?: string
  philBoundaryBody?: unknown
  valEyebrow?: string
  valTitle?: string
  valLead?: string
  valItems?: ValItem[]
  isoEyebrow?: string
  isoBody?: unknown
  closeEyebrow?: string
  closeTitle?: string
  closeSub?: string
  closeActions?: Action[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<OverviewRow>('company', 'overview')
  return {
    title: row?.seo?.metaTitle ?? 'About CSA | Independent Functional Safety Firm',
    description:
      row?.seo?.metaDescription ??
      'Critical Systems Analysis is an independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
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

// Trailing Lucide icon per action — mirrors the export. Every button carries
// "arrow-right" except the closing "Meet the Team" gold CTA, which uses "users".
const actionIcon = (a: Action): string => (a.label === 'Meet the Team' ? 'users' : 'arrow-right')

function ActionButtons({ actions }: { actions: Action[] }) {
  return (
    <>
      {actions.map((a, i) => (
        <Link className={BTN_CLASS[a.style ?? 'gold']} href={hrefFor(a.href)} key={i}>
          {a.label} <i data-lucide={actionIcon(a)}></i>
        </Link>
      ))}
    </>
  )
}

export default async function CompanyOverviewPage() {
  const row = (await findBySlug<OverviewRow>('company', 'overview')) ?? {}

  const standards = (row.heroStandards ?? []).map((s) => s.code ?? '').filter(Boolean)
  const heroActions = row.heroActions ?? []
  const hudRows = row.hudRows ?? []
  const valItems = row.valItems ?? []
  const closeActions = row.closeActions ?? []

  const missionParas = lexicalToParagraphs(row.missionBody)
  const philParas = lexicalToParagraphs(row.philBody)
  const philBoundaryParas = lexicalToParagraphs(row.philBoundaryBody)
  const isoParas = lexicalToParagraphs(row.isoBody)

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

      {/* ---------- Mission ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="co-statement__grid">
          <div className="co-statement__head ip-reveal" data-reveal="up">
            <p className="co-statement__num">{row.missionNum}</p>
            <span className="csa-eyebrow">{row.missionEyebrow}</span>
            <h2 className="csa-h2 co-statement__title">{row.missionTitle}</h2>
          </div>
          <div className="co-prose ip-reveal" data-reveal="up">
            {missionParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="co-statement__grid">
          <div className="co-statement__head ip-reveal" data-reveal="up">
            <p className="co-statement__num">{row.philNum}</p>
            <span className="csa-eyebrow">{row.philEyebrow}</span>
            <h2 className="csa-h2 co-statement__title">{row.philTitle}</h2>
          </div>
          <div className="ip-reveal" data-reveal="up">
            <div className="co-prose">
              {philParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="co-boundary">
              <span className="co-boundary__icon">
                <i data-lucide="git-fork"></i>
              </span>
              <div>
                <p className="co-boundary__t">{row.philBoundaryTitle}</p>
                {philBoundaryParas.map((p, i) => (
                  <p className="co-boundary__d" key={i}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Core Values ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.valEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.valTitle}</h2>
          <p className="csa-lead ip-head__lead">{row.valLead}</p>
        </div>
        <div className="co-values ip-reveal" data-reveal="up">
          {valItems.map((v, i) => (
            <article className="co-value" key={v.title}>
              <div className="co-value__top">
                <span className="co-value__icon">
                  <i data-lucide={v.icon}></i>
                </span>
                <span className="co-value__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="co-value__t">{v.title}</h3>
              <p className="co-value__d">{v.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- ISO 9001 intent ---------- */}
      <div className="co-iso ip-reveal" data-reveal="up">
        <div className="co-iso__panel csa-glass">
          <span className="co-iso__badge">
            <i data-lucide="badge-check"></i>
          </span>
          <div>
            <p className="co-iso__eyebrow">{row.isoEyebrow}</p>
            {isoParas.map((p, i) => (
              <p className="co-iso__t" key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

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
