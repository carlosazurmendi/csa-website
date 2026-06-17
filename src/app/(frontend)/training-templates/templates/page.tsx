import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { LucideRefresh } from '@/components/training/LucideRefresh'
import { TemplateStorefront, type TemplateItem, type StoreFilters } from '@/components/training/TemplateStorefront'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const data = (await payload.findGlobal({ slug: 'trainingTemplatesOverview' })) as any
  return {
    title: data?.meta?.title || 'Functional Safety Templates | IEC 61508, ISO 13849, ISO 26262',
    description: data?.meta?.description || undefined,
  }
}

const lines = (s?: string | null) => (s || '').split('\n')

// Group-bucket labels (must stay in this order: bundle, qms, fs).
const CAT = {
  BUNDLE: 'Compliance Bundles',
  QMS: 'Quality Management System (QMS)',
  FS: 'Functional Safety Engineering (FS)',
}
const CAT_BY_VALUE: Record<string, string> = {
  'compliance-bundle': CAT.BUNDLE,
  qms: CAT.QMS,
  fs: CAT.FS,
}

const STANDARDS_ORDER = ['IEC 61508', 'ISO 13849', 'ISO 26262', 'Generic Safety Lifecycle']
const DOCTYPES_ORDER = ['Plans', 'Reports & Concepts', 'Analytical Models & Tools']

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

const FMT_LABEL: Record<string, string> = { word: 'Word', excel: 'Excel' }

const splitList = (s?: string | null): string[] =>
  (s || '')
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter(Boolean)

