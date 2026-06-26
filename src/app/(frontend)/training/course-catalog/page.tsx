import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { CourseCatalog, type CatalogCourse } from '../../_sections/training/CourseCatalog'

export const dynamic = 'force-dynamic'

/**
 * Course Catalog — pixel-faithful port of
 * design-reference/project/Training - Templates/Course Catalog.html.
 *
 * Editorial chrome (hero, "Why train with CSA" cards, filter-section copy, core
 * offerings, closing "Request a Private Course" band) comes from the
 * `training-templates` page row (slug `course-catalog`). The filterable course
 * grid is the client <CourseCatalog>, fed the `courses` collection. Course cards
 * link to the course landing template (/training/courses/<slug>).
 */

type CourseDoc = {
  slug: string
  code?: string
  title: string
  track?: string[]
  format?: string[]
  credential?: string
  level?: string
  duration?: string
  price?: number | null
  summary?: string
  popular?: boolean
}

type PageRow = {
  heroCrumb?: string
  heroGhost?: string
  heroTitle?: string
  heroLead?: unknown
  heroPrimaryCta?: string
  heroSecondaryCta?: string
  valEyebrow?: string
  valHeading?: string
  valItems?: { icon?: string; title?: string; body?: string }[]
  filtEyebrow?: string
  filtHeading?: string
  filtLead?: string
  offEyebrow?: string
  offHeading?: string
  offItems?: { num?: string; title?: string; body?: string; badge?: string; meta?: string }[]
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<PageRow>('training-templates', 'course-catalog')
  return {
    title: row?.seo?.metaTitle ?? 'Functional Safety Courses | IEC 61508 Training | CSA',
    description:
      row?.seo?.metaDescription ??
      'Functional safety training from an approved SGS-TÜV Saar partner — IEC 61508 IFSP, custom floor-ready workshops, and independent risk assessment (FMEA/FTA) facilitation.',
  }
}

const toCourse = (c: CourseDoc): CatalogCourse => ({
  slug: c.slug,
  code: c.code ?? '',
  title: c.title,
  track: c.track ?? [],
  format: c.format ?? [],
  credential: c.credential ?? 'Certificate of completion',
  level: c.level ?? '',
  duration: c.duration ?? '',
  price: c.price ?? null,
  summary: c.summary ?? '',
  popular: c.popular ?? false,
})

// Course slug ordering follows the seed (flagship first), matching the export's
// COURSES array order.
const COURSE_ORDER = [
  'iec-61508-ifsp',
  'iso-13849-pl-verification',
  'robot-safety-fundamentals',
  'rail-safety-case-authoring',
  'risk-assessment-facilitation',
  'custom-floor-ready-workshop',
]

