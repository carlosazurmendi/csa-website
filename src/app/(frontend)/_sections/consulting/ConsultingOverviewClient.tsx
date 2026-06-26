'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from '../../_components/Chevron'

/**
 * Client-only behavior for the Consulting Overview page, ported from the inline
 * script in design-reference/project/Consulting/Overview.html.
 *
 * Two pieces:
 *   • ConsultingReveal — mounts the page-wide IntersectionObserver that toggles
 *     `.co-reveal` → `.is-in` (the page's bespoke scroll-reveal; NOT the global
 *     data-reveal system). Renders nothing.
 *   • ConsultingQuestions — the "What teams ask first." FAQ accordion (useState
 *     open index, matches the export's <Questions> component exactly).
 *
 * Both are co-located here so the server page can stay pure markup. The lucide
 * icon hydration is handled globally, so we drop window.lucide.createIcons.
 */

/* ---------- Scroll reveal (page-wide, faithful to useReveal in the export) ---------- */
export function ConsultingReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.co-reveal')
    if (reduce) {
      els.forEach((e) => e.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  return null
}

/* ---------- Common Questions accordion ---------- */
export type FaqItem = { q: string; a: string }

export function ConsultingQuestions({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: FaqItem[] }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="co-sec co-band-top">
      <div className="co-head co-reveal">
        <span className="csa-eyebrow">{eyebrow}</span>
        <h2 className="csa-h2 co-head__title">{heading}</h2>
      </div>
      <div className="co-faq__list co-reveal">
        {items.map((item, i) => (
          <div className={'co-q' + (open === i ? ' is-open' : '')} key={i}>
            <button className="co-q__head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="csa-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="co-q__q">{item.q}</span>
              <span className="co-q__toggle">
                <ChevronDown />
              </span>
            </button>
            <div className="co-q__body">
              <div className="co-q__bodywrap">
                <p className="co-q__a">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