export default async function PurchaseTemplatesPage() {
  const payload = await getPayloadClient()
  const [data, templatesRes] = await Promise.all([
    payload.findGlobal({ slug: 'trainingTemplatesOverview', depth: 1 }) as Promise<any>,
    payload.find({ collection: 'templates', sort: 'order', limit: 100, depth: 1 }),
  ])

  const hero = data?.templatesHero || {}
  const featured = data?.featured || {}
  const store = data?.store || {}
  const closing = data?.templatesClosing || {}
  const heroStandards: { label: string }[] = hero.standards || []

  // ---- Map templates → storefront items ----
  const items: TemplateItem[] = templatesRes.docs.map((t: any) => {
    const category = CAT_BY_VALUE[t.category] || CAT.FS
    const kind: 'bundle' | 'item' = t.isBundle ? 'bundle' : 'item'
    const standards = splitList(t.standardFocus)
    const docTypes = t.documentType ? [t.documentType] : []
    return {
      id: String(t.id),
      slug: t.slug,
      category,
      kind,
      icon: kind === 'bundle' ? 'layers' : t.format === 'excel' ? 'table' : 'file-text',
      title: t.title,
      desc: t.description || '',
      standards,
      docTypes,
      // item-only
      fmt: kind === 'item' ? FMT_LABEL[t.format] || null : null,
      code: null,
      docTypeShort: docTypes[0] ? DOC_SHORT[docTypes[0]] || docTypes[0] : null,
      stdShort: standards.map((s) => STD_SHORT[s] || s),
      // bundle-only
      tag: kind === 'bundle' ? (t.whatsIncluded?.length ? `${t.whatsIncluded.length} templates` : null) : null,
      incl: kind === 'bundle' ? (t.whatsIncluded || []).map((w: any) => w.text) : [],
      featured: false,
    }
  })

  const filters: StoreFilters = {
    categories: [CAT.BUNDLE, CAT.QMS, CAT.FS],
    standards: STANDARDS_ORDER,
    docTypes: DOCTYPES_ORDER,
    stdShort: STD_SHORT,
    catShort: { bundle: CAT.BUNDLE, qms: CAT.QMS, fs: CAT.FS },
  }

  return (
    <>
      <LucideRefresh />
      <main data-screen-label="Purchase Templates">
        {/* Hero */}
        <section className="tt-hero" data-screen-label="Purchase Templates Hero">
          <div className="tt-hero__haze"></div>
          <div className="tt-hero__ghost" aria-hidden="true">
            {hero.ghost}
          </div>
          <div className="tt-hero__inner tpl-hero-grid csa-tilt-scene">
            <div className="tpl-hero__col">
              <p className="tt-crumb">
                Training &amp; Templates <span className="sep">/</span> <span className="cur">{hero.crumb}</span>
              </p>
              <h1 className="csa-display tt-hero__title">
                {lines(hero.title).map((l: string, i: number) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {l}
                  </span>
                ))}
              </h1>
              <p className="csa-lead tt-hero__lead">{hero.lead}</p>
              <div className="tt-hero__actions">
                <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref || '#store'}>
                  {hero.primaryCtaLabel} <i data-lucide="arrow-down"></i>
                </a>
                <a className="btn btn--silver-pill btn--lg" href={hero.secondaryCtaHref || '#'}>
                  {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
                </a>
              </div>
              <div className="tt-hero__standards">
                <span className="tt-hero__tick" aria-hidden="true"></span>
                <span className="tt-stdlist">
                  {heroStandards.map((s, i) => (
                    <span key={s.label} style={{ display: 'contents' }}>
                      {i > 0 && <span className="dot">&middot;</span>}
                      <span className="csa-mono">{s.label}</span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
            {/* /tpl-hero__col */}

            <aside className="tpl-feature csa-glass csa-tilt" data-screen-label="Featured Bundle">
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
                <span className="tpl-shot__icon">
                  <i data-lucide={featured.icon || 'library'}></i>
                </span>
                <span className="tpl-shot__fmt">
                  <i data-lucide="files"></i> {featured.tag}
                </span>
              </div>
              <div className="tpl-feature__head">
                <span className="tpl-feature__badge">
                  <i data-lucide="star"></i> {featured.badge}
                </span>
              </div>
              <h3 className="tpl-feature__title">{featured.title}</h3>
              <p className="tpl-feature__desc">{featured.description}</p>
              <div className="tpl-feature__incl">
                {(featured.chips || []).map((c: any) => (
                  <span className="tpl-bundle__chip" key={c.label}>
                    {c.label}
                  </span>
                ))}
              </div>
              <div className="tpl-feature__price">
                <span className="tpl-price">
                  <span className="tpl-price__amt">$&mdash;</span>
                  <span className="tpl-price__tag">Pricing TBD</span>
                </span>
                <span className="tpl-feature__pmeta">{featured.priceMeta}</span>
              </div>
              <div className="tpl-feature__actions">
                <a className="btn btn--gold-solid" href="#">
                  <i data-lucide="zap"></i> {featured.primaryLabel}
                </a>
                <a className="tpl-checkout" href="#">
                  <i data-lucide="plus"></i> {featured.secondaryLabel}
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Filter + Storefront */}
        <section className="tt-section tt-store" id="store" data-screen-label="Filter Templates">
          <div className="tt-head">
            <span className="csa-eyebrow">{store.eyebrow}</span>
            <h2 className="csa-h2">{store.title}</h2>
            <p className="csa-lead tt-head__lead">{store.lead}</p>
          </div>
          <TemplateStorefront
            items={items}
            filters={filters}
            detailBase="/training-templates/templates"
            pricingNote={store.pricingNote || ''}
          />
        </section>

        {/* Closing — Shop All Templates */}
        <section className="tt-private" data-screen-label="Shop All Templates">
          <div className="tt-private__inner">
            <div className="tt-private__panel csa-glass">
              <div className="tt-private__haze"></div>
              <div className="tt-private__txt">
                <span className="csa-eyebrow">{closing.eyebrow}</span>
                <h2 className="csa-h2 tt-private__title">{closing.title}</h2>
                <p className="tt-private__sub">{closing.sub}</p>
                <div className="tpl-cta__list">
                  {(closing.stats || []).map((st: any, i: number) => (
                    <span key={i} style={{ display: 'contents' }}>
                      {i > 0 && <span className="tpl-cta__sep"></span>}
                      <span className="tpl-cta__stat">
                        {st.value && <b>{st.value}</b>} {st.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="tt-private__actions">
                <a className="btn btn--gold-solid btn--lg" href={closing.primaryHref || '#store'}>
                  {closing.primaryLabel} <i data-lucide="arrow-up"></i>
                </a>
                <a className="btn btn--link" href={closing.secondaryHref || '#'}>
                  {closing.secondaryLabel} <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
