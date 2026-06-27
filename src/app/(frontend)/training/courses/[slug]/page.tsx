import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findBySlug, findDocs } from '@/lib/cms'
import { lexicalToParagraphs, lexicalToText } from '@/lib/lexical'
import { mediaUrl } from '@/lib/media'
import { isEnrolled } from '@/lib/lms'
import { CourseCurriculum, type CurriculumModule } from '../../../_sections/training/CourseCurriculum'

export const dynamic = 'force-dynamic'

/**
 * Course landing template — pixel-faithful port of
 * design-reference/project/Training - Templates/Course.html.
 *
 * One `courses` record by slug (depth 2 to resolve the instructor relationship).
 * The hero, outcomes, curriculum, standards, instructor and final CTA bands all
 * read from the doc; the curriculum accordion is the client <CourseCurriculum>.
 * Related courses are pulled from the same collection (shared track). Enroll /
 * add-to-cart commerce is DEFERRED (M7) — the enroll card + CTA render as a static
 * shell whose buy actions link to /cart (the quote path links to the real
 * Request-a-Private-Course page). The live course player is a later milestone
 * (M6); the curriculum is rendered as a static outline.
 *
 * Design constants the CMS doesn't carry (the four hero-meta icon names, the
 * graduation-cap media mark, the "Includes" checklist) are preserved inline,
 * matching the export.
 */

type InstructorDoc = {
  name?: string
  role?: string
  bioShort?: string
  bio?: unknown
  avatar?: { url?: string } | string | null
  credentials?: { icon?: string; title?: string; subtitle?: string }[]
}

