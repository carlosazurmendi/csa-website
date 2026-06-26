import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { lexicalToText } from '@/lib/lexical'
import { TemplatesListing, type TemplateProduct } from '../../_sections/training/TemplatesListing'

export const dynamic = 'force-dynamic'

/**
 * Browse All Templates — pixel-faithful port of
 * design-reference/project/Training - Templates/Templates Listing.html.
 *
 * Editorial chrome (hero breadcrumb / title / lead) comes from the
 * `training-templates` page row (slug `browse-all-templates`). The searchable,
 * sortable, filterable grid is the client <TemplatesListing>, fed the full
 * `products` collection; it reads the `?category=` deep link with useSearchParams
 * (so the Purchase Templates "Shop by category" tiles land pre-filtered). Cards
 * link to the template detail page (/training/templates/<slug>). Commerce (cart /
 * one-click Buy / Express-buy modal) is DEFERRED (M7).
 */

type StandardRow = { code?: string } | string
type IncludeRef = { slug?: string; code?: string; title?: string } | string

type ProductDoc = {
  slug: string
  code?: string
  title: string
  type: 'document' | 'bundle'
  category?: string
  standards?: StandardRow[]
  docType?: string
  format?: string
  price?: number | null
  summary?: string
  icon?: string
  badge?: string
  popular?: boolean
  includes?: IncludeRef[]
}

type PageRow = {
  heroCrumb?: string
  heroTitle?: string
  heroLead?: unknown
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<PageRow>('training-templates', 'browse-all-templates')
  return {
    title:
      row?.seo?.metaTitle ??
      'Browse All Templates | Functional Safety Documentation | CSA',
    description:
      row?.seo?.metaDescription ??
      "Search and filter CSA's full library of functional safety templates — bundles and individual Word & Excel documents for IEC 61508, ISO 13849, and ISO 26262.",
  }
}

const stdCodes = (rows?: StandardRow[]): string[] =>
  (rows ?? []).map((s) => (typeof s === 'string' ? s : s.code ?? '')).filter(Boolean)

const toProduct = (p: ProductDoc): TemplateProduct => {
  const members = (p.includes ?? []).filter(
    (m): m is Exclude<IncludeRef, string> => typeof m === 'object' && m !== null,
  )
  return {
    slug: p.slug,
    code: p.code,
    title: p.title,
    type: p.type,
    category: p.category,
    standards: stdCodes(p.standards),
    docType: p.docType,
    format: p.format,
    price: p.price ?? null,
    summary: p.summary,
    icon: p.icon,
    badge: p.badge,
    popular: p.popular,
    memberCount: members.length,
    memberChips: members.map((m) => m.code || m.title || '').filter(Boolean),
  }
}

export default async function BrowseAllTemplatesPage() {
  const [row, productDocs] = await Promise.all([
    findBySlug<PageRow>('training-templates', 'browse-all-templates'),
    findDocs<ProductDoc>('products', { depth: 1, limit: 100 }),
  ])

  const products = productDocs.map(toProduct)

  const heroLead =
    lexicalToText(row?.heroLead) ||
    'Search the full library and filter by category, standard focus, or document type. Every product is an instant Word or Excel download — add to cart or buy in one click.'

  return (
    <main>
      {/* Hero */}
      <section className="tlist-hero">
        <div className="tlist-hero__haze"></div>
        <div className="tlist-hero__inner">
          <p className="tt-crumb">
            <Link href="/training/purchase-templates" style={{ color: 'inherit' }}>Templates Storefront</Link>
            <span className="sep">/</span> <span className="cur">{row?.heroCrumb ?? 'Browse All'}</span>
          </p>
          <h1 className="csa-display tlist-hero__title">{row?.heroTitle ?? 'Browse all templates.'}</h1>
          <p className="csa-lead tlist-hero__lead">{heroLead}</p>
        </div>
      </section>

      <Suspense fallback={null}>
        <TemplatesListing products={products} />
      </Suspense>
    </main>
  )
}
