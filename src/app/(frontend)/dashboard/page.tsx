import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentCustomer } from '@/lib/customer'
import { getMyDashboardCourses, type DashboardCourse } from '@/lib/lms'

export const dynamic = 'force-dynamic'

/**
 * Student Dashboard (/dashboard) — pixel-faithful port of
 * design-reference/project/assets/dashboard.jsx (Customer Portal/Dashboard.html).
 * Gated by middleware. Renders the welcome band, the featured "Continue learning"
 * card (first active enrollment), the enrolled-courses grid (remaining actives +
 * browse tile), the completed/certificates section, and the Customer Portal
 * quick-links block — or the empty state when there are no enrollments. The
 * first-run onboarding modal + reviewer demo dock from the export are omitted.
 */

export const metadata: Metadata = {
  title: 'Dashboard | CSA',
  robots: { index: false, follow: false },
}

function ProgressBar({ pct, done, total }: { pct: number; done: number; total: number }) {
  return (
    <div className="db-prog">
      <div className="db-prog__meta">
        <span>
          {done} / {total} lessons
        </span>
        <span className="db-prog__pct">{pct}%</span>
      </div>
      <div className="db-prog__track">
        <div className="db-prog__fill" style={{ width: pct + '%' }}></div>
      </div>
    </div>
  )
}

