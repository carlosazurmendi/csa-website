import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug, findDocs } from '@/lib/cms'
import { lexicalToParagraphs } from '@/lib/lexical'
import { mediaUrl } from '@/lib/media'

export const dynamic = 'force-dynamic'

/**
 * Digital Courses — pixel-faithful port of
 * design-reference/project/Training - Templates/Digital Courses.html.
 *
 * Pure-markup page: the export's only runtime JS is window.lucide.createIcons()
 * (handled globally) and the TrackCard groups courses with a pure helper — so this
 * is a server component with no co-located client section.
 *
 * CMS sources:
 *   • training-templates row (slug `digital-courses`) — hero, "Why train with CSA"
 *     value cards, the learning-track copy, the instructor band labels, and the
 *     closing "Request a Private Course" band.
 *   • courses collection — the per-track course lists + the hero "N programs" count.
 *   • instructors collection (`ben`) — the founder band's name/role/location, bio,
 *     credentials, and headline stats (the export reads CSA_INSTRUCTORS.ben).
 *
 * Links: the catalog hub → /training/course-catalog (the export's catalogHref;
 * track "Explore …" links append ?industry=<track>); course rows →
 * /training/courses/<slug>; "Talk to an Instructor" → /book-a-consultation;
 * "Request a Private Course" → /training/request-a-private-course.
 */

type ValItem = { icon?: string; title?: string; body?: string }

type TrkItem = {
  name?: string
  icon?: string
  standards?: string
  desc?: string
  linkLabel?: string
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
  valItems?: ValItem[]
  trkEyebrow?: string
  trkHeading?: string
  trkLead?: string
  trkItems?: TrkItem[]
  instrEyebrow?: string
  instrHeading?: string
  instrPortraitTag?: string
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

type CourseDoc = {
  slug: string
  title: string
  track?: string[]
}

type CredentialItem = { icon?: string; title?: string; subtitle?: string }
type StatItem = { value?: string; suffix?: string; label?: string }

type InstructorDoc = {
  slug: string
  name?: string
  role?: string
  location?: string
  bioShort?: string
  bio?: unknown
  avatar?: { url?: string } | string | null
  credentials?: CredentialItem[]
  stats?: StatItem[]
}

// The catalog hub, with an optional ?industry= filter (the export's catalogHref).
const catalogHref = (industry?: string) =>
  '/training/course-catalog' + (industry ? '?industry=' + encodeURIComponent(industry) : '')

// A course's display label in a track list — the export strips the trailing
// " Training" and a leading "IEC 61508 " so the short titles read cleanly.
const trackLabel = (title: string) => title.replace(/ Training$/, '').replace(/^IEC 61508 /, '')

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<PageRow>('training-templates', 'digital-courses')
  return {
    title:
      row?.seo?.metaTitle ?? 'Digital Courses & On-Demand Functional Safety Training | CSA',
    description:
      row?.seo?.metaDescription ??
      "On-demand functional safety training built for working engineers — learning tracks for Robotics, Rail, and Industrial Machinery, taught by CSA's principal safety engineers.",
  }
}

