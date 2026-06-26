import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'
import {
  ConsultingReveal,
  ConsultingQuestions,
  type FaqItem,
} from '../_sections/consulting/ConsultingOverviewClient'

export const dynamic = 'force-dynamic'

/**
 * Consulting Overview (/consulting) — pixel-faithful port of
 * design-reference/project/Consulting/Overview.html (the inline <script> that
 * composes <Hero> · <Facts> · <About> · <Options> · <Capabilities> ·
 * <Industries> · <Questions> · <Closing>).
 *
 * Editorial copy comes from the `consulting` page-collection row with slug
 * `overview` (see src/collections/pages/Consulting.ts + src/seed/pages/consulting.ts).
 * The page is a server component; the only client behavior — the page-wide
 * `.co-reveal` scroll observer and the FAQ accordion — lives in the co-located
 * <ConsultingReveal> / <ConsultingQuestions> client components.
 *
 * Design-only constants the CMS doesn't carry (the GLOBAL_STANDARDS hero ticker
 * and the hero's "See How We Work" secondary link) are kept inline, matching the
 * export. The global nav/footer + closing-band chrome are rendered by the layout.
 */

type Standard = { code?: string }
type Lifecycle = { title?: string; desc?: string }
type Fact = { icon?: string; kicker?: string; title?: string; desc?: string }
type Cred = { icon?: string; title?: string; desc?: string }
type Option = { num?: string; icon?: string; title?: string; desc?: string; best?: string }
type Capability = { icon?: string; code?: string; title?: string; desc?: string }
type Industry = { icon?: string; title?: string; standards?: string; href?: string }
type Question = { q?: string; a?: string }

