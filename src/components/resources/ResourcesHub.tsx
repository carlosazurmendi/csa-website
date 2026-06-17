'use client'

import { useEffect } from 'react'

/**
 * Resources hub (Resources/Overview.html) — hero, AI-tools tilt grid,
 * knowledge-library grid, closing CTA. The tool cards carry the cursor-driven
 * 3D tilt from the design; everything else is static markup over CMS copy.
 * Class names match resources.css (.res- prefixes).
 */

type ToolCard = { icon: string; tag: string; title: string; description: string; href: string }
type LibCard = { icon: string; title: string; description: string; href: string }
type JumpLink = { icon: string; label: string; href: string }

export type ResourcesHubProps = {
  hero: { eyebrow: string; eyebrowIcon: string; ghost: string; title: string; sub: string; jump: JumpLink[] }
  tools: { eyebrow: string; title: string; lead: string; items: ToolCard[] }
  library: { eyebrow: string; title: string; lead: string; items: LibCard[] }
  closing: { eyebrow: string; title: string; sub: string; cta: { label: string; href: string } }
}

// Cursor-following 3D tilt + specular highlight, driven directly (the shared
// csaTiltCards() helper early-returns under prefers-reduced-motion; these
// inline handlers always attach and the underlying transform CSS is not
// motion-gated, so the tilt always renders).
const MAX = 8 // degrees
function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
  const c = e.currentTarget
  const r = c.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  c.style.setProperty('--rx', ((px - 0.5) * 2 * MAX).toFixed(2) + 'deg')
  c.style.setProperty('--ry', (-(py - 0.5) * 2 * MAX).toFixed(2) + 'deg')
  c.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
  c.style.setProperty('--my', (py * 100).toFixed(1) + '%')
}
function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  const c = e.currentTarget
  c.style.setProperty('--rx', '0deg')
  c.style.setProperty('--ry', '0deg')
}

export function ResourcesHub({ hero, tools, library, closing }: ResourcesHubProps) {
  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()
  })

  return (
    <main className="res">
      {/* ---------------------------------------------------------------- Hero */}
      <header className="res-hero res-hero--hub" data-screen-label="Hero">
        <div className="res-hero__ghost" aria-hidden="true">{hero.ghost}</div>
        <div className="res-hero__inner">
          <p className="csa-eyebrow">
            <span className="res-hero__eyebrow-ico"><i data-lucide={hero.eyebrowIcon}></i></span>
            {hero.eyebrow}
          </p>
          <h1 className="csa-display res-hero__title">{hero.title}</h1>
          <p className="csa-lead res-hero__sub">{hero.sub}</p>
          <div className="res-hero__jump">
            {hero.jump.map((j) => (
              <a className="res-jump" href={j.href} key={j.label}><i data-lucide={j.icon}></i> {j.label}</a>
            ))}
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------- Tools */}
      <section className="res-sec res-band-top" id="tools" data-screen-label="AI Tools">
        <div className="res-head res-reveal">
          <span className="csa-eyebrow">{tools.eyebrow}</span>
          <h2 className="csa-h2 res-head__title">{tools.title}</h2>
          <p className="csa-lead res-head__lead">{tools.lead}</p>
        </div>
        <div className="res-tools__grid res-reveal csa-tilt-scene">
          {tools.items.map((t) => (
            <a className="res-tool csa-glass csa-tilt" key={t.title} href={t.href} onMouseMove={onMove} onMouseLeave={onLeave}>
              <div className="res-tool__top">
                <span className="res-tool__icon"><i data-lucide={t.icon}></i></span>
                <span className="res-tool__tag"><span className="d"></span> {t.tag}</span>
              </div>
              <h3 className="res-tool__title">{t.title}</h3>
              <p className="res-tool__d">{t.description}</p>
              <span className="res-tool__foot">Open the tool <i data-lucide="arrow-right"></i></span>
            </a>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- Library */}
      <section className="res-sec--alt res-band-top" id="library" data-screen-label="Knowledge Library">
        <div className="res-sec res-sec__inner">
          <div className="res-head res-reveal">
            <span className="csa-eyebrow">{library.eyebrow}</span>
            <h2 className="csa-h2 res-head__title">{library.title}</h2>
            <p className="csa-lead res-head__lead">{library.lead}</p>
          </div>
          <div className="res-lib__grid res-reveal">
            {library.items.map((l) => (
              <a className="res-lib" key={l.title} href={l.href}>
                <div className="res-lib__top">
                  <span className="res-lib__icon"><i data-lucide={l.icon}></i></span>
                  <span className="res-lib__arrow"><i data-lucide="arrow-up-right"></i></span>
                </div>
                <h3 className="res-lib__t">{l.title}</h3>
                <p className="res-lib__d">{l.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Closing */}
      <section className="res-close" data-screen-label="Closing CTA">
        <div className="res-close__haze" aria-hidden="true"></div>
        <div className="res-close__inner">
          <span className="csa-eyebrow">{closing.eyebrow}</span>
          <h2 className="csa-display res-close__title">{closing.title}</h2>
          <p className="csa-lead res-close__sub">{closing.sub}</p>
          <a className="btn btn--gold-pill btn--lg" href={closing.cta.href}>{closing.cta.label} <i data-lucide="arrow-right"></i></a>
        </div>
      </section>
    </main>
  )
}
