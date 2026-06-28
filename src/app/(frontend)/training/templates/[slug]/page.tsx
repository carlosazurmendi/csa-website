import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug, findDocs } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'
import { TemplateGallery } from '../../../_sections/training/TemplateGallery'
import { TemplateBuy } from '../../../_components/commerce/TemplateBuy'
import { ExpressBuyButton } from '../../../_components/commerce/ExpressBuyButton'

export const dynamic = 'force-dynamic'

/**
 * Template detail (/training/templates/[slug]) — pixel-faithful port of
 * design-reference/project/Training - Templates/Template.html (+ template-detail.css).
 *
 * One detail template renders every product. Editorial copy + commerce metadata
 * come from the matching `products` row (findBySlug('products', slug); notFound()
 * if missing — see src/collections/Products.ts + src/seed/content/products.ts).
 * generateStaticParams lists every product slug.
 *
 * Server/client split: the page is a server component; only the preview gallery
 * (thumbnail state) is extracted into the client <TemplateGallery>. The sticky
 * Buy card and final CTA are static markup here.
 *
 * Design-only constants the CMS doesn't carry are lifted verbatim from
 * templates-data.js: STD_SHORT / DOC_SHORT short labels, the priceLabel()
 * formatter, and the gallery() page-kind mock. The mock document "pages"
 * (`.td-page`) are empty placeholders exactly as the export's <Page9> — no CMS
 * media exists, so we do NOT invent images.
 *
 * Commerce is DEFERRED (M7): the export's one-click "Buy Now" (ExpressBuy modal)
 * and "Add to Cart" (store.js) are replaced with non-functional stubs — the
 * primary Buy CTA is disabled (still shows the price); the secondary action links
 * to /cart. The cart-aware `useInCart` branch is dropped (no live cart yet).
 */

type StandardRow = { code?: string } | string
type IncludeRef =
  | { slug?: string; code?: string; title?: string; format?: string; docType?: string; icon?: string; standards?: StandardRow[] }
  | string
type IncludedItem = { item?: string } | string

