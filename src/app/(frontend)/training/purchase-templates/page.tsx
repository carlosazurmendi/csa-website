import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { TemplatesStorefront, type TemplateProduct } from '../../_sections/training/TemplatesStorefront'

export const dynamic = 'force-dynamic'

// Server-safe price formatter — mirrors TemplatesStorefront.priceLabel. A function
// exported from a 'use client' module cannot be CALLED from a server component
// (only rendered as a component / passed as a prop), so the server page keeps its own.
const priceLabel = (p: { price?: number | null }): string =>
  !p || p.price == null ? '$—' : '$' + Math.round(p.price / 100).toLocaleString('en-US')

/**
 * Purchase Templates — pixel-faithful port of
 * design-reference/project/Training - Templates/Purchase Templates.html.
 *
 * Editorial chrome (hero, shop-by-category tiles, filter-section copy, closing
 * band) comes from the `training-templates` page row (slug `purchase-templates`).
 * The product catalog comes from the `products` collection; the interactive
 * filter + card grid is the client <TemplatesStorefront>. Commerce (cart /
 * one-click Buy / Express-buy modal) is DEFERRED (M7): every Buy/Add control is a
 * CTA that links to the template detail page (/training/templates/<slug>).
 */

// Filter category vocabulary — design constant mirrored from templates-data.js.
const CAT = {
  BUNDLE: 'Compliance Bundles',
  QMS: 'Quality Management System (QMS)',
  FS: 'Functional Safety Engineering (FS)',
} as const

// Standards line under the hero — design constant (templates-data.js STANDARDS).
const STANDARDS = ['IEC 61508', 'ISO 13849', 'ISO 26262', 'Generic Safety Lifecycle']

