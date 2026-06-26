import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'

export const dynamic = 'force-dynamic'

/**
 * Company · Services — pixel-faithful port of
 * design-reference/project/Company/Services.html (the `CompanyServices`
 * component in assets/company.jsx).
 *
 * All editorial copy comes from the single `company` page row with slug
 * `services` (hero, HUD side panel, the "Engagement Models" card grid, and the
 * closing CTA). The export's `CompanyServices` renders only the engagement
 * models (`engModels`) here — the four high-level service categories
 * (`svcCategories`) live on the Home page's services accordion, not this page,
 * so they are not consumed. Reveal / lucide / csaInit design-tool calls are
 * dropped (handled globally). Pure static markup — no state/effects — so this
 * stays a server component with no co-located client section.
 */

type Action = { label?: string; href?: string; style?: 'gold' | 'silver' | 'link' }
type HudRow = { icon?: string; title?: string; description?: string }
type EngModel = { icon?: string; title?: string; description?: string; bestFor?: string }

type ServicesRow = {
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
  engEyebrow?: string
  engTitle?: string
  engLead?: string
  engModels?: EngModel[]
  closeEyebrow?: string
  closeTitle?: string
  closeSub?: string
  closeActions?: Action[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<ServicesRow>('company', 'services')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Services & Engagement Models | CSA',
    description:
      row?.seo?.metaDescription ??
      'Flexible functional safety engineering consulting — independent safety audits, embedded engineering support, assessor liaison, and contract FMEA/FTA facilitation.',
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

// Every button in this page's export carries a trailing "arrow-right".
function ActionButtons({ actions }: { actions: Action[] }) {
  return (
    <>
      {actions.map((a, i) => (
        <Link className={BTN_CLASS[a.style ?? 'gold']} href={hrefFor(a.href)} key={i}>
          {a.label} <i data-lucide="arrow-right"></i>
        </Link>
      ))}
    </>
  )
}

export default async function CompanyServicesPage() {
  const row = (await findBySlug<ServicesRow>('company', 'services')) ?? {}

  const standards = (row.heroStandards ?? []).map((s) => s.code ?? '').filter(Boolean)
  const heroActions = row.heroActions ?? []
  const hudRows = row.hudRows ?? []
  const engModels = row.engModels ?? []
  const closeActions = row.closeActions ?? []

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

      {/* ---------- Engagement Models ---------- */}
      <section className="ip-sec ip-band-top">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.engEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.engTitle}</h2>
          <p className="csa-lead ip-head__lead">{row.engLead}</p>
        </div>
        <div className="co-models ip-reveal" data-reveal="up">
          {engModels.map((m, i) => (
            <article className="co-model" key={m.title}>
              <div className="co-model__top">
                <span className="co-model__icon">
                  <i data-lucide={m.icon}></i>
                </span>
                <span className="co-model__n">{'MODEL ' + String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="co-model__t">{m.title}</h3>
              <p className="co-model__d">{m.description}</p>
              <div className="co-model__foot">
                <span className="co-model__best">
                  <b>Best for:</b> {m.bestFor}
                </span>
              </div>
            </article>
          ))}
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
