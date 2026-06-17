'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csa-liquid-metal': any
      'csa-grain': any
      'csa-pulsing-border': any
    }
  }
}

export type ServiceItem = {
  title: string
  icon: string
  description: string
  points: { text: string }[]
  bestFor?: string | null
}

export type IndustryItem = {
  title: string
  icon: string
  shortDescription: string
  highlights: { text: string }[]
  standards: { label: string }[]
}

export type ServicesProps = {
  eyebrow?: string | null
  servicesTitle?: string | null
  industriesTitle?: string | null
  servicesLead?: string | null
  industriesLead?: string | null
  servicesCta?: string | null
  industriesCta?: string | null
  services: ServiceItem[]
  industries: IndustryItem[]
}

function AccordionItem({ item, index, open, onToggle }: any) {
  return (
    <div className={'sv-item' + (open ? ' is-open csa-glass' : '')}>
    {open &&
      <csa-liquid-metal
        ring="" thickness="2px" contour="0.92" repetition="3"
        tint="#EAF0F8" color-back="#46505F" data-no-lazy="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' }}></csa-liquid-metal>
      }
    <button className="sv-item__head" onClick={onToggle} aria-expanded={open}>
      <span className="sv-item__icon"><i data-lucide={item.icon}></i></span>
      <span className="sv-item__idx csa-mono">{String(index + 1).padStart(2, '0')}</span>
      <span className="sv-item__title">{item.title}</span>
      <span className="sv-item__toggle" aria-hidden="true"></span>
    </button>
    <div className="sv-item__body">
      <div className="sv-item__bodywrap">
        <div className="sv-item__bodyinner">
          <p className="sv-item__desc">{item.desc}</p>
          <ul className="sv-pts">
            {item.points.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
          {item.bestFor &&
            <div className="sv-meta">
              <span className="sv-meta__label">Best for</span>
              <span className="sv-meta__text">{item.bestFor}</span>
            </div>
            }
          {item.standards &&
            <div className="sv-meta">
              <span className="sv-meta__label">Applicable standards</span>
              <span className="sv-chips">
                {item.standards.map((s: string) => <span className="sv-chip" key={s}>{s}</span>)}
              </span>
            </div>
            }
        </div>
      </div>
    </div>
  </div>)

}

export function Services(props: ServicesProps) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(0)
  const tabRefs = useRef<any[]>([])
  const [thumb, setThumb] = useState({ left: 0, width: 0 })

  const mappedServices = props.services.map((s, index) => ({
    id: index,
    icon: s.icon,
    title: s.title,
    desc: s.description,
    points: s.points.map((p) => p.text),
    bestFor: s.bestFor
  }))

  const mappedIndustries = props.industries.map((s, index) => ({
    id: index,
    icon: s.icon,
    title: s.title,
    desc: s.shortDescription,
    points: s.highlights.map((h) => h.text),
    standards: s.standards.map((st) => st.label)
  }))

  const TABS = [
    { id: 'services', label: 'Services', data: mappedServices, noun: 'services',
      lead: props.servicesLead, cta: props.servicesCta },
    { id: 'industries', label: 'Industries', data: mappedIndustries, noun: 'industries',
      lead: props.industriesLead, cta: props.industriesCta }
  ]

  // Position the metallic thumb under the active tab.
  useLayoutEffect(() => {
    const el = tabRefs.current[tab]
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth })
  }, [tab])

  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
  })

  const active = TABS[tab]

  const selectTab = (i: number) => {setTab(i);setOpen(0);}

  return (
    <section className="sv" data-screen-label="Services" data-comment-anchor="6af0c8f8bd-section-206-5">
    <div className="sv__haze" />
    {/* grain-gradient background removed per client request */}

    <div className="sv__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{props.eyebrow}</p>
      <h2 className="csa-h2 sv__title" data-reveal="up" data-reveal-delay="80">{tab === 0 ? props.servicesTitle : props.industriesTitle}</h2>
      <p className="csa-lead sv__lead" data-reveal="up" data-reveal-delay="160" key={active.id + '-lead'}>{active.lead}</p>
    </div>

    <div className="sv__tabs" role="tablist" aria-label="Services and industries" data-reveal="up" data-reveal-delay="120">
      <span className="sv__thumb" style={{ left: thumb.left + 'px', width: thumb.width + 'px' }} />
      {TABS.map((t, i) =>
        <button
          key={t.id}
          ref={(el) => {tabRefs.current[i] = el;}}
          className={'sv__tab' + (i === tab ? ' is-on' : '')}
          onClick={() => selectTab(i)}
          role="tab"
          aria-selected={i === tab}>

          {t.label}
        </button>
        )}
    </div>

    <p className="sv__count">{String(active.data.length).padStart(2, '0')} {active.noun}</p>

    <div className="sv__list sv-anim" key={active.id}>
      {active.data.map((item, i) =>
        <AccordionItem
          key={item.id}
          item={item}
          index={i}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)} />

        )}
    </div>

    <div className="sv__cta-row">
      <button className="btn btn--lg rv-glass-btn" data-metal="gold" onClick={(e) => e.preventDefault()} data-comment-anchor="4e2a5fa592-button-246-9">
        {active.cta} <i data-lucide="arrow-right"></i>
      </button>
    </div>
  </section>)

}
