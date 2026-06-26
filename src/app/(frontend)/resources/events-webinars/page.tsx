import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs, lexicalToText } from '@/lib/cms'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'
import { EventsListing, type EventCard } from '../../_sections/resources/EventsListing'

export const dynamic = 'force-dynamic'

/**
 * Resources / Events & Webinars (/resources/events-webinars) — pixel-faithful
 * port of design-reference/project/Resources/Events - Webinars.html, which mounts
 * the shared <ResourceListingPage> template (assets/resource-listing.jsx):
 *   Hero → filter bar + card grid → Featured Annual Appearances → closing CTA.
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `events-webinars` (src/seed/pages/resources.ts). The listing cards are driven
 * by the `events` content collection (findDocs('events')): title + description
 * come from each Event doc, matched by `type` to the export's three listing
 * categories. The per-card icon / metaIcon / CTA label / "soon" flag / display
 * category / meta text are design constants the Events schema doesn't carry —
 * they're zipped on by type, lifted verbatim from the export's CONFIG.cards
 * (mirrored in the page row's `listCards`).
 *
 * The page-wide `.res-reveal` scroll observer + the filter-bar state are the only
 * client behavior — they live in the co-located <ResourcesReveal> /
 * <EventsListing> components. The global nav/footer chrome is rendered by the
 * layout.
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

type FeatItem = { icon?: string; title?: string; desc?: string }

type EventsRow = {
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
  // Featured annual appearances band
  featEyebrow?: string
  featHeading?: string
  featLead?: string
  featItems?: FeatItem[]
  // Closing
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

type EventDoc = {
  title?: string
  type?: 'upcoming-event' | 'past-keynote' | 'technical-webinar'
  description?: unknown
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<EventsRow>('resources', 'events-webinars')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Events & Webinars | CSA',
    description:
      row?.seo?.metaDescription ??
      "Meet CSA's engineering leaders and stay ahead of evolving functional safety regulations at top international automation and robotics safety conferences.",
  }
}

export default async function EventsWebinarsPage() {
  const row = (await findBySlug<EventsRow>('resources', 'events-webinars')) ?? {}
  const events = await findDocs<EventDoc>('events')

  const filters = (row.listFilters ?? []).map((f) => f.label ?? '')

  // The export's three listing cards, one per filter category. The card chrome
  // (icon / cat / meta / metaIcon / cta / soon) is design constant, carried by
  // the page row's `listCards`; the title + blurb come from the matching Event
  // doc (by type) so the grid is genuinely driven by findDocs('events').
  const TYPE_BY_CAT: Record<string, EventDoc['type']> = {
    'Upcoming Events': 'upcoming-event',
    'Past Keynotes': 'past-keynote',
    'Technical Webinars': 'technical-webinar',
  }

  const cards: EventCard[] = (row.listCards ?? []).map((c) => {
    const cat = c.cat ?? ''
    const ev = events.find((e) => e.type === TYPE_BY_CAT[cat])
    return {
      icon: c.icon ?? 'file',
      cat,
      title: ev?.title ?? c.title ?? '',
      d: lexicalToText(ev?.description) || (c.desc ?? ''),
      meta: c.meta ?? '',
      metaIcon: c.metaIcon ?? 'file',
      cta: c.ctaLabel ?? '',
      soon: !!c.soon,
    }
  })

  const featItems = row.featItems ?? []

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero ---------- */}
        <header className="res-hero res-hero--listing">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Events'}
          </div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico">
                <i data-lucide={row.heroEyebrowIcon ?? 'calendar-days'}></i>
              </span>
              {row.heroEyebrow ?? 'Events & Webinars'}
            </p>
            <h1 className="csa-display res-hero__title">{row.heroHeadline ?? 'Events & Webinars'}</h1>
            <p className="csa-lead res-hero__sub">
              {row.heroSub ??
                'Meet our engineering leaders, join open networking, and stay ahead of evolving functional safety regulations at top-tier international automation events and conferences.'}
            </p>
            <div className="res-hero__cta">
              <a className="btn btn--gold-pill btn--lg" href={row.heroCtaHref ?? '#library'}>
                {row.heroCtaLabel ?? 'See Upcoming Events'} <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>
        </header>

        {/* ---------- Filter bar + card grid (client: live filter) ---------- */}
        <EventsListing
          id="library"
          filters={filters}
          cards={cards}
          emptyTitle={row.listEmptyTitle ?? 'Nothing scheduled here yet.'}
          emptyText={
            row.listEmptyText ??
            'New sessions are added as our speaking calendar firms up. Check back, or reach out to arrange a private briefing.'
          }
        />

        {/* ---------- Featured Annual Appearances ---------- */}
        <section className="res-sec--alt res-band-top">
          <div className="res-sec res-sec__inner">
            <div className="res-head res-reveal">
              <span className="csa-eyebrow">{row.featEyebrow ?? 'Featured Annual Appearances'}</span>
              <h2 className="csa-h2 res-head__title">
                {row.featHeading ?? 'Where you’ll find us each year.'}
              </h2>
              {(row.featLead ?? '') ? <p className="csa-lead res-head__lead">{row.featLead}</p> : null}
            </div>
            <div className="rl-feat__grid res-reveal">
              {featItems.map((it) => (
                <div className="rl-feat" key={it.title}>
                  <span className="rl-feat__icon">
                    <i data-lucide={it.icon}></i>
                  </span>
                  <div>
                    <h3 className="rl-feat__t">{it.title}</h3>
                    <p className="rl-feat__d">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Want us at your event?'}</span>
            <h2 className="csa-display res-close__title">
              {row.closeHeading ?? 'Invite a CSA engineer to speak.'}
            </h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'Our principals present on functional safety, certification, and safe autonomy. Reach out to arrange a keynote, panel, or private technical briefing.'}
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