export default async function DigitalCoursesPage() {
  const [row, courses, instructors] = await Promise.all([
    findBySlug<PageRow>('training-templates', 'digital-courses'),
    findDocs<CourseDoc>('courses', { depth: 0, limit: 100 }),
    findDocs<InstructorDoc>('instructors', { where: { slug: { equals: 'ben' } }, limit: 1, depth: 1 }),
  ])

  const page = row ?? {}
  const heroLead = lexicalToParagraphs(page.heroLead)
  const titleLines = (page.heroTitle ?? '').split('\n')
  const valItems = page.valItems ?? []
  const trkItems = page.trkItems ?? []

  const ben = instructors[0]
  const benBio = lexicalToParagraphs(ben?.bio)
  const benAvatar = mediaUrl(ben?.avatar)
  const credentials = ben?.credentials ?? []
  const stats = ben?.stats ?? []

  const byTrack = (name?: string) =>
    name ? courses.filter((c) => (c.track ?? []).includes(name)) : []

  return (
    <main>
      {/* Hero */}
      <section className="tt-hero">
        <div className="tt-hero__haze"></div>
        <div className="tt-hero__ghost" aria-hidden="true">
          {page.heroGhost}
        </div>
        <div className="tt-hero__inner">
          <p className="tt-crumb">
            Training &amp; Templates <span className="sep">/</span>{' '}
            <span className="cur">{page.heroCrumb}</span>
          </p>
          <h1 className="csa-display tt-hero__title" data-reveal="up">
            {titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          {heroLead.map((p, i) => (
            <p className="csa-lead tt-hero__lead" data-reveal="up" data-reveal-delay="80" key={i}>
              {p}
            </p>
          ))}
          <div className="tt-hero__actions" data-reveal="up" data-reveal-delay="140">
            <Link className="btn btn--gold-pill btn--lg" href={catalogHref()}>
              {page.heroPrimaryCta} <i data-lucide="arrow-right"></i>
            </Link>
            <Link className="btn btn--silver-pill btn--lg" href="/book-a-consultation">
              {page.heroSecondaryCta} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
          <div className="tt-hero__standards" data-reveal="up" data-reveal-delay="180">
            <span className="tt-hero__tick" aria-hidden="true"></span>
            <span className="tt-stdlist">
              <span className="csa-mono">SGS-TÜV Saar approved partner</span>
              <span className="dot">&middot;</span>
              <span className="csa-mono">Certificate of completion</span>
              <span className="dot">&middot;</span>
              <span className="csa-mono">{courses.length} programs</span>
            </span>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="tt-section ch-value">
        <div className="tt-head">
          <span className="csa-eyebrow">{page.valEyebrow}</span>
          <h2 className="csa-h2">{page.valHeading}</h2>
        </div>
        <div className="ch-value__grid">
          {valItems.map((v) => (
            <article className="ch-value-card" key={v.title} data-reveal="up">
              <span className="ch-value-card__icon">
                <i data-lucide={v.icon}></i>
              </span>
              <h3 className="ch-value-card__t">{v.title}</h3>
              <p className="ch-value-card__b">{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Learning tracks */}
      <section className="tt-section ch-tracks">
        <div className="tt-head">
          <span className="csa-eyebrow">{page.trkEyebrow}</span>
          <h2 className="csa-h2">{page.trkHeading}</h2>
          <p className="csa-lead tt-head__lead">{page.trkLead}</p>
        </div>
        <div className="ch-tracks__grid">
          {trkItems.map((t) => {
            const trackCourses = byTrack(t.name)
            return (
              <article className="ch-track" key={t.name} data-reveal="up">
                <div className="ch-track__top">
                  <span className="ch-track__count">
                    {trackCourses.length} {trackCourses.length === 1 ? 'course' : 'courses'}
                  </span>
                  <span className="ch-track__icon">
                    <i data-lucide={t.icon}></i>
                  </span>
                  <h3 className="ch-track__name">{t.name}</h3>
                  <p className="ch-track__std csa-mono">{t.standards}</p>
                </div>
                <div className="ch-track__body">
                  <p className="ch-track__desc">{t.desc}</p>
                  <ul className="ch-track__list">
                    {trackCourses.map((c) => (
                      <li className="ch-track__item" key={c.slug}>
                        <i data-lucide="play-circle"></i>
                        <Link href={`/training/courses/${c.slug}`} style={{ color: 'inherit' }}>
                          <span>{trackLabel(c.title)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="ch-track__link" href={catalogHref(t.name)}>
                    {t.linkLabel} <i data-lucide="arrow-right"></i>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Instructor credentials */}
      <section className="ch-instr">
        <div className="ch-instr__haze"></div>
        <div className="ch-instr__inner">
          <div className="ch-instr__left" data-reveal="right">
            <div className="ch-portrait" data-metal="silver">
              <span className="ch-portrait__tag">{page.instrPortraitTag}</span>
              {benAvatar && <img src={benAvatar} alt={ben?.name ?? ''} />}
              <div className="ch-portrait__plate">
                <p className="ch-portrait__name">{ben?.name}</p>
                <p className="ch-portrait__role">
                  {ben?.role}
                  <span> · </span>
                  {ben?.location}
                </p>
              </div>
            </div>
            <div className="ch-instr__certs">
              {credentials.map((c) => (
                <div className="ch-cert csa-glass" data-metal="silver" key={c.title}>
                  <span className="ch-cert__icon">
                    <i data-lucide={c.icon}></i>
                  </span>
                  <span>
                    <span className="ch-cert__t">{c.title}</span>
                    <br />
                    <span className="ch-cert__s">{c.subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ch-instr__right" data-reveal="left" data-reveal-delay="120">
            <span className="csa-eyebrow">{page.instrEyebrow}</span>
            <h2 className="csa-h2 ch-instr__title">{page.instrHeading}</h2>
            <div className="ch-instr__bio">
              {ben?.bioShort && <p>{ben.bioShort}</p>}
              {benBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="ch-instr__stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="ch-stat__n">
                    {s.value}
                    {s.suffix || ''}
                  </div>
                  <p className="ch-stat__l">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request a Private Course band */}
      <section className="tt-private">
        <div className="tt-private__inner">
          <div className="tt-private__panel csa-glass">
            <div className="tt-private__haze"></div>
            <div className="tt-private__txt">
              <span className="csa-eyebrow">{page.ctaEyebrow}</span>
              <h2 className="csa-h2 tt-private__title">{page.ctaHeading}</h2>
              <p className="tt-private__sub">{page.ctaSub}</p>
            </div>
            <div className="tt-private__actions">
              <Link className="btn btn--gold-solid btn--lg" href="/training/request-a-private-course">
                {page.ctaPrimary} <i data-lucide="arrow-right"></i>
              </Link>
              <Link className="btn btn--link" href={catalogHref()}>
                {page.ctaSecondary} <i data-lucide="arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
