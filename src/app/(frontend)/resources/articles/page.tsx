import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'
import { ArticlesListing, type ArticleCard } from '../../_sections/resources/ArticlesListing'

export const dynamic = 'force-dynamic'

/**
 * Articles index (/resources/articles) — pixel-faithful port of
 * design-reference/project/Resources/Articles.html (the inline CONFIG that
 * renders the shared <ResourceListingPage> from
 * design-reference/project/assets/resource-listing.jsx: Hero → filter bar → CMS
 * card grid → closing CTA; this page uses no Featured band).
 *
 * Landing copy (hero, filter chips, empty state, closing CTA) comes from the
 * `resources` page-collection row with slug `articles` (see
 * src/collections/pages/ResourcesPages.ts + src/seed/pages/resources.ts). The
 * card grid is fed the REAL published articles via findDocs('articles') (see
 * src/collections/Articles.ts) instead of the export's three placeholder
 * "publication pipeline" cards (owner note BT30) — each card links to
 * /resources/articles/<slug>. The category filter is the only client behavior,
 * lifted into <ArticlesListing>. The global nav/footer chrome is rendered by the
 * layout.
 */

type ListFilter = { label?: string }

type ArticlesRow = {
  heroEyebrow?: string
  heroEyebrowIcon?: string
  heroGhost?: string
  heroHeadline?: string
  heroSub?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  listFilters?: ListFilter[]
  listEmptyTitle?: string
  listEmptyText?: string
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

type ArticleDoc = {
  slug: string
  title: string
  category: string
  date?: string
  excerpt?: string
  readingTime?: string
}

// Article category value → display label (matches the Articles collection select
// options + the listing's filter chips). Drives the card tag + the chip filter.
const CATEGORY_LABEL: Record<string, string> = {
  robotics: 'Robotics',
  automotive: 'Automotive',
  rail: 'Rail',
  'off-road-agriculture': 'Off-Road & Agriculture',
  philosophy: 'Philosophy',
  standards: 'Standards',
  'field-notes': 'Field Notes',
  company: 'Company',
}

// Article category value → Lucide icon for the card (design constant the CMS
// doesn't carry; mirrors the icon vocabulary used across the export's cards).
const CATEGORY_ICON: Record<string, string> = {
  robotics: 'bot',
  automotive: 'car-front',
  rail: 'train-front',
  'off-road-agriculture': 'tractor',
  philosophy: 'scale',
  standards: 'book-marked',
  'field-notes': 'pen-line',
  company: 'building-2',
}

const formatDate = (value?: string): string => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<ArticlesRow>('resources', 'articles')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Articles & Insights | CSA',
    description:
      row?.seo?.metaDescription ??
      'Expert functional safety publications on real-world compliance pathways and best practices for high-stakes physical systems — robotics, automotive, rail, and more.',
  }
}

export default async function ArticlesIndexPage() {
  const [row, articles] = await Promise.all([
    findBySlug<ArticlesRow>('resources', 'articles'),
    findDocs<ArticleDoc>('articles', { sort: '-date', limit: 100, depth: 0 }),
  ])
  const page = row ?? {}

  const filters = (page.listFilters ?? []).map((f) => f.label ?? '').filter(Boolean)
  // Fall back to the export's chip set if the row carries none.
  const filterLabels =
    filters.length > 0
      ? filters
      : ['All', 'Robotics', 'Automotive', 'Rail', 'Off-Road & Agriculture', 'Philosophy']

  const cards: ArticleCard[] = (articles ?? []).map((a) => {
    const datePart = formatDate(a.date)
    const meta = [datePart, a.readingTime].filter(Boolean).join(' · ')
    return {
      slug: a.slug,
      icon: CATEGORY_ICON[a.category] ?? 'file-text',
      cat: CATEGORY_LABEL[a.category] ?? a.category,
      title: a.title,
      desc: a.excerpt ?? '',
      meta: meta || 'Article',
      metaIcon: 'calendar',
      cta: 'Read article',
    }
  })

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero ---------- */}
        <header className="res-hero res-hero--listing">
          <div className="res-hero__ghost" aria-hidden="true">
            {page.heroGhost ?? 'Articles'}
          </div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico">
                <i data-lucide={page.heroEyebrowIcon ?? 'newspaper'}></i>
              </span>
              {page.heroEyebrow ?? 'Articles'}
            </p>
            <h1 className="csa-display res-hero__title">
              {page.heroHeadline ?? 'Functional Safety Articles & Insights'}
            </h1>
            <p className="csa-lead res-hero__sub">
              {page.heroSub ??
                'Explore our library of expert safety engineering publications detailing real-world compliance pathways and best practices for high-stakes physical systems.'}
            </p>
            {page.heroCtaLabel ? (
              <div className="res-hero__cta">
                <a className="btn btn--gold-pill btn--lg" href={page.heroCtaHref ?? '#library'}>
                  {page.heroCtaLabel} <i data-lucide="arrow-right"></i>
                </a>
              </div>
            ) : null}
          </div>
        </header>

        {/* ---------- Listing (client: category filter) ---------- */}
        <ArticlesListing
          id="library"
          filters={filterLabels}
          cards={cards}
          emptyTitle={page.listEmptyTitle ?? 'First articles publishing soon.'}
          emptyText={
            page.listEmptyText ??
            'Our publication pipeline is spinning up. New articles will appear here as each is reviewed and released.'
          }
        />

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{page.closeEyebrow ?? 'Can’t wait for the next article?'}</span>
            <h2 className="csa-display res-close__title">
              {page.closeHeading ?? 'Ask an engineer directly.'}
            </h2>
            <p className="csa-lead res-close__sub">
              {page.closeSub ??
                'Our publications cover the patterns — your program is specific. Bring your compliance questions to a principal safety engineer.'}
            </p>
            <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
              {page.closeCtaLabel ?? 'Book a Consultation'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
