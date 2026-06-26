import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'
import { DownloadsListing, type DownloadCard } from '../../_sections/resources/DownloadsListing'

export const dynamic = 'force-dynamic'

/**
 * Resources / Downloadable Resources (/resources/downloadable-resources) —
 * pixel-faithful port of design-reference/project/Resources/Downloadable
 * Resources.html, which mounts the shared <ResourceListingPage> template
 * (assets/resource-listing.jsx): Hero → filter bar + card grid → closing CTA.
 * (This sub-page has no Featured band.)
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `downloadable-resources` (src/seed/pages/resources.ts). The listing cards are
 * driven by the `downloads` content collection (findDocs('downloads')): title +
 * description + category + fileType come from each Download doc. The per-card
 * icon / metaIcon / meta noun / CTA label are design constants the Downloads
 * schema doesn't carry — they're zipped on by category, lifted verbatim from the
 * export's CONFIG.cards (mirrored in the page row's `listCards`).
 *
 * Gated downloads (M6): each card renders with its CTA, but the actual file
 * download / lead-capture is deferred — the export's non-functional <span> CTA
 * is the static shell. No signed-URL or lead-capture action is wired here.
 *
 * The page-wide `.res-reveal` scroll observer + the filter-bar state are the only
 * client behavior — they live in the co-located <ResourcesReveal> /
 * <DownloadsListing> components. The global nav/footer chrome is rendered by the
 * layout.
 */

type EditorialCard = {
  cat?: string
  meta?: string
  metaIcon?: string
  ctaLabel?: string
}

type DownloadsRow = {
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
  listCards?: EditorialCard[]
  // Closing
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  closeCtaHref?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

type DownloadDoc = {
  title?: string
  description?: string
  category?: 'checklists' | 'guidebooks' | 'free-templates' | 'standards-guides'
  fileType?: 'pdf' | 'xlsx' | 'docx' | 'csv' | 'zip'
}

// Per-category card chrome (icon / display label / meta noun / metaIcon), in the
// order the export lists them. These are design constants the Downloads schema
// doesn't carry — lifted verbatim from the export's CONFIG.cards.
const CAT_META: Record<
  NonNullable<DownloadDoc['category']>,
  { icon: string; label: string; noun: string; metaIcon: string }
> = {
  checklists: { icon: 'clipboard-check', label: 'Checklists', noun: 'Checklist', metaIcon: 'file-text' },
  guidebooks: { icon: 'route', label: 'Guidebooks', noun: 'Guidebook', metaIcon: 'book-open' },
  'free-templates': { icon: 'layout-grid', label: 'Free Templates', noun: 'Template', metaIcon: 'table' },
  'standards-guides': {
    icon: 'book-marked',
    label: 'Standards Guides',
    noun: 'Standards Guide',
    metaIcon: 'file-text',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<DownloadsRow>('resources', 'downloadable-resources')
  return {
    title: row?.seo?.metaTitle ?? 'Downloadable Functional Safety Resources | CSA',
    description:
      row?.seo?.metaDescription ??
      'Engineer-reviewed functional safety checklists, framework guides, and template overviews to jumpstart your internal safety tracking. Free downloads across the lifecycle.',
  }
}

export default async function DownloadableResourcesPage() {
  const row = (await findBySlug<DownloadsRow>('resources', 'downloadable-resources')) ?? {}
  const downloads = await findDocs<DownloadDoc>('downloads')

  const filters = (row.listFilters ?? []).map((f) => f.label ?? '')

  // Cards are genuinely driven by findDocs('downloads'): title + description +
  // category + fileType come from each Download doc; the card chrome (icon /
  // display category / meta line / metaIcon / CTA) is design constant, zipped on
  // by category. Meta line mirrors the export: "PDF · Checklist", "XLSX · Template".
  const cards: DownloadCard[] = downloads.map((doc) => {
    const meta = (doc.category && CAT_META[doc.category]) || {
      icon: 'file',
      label: '',
      noun: '',
      metaIcon: 'file',
    }
    const fileLabel = (doc.fileType ?? '').toUpperCase()
    return {
      icon: meta.icon,
      cat: meta.label,
      title: doc.title ?? '',
      d: doc.description ?? '',
      meta: [fileLabel, meta.noun].filter(Boolean).join(' · '),
      metaIcon: meta.metaIcon,
      cta: 'Download',
      soon: false,
    }
  })

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero ---------- */}
        <header className="res-hero res-hero--listing">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Downloads'}
          </div>
          <div className="res-hero__inner">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico">
                <i data-lucide={row.heroEyebrowIcon ?? 'file-check'}></i>
              </span>
              {row.heroEyebrow ?? 'Downloadable Resources'}
            </p>
            <h1 className="csa-display res-hero__title">
              {row.heroHeadline ?? 'Downloadable Functional Safety Resources'}
            </h1>
            <p className="csa-lead res-hero__sub">
              {row.heroSub ??
                'Access our repository of practical, engineer-reviewed checklists, framework guides, and template overviews to jumpstart your internal safety tracking.'}
            </p>
            <div className="res-hero__cta">
              <a className="btn btn--gold-pill btn--lg" href={row.heroCtaHref ?? '#library'}>
                {row.heroCtaLabel ?? 'Browse Downloads'} <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>
        </header>

        {/* ---------- Filter bar + card grid (client: live filter) ---------- */}
        <DownloadsListing
          id="library"
          filters={filters}
          cards={cards}
          emptyTitle={row.listEmptyTitle ?? 'More resources are being added.'}
          emptyText={
            row.listEmptyText ??
            'New downloads are being created for each filter category. Check back soon, or talk to an engineer for what you need now.'
          }
        />

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Beyond the downloads'}</span>
            <h2 className="csa-display res-close__title">
              {row.closeHeading ?? 'Need it built for your program?'}
            </h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'These templates accelerate your internal tracking — but certification takes principal-led engineering. Bring us your toughest safety-critical system.'}
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