// Shop-by-category tile icons, in the seeded catItems order. Design-only — the
// CMS catItems carry icon names too, but the third tile's category mapping
// (which CAT each tile filters to) is layout logic that lives here.
const CAT_TILE_TARGET = [CAT.BUNDLE, CAT.QMS, CAT.FS]

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
  heroGhost?: string
  heroTitle?: string
  heroPrimaryCta?: string
  heroSecondaryCta?: string
  catEyebrow?: string
  catHeading?: string
  catItems?: { icon?: string; name?: string; desc?: string }[]
  filtEyebrow?: string
  filtHeading?: string
  filtLead?: string
  filtNote?: string
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<PageRow>('training-templates', 'purchase-templates')
  return {
    title:
      row?.seo?.metaTitle ??
      'Functional Safety Templates | IEC 61508, ISO 13849, ISO 26262 | CSA',
    description:
      row?.seo?.metaDescription ??
      'Field-proven Word & Excel functional safety templates — HARA, FMEA, safety plans, and requirements management. Buy bundles or individual docs with one-click checkout.',
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

export default async function PurchaseTemplatesPage() {
  const [row, productDocs] = await Promise.all([
    findBySlug<PageRow>('training-templates', 'purchase-templates'),
    findDocs<ProductDoc>('products', { depth: 1, limit: 100 }),
  ])

  const products = productDocs.map(toProduct)
  const byCategoryCount = (cat: string) => products.filter((p) => p.category === cat).length

  // Featured bundle for the hero card (export pulls T.bySlug('full-suite')).
  const featured = products.find((p) => p.slug === 'full-suite')

  // Hero title: the seeded heroTitle uses a "\n" line break (export's <br/>).
  const heroTitle = row?.heroTitle ?? 'Functional Safety\nDocumentation Templates.'
  const [heroLine1, heroLine2] = heroTitle.split('\n')

  const catItems = row?.catItems ?? []

  return (
    <main>
      {/* Hero */}
      <section className="tt-hero">
        <div className="tt-hero__haze"></div>
        <div className="tt-hero__ghost" aria-hidden="true">{row?.heroGhost ?? 'TEMPLATES'}</div>
        <div className="tt-hero__inner tpl-hero-grid csa-tilt-scene">
          <div className="tpl-hero__col">
            <p className="tt-crumb">
              Training &amp; Templates <span className="sep">/</span>{' '}
              <span className="cur">{row?.heroCrumb ?? 'Templates Storefront'}</span>
            </p>
            <h1 className="csa-display tt-hero__title">
              {heroLine1}
              {heroLine2 && (
                <>
                  <br />
                  {heroLine2}
                </>
              )}
            </h1>
            <p className="csa-lead tt-hero__lead">
              Jumpstart your compliance and certification preparation with field-proven Word &amp;
              Excel templates — compliant engineering structures, standardized formatting, and clear
              required-content outlines that let your team build a defensible safety case without
              starting from scratch.
            </p>
            <div className="tt-hero__actions">
              <a className="btn btn--gold-pill btn--lg" href="#store">
                {row?.heroPrimaryCta ?? 'Shop All Templates'} <i data-lucide="arrow-down"></i>
              </a>
              <Link className="btn btn--silver-pill btn--lg" href="/training/browse-all-templates">
                {row?.heroSecondaryCta ?? 'Browse & Search'} <i data-lucide="search"></i>
              </Link>
            </div>
            <div className="tt-hero__standards">
              <span className="tt-hero__tick" aria-hidden="true"></span>
              <span className="tt-stdlist">
                {STANDARDS.map((s, i) => (
                  <Fragment key={s}>
                    {i > 0 && <span className="dot">&middot;</span>}
                    <span className="csa-mono">{s}</span>
                  </Fragment>
                ))}
              </span>
            </div>
          </div>

          {/* Featured bundle card — Buy is DEFERRED (M7): CTAs link to the detail page. */}
          {featured && (
            <aside className="tpl-feature csa-glass csa-tilt">
              <div className="tpl-shot tpl-shot--stack">
                <div className="tpl-doc tpl-doc--b2">
                  <div className="tpl-doc__title"></div>
                  <div className="tpl-doc__meta"></div>
                  <div className="tpl-doc__body"></div>
                </div>
                <div className="tpl-doc tpl-doc--b1">
                  <div className="tpl-doc__title"></div>
                  <div className="tpl-doc__meta"></div>
                  <div className="tpl-doc__grid"></div>
                </div>
                <div className="tpl-doc tpl-doc--front">
                  <div className="tpl-doc__title"></div>
                  <div className="tpl-doc__meta"></div>
                  <div className="tpl-doc__body"></div>
                </div>
                <span className="tpl-shot__icon"><i data-lucide="library"></i></span>
                <span className="tpl-shot__fmt"><i data-lucide="files"></i> {featured.memberCount} templates</span>
              </div>
              <div className="tpl-feature__head">
                <span className="tpl-feature__badge"><i data-lucide="star"></i> Featured Bundle</span>
              </div>
              <h3 className="tpl-feature__title">{featured.title}</h3>
              <p className="tpl-feature__desc">{featured.summary}</p>
              <div className="tpl-feature__incl">
                <span className="tpl-bundle__chip">All 5 QMS templates</span>
                <span className="tpl-bundle__chip">All 12 FS templates</span>
                <span className="tpl-bundle__chip">Word &amp; Excel</span>
              </div>
              <div className="tpl-feature__price">
                <span className="tpl-pricev">
                  <span className="tpl-pricev__amt">{priceLabel(featured)}</span>
                  <span className="tpl-pricev__per">one-time · {featured.memberCount} templates</span>
                </span>
                <span className="tpl-feature__pmeta">Best value · save vs. individual</span>
              </div>
              <div className="tpl-feature__actions">
                <Link className="btn btn--gold-solid" href={`/training/templates/${featured.slug}`}>
                  <i data-lucide="zap"></i> Buy Now — one-click
                </Link>
                <Link className="tpl-checkout" href={`/training/templates/${featured.slug}`}>
                  <i data-lucide="plus"></i> Add to Cart
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* Shop by category */}
      <section className="tt-section tpl-browse">
        <div className="tt-head">
          <span className="csa-eyebrow">{row?.catEyebrow ?? 'Shop by category'}</span>
          <h2 className="csa-h2">{row?.catHeading ?? 'Bundles, governance, and lifecycle documents.'}</h2>
        </div>
        <div className="tpl-cats">
          {catItems.map((t, i) => {
            const target = CAT_TILE_TARGET[i] ?? CAT.BUNDLE
            const n = byCategoryCount(target)
            const name = t.name ?? ''
            return (
              <Link
                className="tpl-cat-tile"
                key={target}
                href={'/training/browse-all-templates?category=' + encodeURIComponent(target)}
              >
                <span className="tpl-cat-tile__count">{n} products</span>
                <span className="tpl-cat-tile__icon"><i data-lucide={t.icon}></i></span>
                <h3 className="tpl-cat-tile__name">{name}</h3>
                <p className="tpl-cat-tile__desc">{t.desc}</p>
                <span className="tpl-cat-tile__link">Browse {name.toLowerCase()} <i data-lucide="arrow-right"></i></span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Filter + Storefront grid */}
      <section className="tt-section tt-store" id="store">
        <div className="tt-head">
          <span className="csa-eyebrow">{row?.filtEyebrow ?? 'Filter templates'}</span>
          <h2 className="csa-h2">{row?.filtHeading ?? 'Build your documentation set.'}</h2>
          <p className="csa-lead tt-head__lead">
            {row?.filtLead ??
              'Filter by category, standard focus, or document type to assemble exactly the templates your program needs. Add to cart, or buy instantly with one-click checkout.'}
          </p>
        </div>
        <TemplatesStorefront
          products={products}
          filtNote={
            row?.filtNote ??
            'Prices are managed in Payload. Every template is available individually or as part of a bundle — buy instantly with one-click checkout.'
          }
        />
      </section>

      {/* Closing band */}
      <section className="tt-private">
        <div className="tt-private__inner">
          <div className="tt-private__panel csa-glass">
            <div className="tt-private__haze"></div>
            <div className="tt-private__txt">
              <span className="csa-eyebrow">{row?.ctaEyebrow ?? 'Shop all templates'}</span>
              <h2 className="csa-h2 tt-private__title">
                {row?.ctaHeading ?? 'Buy as a bundle, or one document at a time.'}
              </h2>
              <p className="tt-private__sub">
                {row?.ctaSub ??
                  'Field-proven Word & Excel templates that bridge academic standards and real-world implementation. Start with a compliance bundle for full coverage, or pick the individual documents your active project needs right now.'}
              </p>
              <div className="tpl-cta__list">
                <span className="tpl-cta__stat"><b>4</b> bundles</span>
                <span className="tpl-cta__sep"></span>
                <span className="tpl-cta__stat"><b>17</b> individual templates</span>
                <span className="tpl-cta__sep"></span>
                <span className="tpl-cta__stat">IEC 61508 &middot; ISO 13849 &middot; ISO 26262</span>
              </div>
            </div>
            <div className="tt-private__actions">
              <Link className="btn btn--gold-solid btn--lg" href="/training/browse-all-templates">
                {row?.ctaPrimary ?? 'Browse & Search All'} <i data-lucide="search"></i>
              </Link>
              <Link className="btn btn--link" href="/book-a-consultation">
                {row?.ctaSecondary ?? 'Scope a custom bundle'} <i data-lucide="arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
