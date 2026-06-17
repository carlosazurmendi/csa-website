'use client'

import { useState, useMemo, useEffect } from 'react'

/**
 * Client-side storefront for /training-templates/templates. Ports the
 * Storefront component from Purchase Templates.html verbatim (class names,
 * markup, grouping, filter logic) — only the products are now CMS-driven via
 * props (from the `templates` collection).
 *
 * Filters narrow by category (Compliance Bundles / QMS / FS), standard focus,
 * and document type. Buy/add affordances are static and link to `#` (Phase 1
 * has no cart/checkout). Card titles link to the single-template detail page.
 */
export type TemplateItem = {
  id: string
  slug: string
  category: string // CAT label (group bucket)
  kind: 'bundle' | 'item'
  icon: string
  title: string
  desc: string
  standards: string[]
  docTypes: string[]
  // item-only
  fmt?: string | null
  code?: string | null
  docTypeShort?: string | null
  stdShort?: string[]
  // bundle-only
  tag?: string | null
  incl?: string[]
  featured?: boolean
}

export type StoreFilters = {
  categories: string[]
  standards: string[]
  docTypes: string[]
  stdShort: Record<string, string>
  catShort: { bundle: string; qms: string; fs: string }
}

type Props = {
  items: TemplateItem[]
  filters: StoreFilters
  detailBase: string // e.g. "/training-templates/templates"
  pricingNote: string
}

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
        <button className={'tt-fchip' + (value === null ? ' is-on' : '')} onClick={() => onChange(null)}>
          {anyLabel}
        </button>
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

function PriceSlot() {
  return (
    <span className="tpl-price">
      <span className="tpl-price__amt">$&mdash;</span>
      <span className="tpl-price__tag">Pricing TBD</span>
    </span>
  )
}

function DocPage({ kind, cls }: { kind: 'grid' | 'text'; cls?: string }) {
  return (
    <div className={'tpl-doc' + (cls ? ' ' + cls : '')}>
      <div className="tpl-doc__title"></div>
      <div className="tpl-doc__meta"></div>
      <div className={kind === 'grid' ? 'tpl-doc__grid' : 'tpl-doc__body'}></div>
    </div>
  )
}

function BundleCard({ b, detailBase }: { b: TemplateItem; detailBase: string }) {
  return (
    <article className="tpl-bundle csa-glass">
      <div className="tpl-shot tpl-shot--stack">
        <DocPage kind="text" cls="tpl-doc--b2" />
        <DocPage kind="grid" cls="tpl-doc--b1" />
        <DocPage kind="text" cls="tpl-doc--front" />
        <span className="tpl-shot__icon">
          <i data-lucide={b.icon}></i>
        </span>
        <span className="tpl-shot__fmt">
          <i data-lucide="files"></i> {b.tag}
        </span>
      </div>
      <div className="tpl-bundle__top">
        <span className="tpl-bundle__tag">
          <i data-lucide="layers"></i> Bundle &middot; {b.tag}
        </span>
      </div>
      <h3 className="tpl-bundle__title">
        <a href={`${detailBase}/${b.slug}`}>{b.title}</a>
      </h3>
      <p className="tpl-bundle__desc">{b.desc}</p>
      <div className="tpl-bundle__incl">
        {(b.incl || []).map((c) => (
          <span className="tpl-bundle__chip" key={c}>
            {c}
          </span>
        ))}
      </div>
      <div className="tpl-bundle__foot">
        <PriceSlot />
        <a className="tpl-add tpl-add--solid" href="#">
          <i data-lucide="plus"></i> Add Bundle
        </a>
      </div>
    </article>
  )
}

