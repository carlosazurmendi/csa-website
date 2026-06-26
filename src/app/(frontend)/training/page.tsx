import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'

export const dynamic = 'force-dynamic'

/**
 * Training & Templates — Overview. Pixel-faithful port of
 * design-reference/project/Training - Templates/Overview.html.
 *
 * Pure-markup page: the export's only runtime JS is window.lucide.createIcons()
 * (handled globally), so this is a server component with no co-located client
 * section. All editorial copy comes from the `training-templates` page row
 * (slug `overview`): hero band + the "Two ways to build internal capability"
 * cards. The "01" Browse Courses card links to the Course Catalog, the "02"
 * Shop Templates card to Purchase Templates.
 */

type StandardItem = { label?: string }
type WayMeta = { label?: string }
type WayItem = {
  num?: string
  icon?: string
  title?: string
  desc?: string
  meta?: WayMeta[]
  cta?: string
}

type OverviewRow = {
  heroCrumb?: string
  heroGhost?: string
  heroTitle?: string
  heroLead?: unknown
  heroPrimaryCta?: string
  heroSecondaryCta?: string
  heroStandards?: StandardItem[]
  waysEyebrow?: string
  waysHeading?: string
  waysLead?: string
  waysItems?: WayItem[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

// The two "ways" map to fixed destination routes (design constant — the CMS
// carries the card copy + label, this carries where each card links to).
const WAY_HREFS = ['/training/course-catalog', '/training/purchase-templates']

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<OverviewRow>('training-templates', 'overview')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Training & Templates | CSA',
    description:
      row?.seo?.metaDescription ??
      'Practical functional safety training and field-proven Word/Excel templates — IEC 61508, ISO 13849, ISO 26262. Bridge academic standards and real-world engineering.',
  }
}

export default async function TrainingOverviewPage() {
  const row = (await findBySlug<OverviewRow>('training-templates', 'overview')) ?? {}

  const heroLead = lexicalToParagraphs(row.heroLead)
  const titleLines = (row.heroTitle ?? '').split('\n')
  const standards = row.heroStandards ?? []
  const ways = row.waysItems ?? []

  return (
    <main>
      {/* Hero */}
      <section className="tt-hero">
        <div className="tt-hero__haze"></div>
        <div className="tt-hero__ghost" aria-hidden="true">
          {row.heroGhost}
        </div>
        <div className="tt-hero__inner">
          <p className="tt-crumb">
            Training &amp; Templates <span className="sep">/</span>{' '}
            <span className="cur">{row.heroCrumb}</span>
          </p>
          <h1 className="csa-display tt-hero__title">
            {titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          {heroLead.map((p, i) => (
            <p className="csa-lead tt-hero__lead" key={i}>
              {p}
            </p>
          ))}
          <div className="tt-hero__actions">
            <Link className="btn btn--gold-pill btn--lg" href="/training/course-catalog">
              {row.heroPrimaryCta} <i data-lucide="arrow-right"></i>
            </Link>
            <Link className="btn btn--silver-pill btn--lg" href="/training/purchase-templates">
              {row.heroSecondaryCta} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
          <div className="tt-hero__standards">
            <span className="tt-hero__tick" aria-hidden="true"></span>
            <span className="tt-stdlist">
              {standards.map((s, i) => (
                <Fragment key={s.label ?? i}>
                  {i > 0 && <span className="dot">&middot;</span>}
                  <span className="csa-mono">{s.label}</span>
                </Fragment>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* Two Ways to Build Internal Capability */}
      <section className="tt-section tt-ways">
        <div className="tt-head">
          <span className="csa-eyebrow">{row.waysEyebrow}</span>
          <h2 className="csa-h2">{row.waysHeading}</h2>
          <p className="csa-lead tt-head__lead">{row.waysLead}</p>
        </div>
        <div className="tt-ways__grid csa-tilt-scene">
          {ways.map((w, i) => (
            <article className="tt-way csa-glass" key={w.num ?? i}>
              <p className="tt-way__num csa-mono">{w.num}</p>
              <div className="tt-way__icon">
                <i data-lucide={w.icon}></i>
              </div>
              <h3 className="csa-h3 tt-way__title">{w.title}</h3>
              <p className="tt-way__desc">{w.desc}</p>
              <div className="tt-way__meta">
                {(w.meta ?? []).map((m, j) => (
                  <span className="tt-tag" key={m.label ?? j}>
                    {m.label}
                  </span>
                ))}
              </div>
              <Link className="tt-way__link" href={WAY_HREFS[i] ?? '/training'}>
                {w.cta} <i data-lucide="arrow-right"></i>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
