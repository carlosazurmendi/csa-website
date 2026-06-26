import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug, findDocs } from '@/lib/cms'
import { mediaUrl, type MediaLike } from '@/lib/media'
import { lexicalToParagraphs } from '@/lib/lexical'

export const dynamic = 'force-dynamic'

/* ============================================================
   Case Study detail (/case-studies/[slug]) — pixel-faithful port of
   design-reference/project/Case Study.html + assets/case-study-detail.jsx.
   Reads one published row from the `case-studies` collection
   (src/collections/CaseStudies.ts) and renders the locked template:
     Hero → At-a-glance → Problem / Solution / Result →
     pull-quote (testimonialRef → testimonials) → Related (3) → Closing CTA.

   Pure static markup — the export's only effect is the global
   lucide/csaInit init, which is wired globally here — so this stays a
   server component with no co-located client section. Per-section icons +
   tags (the Problem/Solution/Result chrome) are design constants the CMS
   doesn't carry, kept inline exactly as the export's SECTION_META. The
   client logo + hero image + related covers render from CMS media (client.logo,
   heroImage) via plain <img>. Global nav/footer are rendered by the layout.
   ============================================================ */

/* ---------- CMS shapes ---------- */
type Point = { title?: string; description?: string }
type Metric = { value?: string; label?: string }
type Standard = { code?: string }

type Testimonial = {
  quote?: string
  authorName?: string
  authorRole?: string
}

type RelatedStudy = {
  slug?: string
  title?: string
  sector?: string
  lead?: string
  heroImage?: MediaLike
}

type CaseStudy = {
  title?: string
  slug?: string
  sector?: string
  heroBadge?: string
  client?: {
    clientName?: string
    role?: string
    logo?: MediaLike
  }
  heroImage?: MediaLike
  lead?: string
  glance?: {
    industry?: string
    engagement?: string
    outcome?: string
    outcomeSub?: string
  }
  standards?: Standard[]
  problem?: { body?: unknown; points?: Point[] }
  solution?: { body?: unknown; points?: Point[] }
  result?: { body?: unknown; metrics?: Metric[] }
  testimonialRef?: Testimonial | string | null
  related?: (RelatedStudy | string)[]
  closing?: {
    eyebrow?: string
    title?: string
    sub?: string
  }
  seo?: { metaTitle?: string; metaDescription?: string }
}

/* Problem / Solution / Result share one section shape (design constants). */
const SECTION_META = {
  problem: { kind: 'Problem', icon: 'alert-triangle', tag: 'The challenge' },
  solution: { kind: 'Solution', icon: 'shield-check', tag: 'How we worked' },
  result: { kind: 'Result', icon: 'badge-check', tag: 'The outcome' },
} as const

type SectionWhich = keyof typeof SECTION_META