type ConsultingOverview = {
  // Hero
  heroEyebrow?: string
  heroHeadline?: string
  heroGhost?: string
  heroTagline?: string
  heroStandards?: Standard[]
  heroCtaLabel?: string
  heroLifecycle?: Lifecycle[]
  // Quick Facts
  factsEyebrow?: string
  factsHeading?: string
  factsLead?: string
  factsItems?: Fact[]
  // About
  aboutEyebrow?: string
  aboutHeading?: string
  aboutBody?: unknown
  aboutQuote?: string
  aboutCredsLabel?: string
  aboutCreds?: Cred[]
  // Engagement Options
  optsEyebrow?: string
  optsHeading?: string
  optsLead?: string
  optsItems?: Option[]
  // Capabilities
  capsEyebrow?: string
  capsHeading?: string
  capsLead?: string
  capsItems?: Capability[]
  // Industries Grid
  indEyebrow?: string
  indHeading?: string
  indLead?: string
  indItems?: Industry[]
  // Questions
  faqEyebrow?: string
  faqHeading?: string
  faqItems?: Question[]
  // Closing CTA
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSub?: string
  ctaLabel?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

// The hero standards ticker is a design constant in the export (GLOBAL_STANDARDS),
// and the CMS carries the same codes in heroStandards — prefer the CMS value.
const FALLBACK_STANDARDS = ['ISO 13849', 'IEC 61508', 'ISO 26262', 'IEC 62061']

/**
 * Industry card → /consulting/<slug>. The CMS stores hrefs like "Consulting/Rail",
 * "Consulting/Physical-AI", "Consulting/Construction-Mining-Equipment"; the live
 * routes use the lowercased slug (the seeded Consulting collection slugs).
 */
const industryRoute = (href?: string): string => {
  const last = (href ?? '').split('/').pop() ?? ''
  return '/consulting/' + last.toLowerCase()
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<ConsultingOverview>('consulting', 'overview')
  return {
    title:
      row?.seo?.metaTitle ?? 'Functional Safety Consulting & Contract Engineering | CSA',
    description:
      row?.seo?.metaDescription ??
      'Independent functional safety consulting and contract engineering for autonomous systems. Principal-led HARA, FMEA, FTA & V-model traceability — concept to certification.',
  }
}

export default async function ConsultingOverviewPage() {
  const row = (await findBySlug<ConsultingOverview>('consulting', 'overview')) ?? {}

  const heroStandards = (row.heroStandards ?? []).map((s) => s.code).filter(Boolean) as string[]
  const standards = heroStandards.length ? heroStandards : FALLBACK_STANDARDS
  const lifecycle = row.heroLifecycle ?? []
  const facts = row.factsItems ?? []
  const aboutBody = lexicalToParagraphs(row.aboutBody)
  const creds = row.aboutCreds ?? []
  const options = row.optsItems ?? []
  const capabilities = row.capsItems ?? []
  const industries = row.indItems ?? []
  const faqItems: FaqItem[] = (row.faqItems ?? []).map((q) => ({ q: q.q ?? '', a: q.a ?? '' }))

  return (
    <>
      <ConsultingReveal />
      <main className="co">
        {/* ---------- Hero ---------- */}
        <header className="co-hero">
          <div className="co-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Consulting'}
          </div>
          <div className="co-hero__inner">
            <div className="co-hero__copy">
              <p className="csa-eyebrow">{row.heroEyebrow ?? 'Functional Safety Consulting'}</p>
              <h1 className="csa-display co-hero__title">
                Safety-Critical Systems
                <br />
                Engineering &amp; Consulting.
              </h1>
              <p className="csa-lead co-hero__sub">
                {row.heroTagline ??
                  'Move your advanced autonomous systems from concept to global market certification — with absolute confidence.'}
              </p>
              <div className="co-hero__cta">
                <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
                  {row.heroCtaLabel ?? 'Book a Consultation'} <i data-lucide="arrow-right"></i>
                </Link>
                <Link className="btn btn--link" href="/#how-we-work">
                  See How We Work <i data-lucide="arrow-right"></i>
                </Link>
              </div>
              <div className="co-hero__standards">
                <span className="co-hero__tick"></span>
                <div className="co-hero__std-list csa-mono">
                  {standards.map((s, i) => (
                    <Fragment key={s}>
                      <span>{s}</span>
                      {i < standards.length - 1 && <span className="dot">&middot;</span>}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <aside className="co-hud csa-glass">
              <div className="co-hud__top">
                <span className="co-hud__tag">Concept → Certification</span>
                <span className="co-hud__badge">
                  <span className="d"></span> Independent
                </span>
              </div>
              <div className="co-steps">
                {lifecycle.map((s, i) => (
                  <div className="co-step" key={s.title ?? i}>
                    <div className="co-step__rail">
                      <span className="co-step__node"></span>
                    </div>
                    <div>
                      <p className="co-step__n">{String(i + 1).padStart(2, '0')}</p>
                      <p className="co-step__t">{s.title}</p>
                      <p className="co-step__d">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="co-hud__foot">
                Principal-led<span className="sep">&middot;</span>Decades of combined experience
              </p>
            </aside>
          </div>
        </header>

        {/* ---------- Quick Facts ---------- */}
        <section className="co-sec co-facts co-band-top">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{row.factsEyebrow ?? 'Technical Authority'}</span>
            <h2 className="csa-h2 co-head__title">{row.factsHeading ?? 'Quick facts.'}</h2>
            <p className="csa-lead co-head__lead">
              {row.factsLead ?? 'The credentials and posture behind every CSA engagement.'}
            </p>
          </div>
          <div className="co-facts__grid co-reveal">
            {facts.map((f, i) => (
              <div className="co-fact" key={f.kicker ?? i}>
                <div className="co-fact__icon">
                  <i data-lucide={f.icon}></i>
                </div>
                <p className="co-fact__k">{f.kicker}</p>
                <h3 className="co-fact__t">{f.title}</h3>
                <p className="co-fact__d">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section className="co-sec">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{row.aboutEyebrow ?? 'About CSA'}</span>
            <h2 className="csa-h2 co-head__title">
              {row.aboutHeading ?? 'An independent functional safety firm.'}
            </h2>
          </div>
          <div className="co-about__grid">
            <div className="co-about__prose co-reveal">
              {aboutBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {row.aboutQuote && <blockquote className="co-about__quote">{row.aboutQuote}</blockquote>}
            </div>
            <aside className="co-creds csa-glass co-reveal">
              <p className="co-creds__label">{row.aboutCredsLabel ?? 'Why our validation holds'}</p>
              {creds.map((c, i) => (
                <div className="co-cred" key={c.title ?? i}>
                  <span className="co-cred__icon">
                    <i data-lucide={c.icon}></i>
                  </span>
                  <div>
                    <p className="co-cred__t">{c.title}</p>
                    <p className="co-cred__d">{c.desc}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ---------- Engagement Options ---------- */}
        <section className="co-sec co-band-top">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{row.optsEyebrow ?? 'How We Provide Consulting'}</span>
            <h2 className="csa-h2 co-head__title">{row.optsHeading ?? 'Three ways to work with us.'}</h2>
            <p className="csa-lead co-head__lead">
              {row.optsLead ??
                'We offer flexible consulting frameworks and expert contract engineering models, tailored to your team’s exact resource needs.'}
            </p>
          </div>
          <div className="co-opts__grid co-reveal">
            {options.map((o, i) => (
              <div className="co-opt" key={o.num ?? i}>
                <div className="co-opt__top">
                  <span className="co-opt__n">{o.num}</span>
                  <span className="co-opt__icon">
                    <i data-lucide={o.icon}></i>
                  </span>
                </div>
                <h3 className="co-opt__t">{o.title}</h3>
                <p className="co-opt__d">{o.desc}</p>
                <div className="co-opt__meta">
                  <span className="co-opt__meta-l">Best for</span>
                  <span className="co-opt__meta-t">{o.best}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Capabilities (contract engineering) ---------- */}
        <section className="co-sec co-sec--alt co-band-top">
          <div className="co-sec__inner">
            <div className="co-head co-reveal">
              <span className="csa-eyebrow">{row.capsEyebrow ?? 'Contract Engineering'}</span>
              <h2 className="csa-h2 co-head__title">
                {row.capsHeading ?? 'Expert contract engineering capabilities.'}
              </h2>
              <p className="csa-lead co-head__lead">
                {row.capsLead ??
                  'When you face critical resource gaps or severe schedule pressure, access principal-led safety engineering on a contract basis for high-stakes analytical tasks.'}
              </p>
            </div>
            <div className="co-cap__grid co-reveal">
              {capabilities.map((c, i) => (
                <div className="co-cap" key={c.code ?? i}>
                  <span className="co-cap__icon">
                    <i data-lucide={c.icon}></i>
                  </span>
                  <div>
                    <p className="co-cap__code">{c.code}</p>
                    <h3 className="co-cap__t">{c.title}</h3>
                    <p className="co-cap__d">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Industries grid ---------- */}
        <section className="co-sec co-band-top">
          <div className="co-head co-reveal">
            <span className="csa-eyebrow">{row.indEyebrow ?? 'Industries We Serve'}</span>
            <h2 className="csa-h2 co-head__title">{row.indHeading ?? 'Tailored to your sector.'}</h2>
            <p className="csa-lead co-head__lead">
              {row.indLead ?? 'Functional safety consulting tailored to each sector’s standards and hazards.'}
            </p>
          </div>
          <div className="co-ind__grid co-reveal">
            {industries.map((ind, i) => (
              <Link className="co-ind" key={ind.title ?? i} href={industryRoute(ind.href)}>
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

        {/* ---------- Common Questions (client accordion) ---------- */}
        <ConsultingQuestions
          eyebrow={row.faqEyebrow ?? 'Common Questions'}
          heading={row.faqHeading ?? 'What teams ask first.'}
          items={faqItems}
        />

        {/* ---------- Closing CTA ---------- */}
        <section className="co-close">
          <div className="co-close__haze" aria-hidden="true"></div>
          <div className="co-close__inner">
            <span className="csa-eyebrow">{row.ctaEyebrow ?? 'Concept to certification'}</span>
            <h2 className="csa-display co-close__title">{row.ctaHeading ?? 'Validate with confidence.'}</h2>
            <p className="csa-lead co-close__sub">
              {row.ctaSub ??
                'Bring us your toughest safety-critical program. We’ll map the path from where you are to certified.'}
            </p>
            <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
              {row.ctaLabel ?? 'Book a Consultation'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