function ContinueCard({ c }: { c: DashboardCourse }) {
  return (
    <article className="db-continue" data-reveal="up" data-screen-label="Continue Learning">
      <div className="db-continue__media">
        <span className="db-continue__media-grid"></span>
        {c.code && <span className="db-continue__code">{c.code}</span>}
        <span className="db-continue__mark">
          <i data-lucide="graduation-cap"></i>
        </span>
        <span className="db-continue__resume-tag">
          <span className="pulse"></span> Last active {c.lastActiveLabel}
        </span>
      </div>
      <div className="db-continue__body">
        <p className="db-continue__kicker">Continue where you left off</p>
        <h3 className="csa-h3 db-continue__title">{c.title}</h3>
        <p className="db-continue__lesson">
          <i data-lucide="play-circle"></i>
          <span>
            Up next —{' '}
            <b>
              {c.resume.moduleN} · {c.resume.lessonTitle}
            </b>
          </span>
        </p>
        <div className="db-continue__foot">
          <ProgressBar pct={c.percent} done={c.completedLessons} total={c.totalLessons} />
          <div className="db-continue__actions">
            <Link className="btn btn--gold-solid btn--lg" href={c.resumeHref}>
              Resume Learning <i data-lucide="arrow-right"></i>
            </Link>
            <Link className="btn btn--link" href={`/training/courses/${c.slug}`}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function CourseCard({ c }: { c: DashboardCourse }) {
  const detailsHref = c.slug ? `/training/courses/${c.slug}` : '#'
  return (
    <article className="db-card" data-reveal="up">
      <div className="db-card__media">
        <span className="db-card__media-grid"></span>
        {c.code && <span className="db-card__code">{c.code}</span>}
        <span className="db-card__mark">
          <i data-lucide="graduation-cap"></i>
        </span>
      </div>
      <div className="db-card__body">
        {c.track.length > 0 && <p className="db-card__track">{c.track.join(' · ')}</p>}
        <h3 className="db-card__title">
          <Link href={detailsHref}>{c.title}</Link>
        </h3>
        <p className="db-card__lesson">
          {c.percent >= 100 ? (
            <>
              <b>All lessons complete</b> — final assessment ready.
            </>
          ) : (
            <>
              Up next —{' '}
              <b>
                {c.resume.moduleN} · {c.resume.lessonTitle}
              </b>
            </>
          )}
        </p>
        <div className="db-card__prog">
          <ProgressBar pct={c.percent} done={c.completedLessons} total={c.totalLessons} />
        </div>
        <div className="db-card__foot">
          {c.percent >= 100 ? (
            <Link className="btn btn--gold-pill" href={c.slug ? `/assessment/${c.slug}` : detailsHref}>
              Take assessment <i data-lucide="clipboard-check"></i>
            </Link>
          ) : (
            <Link className="btn btn--gold-pill" href={c.resumeHref}>
              {c.completedLessons === 0 ? 'Start course' : 'Resume'} <i data-lucide="arrow-right"></i>
            </Link>
          )}
          <Link className="db-icon-btn" href={detailsHref} aria-label="Course details">
            <i data-lucide="info"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

function AddCard() {
  return (
    <Link
      className="db-card db-card--add"
      href="/training/course-catalog"
      data-reveal="up"
      data-screen-label="Browse more"
    >
      <span className="db-card--add__ic">
        <i data-lucide="plus"></i>
      </span>
      <span className="db-card--add__t">Browse the catalog</span>
      <span className="db-card--add__d">Add another program to your learning track.</span>
    </Link>
  )
}

function CertCard({ c }: { c: DashboardCourse }) {
  return (
    <article className="db-cert" data-reveal="up">
      <div className="db-cert__seal">
        <i data-lucide="award"></i>
      </div>
      <div className="db-cert__body">
        <p className="db-cert__badge">
          <i data-lucide="badge-check"></i> Completed · {c.completedLabel}
        </p>
        <h3 className="db-cert__title">{c.title}</h3>
        <p className="db-cert__meta">
          Certificate {c.certificateId}
          <span className="sep">·</span>
          {c.credential}
        </p>
        <div className="db-cert__actions">
          <Link
            className="db-cert__btn db-cert__btn--primary"
            href={c.certificateId ? `/certificate?cert=${encodeURIComponent(c.certificateId)}` : `/certificate?course=${c.slug}`}
          >
            <i data-lucide="download"></i> Certificate (PDF)
          </Link>
          <Link className="db-cert__btn db-cert__btn--ghost" href={`/learn/${c.slug}`}>
            <i data-lucide="rotate-ccw"></i> Review course
          </Link>
        </div>
      </div>
    </article>
  )
}

const PORTAL_LINKS = [
  {
    icon: 'credit-card',
    t: 'Billing & Account',
    d: 'Manage your plan, payment method, and account settings.',
    href: '/portal#billing',
    meta: 'Plan · Customer',
  },
  {
    icon: 'receipt',
    t: 'Order History',
    d: 'Receipts and invoices for every course and template purchase.',
    href: '/portal#orders',
    meta: 'View orders',
  },
  {
    icon: 'folder-down',
    t: 'Template Library',
    d: 'Download the Word & Excel templates you own, anytime.',
    href: '/portal#templates',
    meta: 'Your downloads',
  },
  {
    icon: 'message-square',
    t: 'Safety Chat',
    d: 'Ask an AI functional-safety assistant a quick question.',
    href: '/resources/safety-chat',
    meta: 'Open assistant',
  },
]

function PortalLink({ l }: { l: (typeof PORTAL_LINKS)[number] }) {
  return (
    <Link className="db-portal-link" href={l.href}>
      <span className="db-portal-link__ic">
        <i data-lucide={l.icon}></i>
      </span>
      <p className="db-portal-link__t">
        {l.t} <i className="go" data-lucide="arrow-up-right"></i>
      </p>
      <p className="db-portal-link__d">{l.d}</p>
      <span className="db-portal-link__meta">{l.meta}</span>
    </Link>
  )
}

export default async function DashboardPage() {
  const customer = await getCurrentCustomer()
  if (!customer) redirect('/login?next=/dashboard')

  const first = (customer.profile.fullName || 'there').split(' ')[0]
  const courses = await getMyDashboardCourses()
  // "Certified" = a certificate has actually been issued (100% lessons + passed the
  // final assessment, Phase C). A course at 100% lessons but not yet passed stays in
  // the active grid showing "Take assessment" — it isn't certified until it's earned.
  const completed = courses.filter((c) => c.certificateId)
  const active = courses.filter((c) => !c.certificateId)
  const featured = active[0]
  const rest = active.slice(1)
  const lessonsDone = courses.reduce((n, c) => n + c.completedLessons, 0)
  const hasCourses = courses.length > 0

  return (
    <main className="db-main" data-screen-label="Student Dashboard">
      {/* ── Welcome band ── */}
      <section className="db-hero" data-screen-label="Welcome Band">
        <div className="db-hero__haze"></div>
        <div className="db-hero__grid-bg"></div>
        <div className="db-hero__inner">
          <div className="db-hello">
            <p className="db-hello__crumb">
              <span className="dot"></span> CSA Academy <span style={{ color: 'var(--gold-600)' }}>/</span> Student
              Dashboard
            </p>
            <span className="csa-eyebrow db-hello__eyebrow">Welcome back</span>
            <h1 className="csa-display db-hello__title">
              Good to see you,
              <br />
              <span className="nm">{first}.</span>
            </h1>
            <p className="db-hello__sub">
              {hasCourses
                ? 'Pick up where you left off, track your progress, and grab your certificates — all in one place.'
                : 'This is your learning home. Enroll in a course and your progress, lessons, and certificates will live here.'}
            </p>
          </div>
          <div className="db-stats">
            <div className="db-stat">
              <div className="db-stat__n">{active.length}</div>
              <p className="db-stat__l">Courses in progress</p>
            </div>
            <div className="db-stat">
              <div className="db-stat__n">{lessonsDone}</div>
              <p className="db-stat__l">Lessons completed</p>
            </div>
            <div className="db-stat db-stat--gold">
              <div className="db-stat__n">{completed.length}</div>
              <p className="db-stat__l">Certificates earned</p>
            </div>
          </div>
        </div>
      </section>

      {hasCourses ? (
        <div className="db-wrap">
          {/* ── Continue learning (featured resume) ── */}
          {featured && (
            <section className="db-section" data-screen-label="Continue Learning Section">
              <div className="db-section__head">
                <div>
                  <p className="csa-eyebrow db-section__eyebrow">Jump back in</p>
                  <h2 className="csa-h2 db-section__heading">Continue learning.</h2>
                </div>
              </div>
              <ContinueCard c={featured} />
            </section>
          )}

          {/* ── Enrolled courses ── */}
          <section className="db-section" data-screen-label="Enrolled Courses">
            <div className="db-section__head">
              <div>
                <p className="csa-eyebrow db-section__eyebrow">Your courses</p>
                <h2 className="csa-h2 db-section__heading">Enrolled courses.</h2>
              </div>
              <span className="db-section__count">{active.length} active</span>
            </div>
            <div className="db-grid">
              {rest.map((c) => (
                <CourseCard c={c} key={c.enrollmentId} />
              ))}
              <AddCard />
            </div>
          </section>

          {/* ── Completed courses / certificates ── */}
          {completed.length > 0 && (
            <section className="db-section" data-screen-label="Completed Courses">
              <div className="db-section__head">
                <div>
                  <p className="csa-eyebrow db-section__eyebrow">Earned</p>
                  <h2 className="csa-h2 db-section__heading">Completed &amp; certified.</h2>
                </div>
                <span className="db-section__count">{completed.length} certificates</span>
              </div>
              <div className="db-certs">
                {completed.map((c) => (
                  <CertCard c={c} key={c.enrollmentId} />
                ))}
              </div>
            </section>
          )}

          {/* ── Quick links to Customer Portal ── */}
          <div className="db-portal" data-screen-label="Customer Portal Links">
            <div className="db-portal__haze"></div>
            <div className="db-portal__inner">
              <div className="db-portal__head">
                <div>
                  <p className="csa-eyebrow db-section__eyebrow">Account</p>
                  <h2 className="csa-h2 db-portal__title">Your Customer Portal.</h2>
                </div>
                <Link className="db-section__link" href="/portal">
                  Open Customer Portal <i data-lucide="arrow-right"></i>
                </Link>
              </div>
              <div className="db-portal__grid">
                {PORTAL_LINKS.map((l) => (
                  <PortalLink l={l} key={l.t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="db-wrap">
          <section className="db-section" style={{ paddingBottom: 110 }}>
            <section className="db-empty" data-screen-label="Empty State — No Courses">
              <div className="db-empty__haze"></div>
              <div className="db-empty__grid-bg"></div>
              <div className="db-empty__inner">
                <span className="db-empty__mark">
                  <i data-lucide="graduation-cap"></i>
                </span>
                <span className="csa-eyebrow">Your learning starts here</span>
                <h2 className="csa-h2 db-empty__title" style={{ marginTop: 14 }}>
                  You&rsquo;re not enrolled in any courses yet.
                </h2>
                <p className="csa-lead db-empty__sub">
                  Browse the catalog to find practical, on-demand functional-safety training — grounded in the
                  standards and hazards of your sector. Enroll once and your progress shows up right here.
                </p>
                <div className="db-empty__actions">
                  <Link className="btn btn--gold-solid btn--lg" href="/training/course-catalog">
                    Browse the Course Catalog <i data-lucide="arrow-right"></i>
                  </Link>
                  <Link className="btn btn--silver-pill btn--lg" href="/training/digital-courses" data-metal="silver">
                    How training works <i data-lucide="arrow-right"></i>
                  </Link>
                </div>
                <div className="db-empty__tracks">
                  <span className="db-empty__chip">
                    <i data-lucide="bot"></i> Robotics
                  </span>
                  <span className="db-empty__chip">
                    <i data-lucide="train-front"></i> Rail
                  </span>
                  <span className="db-empty__chip">
                    <i data-lucide="cog"></i> Industrial Machinery
                  </span>
                </div>
              </div>
            </section>
          </section>
        </div>
      )}
    </main>
  )
}
