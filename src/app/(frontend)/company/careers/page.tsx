import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { ScrollToRolesButton } from '../../_sections/company/ScrollToRolesButton'

export const dynamic = 'force-dynamic'

/**
 * Company · Careers — pixel-faithful port of
 * design-reference/project/Company/Careers.html (the `CompanyCareers` component
 * in assets/company.jsx).
 *
 * Page chrome (hero, HUD side panel, the "Why Elite Engineers Build Careers"
 * capability grid, the Open Positions heading + role-note, and the closing CTA)
 * comes from the single `company` page row with slug `careers`. The live role
 * cards come from the `job-postings` content collection (active roles, newest
 * first) — replacing the export's three placeholder ROLES.
 *
 * The only interactive bit is the in-page "View Open Roles" smooth-scroll, which
 * the export's `toRoles` handler drives. That is extracted into the co-located
 * client `ScrollToRolesButton`; both the hero (arrow-down) and closing (arrow-up)
 * CTAs use it. Reveal / lucide / csaInit design-tool calls are dropped (handled
 * globally). Everything else is static markup.
 */

type Action = { label?: string; href?: string; style?: 'gold' | 'silver' | 'link' }
type HudRow = { icon?: string; title?: string; description?: string }
type CapItem = { icon?: string; code?: string; title?: string; description?: string }

type CareersRow = {
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
  roleEyebrow?: string
  roleTitle?: string
  roleLead?: string
  roleNote?: string
  closeEyebrow?: string
  closeTitle?: string
  closeSub?: string
  closeActions?: Action[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

type JobPosting = {
  title?: string
  department?: string
  location?: string
  type?: 'full-time' | 'part-time' | 'contract' | 'internship'
  summary?: string
  applyUrl?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<CareersRow>('company', 'careers')
  return {
    title: row?.seo?.metaTitle ?? 'Careers in Functional Safety Engineering | CSA',
    description:
      row?.seo?.metaDescription ??
      "Build the future of safe automation. CSA hires elite safety engineers and independent technical minds for the world's most advanced autonomous platforms. Explore open roles.",
  }
}

// Internal-link map (design export .html → App Router route).
const ROUTE_MAP: Record<string, string> = {
  'Book a Consultation.html': '/book-a-consultation',
  'Company/Overview.html': '/company',
  'Company/Experience.html': '/company/experience',
  'Company/Services.html': '/company/services',
  'Login.html': '/login',
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

// Map the schema enum to the display label the export's role chips show.
const TYPE_LABEL: Record<NonNullable<JobPosting['type']>, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}

/**
 * Hero / closing action buttons. The CMS `heroActions`/`closeActions` carry a
 * gold "View Open Roles" anchor pointed at `#roles`; in the export that anchor
 * smooth-scrolls via the `toRoles` handler — so an in-page (#) gold action is
 * rendered through the client ScrollToRolesButton (arrow-down in the hero,
 * arrow-up in the closing CTA). Every other action is a plain <Link>.
 */
function ActionButtons({ actions, scrollIcon }: { actions: Action[]; scrollIcon: string }) {
  return (
    <>
      {actions.map((a, i) => {
        const cls = BTN_CLASS[a.style ?? 'gold']
        if ((a.href ?? '').startsWith('#') && a.style === 'gold') {
          return <ScrollToRolesButton key={i} className={cls} label={a.label ?? ''} icon={scrollIcon} />
        }
        return (
          <Link className={cls} href={hrefFor(a.href)} key={i}>
            {a.label} <i data-lucide="arrow-right"></i>
          </Link>
        )
      })}
    </>
  )
}

export default async function CompanyCareersPage() {
  const row = (await findBySlug<CareersRow>('company', 'careers')) ?? {}
  const roles = await findDocs<JobPosting>('job-postings', {
    where: { active: { equals: true } },
    sort: '-postedAt',
  })

  const standards = (row.heroStandards ?? []).map((s) => s.code ?? '').filter(Boolean)
  const heroActions = row.heroActions ?? []
  const hudRows = row.hudRows ?? []
  const capsItems = row.capsItems ?? []
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
              <ActionButtons actions={heroActions} scrollIcon="arrow-down" />
            </div>
            {standards.length > 0 && (
              <div className="ip-hero__standards">
                <span className="ip-hero__tick"></span>
                <div className="ip-hero__std-list csa-mono">
                  {standards.map((s, i) => (
                    <span key={s}>
                      <span>{s}</span>
                      {i < standards.length - 1 && <span className="dot">&middot;</span>}
                    </span>
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

      {/* ---------- Why Elite Engineers Build Careers at CSA ---------- */}
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

      {/* ---------- Open Positions ---------- */}
      <section className="ip-sec ip-band-top" id="roles">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{row.roleEyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{row.roleTitle}</h2>
          <p className="csa-lead ip-head__lead">{row.roleLead}</p>
        </div>
        <div className="co-roles ip-reveal" data-reveal="up">
          {roles.map((r) => (
            <article className="co-role" key={r.title}>
              <div>
                <div className="co-role__meta">
                  {r.department && (
                    <span className="co-role__chip co-role__chip--dept">
                      <i data-lucide="git-branch"></i> {r.department}
                    </span>
                  )}
                  {r.location && (
                    <span className="co-role__chip">
                      <i data-lucide="map-pin"></i> {r.location}
                    </span>
                  )}
                  {r.type && (
                    <span className="co-role__chip">
                      <i data-lucide="clock"></i> {TYPE_LABEL[r.type] ?? r.type}
                    </span>
                  )}
                </div>
                <h3 className="co-role__t">{r.title}</h3>
                <p className="co-role__d">{r.summary}</p>
              </div>
              <Link className="btn btn--silver-pill co-role__apply" href={r.applyUrl || '/login'}>
                Apply <i data-lucide="arrow-right"></i>
              </Link>
            </article>
          ))}
          {row.roleNote && (
            <div className="co-note">
              <span className="co-note__icon">
                <i data-lucide="briefcase"></i>
              </span>
              <p className="co-note__t">{row.roleNote}</p>
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
            <ActionButtons actions={closeActions} scrollIcon="arrow-up" />
          </div>
        </div>
      </section>
    </main>
  )
}
