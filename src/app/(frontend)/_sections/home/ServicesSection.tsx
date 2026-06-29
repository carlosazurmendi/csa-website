'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { HomeDoc, IndustryItem, ServiceItem } from './types'

/**
 * ServicesSection — faithful port of design-reference/project/assets/services.jsx.
 * The editorial copy (eyebrow, per-tab heading/lead/CTA, and the service /
 * industry accordion items) comes from the `home` record; the per-item icon
 * names and the tab CTA routes are design constants zipped to the CMS items by
 * order (same pattern as the seeded arrays in the export).
 */

// Per-service icon + id, in the same order as the seeded svServices.
const SERVICE_META: { id: string; icon: string }[] = [
  { id: 'engineering', icon: 'wrench' },
  { id: 'consulting', icon: 'compass' },
  { id: 'auditing', icon: 'clipboard-check' },
  { id: 'training', icon: 'graduation-cap' },
]

// Per-industry icon + id, in the same order as the seeded svIndustries.
const INDUSTRY_META: { id: string; icon: string }[] = [
  { id: 'rail', icon: 'train-front' },
  { id: 'robotics', icon: 'bot' },
  { id: 'machinery', icon: 'cog' },
  { id: 'physical-ai', icon: 'cpu' },
  { id: 'construction-mining', icon: 'construction' },
  { id: 'automotive', icon: 'car' },
  { id: 'defense', icon: 'shield' },
  { id: 'process', icon: 'factory' },
]

type AccItem = {
  id: string
  icon: string
  title: string
  desc: string
  points: string[]
  bestFor?: string | null
  standards?: string[]
}

type TabModel = {
  id: string
  label: string
  data: AccItem[]
  noun: string
  lead: string
  cta: string
  ctaHref: string
}

function AccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: AccItem
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={'sv-item' + (open ? ' is-open csa-glass' : '')}>
      {open && (
        <csa-liquid-metal
          ring=""
          thickness="2px"
          contour="0.92"
          repetition="3"
          tint="#EAF0F8"
          color-back="#46505F"
          data-no-lazy=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' }}
        ></csa-liquid-metal>
      )}
      <button className="sv-item__head" onClick={onToggle} aria-expanded={open}>
        <span className="sv-item__icon">
          <i data-lucide={item.icon}></i>
        </span>
        <span className="sv-item__idx csa-mono">{String(index + 1).padStart(2, '0')}</span>
        <span className="sv-item__title">{item.title}</span>
        <span className="sv-item__toggle" aria-hidden="true"></span>
      </button>
      <div className="sv-item__body">
        <div className="sv-item__bodywrap">
          <div className="sv-item__bodyinner">
            <p className="sv-item__desc">{item.desc}</p>
            <ul className="sv-pts">
              {item.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            {item.bestFor && (
              <div className="sv-meta">
                <span className="sv-meta__label">Best for</span>
                <span className="sv-meta__text">{item.bestFor}</span>
              </div>
            )}
            {item.standards && (
              <div className="sv-meta">
                <span className="sv-meta__label">Applicable standards</span>
                <span className="sv-chips">
                  {item.standards.map((s) => (
                    <span className="sv-chip" key={s}>
                      {s}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection({ home }: { home: HomeDoc }) {
  const services: AccItem[] = (home.svServices ?? []).map((s: ServiceItem, i) => {
    const meta = SERVICE_META[i] ?? { id: 'service-' + i, icon: 'wrench' }
    return {
      id: meta.id,
      icon: meta.icon,
      title: s.title ?? '',
      desc: s.desc ?? '',
      points: (s.points ?? []).map((p) => p.point),
      bestFor: s.bestFor ?? null,
    }
  })

  const industries: AccItem[] = (home.svIndustries ?? []).map((s: IndustryItem, i) => {
    const meta = INDUSTRY_META[i] ?? { id: 'industry-' + i, icon: 'cog' }
    return {
      id: meta.id,
      icon: meta.icon,
      title: s.title ?? '',
      desc: s.desc ?? '',
      points: (s.points ?? []).map((p) => p.point),
      standards: (s.standards ?? []).map((x) => x.code),
    }
  })

  const TABS: TabModel[] = [
    {
      id: 'services',
      label: 'Services',
      data: services,
      noun: 'services',
      lead: home.svServicesLead ?? '',
      cta: home.svServicesCta ?? 'See All Services',
      ctaHref: '/company/services',
    },
    {
      id: 'industries',
      label: 'Industries',
      data: industries,
      noun: 'industries',
      lead: home.svIndustriesLead ?? '',
      cta: home.svIndustriesCta ?? 'Explore Industries',
      ctaHref: '/consulting',
    },
  ]

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [thumb, setThumb] = useState({ left: 0, width: 0 })

  // Position the metallic thumb under the active tab.
  useLayoutEffect(() => {
    const el = tabRefs.current[tab]
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth })
  }, [tab])

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  const active = TABS[tab]

  const selectTab = (i: number) => {
    setTab(i)
    setOpen(0)
  }

  return (
    <section className="sv" data-screen-label="Services">
      <div className="sv__haze" />

      <div className="sv__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {home.svEyebrow}
        </p>
        <h2 className="csa-h2 sv__title" data-reveal="up" data-reveal-delay="80">
          {tab === 0 ? home.svServicesHeading : home.svIndustriesHeading}
        </h2>
        <p className="csa-lead sv__lead" data-reveal="up" data-reveal-delay="160" key={active.id + '-lead'}>
          {active.lead}
        </p>
      </div>

      <div
        className="sv__tabs"
        role="tablist"
        aria-label="Services and industries"
        data-reveal="up"
        data-reveal-delay="120"
      >
        <span className="sv__thumb" style={{ left: thumb.left + 'px', width: thumb.width + 'px' }} />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            className={'sv__tab' + (i === tab ? ' is-on' : '')}
            onClick={() => selectTab(i)}
            role="tab"
            aria-selected={i === tab}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="sv__count">
        {String(active.data.length).padStart(2, '0')} {active.noun}
      </p>

      <div className="sv__list sv-anim" key={active.id}>
        {active.data.map((item, i) => (
          <AccordionItem
            key={item.id}
            item={item}
            index={i}
            open={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </div>

      <div className="sv__cta-row">
        <Link className="btn btn--lg rv-glass-btn" data-metal="gold" data-metal-mode="hover" href={active.ctaHref}>
          {active.cta} <i data-lucide="arrow-right"></i>
        </Link>
      </div>
    </section>
  )
}
