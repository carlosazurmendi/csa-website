'use client'

/* ============================================================
   CSA — Consulting Overview "Common Questions" accordion.
   Ported from Consulting/Overview.html (Questions section).
   Requires consulting-overview.css (loaded globally).
   ============================================================ */
import { useEffect, useState } from 'react'

export type OverviewFaqItem = { question: string; answer: string }
export type OverviewFaqProps = {
  eyebrow?: string | null
  title?: string | null
  items: OverviewFaqItem[]
}

export function OverviewFaq(props: OverviewFaqProps) {
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
  })

  return (
    <section className="co-sec co-band-top" data-screen-label="Common Questions">
      <div className="co-head co-reveal">
        <span className="csa-eyebrow">{props.eyebrow}</span>
        <h2 className="csa-h2 co-head__title">{props.title}</h2>
      </div>
      <div className="co-faq__list co-reveal">
        {props.items.map((item, i) => (
          <div className={'co-q' + (open === i ? ' is-open' : '')} key={i}>
            <button
              className="co-q__head"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span className="csa-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="co-q__q">{item.question}</span>
              <span className="co-q__toggle">
                <i data-lucide="chevron-down"></i>
              </span>
            </button>
            <div className="co-q__body">
              <div className="co-q__bodywrap">
                <p className="co-q__a">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
