'use client'

import { useState, useEffect, useCallback, useRef, createElement } from 'react'
import { MetalEdge } from '@/components/ui/MetalEdge'

export type HeroSystem = {
  category: string
  name: string
  blurb: string
  videoUrl?: string | null
  posterUrl?: string | null
  isGif?: boolean | null
  metricLabel?: string | null
  metricValue?: string | null
  standards?: { label: string }[] | null
  sizeK?: number | null
  offsetY?: number | null
  activeRY?: number | null
}

export type HeroProps = {
  titleLine1?: string | null
  titleLine2?: string | null
  highlightWord?: string | null
  subhead?: string | null
  sub?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
  backgroundVideoUrl?: string | null
  systems: HeroSystem[]
  tickerStandards?: { label: string }[] | null
}

/* ---------- Carousel stage (boomerang-playing showcase systems) ---------- */
function Stage({ systems, index }: { systems: HeroSystem[]; index: number }) {
  const count = systems.length
  const half = Math.floor(count / 2)
  const vids = useRef<Record<number, any>>({})

  useEffect(() => {
    const active = systems[index]
    systems.forEach((_, i) => {
      if (i !== index) {
        const o = vids.current[i]
        if (o && o.pause) o.pause()
      }
    })
    const v = vids.current[index]
    if (!v || typeof v.play !== 'function') return

    let cancelled = false,
      mode = 'forward',
      raf = 0,
      revTimer: any = 0
    let seeking = false,
      seekStart = 0
    const EPS = 0.08
    const STEP = 1 / 24
    const SEEK_WAIT = 230
    const clearReverse = () => {
      if (revTimer) {
        clearInterval(revTimer)
        revTimer = 0
      }
    }
    const playForward = () => {
      clearReverse()
      mode = 'forward'
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }
    const watch = () => {
      if (cancelled || mode !== 'forward') return
      const dur = v.duration || 0
      if (dur && (v.ended || v.currentTime >= dur - EPS)) {
        startReverse()
        return
      }
      raf = requestAnimationFrame(watch)
    }
    function startReverse() {
      mode = 'reverse'
      try {
        v.pause()
      } catch (e) {}
      seeking = false
      clearReverse()
      revTimer = setInterval(() => {
        if (cancelled || mode !== 'reverse') {
          clearReverse()
          return
        }
        if (seeking && performance.now() - seekStart < SEEK_WAIT) return
        const t = v.currentTime - STEP
        if (t <= 0.02) {
          try {
            v.currentTime = 0
          } catch (e) {}
          playForward()
          raf = requestAnimationFrame(watch)
          return
        }
        seeking = true
        seekStart = performance.now()
        try {
          v.currentTime = t
        } catch (e) {}
      }, 33)
    }
    const onSeeked = () => {
      seeking = false
    }
    v.addEventListener('seeked', onSeeked)
    playForward()
    raf = requestAnimationFrame(watch)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearReverse()
      v.removeEventListener('seeked', onSeeked)
      try {
        v.pause()
      } catch (e) {}
    }
  }, [index, systems])

  return (
    <div className="stage">
      <div className="stage__floor" />
      {systems.map((sys, i) => {
        let rel = ((i - index + count + half) % count) - half
        const abs = Math.abs(rel)
        let x = 0,
          scale = 1,
          ry = 0,
          opacity = 1,
          z = 30,
          blur = 0,
          bright = 1
        if (abs === 0) {
          x = 0
          scale = 1
          ry = sys.activeRY || 0
          opacity = 1
          z = 30
          blur = 0
          bright = 1
        } else if (abs === 1) {
          x = rel * 470
          scale = 0.58
          ry = rel * -34
          opacity = 1
          z = 20
          blur = 2
          bright = 0.32
        } else {
          x = rel * 700
          scale = 0.4
          ry = rel * -30
          opacity = 0
          z = 10
          blur = 4
          bright = 0.32
        }
        const style: React.CSSProperties = {
          transform: `translate(-50%, ${abs === 0 ? sys.offsetY || 0 : 0}px) translateX(${x}px) scale(${
            scale * (sys.sizeK || 1)
          }) rotateY(${ry}deg)`,
          opacity,
          zIndex: z,
          filter: `${blur ? `blur(${blur}px) ` : ''}brightness(${bright})`,
        }
        return (
          <div className="char" key={i} style={style} aria-hidden={abs !== 0}>
            {sys.isGif ? (
              <img className="char__img" ref={(el) => { vids.current[i] = el }} src={sys.videoUrl || ''} alt={sys.name} />
            ) : (
              <video
                className="char__img"
                ref={(el) => { vids.current[i] = el }}
                src={sys.videoUrl || ''}
                poster={sys.posterUrl || ''}
                muted
                playsInline
                preload="metadata"
                aria-label={sys.name}
              ></video>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Typewriter ---------- */
function Typewriter({ text, speed = 20, startDelay = 300 }: { text: string; speed?: number; startDelay?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    let i = 0
    let interval: any
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])
  const done = n >= text.length
  return (
    <>
      {text.slice(0, n)}
      <span className={'vtype-caret' + (done ? ' is-done' : '')} aria-hidden="true"></span>
    </>
  )
}

function Hud({ sys, index, count }: { sys: HeroSystem; index: number; count: number }) {
  return (
    <div className="vhud">
      <p className="vhud__tag csa-mono">Subject telemetry</p>
      <div className="vcard vswap" key={'card' + index}>
        <span className="vcard__aura" aria-hidden="true" />
        <span className="vcard__callout" aria-hidden="true" />
        <div className="vcard__top">
          <p className="vcard__cat">{sys.category}</p>
          <span className="vcard__idx csa-mono">
            {String(index + 1).padStart(2, '0')}
            <i>/{String(count).padStart(2, '0')}</i>
          </span>
        </div>
        <h3 className="vcard__name">{sys.name}</h3>
        <p className="vcard__blurb">
          <Typewriter text={sys.blurb} />
        </p>
        <div className="vcard__divider" />
        <div className="vcard__metric">
          <span className="vcard__metric-label">{sys.metricLabel}</span>
          <span className="vcard__metric-val">{sys.metricValue}</span>
        </div>
        <div className="vcard__divider" />
        <p className="vcard__std-label">Validated against</p>
        <div className="vchips">
          {(sys.standards || []).map((s) => (
            <span className="vchip" key={s.label}>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SelBar({
  index,
  count,
  sys,
  systems,
  onDot,
  onPrev,
  onNext,
}: {
  index: number
  count: number
  sys: HeroSystem
  systems: HeroSystem[]
  onDot: (i: number) => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="selbar">
      <MetalEdge className="selbar__name">
        <span className="selbar__counter">{String(index + 1).padStart(2, '0')}</span>
        <span className="selbar__sep">/</span>
        <span>{String(count).padStart(2, '0')}</span>
        <span className="selbar__sep">·</span>
        <span>{sys.category}</span>
      </MetalEdge>
      <div className="selbar__controls">
        <button className="navarrow csa-btn-ghost" onClick={onPrev} aria-label="Previous system">
          <i data-lucide="chevron-left"></i>
        </button>
        <div className="selbar__dots">
          {systems.map((s, i) => (
            <button
              key={i}
              className={'seldot' + (i === index ? ' is-on' : '')}
              onClick={() => onDot(i)}
              aria-label={'Select ' + s.name}
            />
          ))}
        </div>
        <button className="navarrow csa-btn-ghost" onClick={onNext} aria-label="Next system">
          <i data-lucide="chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export function Hero(props: HeroProps) {
  const systems = props.systems || []
  const [index, setIndex] = useState(0)
  const count = systems.length
  const sys = systems[index]

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count])
  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  const ghostRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const SPEED = 26
    let x = 0,
      last = performance.now()
    const step = () => {
      const now = performance.now()
      x -= (SPEED * (now - last)) / 1000
      last = now
      const el = ghostRef.current
      if (el) {
        const half = el.scrollWidth / 2
        if (half > 0 && -x >= half) x += half
        el.style.transform = `translateX(${x}px)`
      }
    }
    const id = setInterval(step, 16)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const paused = useRef(false)
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) next()
    }, 15000)
    return () => clearInterval(id)
  }, [next, index])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).lucide) (window as any).lucide.createIcons()
      if ((window as any).csaInit) (window as any).csaInit()
    }
  })

  // Build the title: line1, then line2 with the highlight word wrapped.
  const renderLine2 = () => {
    const line2 = props.titleLine2 || ''
    const hw = props.highlightWord || ''
    if (!hw || !line2.includes(hw)) return line2
    const [before, after] = line2.split(hw)
    return (
      <>
        {before}
        <span className="csa-gold-shimmer">{hw}</span>
        {after}
      </>
    )
  }

  if (!sys) return null

  return (
    <header
      className="vhero"
      data-screen-label="Hero"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      {props.backgroundVideoUrl && (
        <video className="vhero__bg" src={props.backgroundVideoUrl} autoPlay muted loop playsInline></video>
      )}
      <div className="vhero__scrim vhero__scrim--haze" />
      <div className="vhero__scrim vhero__scrim--v" />
      <div className="vhero__scrim vhero__scrim--h" />
      <div className="vhero__ghost" aria-hidden="true">
        <div className="vhero__ghost-track" ref={ghostRef}>
          <span>Critical Systems Analysis</span>
          <span>Critical Systems Analysis</span>
        </div>
      </div>

      <div className="vhero__inner">
        <div className="vhero__copy">
          <h1 className="csa-display vhero__title vhero__reveal vhero__reveal--1">
            {props.titleLine1}
            <br />
            {renderLine2()}
          </h1>
          <p className="vhero__subhead vhero__reveal vhero__reveal--2">{props.subhead}</p>
          <p className="vhero__sub vhero__reveal vhero__reveal--2">{props.sub}</p>
          <div className="vhero__cta vhero__reveal vhero__reveal--3">
            <a className="btn btn--gold-pill btn--lg" href={props.primaryCtaHref || '#'}>
              {props.primaryCtaLabel}
            </a>
            <a className="btn btn--link" href={props.secondaryCtaHref || '#'}>
              {props.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="vhero__selector" data-screen-label="Industry Selector">
          <Stage systems={systems} index={index} />
          <SelBar index={index} count={count} sys={sys} systems={systems} onDot={setIndex} onPrev={prev} onNext={next} />
        </div>

        <Hud sys={sys} index={index} count={count} />

        {/* Mobile-only: compact subject badge with live silver liquid-metal edge */}
        <div className="vhero__mobbadge" aria-hidden="true">
          {createElement('csa-liquid-metal', {
            ring: '',
            thickness: '2px',
            contour: '0.92',
            repetition: '3',
            tint: '#EAF0F8',
            'color-back': '#46505F',
            'data-no-lazy': '',
            style: { position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' },
          })}
          <span className="vhero__mobbadge-count">
            <b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
          </span>
          <span className="vhero__mobbadge-cat">{sys.category}</span>
        </div>

        {/* Mobile-only: full-width carousel controls below the card + robot row */}
        <div className="vhero__mobsel">
          <SelBar index={index} count={count} sys={sys} systems={systems} onDot={setIndex} onPrev={prev} onNext={next} />
        </div>
      </div>

      <div className="vhero__ticker" aria-hidden="true">
        <div className="csa-marquee">
          <div className="csa-marquee__track">
            {[...(props.tickerStandards || []), ...(props.tickerStandards || [])].map((s, i) => (
              <span className="csa-marquee__item" key={i}>
                {s.label}
                <span className="dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
