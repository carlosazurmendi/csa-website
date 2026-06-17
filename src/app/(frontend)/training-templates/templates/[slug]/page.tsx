import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'
import { LucideRefresh } from '@/components/training/LucideRefresh'

// ISR: CMS edits surface within 60s without a redeploy.
export const dynamic = 'force-dynamic'

const CAT_LABEL: Record<string, string> = {
  'compliance-bundle': 'Compliance Bundle',
  qms: 'Quality Management System (QMS)',
  fs: 'Functional Safety Engineering (FS)',
}
const FMT_LABEL: Record<string, string> = { word: 'Word', excel: 'Excel' }
const FMT_ICON: Record<string, string> = { word: 'file-text', excel: 'file-spreadsheet' }

const splitList = (s?: string | null): string[] =>
  (s || '')
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter(Boolean)

async function getTemplate(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'templates',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] as any | undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = await getTemplate(slug)
  if (!t) return { title: 'Template not found' }
  return {
    title: `${t.title} | Functional Safety Templates`,
    description: t.description || undefined,
  }
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTemplate(slug)
  if (!t) notFound()

  const isBundle = Boolean(t.isBundle)
  const fmt = t.format ? FMT_LABEL[t.format] : null
  const fmtIcon = t.format ? FMT_ICON[t.format] : 'files'
  const standards = splitList(t.standardFocus)
  const included: { text: string }[] = t.whatsIncluded || []

  return (
    <>
      <LucideRefresh />
      <main data-screen-label="Template Detail">
        {/* Hero / detail header */}
        <section className="tt-hero" data-screen-label="Template Detail Hero">
          <div className="tt-hero__haze"></div>
          <div className="tt-hero__ghost" aria-hidden="true">
            {isBundle ? 'BUNDLE' : 'TEMPLATE'}
          </div>
          <div className="tt-hero__inner tpl-hero-grid csa-tilt-scene">
            <div className="tpl-hero__col">
              <p className="tt-crumb">
                Training &amp; Templates <span className="sep">/</span>{' '}
                <a className="cur" href="/training-templates/templates">
                  Purchase Templates
                </a>{' '}
                <span className="sep">/</span> <span className="cur">{t.title}</span>
              </p>
              <h1 className="csa-display tt-hero__title">{t.title}</h1>
              <p className="csa-lead tt-hero__lead">{t.description}</p>

              <div className="tt-hero__standards">
                <span className="tt-hero__tick" aria-hidden="true"></span>
                <span className="tt-stdlist">
                  {standards.map((s, i) => (
                    <span key={s} style={{ display: 'contents' }}>
                      {i > 0 && <span className="dot">&middot;</span>}
                      <span className="csa-mono">{s}</span>
                    </span>
                  ))}
                </span>
              </div>

              <div className="tt-hero__actions">
                <a className="btn btn--gold-solid btn--lg" href="#">
                  <i data-lucide={isBundle ? 'plus' : 'plus'}></i> {isBundle ? 'Add Bundle' : 'Add to Cart'}
                </a>
                <a className="btn btn--link" href="/training-templates/templates">
                  Back to all templates <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Buy panel */}
            <aside className="tpl-feature csa-glass csa-tilt" data-screen-label="Template Buy Panel">
              <div className={'tpl-shot' + (t.format === 'excel' ? ' tpl-shot--xls' : '')}>
                <div className="tpl-doc">
                  <div className="tpl-doc__title"></div>
                  <div className="tpl-doc__meta"></div>
                  <div className={t.format === 'excel' ? 'tpl-doc__grid' : 'tpl-doc__body'}></div>
                </div>
                <span className="tpl-shot__icon">
                  <i data-lucide={isBundle ? 'layers' : t.format === 'excel' ? 'table' : 'file-text'}></i>
                </span>
                <span className={'tpl-shot__fmt' + (t.format === 'excel' ? ' tpl-shot__fmt--xls' : '')}>
                  <i data-lucide={fmtIcon}></i> {isBundle ? `${included.length} templates` : fmt}
                </span>
              </div>
              <div className="tpl-feature__head">
                <span className="tpl-feature__badge">
                  <i data-lucide="layers"></i> {CAT_LABEL[t.category] || t.category}
                </span>
              </div>
              <h3 className="tpl-feature__title">{t.title}</h3>
              <div className="tpl-feature__incl">
                {fmt && <span className="tpl-bundle__chip">{fmt}</span>}
                {t.documentType && <span className="tpl-bundle__chip">{t.documentType}</span>}
                {standards.map((s) => (
                  <span className="tpl-bundle__chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="tpl-feature__price">
                <span className="tpl-price">
                  <span className="tpl-price__amt">{t.price || '$—'}</span>
                  <span className="tpl-price__tag">Pricing TBD</span>
                </span>
                {isBundle && <span className="tpl-feature__pmeta">{included.length} templates &middot; best value</span>}
              </div>
              <div className="tpl-feature__actions">
                <a className="btn btn--gold-solid" href="#">
                  <i data-lucide="zap"></i> Quick Checkout
                </a>
                <a className="tpl-checkout" href="#">
                  <i data-lucide="plus"></i> {isBundle ? 'Add Bundle' : 'Add to Cart'}
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* What's included */}
        {included.length > 0 && (
          <section className="tt-section" data-screen-label="What's Included">
            <div className="tt-head">
              <span className="csa-eyebrow">What&rsquo;s included</span>
              <h2 className="csa-h2">{isBundle ? 'Everything in this bundle.' : 'Inside this template.'}</h2>
            </div>
            <div className="tpl-grid">
              {included.map((inc, i) => (
                <article className="tpl-card" key={i}>
                  <h3 className="tpl-card__title">
                    <i data-lucide="check"></i> {inc.text}
                  </h3>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Details / specs */}
        <section className="tt-section tt-offer" data-screen-label="Template Details">
          <div className="tt-head">
            <span className="csa-eyebrow">Specifications</span>
            <h2 className="csa-h2">Template details.</h2>
          </div>
          <div className="tt-offer__list">
            <article className="tt-offer-item csa-glass">
              <span className="tt-offer__num">01</span>
              <div className="tt-offer__main">
                <h3 className="csa-h3 tt-offer__title">{CAT_LABEL[t.category] || t.category}</h3>
                <p className="tt-offer__body">{t.description}</p>
              </div>
              <div className="tt-offer__aside">
                {fmt && (
                  <span className="tt-offer__badge">
                    <i data-lucide={fmtIcon}></i> {fmt}
                  </span>
                )}
                {t.documentType && <span className="tt-offer__metaline">{t.documentType}</span>}
                {standards.length > 0 && <span className="tt-offer__metaline">{standards.join(' · ')}</span>}
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}
