'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from '../../_components/Chevron'
import { attachTilt } from '../../_components/tilt'
import type { CaseStudyCard, HomeDoc } from './types'

/**
 * CaseStudiesSection — faithful port of design-reference/project/assets/case-studies.jsx.
 * Editorial copy (eyebrow, heading, sub, CTA label, the case-study carousel cards)
 * comes from the `home` record; the per-card cover image slots, the live
 * liquid-metal rings, the tilt/parallax math, and the mobile-context guard are
 * design-only behaviour preserved inline.
 */

/* Mobile guard: on phones the carousel is swiped rapidly, and each swap
   remounts the React-owned (data-no-lazy) liquid-metal rings on the active
   card + quote — creating/destroying a WebGL context every swipe. On mobile's
   low context budget that force-evicts the grain background's context (the
   "crash"). So on mobile we drop the live rings and let the .csa-glass CSS
   silver-foil edge stand in; the grain context then stays stable. */
function useIsMobile(): boolean {
  const q = '(max-width: 720px)'
  const [m, setM] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(q).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on)
    }
  }, [])
  return m
}

/*
 * Live liquid-metal ring (WebGL). Rendered INSIDE the active card's tilt plate so
 * it rotates with the card's 3D tilt (and inside the quote). Only the active card
 * mounts one, so it's a single context at a time. Desktop only — on mobile the
 * .csa-glass CSS foil edge stands in (tight GPU budget on phones). NOTE: the
 * arrows' click reliability is handled separately by React-owned chevrons
 * (_components/Chevron) — do NOT try to "fix lag" by deleting these rings; that
 * removes the liquid-silver border the design requires.
 */
function MetalRing() {
  return (
    <csa-liquid-metal
      ring=""
      thickness="3px"
      contour="0.92"
      repetition="3"
      tint="#EAF0F8"
      color-back="#46505F"
      aria-hidden="true"
      data-no-lazy=""
      style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 3, pointerEvents: 'none' }}
    />
  )
}

type CardData = CaseStudyCard & { id: string }

