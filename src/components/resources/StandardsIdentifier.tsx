'use client'

import { useEffect, useState } from 'react'

/**
 * Standards Identifier page (Resources/Standards Identifier.html). Phase 1
 * STATIC UI SHELL: the selector chips toggle visual selection state only — no
 * standards-mapping logic is wired, and the "Identify My Standards" action is
 * disabled. Hero, framework grid, how-it-works, and closing CTA are static
 * markup over CMS copy. Class names match resources.css (.res- / .si- prefixes).
 */

type Selector = { key: string; step: string; label: string; options: string[] }
type RoadmapItem = { code: string; meta: string; pill: string }
type Framework = { icon: string; t: string; codes: string[] }
type Step = { n: string; t: string; d: string }

export type StandardsIdentifierProps = {
  hero: {
    eyebrow: string
    eyebrowIcon: string
    ghost: string
    title: string
    sub1: string
    sub2: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  tool: {
    name: string
    sub: string
    badge: string
    selectors: Selector[]
    submitLabel: string
    submitNote: string
    resultLabel: string
    resultPreviewLabel: string
    roadmap: RoadmapItem[]
    veilText: string
  }
  frameworks: { eyebrow: string; title: string; lead: string; items: Framework[] }
  howItWorks: { eyebrow: string; title: string; steps: Step[] }
  closing: { eyebrow: string; title: string; sub: string; cta: { label: string; href: string } }
}

function ToolShell({ tool }: { tool: StandardsIdentifierProps['tool'] }) {
  // Visual selection state only — no standards-mapping logic is wired (Phase 1).
  const initial: Record<string, string> = {}
  tool.selectors.forEach((s) => { initial[s.key] = s.options[0] })
  const [sel, setSel] = useState<Record<string, string>>(initial)

  return (
    <div className="si-shell csa-glass">
      <div className="si-shell__bar">
        <div className="si-shell__id">
          <span className="si-shell__dot"><i data-lucide="scan-search"></i></span>
          <div>
            <div className="si-shell__name">{tool.name}</div>
            <div className="si-shell__sub">{tool.sub}</div>
          </div>
        </div>
        <span className="si-shell__badge"><span className="d"></span> {tool.badge}</span>
      </div>

      <div className="si-shell__body">
        <div className="si-form">
          {tool.selectors.map((f) => (
            <div className="si-field" key={f.key}>
              <p className="si-field__label"><span className="si-field__step">{f.step}</span> {f.label}</p>
              <div className="si-chips">
                {f.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={'si-chip' + (sel[f.key] === o ? ' is-active' : '')}
                    onClick={() => setSel((s) => ({ ...s, [f.key]: o }))}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="si-form__actions">
            <button type="button" className="btn btn--gold-solid btn--lg btn--block" disabled>
              {tool.submitLabel} <i data-lucide="arrow-right"></i>
            </button>
            <p className="si-form__note"><i data-lucide="info"></i> {tool.submitNote}</p>
          </div>
        </div>

        <div className="si-result">
          <div className="si-result__head">
            <span className="si-result__label">{tool.resultLabel}</span>
            <span className="si-result__preview">{tool.resultPreviewLabel}</span>
          </div>
          <div className="si-roadmap">
            {tool.roadmap.map((r) => (
              <div className="si-rm" key={r.code}>
                <div className="si-rm__l">
                  <span className="si-rm__ico"><i data-lucide="file-check"></i></span>
                  <div>
                    <div className="si-rm__code">{r.code}</div>
                    <div className="si-rm__meta">{r.meta}</div>
                  </div>
                </div>
                <span className="si-rm__pill">{r.pill}</span>
              </div>
            ))}
          </div>
          <div className="si-result__veil">
            <i data-lucide="sparkles"></i>
            <span>{tool.veilText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StandardsIdentifier({ hero, tool, frameworks, howItWorks, closing }: StandardsIdentifierProps) {
  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()
  })

  return (
    <main className="res">
      {/* ---------------------------------------------------------------- Hero */}
      <header className="res-hero res-hero--split" data-screen-label="Hero">
        <div className="res-hero__ghost" aria-hidden="true">{hero.ghost}</div>
        <div className="res-hero__inner">
          <div className="res-hero__copy">
            <p className="csa-eyebrow">
              <span className="res-hero__eyebrow-ico"><i data-lucide={hero.eyebrowIcon}></i></span>
              {hero.eyebrow}
            </p>
            <h1 className="csa-display res-hero__title">{hero.title}</h1>
            <p className="res-hero__sub">{hero.sub1}</p>
            <p className="res-hero__sub">{hero.sub2}</p>
            <div className="res-hero__cta">
              <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref}>{hero.primaryCtaLabel} <i data-lucide="arrow-down"></i></a>
              <a className="btn btn--link" href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i></a>
            </div>
          </div>
          <div id="tool">
            <ToolShell tool={tool} />
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- Frameworks */}
      <section className="res-sec res-band-top" data-screen-label="Primary Regulatory Frameworks">
        <div className="res-head res-reveal">
          <span className="csa-eyebrow">{frameworks.eyebrow}</span>
          <h2 className="csa-h2 res-head__title">{frameworks.title}</h2>
          <p className="csa-lead res-head__lead">{frameworks.lead}</p>
        </div>
        <div className="res-fw__grid res-reveal">
          {frameworks.items.map((f) => (
            <div className="res-fw" key={f.t}>
              <span className="res-fw__icon"><i data-lucide={f.icon}></i></span>
              <div>
                <h3 className="res-fw__t">{f.t}</h3>
                <div className="res-fw__codes">
                  {f.codes.map((c) => <span className="res-fw__code" key={c}>{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- How it works */}
      <section className="res-sec--alt res-band-top" data-screen-label="How the AI Standards Identifier Works">
        <div className="res-sec res-sec__inner">
          <div className="res-head res-reveal">
            <span className="csa-eyebrow">{howItWorks.eyebrow}</span>
            <h2 className="csa-h2 res-head__title">{howItWorks.title}</h2>
          </div>
          <div className="res-steps__grid res-reveal">
            {howItWorks.steps.map((s) => (
              <div className="res-step" key={s.n}>
                <div className="res-step__n">{s.n}</div>
                <h3 className="res-step__t">{s.t}</h3>
                <p className="res-step__d">{s.d}</p>
              </div>
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
          <a className="btn btn--gold-pill btn--lg" href={closing.cta.href}>{closing.cta.label} <i data-lucide="arrow-up"></i></a>
        </div>
      </section>
    </main>
  )
}
