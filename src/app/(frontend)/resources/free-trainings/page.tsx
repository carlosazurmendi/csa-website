import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'
import { EventsListing, type EventCard } from '../../_sections/resources/EventsListing'

export const dynamic = 'force-dynamic'

/**
 * Resources / Free Trainings (/resources/free-trainings) — pixel-faithful port of
 * design-reference/project/Resources/Free Trainings.html, which mounts the shared
 * <ResourceListingPage> template (assets/resource-listing.jsx):
 *   Hero → filter bar + card grid → closing CTA.
 *
 * Unlike Events & Webinars, this page's CONFIG has no `featured`, so there is no
 * Featured band here — the template renders it only when supplied.
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `free-trainings` (src/seed/pages/resources.ts). The listing cards are driven by
 * the `free-trainings` content collection (findDocs('free-trainings')): each
 * card's title + blurb come from the matching Free Training doc, matched by title
 * to the page row's `listCards`. The per-card icon / cat (filter category) /
 * meta / metaIcon / CTA label / "soon" flag are design constants the
 * FreeTrainings schema doesn't carry — they're zipped on from the page row's
 * `listCards`, lifted verbatim from the export's CONFIG.cards.
 *
 * The page-wide `.res-reveal` scroll observer + the filter-bar state are the only
 * client behavior — they reuse the co-located <ResourcesReveal> / <EventsListing>
 * components (identical .rl- card/grid markup). The global nav/footer chrome is
 * rendered by the layout.
 */

type ListCard = {
  icon?: string
  cat?: string
  title?: string
  desc?: string
  meta?: string
  metaIcon?: string
  ctaLabel?: string
  soon?: boolean
}

type FreeTrainingsRow = {
  // Hero (listing)
  heroEyebrow?: string
  heroEyebrowIcon?: string
  heroGhost?: string
  heroHeadline?: string
  heroSub?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  // Listing
  listFilters?: { label?: string }[]
  listEmptyTitle?: string
  listEmptyText?: string
  listCards?: ListCard[]
  // Closing
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

type FreeTrainingDoc = {
  title?: string
  summary?: string
  videoOrLink?: string
  releaseStatus?: 'published' | 'soon'
  resourceType?: 'video' | 'document' | 'presentation'
  ctaLabel?: string
}

// Resource type → card icon (Lucide). Drives the card's media-type glyph.
const TYPE_ICON: Record<string, string> = {
  video: 'play-circle',
  document: 'file-text',
  presentation: 'presentation',
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<FreeTrainingsRow>('resources', 'free-trainings')
  return {
    title: row?.seo?.metaTitle ?? 'Free Functional Safety Training & Videos | CSA',
    description:
      row?.seo?.metaDescription ??
      'Free on-demand functional safety training — video summaries and introductory presentations on the core fundamentals of the safety lifecycle.',
  }
}

export default async function FreeTrainingsPage() {
  const row = (await findBySlug<FreeTrainingsRow>('resources', 'free-trainings')) ?? {}
  const trainings = await findDocs<FreeTrainingDoc>('free-trainings')

  const filters = (row.listFilters ?? []).map((f) => f.label ?? '')

  // The export's three listing cards. The card chrome (icon / cat / meta /
  // metaIcon / cta / soon) is design constant, carried by the page row's
  // `listCards`; the title + blurb come from the matching Free Training doc (by
  // title) so the grid is genuinely driven by findDocs('free-trainings').
  const cards: EventCard[] = (row.listCards ?? []).map((c) => {
    const doc = trainings.find((t) => t.title === c.title)
    // "Publishing soon" vs "Published" is driven by the Free Training doc's
    // releaseStatus; fall back to the page row's flag only when no doc matches.
    const soon = doc ? doc.releaseStatus === 'soon' : !!c.soon
    // Card icon comes from the doc's resourceType; CTA text from its ctaLabel.
    const typeIcon = doc?.resourceType ? TYPE_ICON[doc.resourceType] : undefined
    return {
      icon: typeIcon ?? c.icon ?? 'file',
      cat: c.cat ?? '',
      title: doc?.title ?? c.title ?? '',
      d: doc?.summary ?? c.desc ?? '',
      meta: c.meta ?? '',
      metaIcon: c.metaIcon ?? 'file',
      cta: soon ? 'Coming soon' : doc?.ctaLabel || c.ctaLabel || 'Open',
      soon,
      // Action link (published cards only) comes from the doc's CMS field.
      href: soon ? undefined : doc?.videoOrLink || undefined,
    }
  })

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero ---------- */}
        <header className="res-hero res-hero--listing">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Trainings'}
          </div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico">
                <i data-lucide={row.heroEyebrowIcon ?? 'graduation-cap'}></i>
              </span>
              {row.heroEyebrow ?? 'Free Trainings'}
            </p>
            <h1 className="csa-display res-hero__title">
              {row.heroHeadline ?? 'Free Functional Safety Trainings'}
            </h1>
            <p className="csa-lead res-hero__sub">
              {row.heroSub ??
                'Access on-demand technical video summaries and high-level introductory presentations exploring the core fundamentals of the safety lifecycle.'}
            </p>
            <div className="res-hero__cta">
              <a className="btn btn--gold-pill btn--lg" href={row.heroCtaHref ?? '#library'}>
                {row.heroCtaLabel ?? 'Start Learning Free'} <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>
        </header>

        {/* ---------- Filter bar + card grid (client: live filter) ---------- */}
        <EventsListing
          id="library"
          filters={filters}
          cards={cards}
          emptyTitle={row.listEmptyTitle ?? 'More briefings on the way.'}
          emptyText={
            row.listEmptyText ??
            'New on-demand material is being produced for this category. Check back soon for the next release.'
          }
        />

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Ready for the full lifecycle?'}</span>
            <h2 className="csa-display res-close__title">
              {row.closeHeading ?? 'Go from fundamentals to certified.'}
            </h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'These introductions cover the core ideas. When your program needs principal-led validation and certification, our engineers take it from here.'}
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
