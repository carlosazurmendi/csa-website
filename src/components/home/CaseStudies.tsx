'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csa-liquid-metal': any
      'csa-grain': any
    }
  }
}

export type CaseItem = {
  sector: string
  name: string
  description: string
  standards: { label: string }[]
  coverUrl?: string | null
  quote?: string | null
  author?: string | null
  affiliation?: string | null
}

export type CaseStudiesProps = {
  eyebrow?: string | null
  title?: string | null
  sub?: string | null
  ctaLabel?: string | null
  cases: CaseItem[]
}

/* Live liquid-metal ring rendered as a REACT-OWNED child (not injected by
   wireMetal). In a re-rendering component (this carousel) React reconciles
   the host's children and strips any foreign node wireMetal injected — and
   because wireMetal marks the host __metal=true + adds .csa-metal-on, it
   refuses to re-add the ring AND keeps the CSS foil hidden, so the edge
   vanishes after the first render. Declaring it in JSX keeps the same
   element across renders (one stable WebGL context, never stripped). */
function MetalRing({ kind, thickness }: { kind?: string; thickness?: string }) {
  const props: Record<string, string> = kind === 'silver' ?
  { tint: '#EAF0F8', 'color-back': '#46505F' } :
  { tint: '#F4D585', 'color-back': '#7A5E2A', distortion: '0.15' }
  return React.createElement('csa-liquid-metal' as any, Object.assign({
    ring: '', thickness: thickness || '3px', contour: '0.92', repetition: '3',
    'aria-hidden': 'true', 'data-no-lazy': '',
    style: { position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 3, pointerEvents: 'none' }
  }, props))
}

function Card({ data, rel, active, onSelect }: { data: CaseItem; rel: number; active: boolean; onSelect?: () => void }) {
  // rel is the wrapped offset in [-1, 0, 1]
  const tiltRef = useRef<HTMLDivElement>(null)
  let x = 0,scale = 1,bright = 1,z = 30
  if (rel !== 0) {
    x = rel * 160
    scale = 0.9
    bright = 0.42
    z = 20
  }
  const style = {
    transform: `translateX(-50%) translateX(${x}px) scale(${scale})`,
    filter: `brightness(${bright})`,
    zIndex: z
  }

  // Cursor-following 3D tilt + specular highlight, driven directly (not via
  // interactions.js, whose tilt wiring is skipped under prefers-reduced-motion).
  const MAX = 8 // degrees
  const onMove = (e: any) => {
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', ((px - 0.5) * 2 * MAX).toFixed(2) + 'deg')
    el.style.setProperty('--ry', (-(py - 0.5) * 2 * MAX).toFixed(2) + 'deg')
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
    el.style.setProperty('--my', (py * 100).toFixed(1) + '%')
  }
  const onLeave = () => {
    const el = tiltRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      className={'cs-card' + (active ? ' is-active' : ' is-side')}
      style={style}
      aria-hidden={!active}
      onClick={active ? undefined : onSelect}>

    <div
        className={'cs-card__tilt' + (active ? ' csa-glass csa-tilt' : '')}
        ref={tiltRef}
        onMouseMove={active ? onMove : undefined}
        onMouseLeave={active ? onLeave : undefined}>

      {active && <MetalRing kind="silver" />}
      <div className="cs-card__cover">
        {data.coverUrl &&
          <img src={data.coverUrl} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div className="cs-card__scrim" />
      <div className={'cs-card__body' + (active ? ' cs-anim' : '')} key={'body' + data.name}>
        <p className="cs-card__sector">{data.sector}</p>
        <h3 className="cs-card__name">{data.name}</h3>
        <p className="cs-card__desc">{data.description}</p>
        {data.standards && data.standards.length > 0 &&
          <div className="cs-card__std">
            {data.standards.map((s) => <span className="cs-card__chip" key={s.label}>{s.label}</span>)}
          </div>
          }
        <button className="btn btn--gold-pill cs-card__cta" onClick={(e) => {e.stopPropagation();e.preventDefault();}}>
          Read case study <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  </article>)

}

function Quote({ data, index }: { data: CaseItem; index: number }) {
  return (
    <div className="cs-quote csa-glass cs-anim" key={'q' + index} data-comment-anchor="c069ea9fd4-div-153-7">
    <MetalRing kind="silver" />
    <span className="cs-quote__mark" data-comment-anchor="3f7f347ef2-span-153-7">&ldquo;</span>
    <p className="cs-quote__text">{data.quote}</p>
    <div className="cs-quote__by">
      <span className="cs-quote__name">{data.author}</span>
      {data.affiliation && <span className="cs-quote__sep">/</span>}
      {data.affiliation && <span className="cs-quote__role">{data.affiliation}</span>}
    </div>
  </div>)

}

export function CaseStudies(props: CaseStudiesProps) {
  const [index, setIndex] = useState(0)
  const count = props.cases.length
  const half = Math.floor(count / 2)

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count])
  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === 'ArrowRight') next();else
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()
    // Re-evaluate which shader edges should hold a WebGL context now that the
    // active card changed (the newly-active card's CTA becomes visible and
    // gets a live metal ring; the old one is suspended).
    if ((window as any).CSAShaders && (window as any).CSAShaders.syncLazy) (window as any).CSAShaders.syncLazy()
  })

  const active = props.cases[index]

  return (
    <section className="cs" data-screen-label="Case Studies" data-comment-anchor="86c31dfd6f-section-190-5">
    <div className="cs__haze" />
    <csa-grain
        className="rv-grain"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        intensity="0.34"
        speed="0.4"></csa-grain>
    <div className="cs__ghost" aria-hidden="true">Proven</div>

    <div className="cs__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{props.eyebrow}</p>
      <h2 className="csa-h2 cs__title" data-reveal="up" data-reveal-delay="80">{props.title}</h2>
      <p className="cs__sub" data-reveal="up" data-reveal-delay="160">{props.sub}</p>
    </div>

    <div className="cs__stage">
      {props.cases.map((c, i) => {
          const rel = (i - index + count + half) % count - half
          return (
            <Card
              key={i}
              data={c}
              rel={rel}
              active={i === index}
              onSelect={() => setIndex(i)} />)


        })}
      <Quote data={active} index={index} />
    </div>

    <div className="cs__nav">
      <button className="cs-arrow csa-btn-ghost" onClick={prev} aria-label="Previous case study" data-comment-anchor="603cd471e5-button-246-9">
        <i data-lucide="chevron-left"></i>
      </button>
      <div className="cs-dots">
        {props.cases.map((c, i) =>
          <button
            key={i}
            className={'cs-dot' + (i === index ? ' is-on' : '')}
            onClick={() => setIndex(i)}
            aria-label={'View ' + c.name} />

          )}
      </div>
      <button className="cs-arrow csa-btn-ghost" onClick={next} aria-label="Next case study">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>

    <div className="cs__cta-row">
      <button className="btn btn--gold-pill btn--lg" onClick={(e) => e.preventDefault()}>
        {props.ctaLabel} <i data-lucide="arrow-right"></i>
      </button>
    </div>
  </section>)

}
