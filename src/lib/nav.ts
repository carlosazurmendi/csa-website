import 'server-only'
import type { Payload } from 'payload'
import type { NavItem } from '@/components/layout/Nav'

/**
 * Build the navigation tree.
 *
 * The editable `header` global defines the top-level structure and any static
 * children. On top of that, sections backed by a collection auto-populate from
 * live content, so adding/removing/reordering an entry in the CMS updates the
 * header nav AND the footer (which mirrors the nav) with no manual edit.
 *
 * Phase 1: the Consulting group (href `/consulting`) is generated from the
 * `industries` collection — Overview plus one entry per industry, ordered by
 * `order`. As future collection-backed sections ship (e.g. a Pages collection,
 * templates, courses), register them in the same map below.
 */
const AUTO_SECTIONS: Record<string, { overviewLabel: string; build: (payload: Payload) => Promise<NavItem['children']> }> = {
  '/consulting': {
    overviewLabel: 'Overview',
    build: async (payload) => {
      const res = await payload.find({ collection: 'industries', sort: 'order', limit: 200, depth: 0 })
      return res.docs.map((i: { title: string; slug: string }) => ({
        label: i.title,
        href: `/consulting/${i.slug}`,
      }))
    },
  },
}

export async function buildNav(payload: Payload, headerNav: NavItem[]): Promise<NavItem[]> {
  const out: NavItem[] = []
  for (const group of headerNav) {
    const auto = AUTO_SECTIONS[group.href]
    if (auto) {
      const dynamicChildren = await auto.build(payload)
      // Preserve any CTA children (e.g. "Request a Private Course") from the
      // editable global; replace the rest with the live, ordered entries.
      const ctas = (group.children || []).filter((c) => c.isCTA)
      out.push({
        ...group,
        children: [{ label: auto.overviewLabel, href: group.href }, ...(dynamicChildren || []), ...ctas],
      })
    } else {
      out.push(group)
    }
  }
  return out
}
