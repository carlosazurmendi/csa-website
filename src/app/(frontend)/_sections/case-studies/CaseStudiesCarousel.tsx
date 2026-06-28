'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { attachTilt } from '../../_components/tilt'
import { CmsImage } from '../../_components/CmsImage'

/**
 * CaseStudiesCarousel — faithful port of design-reference/project/assets/case-studies.jsx.
 * The single implementation of the case-studies band: the home page renders it as a
 * section (CMS heading copy via `heading`), sourced from the `case-studies` collection
 * so each card's CTA links to its real detail page at /case-studies/<slug>. The per-card
 * cover slots, live liquid-metal rings, tilt/parallax math, and the mobile-context guard
 * are design-only behaviour preserved inline from the export.
 */

export type CaseCard = {
  id: string
  slug: string
  sector: string
  name: string
  desc: string
  quote: string
  author: string
  affiliation: string | null
  cover?: string
}

/** CMS-driven section copy (the home record). */
export type SectionHeading = {
  eyebrow?: string
  title?: string
  sub?: string
  ctaLabel?: string
  ctaHref?: string
}

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

/* Live liquid-metal ring rendered as a REACT-OWNED child (not injected by
   wireMetal). In a re-rendering component (this carousel) React reconciles
   the host's children and strips any foreign node wireMetal injected — and
   because wireMetal marks the host __metal=true + adds .csa-metal-on, it
   refuses to re-add the ring AND keeps the CSS foil hidden, so the edge
   vanishes after the first render. Declaring it in JSX keeps the same
   element across renders (one stable WebGL context, never stripped). */
function MetalRing({ kind, thickness }: { kind: 'silver' | 'gold'; thickness?: string }) {
  const tintProps =
    kind === 'silver'
      ? { tint: '#EAF0F8', 'color-back': '#46505F' }
      : { tint: '#F4D585', 'color-back': '#7A5E2A', distortion: '0.15' }
  const style: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    zIndex: 3,
    pointerEvents: 'none',
  }
  return (
    <csa-liquid-metal
      ring=""
      thickness={thickness || '3px'}
      contour="0.92"
      repetition="3"
      aria-hidden="true"
      data-no-lazy=""
      style={style}
      {...tintProps}
    />
  )
}

function Card({
  data,
  rel,
  active,
  isMobile,
  onSelect,
}: {
  data: CaseCard
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
        {active && !isMobile && <MetalRing kind="silver" />}
        <div className="cs-card__cover">
          <CmsImage src={data.cover} alt={data.name} sizes="(max-width: 900px) 100vw, 800px" />
        </div>
        <div className="cs-card__scrim" />
        <div className={'cs-card__body' + (active ? ' cs-anim' : '')} key={'body' + data.id}>
          <p className="cs-card__sector">{data.sector}</p>
          <h3 className="cs-card__name">{data.name}</h3>
          <p className="cs-card__desc">{data.desc}</p>
          <Link
            className="btn btn--gold-pill cs-card__cta"
            href={`/case-studies/${data.slug}`}
            onClick={(e) => e.stopPropagation()}
          >
            Read case study <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

function Quote({ data, index, isMobile }: { data: CaseCard; index: number; isMobile: boolean }) {
  return (
    <div className="cs-quote csa-glass cs-anim" key={'q' + index}>
      {!isMobile && <MetalRing kind="silver" />}
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

export function CaseStudiesCarousel({
  cards,
  heading,
}: {
  cards: CaseCard[]
  heading?: SectionHeading
}) {
  const [index, setIndex] = useState(0)
  const isMobile = useIsMobile()
  const count = cards.length
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

  const active = cards[index]
  if (!active) return null

  const eyebrow = heading?.eyebrow ?? 'Proof, not promises.'
  const title = heading?.title ?? 'Case studies.'
  const sub = heading?.sub ?? 'Real results from teams shipping safety-critical systems.'
  const ctaLabel = heading?.ctaLabel ?? 'Read the Full Case Studies'
  const ctaHref = heading?.ctaHref ?? '/company/experience'

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
          {eyebrow}
        </p>
        <h2 className="csa-h2 cs__title" data-reveal="up" data-reveal-delay="80">
          {title}
        </h2>
        <p className="cs__sub" data-reveal="up" data-reveal-delay="160">
          {sub}
        </p>
      </div>

      <div className="cs__stage">
        {cards.map((c, i) => {
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
        <Quote data={active} index={index} isMobile={isMobile} />
      </div>

      <div className="cs__nav">
        <button className="cs-arrow csa-btn-ghost" onClick={prev} aria-label="Previous case study">
          <i data-lucide="chevron-left"></i>
        </button>
        <div className="cs-dots">
          {cards.map((c, i) => (
            <button
              key={c.id}
              className={'cs-dot' + (i === index ? ' is-on' : '')}
              onClick={() => setIndex(i)}
              aria-label={'View ' + c.name}
            />
          ))}
        </div>
        <button className="cs-arrow csa-btn-ghost" onClick={next} aria-label="Next case study">
          <i data-lucide="chevron-right"></i>
        </button>
      </div>

      <div className="cs__cta-row">
        <Link className="btn btn--gold-pill btn--lg" href={ctaHref}>
          {ctaLabel} <i data-lucide="arrow-right"></i>
        </Link>
      </div>
    </section>
  )
}
