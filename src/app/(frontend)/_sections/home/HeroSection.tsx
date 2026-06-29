'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { lexicalToText } from '@/lib/lexical'
import { ChevronLeft, ChevronRight } from '../../_components/Chevron'
import type { HeroSystem, HomeDoc } from './types'

/**
 * HeroSection — faithful port of design-reference/project/assets/hero.jsx.
 * Editorial copy (title, sub, the 5 carousel systems, the standards ticker)
 * comes from the `home` record; the per-system media + layout tuning (video,
 * poster, scale, vertical offset, active rotation) are design constants zipped
 * to the CMS systems by order.
 */

type Media = {
  id: string
  video?: string
  gif?: string
  poster?: string
  sizeK: number
  offsetY: number
  activeRY?: number
  roll?: number
}

// Per-slide media + framing, in the same order as the seeded heroSystems.
const HERO_MEDIA: Media[] = [
  { id: 'humanoid', video: '/csa/sys-1.webm', poster: '/csa/sys-1-fit.png', sizeK: 1.12, offsetY: 235 },
  { id: 'rail', gif: '/csa/sys-2.gif', sizeK: 1.22, activeRY: -19, offsetY: -260 },
  { id: 'arm', video: '/csa/sys-3.webm', poster: '/csa/sys-3-fit.png', sizeK: 0.78, offsetY: -180 },
  { id: 'amr', video: '/csa/sys-4.webm', poster: '/csa/sys-4-fit.png', sizeK: 0.93, offsetY: -180 },
  { id: 'av', video: '/csa/sys-5.webm', poster: '/csa/sys-5-fit.png', sizeK: 0.83, offsetY: -180 },
]

type Slide = Media & {
  cat: string
  name: string
  blurb: string
  standards: string[]
  metricLabel: string
  metricVal: string
}

const buildSlides = (systems: HeroSystem[]): Slide[] =>
  systems.map((s, i) => {
    const media = HERO_MEDIA[i] ?? { id: 'sys-' + i, sizeK: 1, offsetY: 0 }
    return {
      ...media,
      cat: s.cat ?? '',
      name: s.name ?? '',
      blurb: s.blurb ?? '',
      standards: (s.standards ?? []).map((x) => x.code),
      metricLabel: s.metricLabel ?? '',
      metricVal: s.metricVal ?? '',
    }
  })

