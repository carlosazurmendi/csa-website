import 'server-only'

import { findBySlug, getPayloadClient } from '@/lib/cms'

/**
 * Server-side commerce pricing (M7). The client cart is untrusted: prices, names
 * and product kinds are ALWAYS re-resolved here from the CMS before a Stripe
 * session is created and again before grants are written. The browser never gets
 * to set what something costs.
 */

export type CartKind = 'TEMPLATE' | 'BUNDLE' | 'COURSE'

/** Compact wire shape the client sends / we stash in Stripe metadata. */
export type CompactItem = { slug: string; kind: CartKind; qty: number }

/** A cart line resolved against the CMS — the trusted name + price (cents) + id. */
export type ResolvedLine = {
  slug: string
  kind: CartKind
  qty: number
  name: string
  /** Unit price in CENTS (Stripe unit_amount). */
  unitAmount: number
  productId?: number | string
  courseId?: number | string
}

type ProductRow = { id: number | string; title: string; price?: number | null; type?: 'document' | 'bundle' }
type CourseRow = { id: number | string; title: string; price?: number | null }

function clampQty(qty: number): number {
  const n = Math.floor(Number(qty) || 1)
  return Math.max(1, Math.min(99, n))
}

/** A course is a single non-stackable seat — never charge/grant more than one. */
function lineQty(kind: CartKind, qty: number): number {
  return kind === 'COURSE' ? 1 : clampQty(qty)
}

/**
 * Resolve a compact cart against the CMS for CHECKOUT. Drops anything that is not
 * a real, published, priced product/course; derives TEMPLATE vs BUNDLE from the
 * product `type` (never trusting the client). Course kind looks up `courses`,
 * everything else looks up `products`. COURSE qty is forced to 1.
 */
export async function resolveCartItems(items: CompactItem[]): Promise<ResolvedLine[]> {
  const out: ResolvedLine[] = []
  for (const it of items ?? []) {
    if (!it || typeof it.slug !== 'string' || !it.slug) continue

    if (it.kind === 'COURSE') {
      const c = await findBySlug<CourseRow>('courses', it.slug)
      if (!c || typeof c.price !== 'number' || c.price <= 0) continue
      out.push({ slug: it.slug, kind: 'COURSE', qty: 1, name: c.title, unitAmount: c.price, courseId: c.id })
      continue
    }

    const p = await findBySlug<ProductRow>('products', it.slug)
    if (!p || typeof p.price !== 'number' || p.price <= 0) continue
    const kind: CartKind = p.type === 'bundle' ? 'BUNDLE' : 'TEMPLATE'
    out.push({ slug: it.slug, kind, qty: clampQty(it.qty), name: p.title, unitAmount: p.price, productId: p.id })
  }
  return out
}

/**
 * Resolve a compact cart for FULFILMENT (webhook grant path). Unlike checkout
 * resolution, this uses overrideAccess so a product/course that was unpublished
 * between checkout and webhook delivery still resolves, and it does NOT drop a
 * line whose price is missing/zero — the buyer already paid (the order total
 * comes from Stripe), so access must still be granted. Returns the CMS id needed
 * to create the Enrollment/Entitlement.
 */
export async function resolveForFulfilment(items: CompactItem[]): Promise<ResolvedLine[]> {
  const payload = await getPayloadClient()
  const out: ResolvedLine[] = []
  for (const it of items ?? []) {
    if (!it || typeof it.slug !== 'string' || !it.slug) continue

    if (it.kind === 'COURSE') {
      const c = (
        await payload.find({
          collection: 'courses',
          where: { slug: { equals: it.slug } },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })
      ).docs[0] as CourseRow | undefined
      if (!c) continue
      out.push({
        slug: it.slug,
        kind: 'COURSE',
        qty: 1,
        name: c.title,
        unitAmount: typeof c.price === 'number' ? c.price : 0,
        courseId: c.id,
      })
      continue
    }

    const p = (
      await payload.find({
        collection: 'products',
        where: { slug: { equals: it.slug } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
    ).docs[0] as ProductRow | undefined
    if (!p) continue
    const kind: CartKind = p.type === 'bundle' ? 'BUNDLE' : 'TEMPLATE'
    out.push({
      slug: it.slug,
      kind,
      qty: lineQty(kind, it.qty),
      name: p.title,
      unitAmount: typeof p.price === 'number' ? p.price : 0,
      productId: p.id,
    })
  }
  return out
}

/** Sum of a resolved cart in CENTS. */
export function linesSubtotal(lines: ResolvedLine[]): number {
  return lines.reduce((n, l) => n + l.unitAmount * l.qty, 0)
}
