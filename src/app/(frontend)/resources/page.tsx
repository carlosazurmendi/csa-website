import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import {
  ResourcesReveal,
  ResourcesTools,
  type ToolCard,
} from '../_sections/resources/ResourcesOverviewClient'

export const dynamic = 'force-dynamic'

/**
 * Resources Overview (/resources) — pixel-faithful port of
 * design-reference/project/Resources/Overview.html (the inline <script> that
 * composes <Hero> · <Tools> · <Library> · <Closing>).
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `overview` (see src/collections/pages/ResourcesPages.ts +
 * src/seed/pages/resources.ts). The page is a server component; the only client
 * behavior — the page-wide `.res-reveal` scroll observer and the AI-tools 3D
 * tilt — lives in the co-located <ResourcesReveal> / <ResourcesTools> client
 * components.
 *
 * The card destinations (tool cards → Standards Identifier / Safety Chat;
 * library cards → the four library listings) are design constants the CMS
 * doesn't carry, zipped to the CMS items by order (same pattern as the seeded
 * arrays in the export). The global nav/footer chrome is rendered by the layout.
 */

type ToolItem = { icon?: string; tag?: string; title?: string; desc?: string }
type LibItem = { icon?: string; title?: string; desc?: string }
type JumpLink = { label?: string; icon?: string; anchor?: string }

type ResourcesOverview = {
  // Hero (hub)
  heroEyebrow?: string
  heroEyebrowIcon?: string
  heroGhost?: string
  heroHeadline?: string
  heroSub?: string
  heroJumpLinks?: JumpLink[]
  // AI Tools band
  toolsEyebrow?: string
  toolsHeading?: string
  toolsLead?: string
  toolsItems?: ToolItem[]
  // Knowledge Library band
  libEyebrow?: string
  libHeading?: string
  libLead?: string
  libItems?: LibItem[]
  // Closing CTA
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Tool-card destinations, in the same order as the seeded toolsItems (the CMS
// carries icon/tag/title/desc only; the routes are design constants).
const TOOL_HREFS = ['/resources/standards-identifier', '/resources/safety-chat']

// Library-card destinations, in the same order as the seeded libItems.
const LIBRARY_HREFS = [
  '/resources/downloadable-resources',
  '/resources/articles',
  '/resources/events-webinars',
  '/resources/free-trainings',
]

/**
 * Hero jump links → href. In-page anchors (#tools / #library) stay anchors; the
 * "Talk to an Engineer" link (export href "Book a Consultation.html") maps to
 * the live consultation route.
 */
const jumpHref = (anchor?: string): string => {
  const a = anchor ?? ''
  if (a.startsWith('#')) return a
  if (a === 'Book a Consultation.html') return '/book-a-consultation'
  return a
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<ResourcesOverview>('resources', 'overview')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Resources & Tools | CSA',
    description:
      row?.seo?.metaDescription ??
      'Free functional safety resources — an AI standards identifier, Safety Chat, engineer-reviewed checklists, articles, and on-demand trainings across the safety lifecycle.',
  }
}

export default async function ResourcesOverviewPage() {
  const row = (await findBySlug<ResourcesOverview>('resources', 'overview')) ?? {}

  const jumpLinks = row.heroJumpLinks ?? []

  const tools: ToolCard[] = (row.toolsItems ?? []).map((t, i) => ({
    icon: t.icon ?? '',
    tag: t.tag ?? '',
    title: t.title ?? '',
    desc: t.desc ?? '',
    href: TOOL_HREFS[i] ?? '#',
  }))

  const library = (row.libItems ?? []).map((l, i) => ({
    icon: l.icon ?? '',
    title: l.title ?? '',
    desc: l.desc ?? '',
    href: LIBRARY_HREFS[i] ?? '#',
  }))

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero ---------- */}
        <header className="res-hero res-hero--hub">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Resources'}
          </div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico">
                <i data-lucide={row.heroEyebrowIcon ?? 'library-big'}></i>
              </span>
              {row.heroEyebrow ?? 'Functional Safety Resources'}
            </p>
            <h1 className="csa-display res-hero__title">
              {row.heroHeadline ?? 'Tools and knowledge for the safety lifecycle.'}
            </h1>
            <p className="csa-lead res-hero__sub">
              {row.heroSub ??
                'Practical, engineer-reviewed tools and knowledge to help you navigate the safety lifecycle faster — from an AI standards identifier to checklists, articles, and on-demand training.'}
            </p>
            <div className="res-hero__jump">
              {jumpLinks.map((j, i) => {
                const href = jumpHref(j.anchor)
                const inner = (
                  <>
                    <i data-lucide={j.icon}></i> {j.label}
                  </>
                )
                return href.startsWith('#') ? (
                  <a className="res-jump" href={href} key={j.label ?? i}>
                    {inner}
                  </a>
                ) : (
                  <Link className="res-jump" href={href} key={j.label ?? i}>
                    {inner}
                  </Link>
                )
              })}
            </div>
          </div>
        </header>

        {/* ---------- AI Tools (client: 3D tilt) ---------- */}
        <ResourcesTools
          eyebrow={row.toolsEyebrow ?? 'AI-Augmented Tools'}
          heading={row.toolsHeading ?? 'Start with a tool.'}
          lead={
            row.toolsLead ??
            'Two embedded assistants built to clear the early, time-consuming questions — so you reach your real engineering work faster.'
          }
          tools={tools}
        />

        {/* ---------- Knowledge Library ---------- */}
        <section className="res-sec--alt res-band-top" id="library">
          <div className="res-sec res-sec__inner">
            <div className="res-head res-reveal">
              <span className="csa-eyebrow">{row.libEyebrow ?? 'Knowledge Library'}</span>
              <h2 className="csa-h2 res-head__title">{row.libHeading ?? 'Go deeper.'}</h2>
              <p className="csa-lead res-head__lead">
                {row.libLead ??
                  'Engineer-reviewed references, articles, and training to support every phase of the safety lifecycle.'}
              </p>
            </div>
            <div className="res-lib__grid res-reveal">
              {library.map((l) => (
                <Link className="res-lib" key={l.title} href={l.href}>
                  <div className="res-lib__top">
                    <span className="res-lib__icon">
                      <i data-lucide={l.icon}></i>
                    </span>
                    <span className="res-lib__arrow">
                      <i data-lucide="arrow-up-right"></i>
                    </span>
                  </div>
                  <h3 className="res-lib__t">{l.title}</h3>
                  <p className="res-lib__d">{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Beyond the tools'}</span>
            <h2 className="csa-display res-close__title">
              {row.closeHeading ?? 'Need an expert in the room?'}
            </h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'Our tools accelerate the early questions — but certification takes principal-led engineering. Bring us your toughest safety-critical program.'}
            </p>
            <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
              {row.closeCtaLabel ?? 'Book a Consultation'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
