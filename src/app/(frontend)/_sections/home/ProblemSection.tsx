'use client'

import { useEffect, useRef, useState } from 'react'
import { lexicalToParagraphs } from '@/lib/lexical'
import type { HomeDoc, Solution } from './types'

/**
 * ProblemSection — faithful port of design-reference/project/assets/problem.jsx.
 * Editorial copy (eyebrow, title, lead, solve label, the 4 solution principles)
 * comes from the `home` record; the per-solution icon + id are design constants
 * zipped to the CMS solutions by order.
 */

// Per-solution icon + id, in the same order as the seeded pbSolutions.
const SOLUTION_META: { id: string; icon: string }[] = [
  { id: 'embedded', icon: 'git-merge' },
  { id: 'principal', icon: 'user-check' },
  { id: 'ai', icon: 'cpu' },
  { id: 'objectivity', icon: 'scale' },
]

type GlowOpts = {
  bleed?: number
  bloom?: number
  intensity?: number
  softness?: number
  smoke?: number
  smokeSize?: number
}

type GlowEl = HTMLElement & {
  __glow?: boolean
  __glowNode?: (HTMLElement & { setAttribute: (n: string, v: string) => void }) | null
}

declare global {
  interface Window {
    CSAShaders?: { wireGlow?: (el: Element | null) => void }
  }
}