function Section({
  which,
  idx,
  body,
  points,
  metrics,
}: {
  which: SectionWhich
  idx: number
  body: string[]
  points?: Point[]
  metrics?: Metric[]
}) {
  const meta = SECTION_META[which]
  return (
    <section className="csd-section" id={which}>
      <div className="csd-section__aside">
        <p className="csd-section__idx">
          {String(idx).padStart(2, '0')} <span className="csd-idx-line"></span>
        </p>
        <div className="csd-section__kind">
          <span className="csd-section__kind-ic">
            <i data-lucide={meta.icon}></i>
          </span>
          <h2 className="csd-section__title">{meta.kind}</h2>
        </div>
        <span className="csd-section__tag">{meta.tag}</span>
      </div>
      <div className="csd-section__main">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {/* Problem / Solution → bulleted point rows */}
        {points && points.length > 0 && (
          <ul className="csd-points">
            {points.map((pt, i) => (
              <li key={i}>
                <span className="csd-points__mark">
                  <i data-lucide={which === 'problem' ? 'minus' : 'check'}></i>
                </span>
                <div>
                  <p className="csd-points__t">{pt.title}</p>
                  <p className="csd-points__d">{pt.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Result → metric tiles */}
        {metrics && metrics.length > 0 && (
          <div className="csd-metrics">
            {metrics.map((m, i) => (
              <div className="csd-metric" key={i}>
                <div className="csd-metric__n">{m.value}</div>
                <p className="csd-metric__l">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function RelatedCard({ c }: { c: RelatedStudy }) {
  const href = c.slug ? '/case-studies/' + c.slug : '#'
  const cover = mediaUrl(c.heroImage)
  return (
    <Link className="csd-rcard" href={href}>
      <div className="csd-rcard__cover">
        {cover && <img src={cover} alt={c.title ?? ''} />}
        <span className="csd-rcard__sector">{c.sector}</span>
      </div>
      <div className="csd-rcard__body">
        <h3 className="csd-rcard__title">{c.title}</h3>
        <p className="csd-rcard__d">{c.lead}</p>
        <span className="csd-rcard__foot">
          Read case study <i data-lucide="arrow-right"></i>
        </span>
      </div>
    </Link>
  )
}

/* ---------- metadata + static params ---------- */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await findDocs<{ slug?: string }>('case-studies', { limit: 100 })
  return docs.filter((d): d is { slug: string } => typeof d.slug === 'string').map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = await findBySlug<CaseStudy>('case-studies', slug, 2)
  if (!cs) return { title: 'Case Study | CSA' }
  return {
    title: cs.seo?.metaTitle ?? (cs.title ? cs.title + ' | CSA' : 'Case Study | CSA'),
    description: cs.seo?.metaDescription ?? cs.lead ?? undefined,
  }
}

/* ---------- page ---------- */
export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await findBySlug<CaseStudy>('case-studies', slug, 2)
  if (!data) notFound()

  // Export uses a design-only `ghost` field falling back to client.sector; CMS
  // carries only `sector`, so both the ghost watermark and the hero kicker use it.
  const sector = data.sector ?? ''
  const g = data.glance ?? {}
  const standards = (data.standards ?? []).map((s) => s.code).filter(Boolean) as string[]

  const problemBody = lexicalToParagraphs(data.problem?.body)
  const solutionBody = lexicalToParagraphs(data.solution?.body)
  const resultBody = lexicalToParagraphs(data.result?.body)

  const t =
    typeof data.testimonialRef === 'object' && data.testimonialRef ? data.testimonialRef : null

  const related: RelatedStudy[] = (data.related ?? []).filter(
    (r): r is RelatedStudy => typeof r === 'object' && r !== null,
  )

  const closing = data.closing ?? {}
  const logoUrl = mediaUrl(data.client?.logo)
  const heroUrl = mediaUrl(data.heroImage)

  return (
    <main className="csd">
      {/* 1 · Hero */}
      <header className="csd-hero">
        <div className="csd-hero__haze" aria-hidden="true"></div>
        <div className="csd-hero__ghost" aria-hidden="true">
          {sector}
        </div>
        <div className="csd-hero__inner">
          <div className="csd-hero__copy">
            <nav className="csd-breadcrumb" aria-label="Breadcrumb">
              <Link href="/company">Company</Link>
              <i data-lucide="chevron-right"></i>
              <Link href="/company/experience">Experience</Link>
              <i data-lucide="chevron-right"></i>
              <span className="csd-breadcrumb__here">Case Study</span>
            </nav>
            <p className="csd-hero__sector">
              <span className="csd-sector-line"></span>
              {sector}
            </p>
            <h1 className="csa-display csd-hero__title" data-reveal="up">
              {data.title}
            </h1>
            <p className="csa-lead csd-hero__lead" data-reveal="up" data-reveal-delay="80">
              {data.lead}
            </p>
            <div className="csd-hero__client">
              <div className="csd-hero__logo">
                {logoUrl && <img src={logoUrl} alt={(data.client?.clientName ?? '') + ' logo'} />}
              </div>
              <div className="csd-hero__client-txt">
                <div className="csd-hero__client-name">{data.client?.clientName}</div>
                <div className="csd-hero__client-role">{data.client?.role}</div>
              </div>
            </div>
          </div>
          <div className="csd-hero__media" data-reveal="scale" data-reveal-delay="120">
            {heroUrl && <img src={heroUrl} alt={data.title ?? ''} />}
            <div className="csd-hero__media-scrim" aria-hidden="true"></div>
            {data.heroBadge && (
              <div className="csd-hero__badge csa-glass">
                <i data-lucide="badge-check"></i>
                <span>{data.heroBadge}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2 · At-a-glance */}
      <div className="csd-glance">
        <div className="csd-glance__grid" data-reveal="up">
          <div className="csd-glance__cell">
            <p className="csd-glance__k">
              <i data-lucide="factory"></i>Industry
            </p>
            <div className="csd-glance__v">{g.industry}</div>
          </div>
          <div className="csd-glance__cell">
            <p className="csd-glance__k">
              <i data-lucide="file-check"></i>Standards
            </p>
            <div className="csd-glance__chips">
              {standards.map((s) => (
                <span className="csd-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="csd-glance__cell">
            <p className="csd-glance__k">
              <i data-lucide="users"></i>Engagement
            </p>
            <div className="csd-glance__v">{g.engagement}</div>
          </div>
          <div className="csd-glance__cell">
            <p className="csd-glance__k">
              <i data-lucide="trophy"></i>Outcome
            </p>
            <div className="csd-glance__v">
              {g.outcome}
              <span className="csd-sub">{g.outcomeSub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 · Problem / Solution / Result */}
      <div className="csd-body">
        <Section which="problem" idx={1} body={problemBody} points={data.problem?.points} />
        <Section which="solution" idx={2} body={solutionBody} points={data.solution?.points} />
        <Section which="result" idx={3} body={resultBody} metrics={data.result?.metrics} />
      </div>

      {/* 4 · Pull-quote / testimonial */}
      {t && (
        <div className="csd-quote-wrap">
          <div className="csd-quote-wrap__haze" aria-hidden="true"></div>
          <figure className="csd-quote">
            <span className="csd-quote__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="csd-quote__text" data-reveal="up">
              {t.quote}
            </p>
            <figcaption className="csd-quote__by">
              <span className="csd-quote__name">{t.authorName}</span>
              {t.authorRole && <span className="csd-quote__sep">/</span>}
              {t.authorRole && <span className="csd-quote__role">{t.authorRole}</span>}
            </figcaption>
          </figure>
        </div>
      )}

      {/* 5 · Related case studies */}
      {related.length > 0 && (
        <section className="csd-rel">
          <div className="csd-rel__inner">
            <div className="csd-rel__head">
              <div>
                <p className="csa-eyebrow csd-rel__eyebrow" data-reveal="up" data-scramble>
                  Proof, not promises
                </p>
                <h2 className="csa-h2 csd-rel__title" data-reveal="up" data-reveal-delay="80">
                  Related case studies.
                </h2>
              </div>
              <Link className="btn btn--link" href="/case-studies">
                All case studies <i data-lucide="arrow-right"></i>
              </Link>
            </div>
            <div className="csd-rel__grid">
              {related.map((c, i) => (
                <RelatedCard c={c} key={c.slug ?? i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6 · Closing CTA */}
      <section className="csd-close">
        <div className="csd-close__haze" aria-hidden="true"></div>
        <div className="csd-close__inner">
          <p className="csa-eyebrow csd-close__eyebrow" data-reveal="up" data-scramble>
            {closing.eyebrow}
          </p>
          <h2 className="csa-display csd-close__title" data-reveal="up" data-reveal-delay="80">
            {closing.title}
          </h2>
          <p className="csa-lead csd-close__sub" data-reveal="up" data-reveal-delay="160">
            {closing.sub}
          </p>
          <Link
            className="btn btn--gold-pill btn--lg"
            href="/book-a-consultation"
            data-metal="gold"
            data-reveal="up"
            data-reveal-delay="240"
          >
            Discuss Your Project <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </section>
    </main>
  )
}
