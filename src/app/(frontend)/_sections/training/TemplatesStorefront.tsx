'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

/**
 * TemplatesStorefront — client port of the filter UI + product/bundle cards from
 * design-reference/project/assets/templates-ui.jsx (ProductCard, BundleCard) and
 * the Storefront/FilterGroup logic inlined in
 * "Training - Templates/Purchase Templates.html".
 *
 * The product catalog is loaded server-side (findDocs('products')) and passed in
 * as plain props. Commerce (cart / one-click Buy) is DEFERRED (M7): every "Buy"
 * / "Add" control is replaced by a CTA that links to the template detail page
 * (/training/templates/<slug>) — no cart logic, no Express-buy modal.
 */

export type TemplateProduct = {
  slug: string
  code?: string
  title: string
  type: 'document' | 'bundle'
  category?: string
  standards: string[]
  docType?: string
  format?: string
  price?: number | null
  summary?: string
  icon?: string
  badge?: string
  popular?: boolean
  memberCount: number
  memberChips: string[]
}

// Filter vocabulary + short labels — design constants the CMS doesn't carry,
// lifted verbatim from templates-data.js (CAT / CATEGORIES / STANDARDS / DOCTYPES).
const CAT = {
  BUNDLE: 'Compliance Bundles',
  QMS: 'Quality Management System (QMS)',
  FS: 'Functional Safety Engineering (FS)',
} as const

const CATEGORIES = [CAT.BUNDLE, CAT.QMS, CAT.FS]
const STANDARDS = ['IEC 61508', 'ISO 13849', 'ISO 26262', 'Generic Safety Lifecycle']
const DOCTYPES = ['Plans', 'Reports & Concepts', 'Analytical Models & Tools']

const STD_SHORT: Record<string, string> = {
  'IEC 61508': 'IEC 61508',
  'ISO 13849': 'ISO 13849',
  'ISO 26262': 'ISO 26262',
  'Generic Safety Lifecycle': 'Generic',
}
const DOC_SHORT: Record<string, string> = {
  Plans: 'Plan',
  'Reports & Concepts': 'Report / Concept',
  'Analytical Models & Tools': 'Model / Tool',
}

export function priceLabel(p: { price?: number | null }): string {
  if (!p || p.price == null) return '$—'
  return '$' + Math.round(p.price / 100).toLocaleString('en-US')
}

const detailHref = (slug: string) => `/training/templates/${slug}`
const listingHref = (q?: string) => '/training/browse-all-templates' + (q || '')

/* document-preview "screenshot" (representative page mock) */
function DocPreview({ kind, cls }: { kind: 'text' | 'grid'; cls?: string }) {
  return (
    <div className={'tpl-doc' + (cls ? ' ' + cls : '')}>
      <div className="tpl-doc__title"></div>
      <div className="tpl-doc__meta"></div>
      <div className={kind === 'grid' ? 'tpl-doc__grid' : 'tpl-doc__body'}></div>
    </div>
  )
}

function PriceSlot({ p, per }: { p: TemplateProduct; per?: string }) {
  return (
    <span className="tpl-pricev">
      <span className="tpl-pricev__amt">{priceLabel(p)}</span>
      <span className="tpl-pricev__per">{per || (p.type === 'bundle' ? 'bundle' : 'one-time')}</span>
    </span>
  )
}