export function ProblemSection({ home }: { home: HomeDoc }) {
  const cmsSolutions = home.pbSolutions ?? []
  const SOLUTIONS = cmsSolutions.map((s: Solution, i) => ({
    id: SOLUTION_META[i]?.id ?? 'sol-' + i,
    icon: SOLUTION_META[i]?.icon ?? 'circle',
    title: s.title,
    desc: s.desc ?? '',
  }))

  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const count = SOLUTIONS.length
  const itemRefs = useRef<(GlowEl | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Track mobile so hover affordances can be replaced by an auto-cycle.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const on = () => setIsMobile(mq.matches)
    on()
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on)
    }
  }, [])

  // Auto-advance through the principles; pauses while the visitor is engaging.
  // On mobile we step every 5s (the cycle replaces hover).
  useEffect(() => {
    const id = setInterval(
      () => {
        if (!paused.current) setActive((a) => (a + 1) % count)
      },
      isMobile ? 5000 : 6000,
    )
    return () => clearInterval(id)
  }, [active, count, isMobile])

  const sol = SOLUTIONS[active]

  // Neon pulsing-border glow: mounted on an element ONLY while it is hovered
  // (a hover affordance) so it never holds a WebGL context at rest. The shader
  // is injected as an absolutely-positioned sibling behind the element;
  // ancestors are kept overflow:visible (see problem.css) so the bloom is
  // never cropped.
  //
  // The pulsing-border BLOOM is normalised to the glow canvas, so the ring's
  // RELATIVE inset — bleed / (size + 2·bleed) — decides whether the soft glow
  // fits before the canvas edge hard-cuts it. Small rail items get a large
  // relative inset at bleed 30; the wide detail card does not, so it takes a
  // larger bleed AND a tightened bloom to stay fully contained.
  // The pulsing-border's soft glow = bloom (outward halo) + smoke (atmospheric
  // wisps) + softness (edge feather). That spread must fade to ZERO before the
  // canvas edge or it gets hard-cut there (the "crop"). Two levers keep it
  // contained without killing the effect: a smaller 'smoke-size' (tighter
  // falloff) and a big enough 'bleed' (canvas room around the element). The
  // wide detail card needs a large bleed (90px); the small rail items fade out
  // within the default 30px. Verified by reading canvas pixels — 0% luminance
  // at every edge for both, with a full soft glow still present.
  const addGlow = (el: GlowEl | null, opts?: GlowOpts) => {
    if (!el || el.__glow) return
    opts = opts || {}
    el.setAttribute('data-glow', '')
    el.setAttribute('data-glow-bleed', String(opts.bleed || 30))
    if (window.CSAShaders && window.CSAShaders.wireGlow) window.CSAShaders.wireGlow(el.parentElement)
    const g = el.__glowNode
    if (g) {
      if (opts.bloom != null) g.setAttribute('bloom', String(opts.bloom))
      if (opts.intensity != null) g.setAttribute('intensity', String(opts.intensity))
      if (opts.softness != null) g.setAttribute('softness', String(opts.softness))
      if (opts.smoke != null) g.setAttribute('smoke', String(opts.smoke))
      if (opts.smokeSize != null) g.setAttribute('smoke-size', String(opts.smokeSize))
    }
  }
  const removeGlow = (el: GlowEl | null) => {
    if (!el) return
    if (el.__glowNode && el.__glowNode.parentElement) el.__glowNode.remove()
    el.__glow = false
    el.__glowNode = null
    el.removeAttribute('data-glow')
  }

  // The detail card mirrors the hover affordance: while any solution item is
  // hovered, the card lights with the same neon pulse glow (its silver hairline
  // dropped); at rest it shows the silver hairline. The glow rides a STABLE
  // wrapper so switching items (which remounts the inner card for its entrance
  // animation) never tears down and rebuilds the WebGL context.
  const panelWrapRef = useRef<HTMLDivElement | null>(null)

  // Override the glow's (uniform) bleed with an ASYMMETRIC one: the right side
  // extends exactly to the viewport's right edge (so the glow fades to zero
  // right at the window edge — maximal spread, no hard cut), the left gets a
  // generous fixed bleed (clear of the rail), and top/bottom get enough px to
  // fully contain the vertical bloom. Re-applied on resize.
  const sizeCardGlow = (el: GlowEl | null) => {
    const g = el && el.__glowNode
    if (!g || !el) return
    const rect = el.getBoundingClientRect()
    // Generous, FIXED bleeds so the bloom always fully fades inside the canvas
    // (never cropped) regardless of viewport. Right extends AT LEAST 140px and
    // to the viewport edge if there's more room — if that pushes the canvas
    // past the window, only the already-faded tail is clipped by the window,
    // never the visible glow. Top/bottom get 150px. Larger to the right, up,
    // and down — which is the canvas that actually carries the glow.
    const bleedRight = Math.max(140, Math.round(window.innerWidth - rect.right))
    const bleedLeft = 110
    const bleedV = 150
    const cw = el.offsetWidth + bleedLeft + bleedRight
    const ch = el.offsetHeight + bleedV * 2
    g.style.left = el.offsetLeft - bleedLeft + 'px'
    g.style.top = el.offsetTop - bleedV + 'px'
    g.style.width = cw + 'px'
    g.style.height = ch + 'px'
    g.setAttribute('margin-left', (bleedLeft / cw).toFixed(4))
    g.setAttribute('margin-right', (bleedRight / cw).toFixed(4))
    g.setAttribute('margin-top', (bleedV / ch).toFixed(4))
    g.setAttribute('margin-bottom', (bleedV / ch).toFixed(4))
    const rPx = 8 // --r-xl
    g.setAttribute(
      'roundness',
      Math.max(0, Math.min(1, (2 * rPx) / Math.min(el.offsetWidth, el.offsetHeight))).toFixed(3),
    )
  }

  // The detail card glows PERMANENTLY (not just on hover): mount the neon
  // pulse glow on render and keep it. It rides the STABLE wrapper so switching
  // solutions (which remounts the inner card for its entrance animation) never
  // tears down / rebuilds the WebGL context. data-glow stays set, so the
  // card's silver hairline stays dropped in favour of the glowing edge.
  useEffect(() => {
    const el = panelWrapRef.current as GlowEl | null
    if (!el) return
    let ro: ResizeObserver | null = null
    let pollId: ReturnType<typeof setInterval> | null = null
    const apply = () => sizeCardGlow(el)
    const applyNextFrame = () => requestAnimationFrame(apply)

    // Idempotent: ensure the glow node exists (CSAShaders may load AFTER mount,
    // and its own wireGlow may mount the node first), set our shader params on
    // it, and wire the asymmetric re-size. wireGlow installs its OWN uniform
    // ResizeObserver that we must out-run, so re-assert sizeCardGlow on the
    // next frame after every resize.
    const ensure = (): boolean => {
      el.setAttribute('data-glow', '')
      el.setAttribute('data-glow-bleed', '90')
      if (window.CSAShaders && window.CSAShaders.wireGlow)
        window.CSAShaders.wireGlow(el.parentElement)
      const g = el.__glowNode
      if (!g) return false
      g.setAttribute('bloom', '0.3')
      g.setAttribute('softness', '0.9')
      g.setAttribute('smoke', '0.4')
      g.setAttribute('smoke-size', '0.35')
      applyNextFrame()
      try {
        ro = new ResizeObserver(applyNextFrame)
        ro.observe(el)
      } catch {
        /* noop */
      }
      return true
    }

    if (!ensure())
      pollId = setInterval(() => {
        if (ensure()) {
          if (pollId) clearInterval(pollId)
          pollId = null
        }
      }, 120)
    window.addEventListener('resize', applyNextFrame)
    return () => {
      window.removeEventListener('resize', applyNextFrame)
      if (ro) ro.disconnect()
      if (pollId) clearInterval(pollId)
      removeGlow(el)
    }
  }, [])

  // Mobile: replace hover with an auto-cycle — the active item lights with the
  // same neon pulse glow it gets on hover, stepped by the 5s auto-advance.
  useEffect(() => {
    if (!isMobile) return
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === active) addGlow(el, { bloom: 0.6, softness: 0.9, smoke: 0.4, smokeSize: 0.35 })
      else removeGlow(el)
    })
  }, [active, isMobile])

  // Clear any cycle glow when leaving mobile (so desktop hover stays in charge).
  useEffect(() => {
    if (isMobile) return
    itemRefs.current.forEach((el) => removeGlow(el))
  }, [isMobile])

  if (!sol) return null

  return (
    <section
      className="pb"
      data-screen-label="Problem"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      <div className="pb__haze" />

      <div className="pb__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {home.pbEyebrow}
        </p>
        <h2 className="csa-h2 pb__title" data-reveal="up" data-reveal-delay="80">
          {home.pbHeading}
        </h2>
        {lexicalToParagraphs(home.pbLead).map((p, i) => (
          <p key={i} className="csa-lead pb__lead" data-reveal="up" data-reveal-delay="160">
            {p}
          </p>
        ))}
      </div>

      <div className="pb__solve" data-reveal="up" data-reveal-delay="120">
        <div className="pb__solve-label">
          <span className="pb__solve-tick" />
          {home.pbSolveLabel}
        </div>

        <div className="pb__explorer">
          <div className="pb__rail" role="tablist" aria-label={home.pbSolveLabel}>
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  itemRefs.current[i] = el as GlowEl | null
                }}
                className={'pb__item' + (i === active ? ' is-on' : '')}
                onClick={() => setActive(i)}
                onMouseEnter={
                  isMobile
                    ? undefined
                    : (e) => {
                        setActive(i)
                        addGlow(e.currentTarget as GlowEl, {
                          bloom: 0.6,
                          softness: 0.9,
                          smoke: 0.4,
                          smokeSize: 0.35,
                        })
                      }
                }
                onMouseLeave={isMobile ? undefined : (e) => removeGlow(e.currentTarget as GlowEl)}
                role="tab"
                aria-selected={i === active}
              >
                <span className="pb__item-num csa-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="pb__item-title">{s.title}</span>
                <i data-lucide="chevron-right" className="pb__item-arrow"></i>
              </button>
            ))}
          </div>

          <div className="pb__panelwrap" ref={panelWrapRef}>
            <div className="pb__panel" key={active}>
              <span className="pb__panel-ghost" aria-hidden="true">
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="pb__panel-inner pb-anim">
                <div className="pb__icon">
                  <i data-lucide={sol.icon}></i>
                </div>
                <p className="pb__panel-tag csa-mono">
                  Principle {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </p>
                <h3 className="pb__panel-title">{sol.title}</h3>
                <p className="pb__panel-desc">{sol.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
