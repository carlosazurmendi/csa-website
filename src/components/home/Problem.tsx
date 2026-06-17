'use client'

/* ============================================================
   CSA — Problem / Solution section component (shared)
   Requires assets/problem.css.
   ============================================================ */
import { useState, useEffect, useRef } from 'react'

export type ProblemSolution = { icon: string; title: string; description: string }
export type ProblemProps = {
  eyebrow?: string | null
  title?: string | null
  lead?: string | null
  solutionLabel?: string | null
  solutions: ProblemSolution[]
}

export function Problem(props: ProblemProps) {
  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const count = props.solutions.length

  // Auto-advance through the principles; pauses while the visitor is engaging.
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % count)
    }, 6000)
    return () => clearInterval(id)
  }, [active, count])

  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
  })

  const sol = props.solutions[active]

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
  const addGlow = (el: any, opts: any) => {
    if (!el || el.__glow) return
    opts = opts || {}
    el.setAttribute('data-glow', '')
    el.setAttribute('data-glow-bleed', String(opts.bleed || 30))
    if ((window as any).CSAShaders && (window as any).CSAShaders.wireGlow) (window as any).CSAShaders.wireGlow(el.parentElement)
    const g = el.__glowNode
    if (g) {
      if (opts.bloom != null) g.setAttribute('bloom', String(opts.bloom))
      if (opts.intensity != null) g.setAttribute('intensity', String(opts.intensity))
      if (opts.softness != null) g.setAttribute('softness', String(opts.softness))
      if (opts.smoke != null) g.setAttribute('smoke', String(opts.smoke))
      if (opts.smokeSize != null) g.setAttribute('smoke-size', String(opts.smokeSize))
    }
  }
  const removeGlow = (el: any) => {
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
  const [railHot, setRailHot] = useState(false)
  const panelWrapRef = useRef<HTMLDivElement>(null)

  // Override the glow's (uniform) bleed with an ASYMMETRIC one: the right side
  // extends exactly to the viewport's right edge (so the glow fades to zero
  // right at the window edge — maximal spread, no hard cut), the left gets a
  // generous fixed bleed (clear of the rail), and top/bottom get enough px to
  // fully contain the vertical bloom. Re-applied on resize.
  const sizeCardGlow = (el: any) => {
    const g = el && el.__glowNode
    if (!g) return
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
    g.style.left = (el.offsetLeft - bleedLeft) + 'px'
    g.style.top = (el.offsetTop - bleedV) + 'px'
    g.style.width = cw + 'px'
    g.style.height = ch + 'px'
    g.setAttribute('margin-left', (bleedLeft / cw).toFixed(4))
    g.setAttribute('margin-right', (bleedRight / cw).toFixed(4))
    g.setAttribute('margin-top', (bleedV / ch).toFixed(4))
    g.setAttribute('margin-bottom', (bleedV / ch).toFixed(4))
    const rPx = 8 // --r-xl
    g.setAttribute('roundness', Math.max(0, Math.min(1, (2 * rPx) / Math.min(el.offsetWidth, el.offsetHeight))).toFixed(3))
  }

  // The detail card glows PERMANENTLY (not just on hover): mount the neon
  // pulse glow on render and keep it. It rides the STABLE wrapper so switching
  // solutions (which remounts the inner card for its entrance animation) never
  // tears down / rebuilds the WebGL context. data-glow stays set, so the
  // card's silver hairline stays dropped in favour of the glowing edge.
  useEffect(() => {
    const el = panelWrapRef.current as any
    if (!el) return
    let ro: any = null, pollId: any = null
    const apply = () => sizeCardGlow(el)
    const applyNextFrame = () => requestAnimationFrame(apply)

    // Idempotent: ensure the glow node exists (CSAShaders may load AFTER mount,
    // and its own wireGlow may mount the node first), set our shader params on
    // it, and wire the asymmetric re-size. wireGlow installs its OWN uniform
    // ResizeObserver that we must out-run, so re-assert sizeCardGlow on the
    // next frame after every resize.
    const ensure = () => {
      el.setAttribute('data-glow', '')
      el.setAttribute('data-glow-bleed', '90')
      if ((window as any).CSAShaders && (window as any).CSAShaders.wireGlow) (window as any).CSAShaders.wireGlow(el.parentElement)
      const g = el.__glowNode
      if (!g) return false
      g.setAttribute('bloom', '0.3')
      g.setAttribute('softness', '0.9')
      g.setAttribute('smoke', '0.4')
      g.setAttribute('smoke-size', '0.35')
      applyNextFrame()
      try { ro = new ResizeObserver(applyNextFrame); ro.observe(el) } catch (e) {}
      return true
    }

    if (!ensure()) pollId = setInterval(() => { if (ensure()) { clearInterval(pollId); pollId = null } }, 120)
    window.addEventListener('resize', applyNextFrame)
    return () => {
      window.removeEventListener('resize', applyNextFrame)
      if (ro) ro.disconnect()
      if (pollId) clearInterval(pollId)
      removeGlow(el)
    }
  }, [])

  return (
    <section
      className="pb"
      data-screen-label="Problem"
      onMouseEnter={() => {paused.current = true;}}
      onMouseLeave={() => {paused.current = false;}}>

    <div className="pb__haze" />

    <div className="pb__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{props.eyebrow}</p>
      <h2 className="csa-h2 pb__title" data-reveal="up" data-reveal-delay="80">{props.title}</h2>
      <p className="csa-lead pb__lead" data-reveal="up" data-reveal-delay="160">{props.lead}</p>
    </div>

    <div className="pb__solve" data-reveal="up" data-reveal-delay="120" data-comment-anchor="6b5f2287ec-div-69-7">
      <div className="pb__solve-label"><span className="pb__solve-tick" />{props.solutionLabel}</div>

      <div className="pb__explorer">
        <div
          className="pb__rail"
          role="tablist"
          aria-label="The CSA solution"
          onMouseEnter={() => setRailHot(true)}
          onMouseLeave={() => setRailHot(false)}>
          {props.solutions.map((s, i) =>
            <button
              key={i}
              className={'pb__item' + (i === active ? ' is-on' : '')}
              onClick={() => setActive(i)}
              onMouseEnter={(e: any) => { setActive(i); addGlow(e.currentTarget, { bloom: 0.6, softness: 0.9, smoke: 0.4, smokeSize: 0.35 }); }}
              onMouseLeave={(e: any) => removeGlow(e.currentTarget)}
              role="tab"
              aria-selected={i === active}>

              <span className="pb__item-num csa-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="pb__item-title">{s.title}</span>
              <i data-lucide="chevron-right" className="pb__item-arrow"></i>
            </button>
            )}
        </div>

        <div
          className="pb__panelwrap"
          ref={panelWrapRef}
          onMouseEnter={() => setRailHot(true)}
          onMouseLeave={() => setRailHot(false)}>
          <div className="pb__panel" key={active} data-comment-anchor="6527d2ca1c-div-90-11">
            <span className="pb__panel-ghost" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
            <div className="pb__panel-inner pb-anim">
              <div className="pb__icon"><i data-lucide={sol.icon}></i></div>
              <p className="pb__panel-tag csa-mono">Principle {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</p>
              <h3 className="pb__panel-title">{sol.title}</h3>
              <p className="pb__panel-desc">{sol.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>)

}