export default async function CourseCatalogPage() {
  const [row, courseDocs] = await Promise.all([
    findBySlug<PageRow>('training-templates', 'course-catalog'),
    findDocs<CourseDoc>('courses', { depth: 1, limit: 100 }),
  ])

  const courses = courseDocs
    .map(toCourse)
    .sort((a, b) => {
      const ai = COURSE_ORDER.indexOf(a.slug)
      const bi = COURSE_ORDER.indexOf(b.slug)
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    })

  // Hero title: the seeded heroTitle uses a "\n" line break (export's <br/>).
  const heroTitle = row?.heroTitle ?? 'Functional Safety\nCourse Catalog.'
  const [heroLine1, heroLine2] = heroTitle.split('\n')

  const valItems = row?.valItems ?? []
  const offItems = row?.offItems ?? []

  // The three Core Offerings link to their matching course landing pages, in the
  // same order the export pins them (design constant — copy guide p.24).
  const OFFERING_SLUGS = ['iec-61508-ifsp', 'custom-floor-ready-workshop', 'risk-assessment-facilitation']

  return (
    <main>
      {/* Hero */}
      <section className="tt-hero">
        <div className="tt-hero__haze"></div>
        <div className="tt-hero__ghost" aria-hidden="true">{row?.heroGhost ?? 'COURSES'}</div>
        <div className="tt-hero__inner">
          <p className="tt-crumb">
            <Link href="/training/digital-courses" style={{ color: 'inherit' }}>Digital Courses</Link>
            <span className="sep">/</span> <span className="cur">{row?.heroCrumb ?? 'Course Catalog'}</span>
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
            Practical functional safety training that simplifies the safety lifecycle —
            designed for working engineers, not just standards committees.
          </p>
          <div className="tt-hero__actions">
            <a className="btn btn--gold-pill btn--lg" href="#catalog">
              {row?.heroPrimaryCta ?? 'Explore Courses'} <i data-lucide="arrow-down"></i>
            </a>
            <Link className="btn btn--silver-pill btn--lg" href="/training/request-a-private-course">
              {row?.heroSecondaryCta ?? 'Request a Private Course'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Train With CSA */}
      <section className="tt-section tt-why">
        <div className="tt-head">
          <span className="csa-eyebrow">{row?.valEyebrow ?? 'Why train with CSA'}</span>
          <h2 className="csa-h2">{row?.valHeading ?? 'Training from engineers who certify real systems.'}</h2>
        </div>
        <div className="tt-why__grid">
          {valItems.map((w) => (
            <article className="tt-why-card" key={w.title}>
              <span className="tt-why-card__icon"><i data-lucide={w.icon}></i></span>
              <div>
                <h3 className="tt-why-card__title">{w.title}</h3>
                <p className="tt-why-card__body">{w.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Filter Courses + Catalog grid */}
      <section className="tt-section tt-cat" id="catalog">
        <div className="tt-head">
          <span className="csa-eyebrow">{row?.filtEyebrow ?? 'Find your course'}</span>
          <h2 className="csa-h2">{row?.filtHeading ?? 'Filter courses.'}</h2>
          <p className="csa-lead tt-head__lead">
            {row?.filtLead ??
              'Narrow by industry, delivery format, or credential to find the right program for your team.'}
          </p>
        </div>
        <Suspense fallback={null}>
          <CourseCatalog courses={courses} />
        </Suspense>
      </section>

      {/* Core Educational Offerings */}
      <section className="tt-section tt-offer">
        <div className="tt-head">
          <span className="csa-eyebrow">{row?.offEyebrow ?? 'Core educational offerings'}</span>
          <h2 className="csa-h2">{row?.offHeading ?? 'Three programs that translate standards into practice.'}</h2>
        </div>
        <div className="tt-offer__list">
          {offItems.map((o, i) => (
            <Link
              className="tt-offer-item csa-glass"
              key={o.num}
              href={`/training/courses/${OFFERING_SLUGS[i] ?? ''}`}
              style={{ textDecoration: 'none' }}
            >
              <span className="tt-offer__num">{o.num}</span>
              <div className="tt-offer__main">
                <h3 className="csa-h3 tt-offer__title">{o.title}</h3>
                <p className="tt-offer__body">{o.body}</p>
              </div>
              <div className="tt-offer__aside">
                <span className="tt-offer__badge"><i data-lucide="badge-check"></i> {o.badge}</span>
                <span className="tt-offer__metaline">{o.meta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Request a Private Course */}
      <section className="tt-private">
        <div className="tt-private__inner">
          <div className="tt-private__panel csa-glass">
            <div className="tt-private__haze"></div>
            <div className="tt-private__txt">
              <span className="csa-eyebrow">{row?.ctaEyebrow ?? 'Private & custom delivery'}</span>
              <h2 className="csa-h2 tt-private__title">{row?.ctaHeading ?? 'Request a private course.'}</h2>
              <p className="tt-private__sub">
                {row?.ctaSub ??
                  'Bring any program to your team as a private virtual session or an in-person custom workshop — scheduled around your engineering calendar and tailored to your active hardware.'}
              </p>
            </div>
            <div className="tt-private__actions">
              <Link className="btn btn--gold-solid btn--lg" href="/training/request-a-private-course">
                {row?.ctaPrimary ?? 'Request a Private Course'} <i data-lucide="arrow-right"></i>
              </Link>
              <Link className="btn btn--link" href="/book-a-consultation">
                {row?.ctaSecondary ?? 'Talk to an instructor'} <i data-lucide="arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