/* ---------- Individual template card ---------- */
function ProductCard({ p, reveal }: { p: TemplateProduct; reveal?: boolean }) {
  const isXls = p.format === 'Excel'
  return (
    <article className="tpl-card" data-reveal={reveal ? 'up' : undefined}>
      <Link className={'tpl-shot' + (isXls ? ' tpl-shot--xls' : '')} href={detailHref(p.slug)} aria-label={p.title}>
        <DocPreview kind={isXls ? 'grid' : 'text'} />
        <span className="tpl-shot__icon"><i data-lucide={p.icon}></i></span>
        <span className={'tpl-shot__fmt' + (isXls ? ' tpl-shot__fmt--xls' : '')}>
          <i data-lucide={isXls ? 'file-spreadsheet' : 'file-text'}></i> {p.format}
        </span>
        {p.popular && <span className="tpl-shot__ribbon">Popular</span>}
      </Link>
      {p.code && <p className="tpl-card__code">{p.code}</p>}
      <h3 className="tpl-card__title"><Link href={detailHref(p.slug)} style={{ color: 'inherit' }}>{p.title}</Link></h3>
      <p className="tpl-card__desc">{p.summary}</p>
      <div className="tpl-card__meta">
        <span className="tpl-std tpl-std--doc">{(p.docType && DOC_SHORT[p.docType]) || p.docType}</span>
        {p.standards.map((s) => <span className="tpl-std" key={s}>{STD_SHORT[s] || s}</span>)}
      </div>
      <div className="tpl-card__foot">
        <PriceSlot p={p} />
        <div className="tpl-card__cta">
          <Link className="tpl-add" href={detailHref(p.slug)}><i data-lucide="plus"></i> Add</Link>
          <Link className="tpl-add tpl-add--solid" href={detailHref(p.slug)}>
            <i data-lucide="zap"></i> Buy now
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ---------- Bundle card (premium, glass) ---------- */
function BundleCard({ b, reveal }: { b: TemplateProduct; reveal?: boolean }) {
  const memberCount = b.memberCount
  return (
    <article className="tpl-bundle csa-glass" data-reveal={reveal ? 'up' : undefined}>
      <Link className="tpl-shot tpl-shot--stack" href={detailHref(b.slug)} aria-label={b.title}>
        <DocPreview kind="text" cls="tpl-doc--b2" />
        <DocPreview kind="grid" cls="tpl-doc--b1" />
        <DocPreview kind="text" cls="tpl-doc--front" />
        <span className="tpl-shot__icon"><i data-lucide={b.icon}></i></span>
        <span className="tpl-shot__fmt"><i data-lucide="files"></i> {memberCount} templates</span>
        {b.badge && <span className="tpl-shot__ribbon tpl-shot__ribbon--gold">{b.badge}</span>}
      </Link>
      <div className="tpl-bundle__top">
        <span className="tpl-bundle__tag"><i data-lucide="layers"></i> Bundle &middot; {memberCount} docs</span>
      </div>
      <h3 className="tpl-bundle__title"><Link href={detailHref(b.slug)} style={{ color: 'inherit' }}>{b.title}</Link></h3>
      <p className="tpl-bundle__desc">{b.summary}</p>
      <div className="tpl-bundle__incl">
        {b.memberChips.slice(0, 4).map((m, i) => (
          <span className="tpl-bundle__chip" key={i}>{m}</span>
        ))}
        {memberCount > 4 && <span className="tpl-bundle__chip">+{memberCount - 4} more</span>}
      </div>
      <div className="tpl-bundle__foot">
        <PriceSlot p={b} per="bundle price" />
        <div className="tpl-card__cta">
          <Link className="tpl-add" href={detailHref(b.slug)}><i data-lucide="plus"></i> Add</Link>
          <Link className="tpl-add tpl-add--solid" href={detailHref(b.slug)}>
            <i data-lucide="zap"></i> Buy now
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ---------- Filter control ---------- */
function FilterGroup({
  label,
  anyLabel,
  options,
  value,
  onChange,
  render,
}: {
  label: string
  anyLabel: string
  options: string[]
  value: string | null
  onChange: (v: string | null) => void
  render?: (o: string) => string
}) {
  return (
    <div className="tt-fgroup">
      <span className="tt-fgroup__label">{label}</span>
      <div className="tt-fchips">
        <button className={'tt-fchip' + (value === null ? ' is-on' : '')} onClick={() => onChange(null)}>{anyLabel}</button>
        {options.map((opt) => (
          <button
            key={opt}
            className={'tt-fchip' + (value === opt ? ' is-on' : '')}
            onClick={() => onChange(value === opt ? null : opt)}
          >
            {render ? render(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  )
}

type Selection = { category: string | null; standard: string | null; docType: string | null }
const EMPTY: Selection = { category: null, standard: null, docType: null }

export function TemplatesStorefront({ products, filtNote }: { products: TemplateProduct[]; filtNote?: string }) {
  const [sel, setSel] = useState<Selection>(EMPTY)
  const set = (key: keyof Selection) => (val: string | null) => setSel((s) => ({ ...s, [key]: val }))
  const reset = () => setSel(EMPTY)
  const active = sel.category || sel.standard || sel.docType

  const visible = useMemo(
    () =>
      products.filter((it) => {
        if (sel.category && it.category !== sel.category) return false
        if (sel.standard && !it.standards.includes(sel.standard)) return false
        if (sel.docType && it.docType !== sel.docType) return false
        return true
      }),
    [sel, products],
  )

  const bundles = visible.filter((i) => i.category === CAT.BUNDLE)
  const qms = visible.filter((i) => i.category === CAT.QMS)
  const fs = visible.filter((i) => i.category === CAT.FS)

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  }, [sel])

  return (
    <div className="tt-cat__layout">
      <aside className="tt-filters">
        <div className="tt-filters__head">
          <span className="tt-filters__title"><i data-lucide="sliders-horizontal"></i> Filter templates</span>
          <button className="tt-reset" onClick={reset} disabled={!active}><i data-lucide="x"></i> Reset</button>
        </div>
        <FilterGroup
          label="By Category"
          anyLabel="All Templates"
          options={CATEGORIES}
          value={sel.category}
          onChange={set('category')}
        />
        <FilterGroup
          label="By Standard Focus"
          anyLabel="All Standards"
          options={STANDARDS}
          value={sel.standard}
          onChange={set('standard')}
          render={(o) => STD_SHORT[o]}
        />
        <FilterGroup
          label="By Document Type"
          anyLabel="All Types"
          options={DOCTYPES}
          value={sel.docType}
          onChange={set('docType')}
        />
        <div className="tpl-pricing-note">
          <i data-lucide="info"></i>
          <span>{filtNote}</span>
        </div>
      </aside>

      <div className="tt-results">
        <div className="tt-results__bar">
          <span className="tt-results__count">Showing <b>{visible.length}</b> of {products.length} products</span>
          <Link
            className="tt-results__note"
            href={listingHref()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--gold-400)', fontWeight: 600 }}
          >
            <i data-lucide="search" style={{ width: 14, height: 14 }}></i> Search all templates
          </Link>
        </div>

        {visible.length === 0 && (
          <div className="tt-empty">
            <div className="tt-empty__icon"><i data-lucide="search-x"></i></div>
            <h4 className="csa-h4">No templates match those filters.</h4>
            <p>Try widening your selection — or talk to us about a custom documentation set.</p>
            <button className="btn btn--gold-pill" onClick={reset}><i data-lucide="rotate-ccw"></i> Reset filters</button>
          </div>
        )}

        {bundles.length > 0 && (
          <section className="tpl-group">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title"><i data-lucide="layers"></i> High-Value Compliance Bundles</h3>
              <span className="tpl-group__count">{bundles.length} {bundles.length === 1 ? 'bundle' : 'bundles'}</span>
            </div>
            <div className="tpl-bundles">
              {bundles.map((b) => <BundleCard key={b.slug} b={b} reveal />)}
            </div>
          </section>
        )}

        {qms.length > 0 && (
          <section className="tpl-group">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title"><i data-lucide="clipboard-list"></i> Individual Quality Management System (QMS) Templates</h3>
              <span className="tpl-group__count">{qms.length} of 5</span>
            </div>
            <div className="tpl-grid">
              {qms.map((p) => <ProductCard key={p.slug} p={p} reveal />)}
            </div>
          </section>
        )}

        {fs.length > 0 && (
          <section className="tpl-group">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title"><i data-lucide="file-check"></i> Individual Functional Safety (FS) Engineering Templates</h3>
              <span className="tpl-group__count">{fs.length} of 12</span>
            </div>
            <div className="tpl-grid">
              {fs.map((p) => <ProductCard key={p.slug} p={p} reveal />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