type ProductDoc = {
  slug: string
  code?: string
  title: string
  type: 'document' | 'bundle'
  category?: string
  standards?: StandardRow[]
  docType?: string
  format?: string
  pages?: number
  price?: number | null
  summary?: string
  description?: unknown
  whatsIncluded?: IncludedItem[]
  includes?: IncludeRef[]
  icon?: string
  badge?: string
  popular?: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Filter vocabulary + short labels — design constants the CMS doesn't carry,
// lifted verbatim from templates-data.js (CAT / STD_SHORT / DOC_SHORT).
const CAT = {
  BUNDLE: 'Compliance Bundles',
  QMS: 'Quality Management System (QMS)',
  FS: 'Functional Safety Engineering (FS)',
} as const

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

const stdCodes = (rows?: StandardRow[]): string[] =>
  (rows ?? []).map((s) => (typeof s === 'string' ? s : s.code ?? '')).filter(Boolean)

const includedItems = (rows?: IncludedItem[]): string[] =>
  (rows ?? []).map((r) => (typeof r === 'string' ? r : r.item ?? '')).filter(Boolean)

const priceLabel = (p: { price?: number | null }): string => {
  if (!p || p.price == null) return '$—'
  return '$' + Math.round(p.price / 100).toLocaleString('en-US')
}

// Preview "pages" for the detail gallery (mock document screenshots) — verbatim
// from gallery() in templates-data.js.
const galleryPages = (p: { type: string; format?: string }): { kind: 'text' | 'grid' }[] => {
  if (p.type === 'bundle')
    return [{ kind: 'text' }, { kind: 'grid' }, { kind: 'text' }, { kind: 'grid' }]
  const grid = p.format === 'Excel'
  return grid
    ? [{ kind: 'grid' }, { kind: 'grid' }, { kind: 'text' }]
    : [{ kind: 'text' }, { kind: 'text' }, { kind: 'grid' }]
}

type Member = {
  slug: string
  code?: string
  title?: string
  format?: string
  docType?: string
  icon?: string
  standards: string[]
}

const detailHref = (slug: string) => `/training/templates/${slug}`

export async function generateStaticParams() {
  const docs = await findDocs<{ slug: string }>('products', { depth: 0, limit: 100 })
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = await findBySlug<ProductDoc>('products', slug)
  return {
    title: p?.seo?.metaTitle ?? `${p?.title ?? 'Functional Safety Template'} | CSA`,
    description:
      p?.seo?.metaDescription ??
      p?.summary ??
      "A CMS-driven functional safety template — preview, description, what's included, format, standard focus, and price.",
  }
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await findBySlug<ProductDoc>('products', slug)
  if (!p) notFound()

  const isBundle = p.type === 'bundle'
  const isXls = p.format === 'Excel'
  const standards = stdCodes(p.standards)
  const included = includedItems(p.whatsIncluded)
  const descParas = lexicalToParagraphs(p.description)

  // Bundle members come from the depth-resolved `includes` relationship.
  const members: Member[] = (p.includes ?? [])
    .filter((m): m is Exclude<IncludeRef, string> => typeof m === 'object' && m !== null)
    .map((m) => ({
      slug: m.slug ?? '',
      code: m.code,
      title: m.title,
      format: m.format,
      docType: m.docType,
      icon: m.icon,
      standards: stdCodes(m.standards),
    }))

  // Related: other single documents sharing a standard. Loaded from the full
  // catalog (the export filters its in-memory PRODUCTS the same way).
  const catalog = await findDocs<ProductDoc>('products', { depth: 0, limit: 100 })
  const related = catalog
    .filter(
      (x) =>
        x.slug !== p.slug &&
        x.type === 'document' &&
        stdCodes(x.standards).some((s) => standards.includes(s)),
    )
    .slice(0, 3)

  const pages = galleryPages(p)
  const buyIncludes = included.slice(0, 4)

  // Cart line (M7) for a priced product — meta mirrors cartItem() in templates-data.js.
  const buyItem =
    typeof p.price === 'number' && p.price > 0
      ? {
          id: (isBundle ? 'bnd_' : 'tpl_') + p.slug,
          name: p.title,
          meta: isBundle
            ? `${members.length} documents · ${standards[0] ?? 'Multi-standard'}`
            : `${standards[0] ?? 'Generic'} · ${p.format ?? ''}`,
          kind: (isBundle ? 'BUNDLE' : 'TEMPLATE') as 'BUNDLE' | 'TEMPLATE',
          fmt: isBundle ? 'BUNDLE' : isXls ? 'XLSX' : 'DOCX',
          price: p.price,
          qty: 1,
        }
      : null

  return (
    <main className="td-main">
      {/* Hero */}
      <section className="td-hero">
        <div className="td-hero__haze"></div>
        <div className="td-hero__inner">
          <div>
            <p className="td-crumb">
              <Link href="/training/purchase-templates">Storefront</Link>
              <span className="sep">/</span>
              <Link
                href={`/training/browse-all-templates?category=${encodeURIComponent(p.category ?? '')}`}
              >
                {isBundle ? 'Bundles' : p.category === CAT.QMS ? 'QMS' : 'Functional Safety'}
              </Link>
            </p>
            <div className="td-kicker">
              <span className="td-kicker__code">{p.code || (isBundle ? 'Bundle' : 'Template')}</span>
              <span className={'td-fmt-chip' + (isXls ? ' td-fmt-chip--xls' : '')}>
                <i data-lucide={isBundle ? 'layers' : isXls ? 'file-spreadsheet' : 'file-text'}></i>
                {isBundle ? members.length + ' docs' : p.format}
              </span>
            </div>
            <h1 className="csa-display td-title">{p.title}</h1>
            <p className="td-lead">{p.summary}</p>
            <div className="td-meta">
              <div className="td-meta__item">
                <span className="td-meta__icon">
                  <i data-lucide={isXls ? 'file-spreadsheet' : isBundle ? 'files' : 'file-text'}></i>
                </span>
                <span>
                  <span className="td-meta__k">Format</span>
                  <span className="td-meta__v">{isBundle ? 'Word & Excel' : p.format}</span>
                </span>
              </div>
              <div className="td-meta__item">
                <span className="td-meta__icon">
                  <i data-lucide="shield"></i>
                </span>
                <span>
                  <span className="td-meta__k">Standard focus</span>
                  <span className="td-meta__v">
                    {standards.length > 1
                      ? standards.length + ' standards'
                      : STD_SHORT[standards[0]] ?? standards[0]}
                  </span>
                </span>
              </div>
              <div className="td-meta__item">
                <span className="td-meta__icon">
                  <i data-lucide="layout-list"></i>
                </span>
                <span>
                  <span className="td-meta__k">Document type</span>
                  <span className="td-meta__v">{(p.docType && DOC_SHORT[p.docType]) || p.docType}</span>
                </span>
              </div>
              <div className="td-meta__item">
                <span className="td-meta__icon">
                  <i data-lucide={isBundle ? 'package' : 'file'}></i>
                </span>
                <span>
                  <span className="td-meta__k">{isBundle ? 'Includes' : 'Length'}</span>
                  <span className="td-meta__v">
                    {isBundle ? members.length + ' templates' : p.pages + (isXls ? ' sheets' : ' pages')}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Buy card (sticky) — commerce DEFERRED (M7) */}
          <aside className="td-buy csa-glass">
            <div className="td-buy__media">
              <div className="td-page" style={{ height: '150px', marginBottom: '-2px' }}>
                <div className="td-page__title"></div>
                <div className="td-page__meta"></div>
                <div className={isXls ? 'td-page__grid' : 'td-page__body'}></div>
              </div>
              <span className="td-shot__badge" style={{ bottom: 'auto' }}>
                <i data-lucide={isBundle ? 'layers' : isXls ? 'file-spreadsheet' : 'file-text'}></i>
                {isBundle ? 'Bundle' : p.format}
              </span>
            </div>
            <div className="td-buy__pad">
              <div className="td-price">
                <span className="td-price__amt">{priceLabel(p)}</span>
                <span className="td-price__per">{isBundle ? 'bundle · one-time' : 'one-time'}</span>
              </div>
              <p className="td-price__note">Price managed in Payload CMS · instant digital delivery.</p>

              {buyItem ? (
                <TemplateBuy item={buyItem} />
              ) : (
                <div className="td-buy__actions">
                  <Link className="btn btn--gold-solid btn--lg" href="/book-a-consultation">
                    <i data-lucide="mail"></i> Request this template
                  </Link>
                </div>
              )}
              <p className="td-buy__secure">
                <i data-lucide="shield-check"></i> 14-day refund policy · free updates for 12 months
              </p>

              <ul className="td-buy__includes">
                {buyIncludes.map((t) => (
                  <li key={t}>
                    <i data-lucide="check"></i> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Preview / gallery */}
      <section className="td-section">
        <div className="td-section__head">
          <span className="csa-eyebrow">Preview</span>
          <h2 className="csa-h2">
            {isBundle ? 'A look inside the bundle.' : 'See the structure before you buy.'}
          </h2>
          <p>
            Representative sample pages. Final documents ship as fully editable{' '}
            {isBundle ? 'Word & Excel files' : isXls ? 'Excel workbooks' : 'Word files'} — media is
            delivered from the CMS.
          </p>
        </div>
        <TemplateGallery pages={pages} format={p.format} type={p.type} memberCount={members.length} />
      </section>

      {/* Description */}
      <section className="td-section">
        <div className="td-section__head">
          <span className="csa-eyebrow">About this {isBundle ? 'bundle' : 'template'}</span>
          <h2 className="csa-h2">
            {isBundle ? 'Everything you need, in one download.' : 'Built from real certification work.'}
          </h2>
        </div>
        <div className="td-prose">
          {descParas.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="td-section">
        <div className="td-section__head">
          <span className="csa-eyebrow">What&rsquo;s included</span>
          <h2 className="csa-h2">In your download.</h2>
        </div>
        <div className="td-included">
          {included.map((t) => (
            <div className="td-incl" key={t}>
              <span className="td-incl__ic">
                <i data-lucide="check"></i>
              </span>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle contents */}
      {isBundle && (
        <section className="td-section">
          <div className="td-section__head">
            <span className="csa-eyebrow">Bundle contents</span>
            <h2 className="csa-h2">{members.length} templates in this bundle.</h2>
            <p>
              Each document is also available on its own — buying the bundle is the lower-cost route to
              the full set.
            </p>
          </div>
          <div className="td-bundle-list">
            {members.map((m) => (
              <Link className="td-bitem" key={m.slug} href={detailHref(m.slug)}>
                <span className="td-bitem__ic">
                  <i data-lucide={m.icon}></i>
                </span>
                <span>
                  <p className="td-bitem__t">{m.title}</p>
                  <p className="td-bitem__s">
                    {(m.code || m.format) + ' · ' + ((m.docType && DOC_SHORT[m.docType]) || m.docType) + ' · ' + (STD_SHORT[m.standards[0]] ?? m.standards[0])}
                  </p>
                </span>
                <span className="td-bitem__go">
                  <i data-lucide="arrow-right"></i>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="td-section">
        <div className="td-section__head">
          <span className="csa-eyebrow">Format &amp; standards</span>
          <h2 className="csa-h2">Specifications.</h2>
        </div>
        <div className="td-specs">
          <div className="td-spec">
            <p className="td-spec__k">File format</p>
            <p className="td-spec__v">
              <i data-lucide={isXls ? 'file-spreadsheet' : isBundle ? 'files' : 'file-text'}></i>{' '}
              {isBundle
                ? 'Word & Excel'
                : isXls
                  ? 'Microsoft Excel (.xlsx)'
                  : 'Microsoft Word (.docx)'}
            </p>
          </div>
          <div className="td-spec">
            <p className="td-spec__k">Standard focus</p>
            <div className="td-spec__chips">
              {standards.map((s) => (
                <span className="td-spec__chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="td-spec">
            <p className="td-spec__k">{isBundle ? 'Documents' : 'Document type'}</p>
            <p className="td-spec__v">
              <i data-lucide="layout-list"></i> {isBundle ? members.length + ' templates' : p.docType}
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="td-section">
          <div className="td-section__head">
            <span className="csa-eyebrow">Related templates</span>
            <h2 className="csa-h2">Often bought together.</h2>
          </div>
          <div className="td-related__grid">
            {related.map((r) => {
              const rXls = r.format === 'Excel'
              const rStds = stdCodes(r.standards)
              return (
                <article className="tpl-card" key={r.slug}>
                  <Link
                    className={'tpl-shot' + (rXls ? ' tpl-shot--xls' : '')}
                    href={detailHref(r.slug)}
                    aria-label={r.title}
                  >
                    <div className="tpl-doc">
                      <div className="tpl-doc__title"></div>
                      <div className="tpl-doc__meta"></div>
                      <div className={rXls ? 'tpl-doc__grid' : 'tpl-doc__body'}></div>
                    </div>
                    <span className="tpl-shot__icon">
                      <i data-lucide={r.icon}></i>
                    </span>
                    <span className={'tpl-shot__fmt' + (rXls ? ' tpl-shot__fmt--xls' : '')}>
                      <i data-lucide={rXls ? 'file-spreadsheet' : 'file-text'}></i> {r.format}
                    </span>
                    {r.popular && <span className="tpl-shot__ribbon">Popular</span>}
                  </Link>
                  {r.code && <p className="tpl-card__code">{r.code}</p>}
                  <h3 className="tpl-card__title">
                    <Link href={detailHref(r.slug)} style={{ color: 'inherit' }}>
                      {r.title}
                    </Link>
                  </h3>
                  <p className="tpl-card__desc">{r.summary}</p>
                  <div className="tpl-card__meta">
                    <span className="tpl-std tpl-std--doc">
                      {(r.docType && DOC_SHORT[r.docType]) || r.docType}
                    </span>
                    {rStds.map((s) => (
                      <span className="tpl-std" key={s}>
                        {STD_SHORT[s] || s}
                      </span>
                    ))}
                  </div>
                  <div className="tpl-card__foot">
                    <span className="tpl-pricev">
                      <span className="tpl-pricev__amt">{priceLabel(r)}</span>
                      <span className="tpl-pricev__per">one-time</span>
                    </span>
                    {/* M7: Buy/Add deferred — link to the related detail page */}
                    <div className="tpl-card__cta">
                      <Link className="tpl-add" href={detailHref(r.slug)}>
                        <i data-lucide="plus"></i> Add
                      </Link>
                      <Link className="tpl-add tpl-add--solid" href={detailHref(r.slug)}>
                        <i data-lucide="zap"></i> Buy now
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* Final CTA — commerce DEFERRED (M7) */}
      <div className="td-cta__wrap">
        <section className="td-cta csa-glass">
          <div className="td-cta__haze"></div>
          <div className="td-cta__txt">
            <span className="csa-eyebrow">Ready to fast-track compliance</span>
            <h2 className="csa-h2">{isBundle ? 'Get the full set.' : 'Add it to your safety case.'}</h2>
            <p>
              Instant download, fully editable, and free updates for a year. Buy in one click or add it
              to your cart.
            </p>
          </div>
          <div className="td-cta__actions">
            {buyItem && <ExpressBuyButton item={buyItem} label={`Buy Now · ${priceLabel(p)}`} />}
            <Link className="btn btn--link" href="/book-a-consultation">
              Need a custom set? Talk to us <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
