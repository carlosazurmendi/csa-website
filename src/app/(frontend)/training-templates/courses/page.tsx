import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { LucideRefresh } from '@/components/training/LucideRefresh'
import { CourseCatalog, type CourseCard, type CourseFilters } from '@/components/training/CourseCatalog'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const data = (await payload.findGlobal({ slug: 'trainingTemplatesOverview' })) as any
  return {
    title: data?.meta?.title || 'Functional Safety Courses | IEC 61508 Training',
    description: data?.meta?.description || undefined,
  }
}

const lines = (s?: string | null) => (s || '').split('\n')

// Display label for the constrained `format` enum.
const FORMAT_LABEL: Record<string, string> = {
  online: 'Private Virtual Team Session',
  'in-person': 'In-Person Custom Workshop',
  hybrid: 'Private or Group',
  'self-paced': 'On-Demand',
}

// Split a "·"/"," joined track string into discrete industry tags.
const splitList = (s?: string | null): string[] =>
  (s || '')
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter(Boolean)

export default async function CourseCatalogPage() {
  const payload = await getPayloadClient()
  const [data, coursesRes] = await Promise.all([
    payload.findGlobal({ slug: 'trainingTemplatesOverview', depth: 1 }) as Promise<any>,
    payload.find({ collection: 'courses', sort: 'order', limit: 100, depth: 1 }),
  ])

  const hero = data?.coursesHero || {}
  const why = data?.why || {}
  const catalog = data?.catalog || {}
  const offerings = data?.offerings || {}
  const priv = data?.coursesPrivate || {}

  // ---- Map courses → filterable cards ----
  const courses: CourseCard[] = coursesRes.docs.map((c: any) => {
    const industries = splitList(c.track)
    const fmtLabel = FORMAT_LABEL[c.format] || c.format || ''
    // Modules carry no filter meaning here; formats list mirrors the chosen
    // delivery format so the format filter resolves against a single value.
    return {
      id: String(c.id),
      code: c.credential ? c.credential : c.track || '',
      title: c.title,
      summary: c.summary || '',
      industries,
      industryLabel: industries.length > 0 ? industries.join(' · ') : c.track || 'All Industries',
      formats: [fmtLabel].filter(Boolean),
      formatLabel: fmtLabel,
      credential: c.credential || 'Certificate of completion',
    }
  })

  // ---- Derive filter option sets from the data ----
  const uniq = (xs: string[]) => Array.from(new Set(xs)).filter(Boolean)
  const filters: CourseFilters = {
    industry: { label: 'By Industry', any: 'All', options: uniq(courses.flatMap((c) => c.industries)) },
    format: { label: 'By Format', any: 'Any format', options: uniq(courses.flatMap((c) => c.formats)) },
    credential: { label: 'By Credential', any: 'Any', options: uniq(courses.map((c) => c.credential)) },
  }

  return (
    <>
      <LucideRefresh />
      <main data-screen-label="Course Catalog">
        {/* Hero */}
        <section className="tt-hero" data-screen-label="Course Catalog Hero">
          <div className="tt-hero__haze"></div>
          <div className="tt-hero__ghost" aria-hidden="true">
            {hero.ghost}
          </div>
          <div className="tt-hero__inner">
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
              <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref || '#catalog'}>
                {hero.primaryCtaLabel} <i data-lucide="arrow-down"></i>
              </a>
              <a className="btn btn--silver-pill btn--lg" href={hero.secondaryCtaHref || '#'}>
                {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* Why Train With CSA */}
        <section className="tt-section tt-why" data-screen-label="Why Train With CSA">
          <div className="tt-head">
            <span className="csa-eyebrow">{why.eyebrow}</span>
            <h2 className="csa-h2">{why.title}</h2>
          </div>
          <div className="tt-why__grid">
            {(why.items || []).map((w: any) => (
              <article className="tt-why-card" key={w.title}>
                <span className="tt-why-card__icon">
                  <i data-lucide={w.icon}></i>
                </span>
                <div>
                  <h3 className="tt-why-card__title">{w.title}</h3>
                  <p className="tt-why-card__body">{w.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Filter Courses + Catalog grid */}
        <section className="tt-section tt-cat" id="catalog" data-screen-label="Filter Courses">
          <div className="tt-head">
            <span className="csa-eyebrow">{catalog.eyebrow}</span>
            <h2 className="csa-h2">{catalog.title}</h2>
            <p className="csa-lead tt-head__lead">{catalog.lead}</p>
          </div>
          <CourseCatalog
            courses={courses}
            filters={filters}
            viewCourseHref={priv.primaryHref || '#'}
            emptyCtaLabel={priv.primaryLabel || 'Request a Private Course'}
            emptyCtaHref={priv.primaryHref || '#'}
          />
        </section>

        {/* Core Educational Offerings */}
        <section className="tt-section tt-offer" data-screen-label="Core Educational Offerings">
          <div className="tt-head">
            <span className="csa-eyebrow">{offerings.eyebrow}</span>
            <h2 className="csa-h2">{offerings.title}</h2>
          </div>
          <div className="tt-offer__list">
            {(offerings.items || []).map((o: any) => (
              <article className="tt-offer-item csa-glass" key={o.num}>
                <span className="tt-offer__num">{o.num}</span>
                <div className="tt-offer__main">
                  <h3 className="csa-h3 tt-offer__title">{o.title}</h3>
                  <p className="tt-offer__body">{o.body}</p>
                </div>
                <div className="tt-offer__aside">
                  <span className="tt-offer__badge">
                    <i data-lucide="badge-check"></i> {o.badge}
                  </span>
                  <span className="tt-offer__metaline">{o.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Request a Private Course */}
        <section className="tt-private" data-screen-label="Request a Private Course">
          <div className="tt-private__inner">
            <div className="tt-private__panel csa-glass">
              <div className="tt-private__haze"></div>
              <div className="tt-private__txt">
                <span className="csa-eyebrow">{priv.eyebrow}</span>
                <h2 className="csa-h2 tt-private__title">{priv.title}</h2>
                <p className="tt-private__sub">{priv.sub}</p>
              </div>
              <div className="tt-private__actions">
                <a className="btn btn--gold-solid btn--lg" href={priv.primaryHref || '#'}>
                  {priv.primaryLabel} <i data-lucide="arrow-right"></i>
                </a>
                <a className="btn btn--link" href={priv.secondaryHref || '#'}>
                  {priv.secondaryLabel} <i data-lucide="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
