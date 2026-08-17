import { findDocs } from './cms'

/**
 * Derived navigation for the Consulting section (server-only). The Consulting
 * page-collection is the single source of truth for which consulting pages
 * exist: publishing a new industry page must surface it in the header dropdown
 * and the Overview industries grid without anyone also editing the Header
 * global. These helpers read the published rows (sorted by the collection's
 * `order` sidebar field, labelled by `navLabel ?? title`) and the layouts /
 * overview page overlay the result onto their otherwise CMS-authored chrome.
 *
 * Reads go through findDocs, so they are Redis-cached under the `consulting`
 * tag and purged on any publish (src/lib/revalidate.ts) — a newly published
 * page appears in the nav immediately. On any read failure findDocs returns []
 * and callers keep their authored/default nav untouched (fail-soft, like the
 * rest of the CMS layer).
 */

export type ConsultingNavChild = { label: string; href: string }

export type ConsultingNavRow = {
  slug?: string
  title?: string
  navLabel?: string
  heroIcon?: string
  heroStandards?: { code?: string }[]
}

/** All published consulting rows in nav order (Overview first by seed order). */
export async function getConsultingRows(): Promise<ConsultingNavRow[]> {
  return findDocs<ConsultingNavRow>('consulting', { sort: 'order', depth: 0 })
}

/** The row's public route — the Overview row lives at /consulting itself. */
export function consultingHref(slug?: string): string {
  return slug === 'overview' ? '/consulting' : `/consulting/${slug ?? ''}`
}

/**
 * The Consulting dropdown, derived from the collection. Empty when the
 * collection is unreachable/empty — callers then keep their existing children.
 */
export async function getConsultingNav(): Promise<ConsultingNavChild[]> {
  const rows = await getConsultingRows()
  return rows
    .filter((r) => r.slug)
    .map((r) => ({ label: r.navLabel ?? r.title ?? r.slug ?? '', href: consultingHref(r.slug) }))
}
