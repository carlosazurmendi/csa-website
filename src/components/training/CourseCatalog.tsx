'use client'

import { useState, useMemo, useEffect } from 'react'

/**
 * Client-side filterable course grid for /training-templates/courses.
 * Ports the Catalog component from Course Catalog.html verbatim (class names,
 * markup, filter logic) — only the data is now CMS-driven via props.
 *
 * Filters narrow by industry (course.industries), delivery format
 * (course.formats), and credential (course.credential). "View course" is a
 * static affordance that links to the request-a-private-course target (`#` in
 * Phase 1 — no enrollment/checkout).
 */
export type CourseCard = {
  id: string
  code: string
  title: string
  summary: string
  industries: string[]
  industryLabel: string
  formats: string[]
  formatLabel: string
  credential: string
}

export type CourseFilters = {
  industry: { label: string; any: string; options: string[] }
  format: { label: string; any: string; options: string[] }
  credential: { label: string; any: string; options: string[] }
}

type FilterKey = keyof CourseFilters

type Props = {
  courses: CourseCard[]
  filters: CourseFilters
  viewCourseHref: string
  emptyCtaLabel: string
  emptyCtaHref: string
}

function FilterGroup({
  group,
  value,
  onChange,
}: {
  group: { label: string; any: string; options: string[] }
  value: string | null
  onChange: (v: string | null) => void
}) {
  return (
    <div className="tt-fgroup">
      <span className="tt-fgroup__label">{group.label}</span>
      <div className="tt-fchips">
        <button className={'tt-fchip' + (value === null ? ' is-on' : '')} onClick={() => onChange(null)}>
          {group.any}
        </button>
        {group.options.map((opt) => (
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

function Card({ c, viewCourseHref }: { c: CourseCard; viewCourseHref: string }) {
  return (
    <article className="tt-course">
      <div className="tt-course__media">
        <span className="tt-course__sample">Sample · CMS</span>
        <div className="tt-course__media-mark">
          <i data-lucide="graduation-cap"></i>
        </div>
        <div className="tt-course__media-code">{c.code}</div>
      </div>
      <div className="tt-course__body">
        <div className="tt-course__chips">
          <span className="tt-course__chip">{c.industryLabel}</span>
          <span className="tt-course__chip tt-course__chip--fmt">{c.formatLabel}</span>
        </div>
        <h3 className="tt-course__title">{c.title}</h3>
        <p className="tt-course__desc">{c.summary}</p>
        <div className="tt-course__foot">
          <span className="tt-course__cred">
            <i data-lucide="badge-check"></i> {c.credential}
          </span>
          <a className="tt-course__go" href={viewCourseHref}>
            View course <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    </article>
  )
}

export function CourseCatalog({ courses, filters, viewCourseHref, emptyCtaLabel, emptyCtaHref }: Props) {
  const [sel, setSel] = useState<{ industry: string | null; format: string | null; credential: string | null }>({
    industry: null,
    format: null,
    credential: null,
  })

  const set = (key: FilterKey) => (val: string | null) => setSel((s) => ({ ...s, [key]: val }))
  const reset = () => setSel({ industry: null, format: null, credential: null })
  const active = sel.industry || sel.format || sel.credential

  const visible = useMemo(
    () =>
      courses.filter((c) => {
        if (sel.industry && !c.industries.includes(sel.industry)) return false
        if (sel.format && !c.formats.includes(sel.format)) return false
        if (sel.credential && c.credential !== sel.credential) return false
        return true
      }),
    [sel, courses],
  )

  useEffect(() => {
    ;(window as any).lucide?.createIcons()
  }, [visible])

  return (
    <div className="tt-cat__layout">
      <aside className="tt-filters">
        <div className="tt-filters__head">
          <span className="tt-filters__title">
            <i data-lucide="sliders-horizontal"></i> Filter courses
          </span>
          <button className="tt-reset" onClick={reset} disabled={!active}>
            <i data-lucide="x"></i> Reset
          </button>
        </div>
        <FilterGroup group={filters.industry} value={sel.industry} onChange={set('industry')} />
        <FilterGroup group={filters.format} value={sel.format} onChange={set('format')} />
        <FilterGroup group={filters.credential} value={sel.credential} onChange={set('credential')} />
      </aside>

      <div className="tt-results">
        <div className="tt-results__bar">
          <span className="tt-results__count">
            Showing <b>{visible.length}</b> of {courses.length} courses
          </span>
          <span className="tt-results__note">Live courses populated via CMS</span>
        </div>
        <div className="tt-courses__grid">
          {visible.length > 0 ? (
            visible.map((c) => <Card key={c.id} c={c} viewCourseHref={viewCourseHref} />)
          ) : (
            <div className="tt-empty">
              <div className="tt-empty__icon">
                <i data-lucide="search-x"></i>
              </div>
              <h4 className="csa-h4">No courses match those filters.</h4>
              <p>Try widening your selection — or request a private session built for your team.</p>
              <a className="btn btn--gold-pill" href={emptyCtaHref}>
                {emptyCtaLabel} <i data-lucide="arrow-right"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
