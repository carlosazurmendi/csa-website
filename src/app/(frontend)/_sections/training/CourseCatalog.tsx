'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

/**
 * CourseCatalog — client port of the filterable catalog from
 * design-reference/project/Training - Templates/Course Catalog.html
 * (the inline FilterGroup / CourseCard / Catalog components).
 *
 * The course list is loaded server-side (findDocs('courses')) and passed in as
 * plain props. The filter vocabulary (tracks / formats / credential) and the
 * short industry/format labels are design constants the CMS doesn't carry,
 * lifted verbatim from courses-data.js + the Course Catalog page script. Cards
 * link to the course landing template (/training/courses/<slug>).
 */

export type CatalogCourse = {
  slug: string
  code: string
  title: string
  track: string[]
  format: string[]
  credential: string
  level: string
  duration: string
  price: number | null
  summary: string
  popular: boolean
}

// Format vocabulary — design constants mirrored from courses-data.js (FORMATS / CRED).
const FORMATS = {
  PVT: 'Private Virtual Team Session',
  WORKSHOP: 'In-Person Custom Workshop',
  ONDEMAND: 'On-Demand',
  GROUP: 'Group',
  PRIVATE: 'Private',
} as const
const CRED = 'Certificate of completion'

// Filter model (copy guide p.25).
const ALL_TRACKS = ['Robotics', 'Rail', 'Industrial Machinery']
const FILTERS = {
  industry: { label: 'By Industry', any: 'All', options: ALL_TRACKS },
  format: {
    label: 'By Format',
    any: 'Any format',
    options: [FORMATS.PVT, FORMATS.WORKSHOP, FORMATS.ONDEMAND, FORMATS.GROUP, FORMATS.PRIVATE],
  },
  credential: { label: 'By Credential', any: 'Any', options: [CRED] },
} as const

const courseHref = (slug: string) => `/training/courses/${slug}`

/* short industry label for a card */
function industryLabel(c: CatalogCourse): string {
  if (ALL_TRACKS.every((t) => c.track.includes(t))) return 'All Industries'
  return c.track.join(' · ')
}
/* short format label — prefer the most distinctive */
function formatLabel(c: CatalogCourse): string {
  const f = c.format
  if (f.includes(FORMATS.WORKSHOP)) return 'In-Person Workshop'
  if (f.includes(FORMATS.ONDEMAND)) return 'On-Demand'
  return 'Private Virtual'
}
function priceLabel(c: CatalogCourse): string {
  if (c.price == null) return 'Custom'
  return '$' + (c.price / 100).toLocaleString('en-US')
}