function ItemCard({ t, detailBase }: { t: TemplateItem; detailBase: string }) {
  const isXls = t.fmt === 'Excel'
  return (
    <article className="tpl-card">
      <div className={'tpl-shot' + (isXls ? ' tpl-shot--xls' : '')}>
        <DocPage kind={isXls ? 'grid' : 'text'} />
        <span className="tpl-shot__icon">
          <i data-lucide={t.icon}></i>
        </span>
        <span className={'tpl-shot__fmt' + (isXls ? ' tpl-shot__fmt--xls' : '')}>
          <i data-lucide={isXls ? 'file-spreadsheet' : 'file-text'}></i> {t.fmt}
        </span>
      </div>
      {t.code && <p className="tpl-card__code">{t.code}</p>}
      <h3 className="tpl-card__title">
        <a href={`${detailBase}/${t.slug}`}>{t.title}</a>
      </h3>
      <p className="tpl-card__desc">{t.desc}</p>
      <div className="tpl-card__meta">
        {t.docTypeShort && <span className="tpl-std tpl-std--doc">{t.docTypeShort}</span>}
        {(t.stdShort || []).map((s) => (
          <span className="tpl-std" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="tpl-card__foot">
        <PriceSlot />
        <a className="tpl-add" href="#">
          <i data-lucide="plus"></i> Add to Cart
        </a>
      </div>
    </article>
  )
}

export function TemplateStorefront({ items, filters, detailBase, pricingNote }: Props) {
  const [sel, setSel] = useState<{ category: string | null; standard: string | null; docType: string | null }>({
    category: null,
    standard: null,
    docType: null,
  })

  const set = (key: 'category' | 'standard' | 'docType') => (val: string | null) =>
    setSel((s) => ({ ...s, [key]: val }))
  const reset = () => setSel({ category: null, standard: null, docType: null })
  const active = sel.category || sel.standard || sel.docType

  const [CAT_BUNDLE, CAT_QMS, CAT_FS] = filters.categories

  const visible = useMemo(
    () =>
      items.filter((it) => {
        if (sel.category && it.category !== sel.category) return false
        if (sel.standard && !it.standards.includes(sel.standard)) return false
        if (sel.docType && !it.docTypes.includes(sel.docType)) return false
        return true
      }),
    [sel, items],
  )

  const bundles = visible.filter((i) => i.category === CAT_BUNDLE)
  const qms = visible.filter((i) => i.category === CAT_QMS)
  const fs = visible.filter((i) => i.category === CAT_FS)

  useEffect(() => {
    ;(window as any).lucide?.createIcons()
  }, [sel])

  return (
    <div className="tt-cat__layout">
      <aside className="tt-filters">
        <div className="tt-filters__head">
          <span className="tt-filters__title">
            <i data-lucide="sliders-horizontal"></i> Filter templates
          </span>
          <button className="tt-reset" onClick={reset} disabled={!active}>
            <i data-lucide="x"></i> Reset
          </button>
        </div>
        <FilterGroup
          label="By Category"
          anyLabel="All Templates"
          options={filters.categories}
          value={sel.category}
          onChange={set('category')}
        />
        <FilterGroup
          label="By Standard Focus"
          anyLabel="All Standards"
          options={filters.standards}
          value={sel.standard}
          onChange={set('standard')}
          render={(o) => filters.stdShort[o] || o}
        />
        <FilterGroup
          label="By Document Type"
          anyLabel="All Types"
          options={filters.docTypes}
          value={sel.docType}
          onChange={set('docType')}
        />
        <div className="tpl-pricing-note">
          <i data-lucide="info"></i>
          <span>{pricingNote}</span>
        </div>
      </aside>

      <div className="tt-results">
        <div className="tt-results__bar">
          <span className="tt-results__count">
            Showing <b>{visible.length}</b> of {items.length} products
          </span>
          <span className="tt-results__note">Word &amp; Excel &middot; instant download</span>
        </div>

        {visible.length === 0 && (
          <div className="tt-empty">
            <div className="tt-empty__icon">
              <i data-lucide="search-x"></i>
            </div>
            <h4 className="csa-h4">No templates match those filters.</h4>
            <p>Try widening your selection — or talk to us about a custom documentation set.</p>
            <button className="btn btn--gold-pill" onClick={reset}>
              <i data-lucide="rotate-ccw"></i> Reset filters
            </button>
          </div>
        )}

        {bundles.length > 0 && (
          <section className="tpl-group" data-screen-label="High-Value Compliance Bundles">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title">
                <i data-lucide="layers"></i> High-Value Compliance Bundles
              </h3>
              <span className="tpl-group__count">
                {bundles.length} {bundles.length === 1 ? 'bundle' : 'bundles'}
              </span>
            </div>
            <div className="tpl-bundles">
              {bundles.map((b) => (
                <BundleCard key={b.id} b={b} detailBase={detailBase} />
              ))}
            </div>
          </section>
        )}

        {qms.length > 0 && (
          <section className="tpl-group" data-screen-label="Individual QMS Templates">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title">
                <i data-lucide="clipboard-list"></i> Individual Quality Management System (QMS) Templates
              </h3>
              <span className="tpl-group__count">{qms.length} of 5</span>
            </div>
            <div className="tpl-grid">
              {qms.map((t) => (
                <ItemCard key={t.id} t={t} detailBase={detailBase} />
              ))}
            </div>
          </section>
        )}

        {fs.length > 0 && (
          <section className="tpl-group" data-screen-label="Individual Functional Safety Templates">
            <div className="tpl-group__head">
              <h3 className="tpl-group__title">
                <i data-lucide="file-check"></i> Individual Functional Safety (FS) Engineering Templates
              </h3>
              <span className="tpl-group__count">{fs.length} of 12</span>
            </div>
            <div className="tpl-grid">
              {fs.map((t) => (
                <ItemCard key={t.id} t={t} detailBase={detailBase} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
