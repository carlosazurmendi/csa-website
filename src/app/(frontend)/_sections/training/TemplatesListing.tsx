'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

/**
 * TemplatesListing — client port of the searchable/sortable grid from
 * design-reference/project/Training - Templates/Templates Listing.html (the inline
 * Page + ChipGroup) plus the shared ProductCard / BundleCard from
 * design-reference/project/assets/templates-ui.jsx.
 *
 * The product catalog is loaded server-side (findDocs('products')) and passed in
 * as plain props. The filter vocabulary (categories / standards / doc types) and
 * short labels are design constants the CMS doesn't carry, lifted verbatim from
 * templates-data.js. The `?category=` deep link is read with useSearchParams (the
 * export reads it from location.search). Commerce (cart / one-click Buy /
 * Express-buy modal) is DEFERRED (M7): every "Buy" / "Add" control is replaced by
 * a CTA that links to the template detail page (/training/templates/<slug>).
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

type SortValue = 'featured' | 'az' | 'price-asc' | 'price-desc'
const SORTS: { v: SortValue; l: string }[] = [
  { v: 'featured', l: 'Featured' },
  { v: 'az', l: 'Title A–Z' },
  { v: 'price-asc', l: 'Price: low to high' },
  { v: 'price-desc', l: 'Price: high to low' },
]

export function priceLabel(p: { price?: number | null }): string {
  if (!p || p.price == null) return '$—'
  return '$' + Math.round(p.price / 100).toLocaleString('en-US')
}

const detailHref = (slug: string) => `/training/templates/${slug}`

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

/* horizontal filter chip group */
function ChipGroup({
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
    <div className="tlist-fgroup">
      <span className="tlist-fgroup__label">{label}</span>
      <button className={'tt-fchip' + (value === null ? ' is-on' : '')} onClick={() => onChange(null)}>{anyLabel}</button>
      {options.map((o) => (
        <button
          key={o}
          className={'tt-fchip' + (value === o ? ' is-on' : '')}
          onClick={() => onChange(value === o ? null : o)}
        >
          {render ? render(o) : o}
        </button>
      ))}
    </div>
  )
}

type Selection = { category: string | null; standard: string | null; docType: string | null }

export function TemplatesListing({ products }: { products: TemplateProduct[] }) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const initialCategory =
    categoryParam && (CATEGORIES as readonly string[]).includes(categoryParam) ? categoryParam : null

  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Selection>({ category: initialCategory, standard: null, docType: null })
  const [sort, setSort] = useState<SortValue>('featured')
  const set = (key: keyof Selection) => (val: string | null) => setSel((s) => ({ ...s, [key]: val }))
  const active = sel.category || sel.standard || sel.docType || q

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let list = products.filter((it) => {
      if (sel.category && it.category !== sel.category) return false
      if (sel.standard && !it.standards.includes(sel.standard)) return false
      if (sel.docType && it.docType !== sel.docType) return false
      if (needle) {
        const hay = [it.title, it.code, it.summary, it.standards.join(' '), it.format, it.docType]
          .join(' ')
          .toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    const price = (p: TemplateProduct) => (p.price == null ? Infinity : p.price)
    if (sort === 'az') list = list.slice().sort((a, b) => a.title.localeCompare(b.title))
    else if (sort === 'price-asc') list = list.slice().sort((a, b) => price(a) - price(b))
    else if (sort === 'price-desc') list = list.slice().sort((a, b) => price(b) - price(a))
    return list
  }, [q, sel, sort, products])

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  const reset = () => {
    setSel({ category: null, standard: null, docType: null })
    setQ('')
  }

  return (
    <div className="tlist">
      {/* Toolbar */}
      <div className="tlist-bar">
        <label className="tlist-search">
          <i data-lucide="search"></i>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates — HARA, FMEA, SIL, EN 50129…"
            aria-label="Search templates"
          />
          {q && (
            <button className="tlist-search__clear" onClick={() => setQ('')} aria-label="Clear search">
              <i data-lucide="x"></i>
            </button>
          )}
        </label>
        <span className="tlist-sort">
          <i data-lucide="arrow-up-down" style={{ width: 15, height: 15, color: 'var(--fg-4)' }}></i> Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as SortValue)} aria-label="Sort">
            {SORTS.map((s) => (
              <option key={s.v} value={s.v}>
                {s.l}
              </option>
            ))}
          </select>
        </span>
        <button className="tt-reset" onClick={reset} disabled={!active}><i data-lucide="rotate-ccw"></i> Reset</button>
      </div>

      {/* Filters */}
      <div className="tlist-filters">
        <ChipGroup
          label="Category"
          anyLabel="All"
          options={CATEGORIES}
          value={sel.category}
          onChange={set('category')}
          render={(o) => (o === CAT.QMS ? 'QMS' : o === CAT.FS ? 'Functional Safety' : 'Bundles')}
        />
        <ChipGroup
          label="Standard"
          anyLabel="All"
          options={STANDARDS}
          value={sel.standard}
          onChange={set('standard')}
          render={(o) => STD_SHORT[o]}
        />
        <ChipGroup
          label="Document type"
          anyLabel="All"
          options={DOCTYPES}
          value={sel.docType}
          onChange={set('docType')}
        />
      </div>

      <p className="tlist-count">
        Showing <b>{visible.length}</b> of {products.length} products
        {q ? <span> for &ldquo;{q}&rdquo;</span> : null}
      </p>

      {visible.length === 0 ? (
        <div className="tt-empty">
          <div className="tt-empty__icon"><i data-lucide="search-x"></i></div>
          <h4 className="csa-h4">No templates match your search.</h4>
          <p>Try a different term or clear your filters — or request a custom documentation set.</p>
          <button className="btn btn--gold-pill" onClick={reset}><i data-lucide="rotate-ccw"></i> Reset</button>
        </div>
      ) : (
        <div className="tlist-grid">
          {visible.map((p) =>
            p.type === 'bundle' ? (
              <BundleCard key={p.slug} b={p} reveal />
            ) : (
              <ProductCard key={p.slug} p={p} reveal />
            ),
          )}
        </div>
      )}
    </div>
  )
}
