'use client'

import { useEffect } from 'react'

/**
 * Safety Chat page (Resources/Safety Chat.html). Phase 1 STATIC UI SHELL: the
 * composer is inert (no live model), a sample thread renders, and a sign-in
 * lock overlays the composer. Hero + closing CTA are static markup over CMS
 * copy. Class names match resources.css (.res- / .sc- prefixes).
 */

type ThreadMsg = { who: 'bot' | 'user'; text: string }

export type SafetyChatProps = {
  hero: {
    eyebrow: string
    eyebrowIcon: string
    ghost: string
    title: string
    sub: string
    note: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  panel: {
    name: string
    status: string
    tag: string
    thread: ThreadMsg[]
    suggestions: string[]
    placeholder: string
    lockText: string
    lockCtaLabel: string
    lockCtaHref: string
  }
  closing: { eyebrow: string; title: string; sub: string; cta: { label: string; href: string } }
}

function ChatPanel({ panel }: { panel: SafetyChatProps['panel'] }) {
  return (
    <div className="sc-panel csa-glass">
      <div className="sc-panel__bar">
        <div className="sc-panel__id">
          <span className="sc-panel__avatar"><i data-lucide="shield-check"></i></span>
          <div>
            <div className="sc-panel__name">{panel.name}</div>
            <div className="sc-panel__status"><span className="d"></span> {panel.status}</div>
          </div>
        </div>
        <span className="sc-panel__tag">{panel.tag}</span>
      </div>

      <div className="sc-thread">
        {panel.thread.map((m, i) => (
          <div className={'sc-msg sc-msg--' + m.who} key={i}>
            <span className="sc-msg__ava"><i data-lucide={m.who === 'bot' ? 'shield-check' : 'user'}></i></span>
            <div className="sc-msg__bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="sc-suggest">
        {panel.suggestions.map((s) => <span className="sc-suggest__chip" key={s}>{s}</span>)}
      </div>

      <div className="sc-compose">
        <div className="sc-compose__row">
          <span className="sc-compose__ph">{panel.placeholder}</span>
          <span className="sc-compose__send" data-glow data-glow-bleed="15"><i data-lucide="arrow-up"></i></span>
        </div>
      </div>
      <div className="sc-lock">
        <span className="sc-lock__ico"><i data-lucide="lock"></i></span>
        <p className="sc-lock__t">{panel.lockText}</p>
        <a className="btn btn--gold-pill" href={panel.lockCtaHref}>{panel.lockCtaLabel} <i data-lucide="arrow-right"></i></a>
      </div>
    </div>
  )
}

export function SafetyChat({ hero, panel, closing }: SafetyChatProps) {
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
            <p className="res-hero__sub">{hero.sub}</p>
            <div className="res-hero__note">
              <i data-lucide="info"></i>
              <span>{hero.note}</span>
            </div>
            <div className="res-hero__cta">
              <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref}>{hero.primaryCtaLabel} <i data-lucide="arrow-right"></i></a>
              <a className="btn btn--link" href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i></a>
            </div>
          </div>
          <ChatPanel panel={panel} />
        </div>
      </header>

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
