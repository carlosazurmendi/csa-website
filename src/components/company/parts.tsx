import React from 'react'

/**
 * Shared presentational primitives for the four Company pages, ported verbatim
 * from the design's assets/company.jsx (the Hero + Closing components and their
 * class-names). These are pure/server-renderable — icons (`<i data-lucide>`)
 * and scroll-reveal (`data-reveal`) are wired by the global runtime
 * (CsaScripts → lucide + interactions.js). No client JS needed here.
 */

export type HudRow = { icon?: string | null; t: string; d?: string | null }
export type Hud = {
  tag?: string | null
  badge?: string | null
  foot?: string | null
  rows: HudRow[]
}

export type HeroProps = {
  ghost?: string | null
  icon?: string | null
  eyebrow?: string | null
  title?: string | null
  tagline?: string | null
  intro?: string | null
  standards?: string[]
  actions?: React.ReactNode
  hud: Hud
}

export function Hero({ ghost, icon, eyebrow, title, tagline, intro, standards, actions, hud }: HeroProps) {
  return (
    <header className="ip-hero" data-screen-label="Hero">
      <div className="ip-hero__ghost" aria-hidden="true">
        {ghost}
      </div>
      <div className="ip-hero__inner">
        <div className="ip-hero__copy">
          <p className="csa-eyebrow ip-hero__eyebrow">
            {icon && (
              <span className="ip-hero__ico">
                <i data-lucide={icon}></i>
              </span>
            )}
            {eyebrow}
          </p>
          <h1 className="csa-display ip-hero__title">{title}</h1>
          <p className="csa-lead ip-hero__tagline">{tagline}</p>
          {intro && <p className="ip-hero__intro">{intro}</p>}
          <div className="ip-hero__cta co-actions">{actions}</div>
          {standards && standards.length > 0 && (
            <div className="ip-hero__standards">
              <span className="ip-hero__tick"></span>
              <div className="ip-hero__std-list csa-mono">
                {standards.map((s, i) => (
                  <React.Fragment key={s}>
                    <span>{s}</span>
                    {i < standards.length - 1 && <span className="dot">&middot;</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className="ip-hud csa-glass">
          <div className="ip-hud__top">
            <span className="ip-hud__tag">{hud.tag}</span>
            <span className="ip-hud__badge">
              <span className="d"></span> {hud.badge}
            </span>
          </div>
          <div className="ip-scope">
            {hud.rows.map((r) => (
              <div className="ip-scope__row" key={r.t}>
                <span className="ip-scope__mark">
                  <i data-lucide={r.icon || 'check'}></i>
                </span>
                <div>
                  <p className="ip-scope__t">{r.t}</p>
                  {r.d && <p className="co-scope__d">{r.d}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="ip-hud__foot">
            Principal-led<span className="sep">&middot;</span>
            {hud.foot}
          </p>
        </aside>
      </div>
    </header>
  )
}

export type ClosingProps = {
  eyebrow?: string | null
  title?: string | null
  sub?: string | null
  actions?: React.ReactNode
}

export function Closing({ eyebrow, title, sub, actions }: ClosingProps) {
  return (
    <section className="ip-close" data-screen-label="Closing CTA">
      <div className="ip-close__haze" aria-hidden="true"></div>
      <div className="ip-close__inner">
        <span className="csa-eyebrow">{eyebrow}</span>
        <h2 className="csa-display ip-close__title">{title}</h2>
        {sub && <p className="csa-lead ip-close__sub">{sub}</p>}
        <div className="ip-hero__cta co-actions" style={{ justifyContent: 'center' }}>
          {actions}
        </div>
      </div>
    </section>
  )
}