type CourseDoc = {
  id: number | string
  slug: string
  code?: string
  title: string
  track?: string[]
  format?: string[]
  credential?: string
  level?: string
  duration?: string
  lessons?: number
  price?: number | null
  priceNote?: string
  enrollCtaLabel?: string
  summary?: string
  blurb?: unknown
  outcomes?: { outcome?: string }[]
  modules?: { n?: string; title?: string; lessons?: { title?: string }[] }[]
  standards?: { code?: string }[]
  instructor?: InstructorDoc | string | null
  badge?: string
  popular?: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Industry-track vocabulary (design constant — copy guide p.25), mirrored from
// courses-data.js. Used for the related-card industry label.
const ALL_TRACKS = ['Robotics', 'Rail', 'Industrial Machinery']

const courseHref = (slug: string) => `/training/courses/${slug}`

function priceLabel(price: number | null | undefined): string {
  if (price == null) return 'Custom'
  return '$' + (price / 100).toLocaleString('en-US')
}

function industryLabel(track: string[]): string {
  if (ALL_TRACKS.every((t) => track.includes(t))) return 'All Industries'
  return track.join(' · ')
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await findDocs<{ slug: string }>('courses', { limit: 100 })
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = await findBySlug<CourseDoc>('courses', slug, 2)
  if (!c) {
    return { title: 'Course not found | CSA' }
  }
  return {
    title: c.seo?.metaTitle ?? `${c.title} | CSA`,
    description:
      c.seo?.metaDescription ??
      c.summary ??
      'A CMS-driven functional safety course — outcomes, curriculum, instructor, format, credential, and enrollment.',
  }
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = await findBySlug<CourseDoc>('courses', slug, 2)
  if (!c) notFound()

  // Does the signed-in user already own this course (via purchase or admin grant)?
  const enrolled = await isEnrolled(c.id)
  const enrollLabel = c.enrollCtaLabel || 'Enroll Now'

  const track = c.track ?? []
  const isQuote = c.price == null
  const outcomes = (c.outcomes ?? []).map((o) => o.outcome ?? '')
  const standards = (c.standards ?? []).map((s) => s.code ?? '')
  const formatPrimary = (c.format ?? [])[0] ?? ''

  // Curriculum modules → client-component props (flatten lessons to titles).
  const modules: CurriculumModule[] = (c.modules ?? []).map((m) => ({
    n: m.n ?? '',
    title: m.title ?? '',
    lessons: (m.lessons ?? []).map((l) => l.title ?? ''),
  }))

  // Instructor (resolved via depth 2). Falls back soft to an empty record.
  const instructor: InstructorDoc =
    c.instructor && typeof c.instructor === 'object' ? c.instructor : {}
  const instructorCredentials = instructor.credentials ?? []
  const instructorBio = lexicalToParagraphs(instructor.bio)
  const instructorAvatar = mediaUrl(instructor.avatar)

  // Related: same collection, shares a track, not this course (first 3).
  const allCourses = await findDocs<CourseDoc>('courses', { limit: 100 })
  const related = allCourses
    .filter((x) => x.slug !== c.slug && (x.track ?? []).some((t) => track.includes(t)))
    .slice(0, 3)

  // "Includes" checklist — design copy preserved inline (export EnrollCard).
  const includes = [
    (c.lessons ?? 0) > 0
      ? `${c.lessons} modules of structured content`
      : 'Curriculum scoped to your program',
    'Certificate of completion',
    'Taught by a principal safety engineer',
    'Standards reference & worked examples',
  ]

  return (
    <main className="cl-main">
      {/* Hero */}
      <section className="cl-hero">
        <div className="cl-hero__haze"></div>
        <div className="cl-hero__inner">
          <div className="cl-hero__left">
            <p className="cl-crumb">
              <Link href="/training/digital-courses">Digital Courses</Link>
              <span className="sep">/</span>
              <Link href="/training/course-catalog">Catalog</Link>
              <span className="sep">/</span> <span className="cur">{track[0]}</span>
            </p>
            <h1 className="csa-display cl-title">{c.title}</h1>
            <p className="cl-lead">{lexicalToText(c.blurb)}</p>
            <div className="cl-meta">
              <div className="cl-meta__item">
                <span className="cl-meta__icon"><i data-lucide="signal"></i></span>
                <span><span className="cl-meta__k">Level</span><span className="cl-meta__v">{c.level}</span></span>
              </div>
              <div className="cl-meta__item">
                <span className="cl-meta__icon"><i data-lucide="clock"></i></span>
                <span><span className="cl-meta__k">Length</span><span className="cl-meta__v">{c.duration}</span></span>
              </div>
              <div className="cl-meta__item">
                <span className="cl-meta__icon"><i data-lucide="presentation"></i></span>
                <span><span className="cl-meta__k">Format</span><span className="cl-meta__v">{formatPrimary}</span></span>
              </div>
              <div className="cl-meta__item">
                <span className="cl-meta__icon"><i data-lucide="badge-check"></i></span>
                <span><span className="cl-meta__k">Credential</span><span className="cl-meta__v">{c.credential}</span></span>
              </div>
            </div>
          </div>

          {/* Enroll card — commerce DEFERRED (M7); static shell, buy → /cart */}
          <aside className="cl-enroll csa-glass">
            <div className="cl-enroll__media">
              <span className="cl-enroll__sample">Payload · media</span>
              <div className="cl-enroll__mark"><i data-lucide="graduation-cap"></i></div>
            </div>

            {isQuote ? (
              <>
                <div className="cl-price"><span className="cl-price__amt">Custom</span></div>
                <p className="cl-price__note">{c.priceNote}</p>
              </>
            ) : (
              <>
                <div className="cl-price">
                  <span className="cl-price__amt">{priceLabel(c.price)}</span>
                  <span className="cl-price__per">USD · per seat</span>
                </div>
                <p className="cl-price__note">{c.priceNote}</p>
              </>
            )}

            <div className="cl-enroll__actions">
              {isQuote ? (
                <Link className="btn btn--gold-solid btn--lg" href="/training/request-a-private-course">
                  Request a Quote <i data-lucide="arrow-right"></i>
                </Link>
              ) : enrolled ? (
                <Link className="btn btn--gold-solid btn--lg" href="/dashboard">
                  Go to My Courses <i data-lucide="arrow-right"></i>
                </Link>
              ) : (
                <>
                  <Link className="btn btn--gold-solid btn--lg" href="/cart">
                    {enrollLabel} <i data-lucide="arrow-right"></i>
                  </Link>
                  <Link className="cl-enroll__secondary" href="/cart">
                    <i data-lucide="shopping-cart"></i> Add to Cart
                  </Link>
                </>
              )}
            </div>

            <ul className="cl-includes">
              {includes.map((t) => (
                <li key={t}><i data-lucide="check"></i> {t}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Outcomes */}
      <section className="cl-section">
        <div className="cl-section__head">
          <span className="csa-eyebrow">What you&rsquo;ll learn</span>
          <h2 className="csa-h2">Outcomes your team can apply on real hardware.</h2>
        </div>
        <div className="cl-outcomes">
          {outcomes.map((o, i) => (
            <div className="cl-outcome" key={o} data-reveal="up" data-reveal-delay={i * 50}>
              <span className="cl-outcome__num">{String(i + 1).padStart(2, '0')}</span>
              <p>{o}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="cl-section">
        <div className="cl-section__head">
          <span className="csa-eyebrow">Curriculum</span>
          <h2 className="csa-h2">Module outline.</h2>
          <p>
            {modules.length > 0
              ? 'A structured path from fundamentals to audit-ready evidence. Expand any module to see its lessons.'
              : 'This program is fully tailored — the outline is built around your team’s active hardware and the standards your product must meet.'}
          </p>
        </div>
        {modules.length > 0 ? (
          <CourseCurriculum modules={modules} />
        ) : (
          <div className="cl-tailored">
            <span className="cl-tailored__icon"><i data-lucide="cpu"></i></span>
            <div>
              <h4 className="csa-h4">Built around your blueprints.</h4>
              <p>We scope the agenda with your engineering leads before delivery — translating dense regulatory text into machine-building logic for the systems you&rsquo;re actually shipping. Request a quote to start scoping.</p>
            </div>
          </div>
        )}
      </section>

      {/* Standards covered */}
      <section className="cl-section">
        <div className="cl-section__head" style={{ marginBottom: 30 }}>
          <span className="csa-eyebrow">Standards covered</span>
          <h2 className="csa-h2">Grounded in the standards that matter.</h2>
        </div>
        <div className="cl-standards">
          <span className="cl-standards__tick" aria-hidden="true"></span>
          <span className="cl-standards__list">
            {standards.map((s, i) => (
              <span key={s} style={{ display: 'contents' }}>
                {i > 0 && <span className="dot">&middot;</span>}
                <span className="csa-mono">{s}</span>
              </span>
            ))}
          </span>
        </div>
      </section>

      {/* Instructor */}
      <section className="cl-section">
        <div className="cl-section__head">
          <span className="csa-eyebrow">Your instructor</span>
          <h2 className="csa-h2">Taught by a principal safety engineer.</h2>
        </div>
        <div className="cl-instr">
          <div className="cl-instr__portrait" data-metal="silver">
            {instructorAvatar && <img src={instructorAvatar} alt={instructor.name ?? ''} />}
            <div className="cl-instr__plate">
              <p className="cl-instr__name">{instructor.name}</p>
              <p className="cl-instr__role">{instructor.role}</p>
            </div>
          </div>
          <div className="cl-instr__bio">
            {instructor.bioShort && <p>{instructor.bioShort}</p>}
            {instructorBio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="cl-instr__certs">
              {instructorCredentials.map((cr) => (
                <span className="cl-instr__cert" key={cr.title}>
                  <i data-lucide={cr.icon}></i> <b>{cr.title}</b> · {cr.subtitle}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="cl-section">
          <div className="cl-section__head">
            <span className="csa-eyebrow">Related courses</span>
            <h2 className="csa-h2">More in {track[0]}.</h2>
          </div>
          <div className="cl-related__grid">
            {related.map((r) => {
              const rTrack = r.track ?? []
              return (
                <article className="tt-course" key={r.slug}>
                  <Link href={courseHref(r.slug)} className="tt-course__media" aria-label={r.title}>
                    <span className="tt-course__sample">Payload · courses</span>
                    <div className="tt-course__media-mark"><i data-lucide="graduation-cap"></i></div>
                    <div className="tt-course__media-code">{r.code}</div>
                  </Link>
                  <div className="tt-course__body">
                    <div className="tt-course__chips">
                      <span className="tt-course__chip">{industryLabel(rTrack)}</span>
                    </div>
                    <h3 className="tt-course__title">
                      <Link href={courseHref(r.slug)} style={{ color: 'inherit' }}>{r.title}</Link>
                    </h3>
                    <p className="tt-course__desc">{r.summary}</p>
                    <div className="tt-course__foot">
                      <div className="tt-course__priceblock">
                        <span className="tt-course__price">{priceLabel(r.price)}</span>
                        <span className="tt-course__priceper">{r.price != null ? 'per seat' : 'quote'}</span>
                      </div>
                      <Link className="tt-course__go" href={courseHref(r.slug)}>View <i data-lucide="arrow-right"></i></Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* Final CTA — commerce DEFERRED (M7); enroll → /cart, quote → request page */}
      <section className="cl-cta csa-glass">
        <div className="cl-cta__haze"></div>
        <div className="cl-cta__txt">
          <span className="csa-eyebrow">Ready when your team is</span>
          <h2 className="csa-h2">{isQuote ? 'Scope a private session.' : 'Enroll your team.'}</h2>
          <p>
            {isQuote
              ? 'Tell us about your hardware and timeline — we’ll build a custom workshop around it.'
              : 'Secure seats now, or talk to an instructor about a private cohort for your engineers.'}
          </p>
        </div>
        <div className="cl-cta__actions">
          {isQuote ? (
            <Link className="btn btn--gold-solid btn--lg" href="/training/request-a-private-course">
              Request a Quote <i data-lucide="arrow-right"></i>
            </Link>
          ) : (
            <Link className="btn btn--gold-solid btn--lg" href="/cart">
              {enrollLabel} <i data-lucide="arrow-right"></i>
            </Link>
          )}
          <Link className="btn btn--link" href="/book-a-consultation">
            Talk to an instructor <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </section>
    </main>
  )
}
