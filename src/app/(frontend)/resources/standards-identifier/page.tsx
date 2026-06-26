import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'
import { ToolShell } from '../../_sections/resources/StandardsIdentifierClient'

export const dynamic = 'force-dynamic'

/**
 * Standards Identifier (/resources/standards-identifier) — pixel-faithful port of
 * design-reference/project/Resources/Standards Identifier.html (the inline
 * <script> that composes <Hero> · <Frameworks> · <HowItWorks> · <Closing>).
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `standards-identifier` (see src/collections/pages/ResourcesPages.ts +
 * src/seed/pages/resources.ts). The page is a server component; the only client
 * behavior — the page-wide `.res-reveal` scroll observer (reused from
 * ResourcesOverviewClient) and the interactive tool shell — lives in co-located
 * client components.
 *
 * DEFERRED (M6+): the live AI standards-mapping engine. The embedded
 * <ToolShell> renders the export's STATIC shell faithfully — selectors carry
 * visual state only, the primary action is disabled, and the roadmap is sample
 * copy. No results wiring.
 *
 * The hero/closing primary CTAs are in-page anchors (#tool); the hero secondary
 * "Talk to an Engineer" link (export href "Book a Consultation.html") maps to
 * the live consultation route. The global nav/footer chrome is rendered by the
 * layout.
 */

type FwCode = { code?: string }
type FwItem = { icon?: string; title?: string; codes?: FwCode[] }
type HowStep = { num?: string; title?: string; desc?: string }

type StandardsIdentifier = {
  // Hero (split)
  heroEyebrow?: string
  heroEyebrowIcon?: string
  heroGhost?: string
  heroHeadline?: string
  heroSub?: string
  heroSub2?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  heroSecondaryLabel?: string
  // Identifier tool intro + disclaimer
  toolName?: string
  toolSub?: string
  toolBadge?: string
  toolCtaLabel?: string
  toolNote?: string
  toolResultLabel?: string
  toolResultVeil?: string
  // Frameworks
  fwEyebrow?: string
  fwHeading?: string
  fwLead?: string
  fwItems?: FwItem[]
  // How it works
  howEyebrow?: string
  howHeading?: string
  howSteps?: HowStep[]
  // Closing CTA
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<StandardsIdentifier>('resources', 'standards-identifier')
  return {
    title: row?.seo?.metaTitle ?? 'Safety Standards Identifier Tool | CSA',
    description:
      row?.seo?.metaDescription ??
      'Not sure which safety standard applies to your project? Use our AI Standards Identifier to map your industry, mobility, and environment to exact compliance targets.',
  }
}

export default async function StandardsIdentifierPage() {
  const row = (await findBySlug<StandardsIdentifier>('resources', 'standards-identifier')) ?? {}

  const frameworks = (row.fwItems ?? []).map((f) => ({
    icon: f.icon ?? '',
    title: f.title ?? '',
    codes: (f.codes ?? []).map((c) => c.code ?? '').filter(Boolean),
  }))

  const steps = (row.howSteps ?? []).map((s) => ({
    num: s.num ?? '',
    title: s.title ?? '',
    desc: s.desc ?? '',
  }))

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero (split) ---------- */}
        <header className="res-hero res-hero--split">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Standards'}
          </div>
          <div className="res-hero__inner">
            <div className="res-hero__copy">
              <p className="csa-eyebrow">
                <span className="res-hero__eyebrow-ico">
                  <i data-lucide={row.heroEyebrowIcon ?? 'crosshair'}></i>
                </span>
                {row.heroEyebrow ?? 'Standards Identifier'}
              </p>
              <h1 className="csa-display res-hero__title">
                {row.heroHeadline ?? 'Which safety standard applies to your project?'}
              </h1>
              <p className="res-hero__sub">
                {row.heroSub ??
                  'Navigating international safety standards can be overwhelming. Use this quick guide to identify the primary regulatory frameworks for your industry — then let our embedded AI tool isolate your exact compliance targets automatically.'}
              </p>
              <p className="res-hero__sub">
                {row.heroSub2 ??
                  'Select your industry, mobility type, and operational environment to instantly isolate your compliance targets.'}
              </p>
              <div className="res-hero__cta">
                <a className="btn btn--gold-pill btn--lg" href={row.heroCtaHref ?? '#tool'}>
                  {row.heroCtaLabel ?? 'Try the Standards Identifier'} <i data-lucide="arrow-down"></i>
                </a>
                <Link className="btn btn--link" href="/book-a-consultation">
                  {row.heroSecondaryLabel ?? 'Talk to an Engineer'} <i data-lucide="arrow-right"></i>
                </Link>
              </div>
            </div>
            <div id="tool">
              <ToolShell
                toolName={row.toolName ?? 'AI Standards Identifier'}
                toolSub={row.toolSub ?? 'Industry · Mobility · Environment'}
                toolCtaLabel={row.toolCtaLabel ?? 'Identify My Standards'}
                toolNote={row.toolNote ?? 'Interactive preview — full AI mapping connects at launch.'}
                toolResultLabel={row.toolResultLabel ?? 'Compliance roadmap'}
                toolResultVeil={
                  row.toolResultVeil ??
                  'Your roadmap — exact compliance targets, performance levels, and safety integrity baselines — generates here once the AI engine is live.'
                }
              />
            </div>
          </div>
        </header>

        {/* ---------- Primary Regulatory Frameworks ---------- */}
        <section className="res-sec res-band-top">
          <div className="res-head res-reveal">
            <span className="csa-eyebrow">{row.fwEyebrow ?? 'Primary Regulatory Frameworks'}</span>
            <h2 className="csa-h2 res-head__title">{row.fwHeading ?? 'Covered by our independent audits.'}</h2>
            <p className="csa-lead res-head__lead">
              {row.fwLead ??
                'The core frameworks our principal engineers navigate, mapped to the systems that fall under each.'}
            </p>
          </div>
          <div className="res-fw__grid res-reveal">
            {frameworks.map((f) => (
              <div className="res-fw" key={f.title}>
                <span className="res-fw__icon">
                  <i data-lucide={f.icon}></i>
                </span>
                <div>
                  <h3 className="res-fw__t">{f.title}</h3>
                  <div className="res-fw__codes">
                    {f.codes.map((c) => (
                      <span className="res-fw__code" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- How It Works ---------- */}
        <section className="res-sec--alt res-band-top">
          <div className="res-sec res-sec__inner">
            <div className="res-head res-reveal">
              <span className="csa-eyebrow">{row.howEyebrow ?? 'How It Works'}</span>
              <h2 className="csa-h2 res-head__title">
                {row.howHeading ?? 'From parameters to roadmap in three steps.'}
              </h2>
            </div>
            <div className="res-steps__grid res-reveal">
              {steps.map((s) => (
                <div className="res-step" key={s.num}>
                  <div className="res-step__n">{s.num}</div>
                  <h3 className="res-step__t">{s.title}</h3>
                  <p className="res-step__d">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Isolate your targets'}</span>
            <h2 className="csa-display res-close__title">{row.closeHeading ?? 'Try the Standards Identifier.'}</h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'Map your industry, mobility, and environment to your exact compliance targets — then bring the roadmap to a principal engineer.'}
            </p>
            <a className="btn btn--gold-pill btn--lg" href={row.closeCtaHref ?? '#tool'}>
              {row.closeCtaLabel ?? 'Try the Standards Identifier'} <i data-lucide="arrow-up"></i>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