function Card({
  data,
  rel,
  active,
  isMobile,
  onSelect,
}: {
  data: CardData
  rel: number
  active: boolean
  isMobile: boolean
  onSelect?: () => void
}) {
  // rel is the wrapped offset in [-1, 0, 1]
  const tiltRef = useRef<HTMLDivElement>(null)
  let x = 0
  let scale = 1
  let bright = 1
  let z = 30
  if (rel !== 0) {
    x = rel * 160
    scale = 0.9
    bright = 0.42
    z = 20
  }
  const style: React.CSSProperties = {
    transform: `translateX(-50%) translateX(${x}px) scale(${scale})`,
    filter: `brightness(${bright})`,
    zIndex: z,
  }

  // Cursor-following 3D tilt + specular highlight, driven directly (not via
  // interactions.js, whose tilt wiring is skipped under prefers-reduced-motion).
  // attachTilt tracks at the document level so the card never flickers when the
  // hovered edge recedes under the cursor (see _components/tilt.ts). Only the
  // active card is wired.
  const MAX = 8 // degrees
  useEffect(() => {
    const el = tiltRef.current
    if (!active || !el) return
    return attachTilt(el, {
      onTilt: (px, py) => {
        el.style.setProperty('--rx', ((px - 0.5) * 2 * MAX).toFixed(2) + 'deg')
        el.style.setProperty('--ry', (-(py - 0.5) * 2 * MAX).toFixed(2) + 'deg')
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%')
      },
      onReset: () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      },
    })
  }, [active])

  const standards = (data.standards ?? []).map((s) => s.code)

  return (
    <article
      className={'cs-card' + (active ? ' is-active' : ' is-side')}
      style={style}
      aria-hidden={!active}
      onClick={active ? undefined : onSelect}
    >
      <div
        className={'cs-card__tilt' + (active ? ' csa-glass csa-tilt' : '')}
        ref={tiltRef}
        data-tilt-managed=""
      >
        {/* Ring lives INSIDE the tilt plate so it rotates with the card's 3D tilt.
            Only the active card mounts it (1 WebGL context). */}
        {active && !isMobile && <MetalRing />}
        <div className="cs-card__cover">
          <image-slot id={'cs-cover-' + data.id} shape="rect" fit="cover" placeholder={'Drop cover image'}></image-slot>
        </div>
        <div className="cs-card__scrim" />
        <div className={'cs-card__body' + (active ? ' cs-anim' : '')} key={'body' + data.id}>
          <p className="cs-card__sector">{data.sector}</p>
          <h3 className="cs-card__name">{data.name}</h3>
          <p className="cs-card__desc">{data.desc}</p>
          {standards.length > 0 && (
            <div className="cs-card__std">
              {standards.map((s) => (
                <span className="cs-card__chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          )}
          <Link className="btn btn--gold-pill cs-card__cta" href="/case-studies" onClick={(e) => e.stopPropagation()}>
            Read case study <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

function Quote({ data, isMobile }: { data: CardData; isMobile: boolean }) {
  // No key here: the quote element persists across swaps so its single liquid-metal
  // ring keeps one stable WebGL context (content updates in place). Re-keying it
  // per index remounted the ring every swap — the churn that made the arrows lag.
  return (
    <div className="cs-quote csa-glass cs-anim">
      {!isMobile && <MetalRing />}
      <span className="cs-quote__mark">&ldquo;</span>
      <p className="cs-quote__text">{data.quote}</p>
      <div className="cs-quote__by">
        <span className="cs-quote__name">{data.author}</span>
        {data.affiliation && <span className="cs-quote__sep">/</span>}
        {data.affiliation && <span className="cs-quote__role">{data.affiliation}</span>}
      </div>
    </div>
  )
}

export function CaseStudiesSection({ home }: { home: HomeDoc }) {
  const cases: CardData[] = (home.csItems ?? []).map((c, i) => ({ ...c, id: 'cs-' + i }))

  const [index, setIndex] = useState(0)
  const isMobile = useIsMobile()
  const count = cases.length
  const half = Math.floor(count / 2)

  const go = useCallback((dir: number) => setIndex((i) => (count ? (i + dir + count) % count : 0)), [count])
  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const active = cases[index]
  if (!active) return null

  return (
    <section className="cs">
      <div className="cs__haze" />
      {isMobile ? (
        <div className="cs__grain-static" aria-hidden="true"></div>
      ) : (
        <csa-grain
          className="rv-grain"
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          intensity="0.34"
          speed="0.4"
        ></csa-grain>
      )}
      <div className="cs__ghost" aria-hidden="true">
        Proven
      </div>

      <div className="cs__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {home.csEyebrow}
        </p>
        <h2 className="csa-h2 cs__title" data-reveal="up" data-reveal-delay="80">
          {home.csHeading}
        </h2>
        <p className="cs__sub" data-reveal="up" data-reveal-delay="160">
          {home.csSub}
        </p>
      </div>

      <div className="cs__stage">
        {cases.map((c, i) => {
          const rel = ((i - index + count + half) % count) - half
          return (
            <Card
              key={c.id}
              data={c}
              rel={rel}
              active={i === index}
              isMobile={isMobile}
              onSelect={() => setIndex(i)}
            />
          )
        })}
        <Quote data={active} isMobile={isMobile} />
      </div>

      <div className="cs__nav">
        <button className="cs-arrow csa-btn-ghost" onClick={prev} aria-label="Previous case study">
          <ChevronLeft />
        </button>
        <div className="cs-dots">
          {cases.map((c, i) => (
            <button
              key={c.id}
              className={'cs-dot' + (i === index ? ' is-on' : '')}
              onClick={() => setIndex(i)}
              aria-label={'View ' + (c.name ?? '')}
            />
          ))}
        </div>
        <button className="cs-arrow csa-btn-ghost" onClick={next} aria-label="Next case study">
          <ChevronRight />
        </button>
      </div>

      <div className="cs__cta-row">
        <Link className="btn btn--gold-pill btn--lg" href="/company/experience">
          {home.csCtaLabel} <i data-lucide="arrow-right"></i>
        </Link>
      </div>
    </section>
  )
}