/* ---------- Carousel stage ---------- */
function Stage({ slides, index }: { slides: Slide[]; index: number }) {
  const count = slides.length
  const half = Math.floor(count / 2)
  const vids = useRef<Record<string, HTMLVideoElement | HTMLImageElement | null>>({})
  const stageRef = useRef<HTMLDivElement>(null)

  // Play ONLY the focused slide's video, looping FORWARD natively (the <video loop>
  // attribute) — never reverse. The old "boomerang" reversed by seeking currentTime
  // backwards every frame, which forces continuous backward decode and pins the CPU
  // (worse with the alpha-VP9 source, which most GPUs can't hardware-decode). On top
  // of that, it now pauses when the hero is off-screen or the tab is hidden, and is
  // skipped entirely (poster shows instead) under reduced-motion / Save-Data / very
  // low-core devices — so it never tortures a weak machine or a background tab.
  useEffect(() => {
    const focused = slides[index]
    // Pause every non-focused video so at most one stream ever decodes.
    slides.forEach((sys, i) => {
      if (i !== index) {
        const o = vids.current[sys.id] as HTMLVideoElement | null
        if (o && typeof o.pause === 'function') o.pause()
      }
    })
    const v = focused ? (vids.current[focused.id] as HTMLVideoElement | null) : null
    if (!v || typeof v.play !== 'function') return

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
      hardwareConcurrency?: number
    }
    const allowMotion =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !nav.connection?.saveData &&
      (nav.hardwareConcurrency ?? 8) >= 3

    let visible = true
    const sync = () => {
      if (!allowMotion || !visible || document.hidden) {
        try {
          v.pause()
        } catch {
          /* noop */
        }
        return
      }
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }

    // Pause when the hero scrolls out of view.
    let io: IntersectionObserver | null = null
    const stage = stageRef.current
    if (stage && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true
          sync()
        },
        { threshold: 0.15 },
      )
      io.observe(stage)
    }
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', sync)
      try {
        v.pause()
      } catch {
        /* noop */
      }
    }
  }, [index, slides])

  return (
    <div className="stage" ref={stageRef}>
      <div className="stage__floor" />
      {slides.map((sys, i) => {
        let rel = ((i - index + count + half) % count) - half
        const abs = Math.abs(rel)
        let x = 0
        let scale = 1
        let ry = 0
        let opacity = 1
        let z = 30
        let blur = 0
        let bright = 1
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
          }) rotateY(${ry}deg) rotate(${abs === 0 ? sys.roll || 0 : 0}deg)`,
          opacity,
          zIndex: z,
          filter: `${blur ? `blur(${blur}px) ` : ''}brightness(${bright})`,
        }
        return (
          <div className="char" key={sys.id} data-sys={sys.id} style={style} aria-hidden={abs !== 0}>
            {sys.gif ? (
              // M8 exception — kept as a plain <img>, NOT next/image: the optimizer
              // freezes animated GIFs to a single frame, and this is eager
              // above-the-fold hero art (lazy-loading it would hurt LCP). It is also
              // ref-controlled for playback and shares its ref type with the <video>
              // branch below.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="char__img"
                ref={(el) => {
                  vids.current[sys.id] = el
                }}
                src={sys.gif}
                alt={sys.name}
              />
            ) : (
              <video
                className="char__img"
                ref={(el) => {
                  vids.current[sys.id] = el
                }}
                src={sys.video}
                poster={sys.poster}
                muted
                loop
                playsInline
                preload="none"
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
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) window.clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
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

/* ---------- Right-side HUD ---------- */
function Hud({ sys, index, count }: { sys: Slide; index: number; count: number }) {
  return (
    <div className="vhud">
      <p className="vhud__tag csa-mono">Subject telemetry</p>
      <div className="vcard vswap" key={'card' + index}>
        <span className="vcard__aura" aria-hidden="true" />
        <span className="vcard__callout" aria-hidden="true" />
        <div className="vcard__top">
          <p className="vcard__cat">{sys.cat}</p>
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
          <span className="vcard__metric-val">{sys.metricVal}</span>
        </div>
        <div className="vcard__divider" />
        <p className="vcard__std-label">Validated against</p>
        <div className="vchips">
          {sys.standards.map((s) => (
            <span className="vchip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Bottom selector bar ---------- */
function SelBar({
  slides,
  index,
  count,
  sys,
  onDot,
  onPrev,
  onNext,
}: {
  slides: Slide[]
  index: number
  count: number
  sys: Slide
  onDot: (i: number) => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="selbar">
      <div className="selbar__name">
        <csa-liquid-metal
          ring=""
          thickness="2px"
          contour="0.92"
          repetition="3"
          tint="#EAF0F8"
          color-back="#46505F"
          aria-hidden="true"
          data-no-lazy=""
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 3, pointerEvents: 'none' }}
        />
        <span className="selbar__counter">{String(index + 1).padStart(2, '0')}</span>
        <span className="selbar__sep">/</span>
        <span>{String(count).padStart(2, '0')}</span>
        <span className="selbar__sep">·</span>
        <span>{sys.cat}</span>
      </div>
      <div className="selbar__controls">
        <button className="navarrow csa-btn-ghost" onClick={onPrev} aria-label="Previous system">
          <ChevronLeft />
        </button>
        <div className="selbar__dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={'seldot' + (i === index ? ' is-on' : '')}
              onClick={() => onDot(i)}
              aria-label={'Select ' + s.name}
            />
          ))}
        </div>
        <button className="navarrow csa-btn-ghost" onClick={onNext} aria-label="Next system">
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export function HeroSection({ home }: { home: HomeDoc }) {
  // Memoize so the carousel's video-boomerang effect (deps include `slides`) only
  // re-runs when the data changes, not on every render — re-running it each tick
  // restarted the active video and made the prev/next arrows feel laggy.
  const slides = useMemo(() => buildSlides(home.heroSystems ?? []), [home.heroSystems])
  const ticker = useMemo(() => (home.heroTicker ?? []).map((t) => t.code), [home.heroTicker])
  const subText = lexicalToText(home.heroSub)

  // Title: line 1 = first sentence, line 2 = remainder with the accent word in gold.
  const title = home.heroTitle || ''
  const accent = home.heroTitleAccent || ''
  const sentenceSplit = title.split('. ')
  const line1 = sentenceSplit.length > 1 ? sentenceSplit[0] + '.' : title
  const line2 = sentenceSplit.length > 1 ? sentenceSplit.slice(1).join('. ') : ''
  const accentAt = accent ? line2.indexOf(accent) : -1
  const l2before = accentAt >= 0 ? line2.slice(0, accentAt) : line2
  const l2after = accentAt >= 0 ? line2.slice(accentAt + accent.length) : ''

  const [index, setIndex] = useState(0)
  const count = slides.length
  const sys = slides[index]

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (count ? (i + dir + count) % count : 0))
    },
    [count],
  )
  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  // Background wordmark marquee (time-based so it scrolls even under forced reduced-motion).
  const ghostRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const SPEED = 26
    let x = 0
    let last = performance.now()
    const step = () => {
      const now = performance.now()
      x -= (SPEED * (now - last)) / 1000
      last = now
      const el = ghostRef.current
      if (el) {
        const halfW = el.scrollWidth / 2
        if (halfW > 0 && -x >= halfW) x += halfW
        el.style.transform = `translateX(${x}px)`
      }
    }
    const id = window.setInterval(step, 16)
    return () => window.clearInterval(id)
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
    const id = window.setInterval(() => {
      if (!paused.current) next()
    }, 15000)
    return () => window.clearInterval(id)
  }, [next, index])

  if (!sys) return null

  return (
    <header
      className="vhero"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      <video className="vhero__bg" src="/csa/hero.mp4" autoPlay muted loop playsInline></video>
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
          <h1
            className="csa-display vhero__title vhero__reveal vhero__reveal--1"
            style={{ fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif', fontSize: '7px' }}
          >
            <span className="csa-mega" style={{ fontSize: 'var(--t-h1)' }}>
              {line1}
            </span>
            {line2 && (
              <>
                <br />
                <span className="csa-mega" style={{ fontSize: 'var(--t-h1)' }}>
                  {l2before}
                </span>
                {accentAt >= 0 && (
                  <span className="csa-gold-shimmer" style={{ fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif' }}>
                    <span className="csa-mega" style={{ fontSize: 'var(--t-h1)' }}>
                      {accent}
                    </span>
                  </span>
                )}
                {l2after && (
                  <span className="csa-mega" style={{ fontSize: 'var(--t-h1)' }}>
                    {l2after}
                  </span>
                )}
              </>
            )}
          </h1>
          {home.heroSubhead && (
            <p
              className="vhero__subhead vhero__reveal vhero__reveal--2"
              style={{ fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif', fontWeight: 600, fontSize: '23px' }}
            >
              {home.heroSubhead}
            </p>
          )}
          {subText && <p className="vhero__sub vhero__reveal vhero__reveal--2">{subText}</p>}
          <div className="vhero__cta vhero__reveal vhero__reveal--3">
            <Link className="btn btn--gold-pill btn--lg csa-glass" href="/book-a-consultation">
              {home.heroCtaPrimary || 'Book a Consultation'}
            </Link>
            <Link className="btn btn--link" href="/company/services">
              {home.heroCtaSecondary || 'Explore Our Services'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="vhero__selector">
          <Stage slides={slides} index={index} />
          <SelBar slides={slides} index={index} count={count} sys={sys} onDot={setIndex} onPrev={prev} onNext={next} />
        </div>

        <div className="vhero__mobbadge" aria-hidden="true">
          <csa-liquid-metal
            style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' }}
            ring=""
            thickness="2px"
            contour="0.92"
            repetition="3"
            tint="#EAF0F8"
            color-back="#46505F"
            data-no-lazy=""
          ></csa-liquid-metal>
          <span className="vhero__mobbadge-count">
            <b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
          </span>
          <span className="vhero__mobbadge-cat">{sys.cat}</span>
        </div>

        <div className="vhero__mobsel">
          <SelBar slides={slides} index={index} count={count} sys={sys} onDot={setIndex} onPrev={prev} onNext={next} />
        </div>
      </div>

      <div className="vhero__ticker" aria-hidden="true">
        <div className="csa-marquee">
          <div className="csa-marquee__track">
            {[...ticker, ...ticker].map((s, i) => (
              <span className="csa-marquee__item" key={i}>
                {s}
                <span className="dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