/* ---------- Filter group control ---------- */
function FilterGroup({
  groupKey,
  value,
  onChange,
}: {
  groupKey: keyof typeof FILTERS
  value: string | null
  onChange: (v: string | null) => void
}) {
  const f = FILTERS[groupKey]
  return (
    <div className="tt-fgroup">
      <span className="tt-fgroup__label">{f.label}</span>
      <div className="tt-fchips">
        <button className={'tt-fchip' + (value === null ? ' is-on' : '')} onClick={() => onChange(null)}>
          {f.any}
        </button>
        {f.options.map((opt) => (
          <button
            key={opt}
            className={'tt-fchip' + (value === opt ? ' is-on' : '')}
            onClick={() => onChange(value === opt ? null : opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- Course card (CMS-populated) ---------- */
function CourseCard({ c }: { c: CatalogCourse }) {
  return (
    <article className="tt-course" data-reveal="up">
      <Link href={courseHref(c.slug)} className="tt-course__media" aria-label={c.title}>
        <span className="tt-course__sample">Payload · courses</span>
        {c.popular && <span className="tt-course__ribbon">Popular</span>}
        <div className="tt-course__media-mark"><i data-lucide="graduation-cap"></i></div>
        <div className="tt-course__media-code">{c.code}</div>
      </Link>
      <div className="tt-course__body">
        <div className="tt-course__chips">
          <span className="tt-course__chip">{industryLabel(c)}</span>
          <span className="tt-course__chip tt-course__chip--fmt">{formatLabel(c)}</span>
        </div>
        <h3 className="tt-course__title">
          <Link href={courseHref(c.slug)} style={{ color: 'inherit' }}>{c.title}</Link>
        </h3>
        <p className="tt-course__desc">{c.summary}</p>
        <div className="tt-course__metarow">
          <span><i data-lucide="signal"></i> {c.level}</span>
          <span><i data-lucide="clock"></i> {c.duration}</span>
        </div>
        <div className="tt-course__foot">
          <div className="tt-course__priceblock">
            <span className="tt-course__price">{priceLabel(c)}</span>
            <span className="tt-course__priceper">{c.price != null ? 'per seat' : 'quote'}</span>
          </div>
          <Link className="tt-course__go" href={courseHref(c.slug)}>View course <i data-lucide="arrow-right"></i></Link>
        </div>
      </div>
    </article>
  )
}

type Selection = { industry: string | null; format: string | null; credential: string | null }

export function CourseCatalog({ courses }: { courses: CatalogCourse[] }) {
  const searchParams = useSearchParams()
  const param = searchParams.get('industry')
  const initialIndustry = param && ALL_TRACKS.includes(param) ? param : null

  const [sel, setSel] = useState<Selection>({
    industry: initialIndustry,
    format: null,
    credential: null,
  })

  const set = (key: keyof Selection) => (val: string | null) => setSel((s) => ({ ...s, [key]: val }))
  const reset = () => setSel({ industry: null, format: null, credential: null })
  const active = sel.industry || sel.format || sel.credential

  const visible = useMemo(
    () =>
      courses.filter((c) => {
        if (sel.industry && !c.track.includes(sel.industry)) return false
        if (sel.format && !c.format.includes(sel.format)) return false
        if (sel.credential && c.credential !== sel.credential) return false
        return true
      }),
    [sel, courses],
  )

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  }, [visible])

  const activeChips = [
    sel.industry && { k: 'industry' as const, label: sel.industry },
    sel.format && { k: 'format' as const, label: sel.format },
    sel.credential && { k: 'credential' as const, label: sel.credential },
  ].filter((x): x is { k: keyof Selection; label: string } => Boolean(x))

  return (
    <div className="tt-cat__layout">
      <aside className="tt-filters">
        <div className="tt-filters__head">
          <span className="tt-filters__title"><i data-lucide="sliders-horizontal"></i> Filter courses</span>
          <button className="tt-reset" onClick={reset} disabled={!active}><i data-lucide="x"></i> Reset</button>
        </div>
        <FilterGroup groupKey="industry" value={sel.industry} onChange={set('industry')} />
        <FilterGroup groupKey="format" value={sel.format} onChange={set('format')} />
        <FilterGroup groupKey="credential" value={sel.credential} onChange={set('credential')} />
      </aside>

      <div className="tt-results">
        <div className="tt-results__bar">
          <span className="tt-results__count">Showing <b>{visible.length}</b> of {courses.length} courses</span>
          {activeChips.length > 0 ? (
            <span className="tt-results__chips">
              {activeChips.map((ch) => (
                <span className="tt-results__chip" key={ch.k}>
                  {ch.label}
                  <button aria-label={'Clear ' + ch.label} onClick={() => set(ch.k)(null)}><i data-lucide="x"></i></button>
                </span>
              ))}
            </span>
          ) : (
            <span className="tt-results__note">Live courses populated via Payload CMS</span>
          )}
        </div>
        <div className="tt-courses__grid">
          {visible.length > 0 ? (
            visible.map((c) => <CourseCard key={c.slug} c={c} />)
          ) : (
            <div className="tt-empty">
              <div className="tt-empty__icon"><i data-lucide="search-x"></i></div>
              <h4 className="csa-h4">No courses match those filters.</h4>
              <p>Try widening your selection — or request a private session built for your team.</p>
              <Link className="btn btn--gold-pill" href="/training/request-a-private-course">
                Request a Private Course <i data-lucide="arrow-right"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
