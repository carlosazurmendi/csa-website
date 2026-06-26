'use client'

import { useEffect, useState } from 'react'
import { lexicalToParagraphs } from '@/lib/lexical'
import type { HomeDoc, SaRow as SaRowType } from './types'

/**
 * StandingApartSection — faithful port of
 * design-reference/project/assets/standing-apart.jsx.
 * Editorial copy (eyebrow, heading, lead, mandate, column heads, rows, the
 * "never rely on AI" labels) comes from the `home` record; the per-cell icon
 * names, the fixed never-AI icon set, and the row/cell hover-driven silver/gold
 * liquid-metal rings are design constants kept inline.
 */

// Cycle an active index through `count` items every `interval`ms on mobile
// (<=900px); returns -1 on desktop so hover stays in charge.
function useMobileCycle(count: number, interval?: number): number {
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    let t: ReturnType<typeof setInterval> | null = null
    let i = 0
    const stop = () => {
      if (t) {
        clearInterval(t)
        t = null
      }
    }
    const apply = () => {
      stop()
      if (mq.matches && count > 0) {
        i = 0
        setIdx(0)
        t = setInterval(() => {
          i = (i + 1) % count
          setIdx(i)
        }, interval || 5000)
      } else setIdx(-1)
    }
    apply()
    const on = () => apply()
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on)
    return () => {
      stop()
      mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on)
    }
  }, [count, interval])
  return idx
}

function useIsMobile(): boolean {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on)
    }
  }, [])
  return m
}

// A "How we work" comparison cell. Frosted-glass face with a SILVER FOIL
// hairline (.csa-glass::before) at rest. When its ROW is hovered (`active`),
// the whole row brightens and mounts a live SILVER liquid-metal ring on each
// cell (same pattern as the Services accordion).
function SaCell({
  kind,
  icon,
  t,
  d,
  active,
}: {
  kind: 'old' | 'new'
  icon: string
  t: string
  d: string
  active: boolean
}) {
  return (
    <div className={'sa-cell ' + kind + ' csa-glass'}>
      {active && (
        <csa-liquid-metal
          ring=""
          thickness="2px"
          contour="0.92"
          repetition="3"
          tint="#EAF0F8"
          color-back="#46505F"
          data-no-lazy=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' }}
        ></csa-liquid-metal>
      )}
      <span className="sa-cell__mark">
        <i data-lucide={icon}></i>
      </span>
      <div>
        <p className="sa-cell__t">{t}</p>
        <p className="sa-cell__d">{d}</p>
      </div>
    </div>
  )
}

type Row = {
  theme: string
  old: { t: string; d: string }
  neu: { t: string; d: string }
}

// A full comparison row. Hover anywhere in the row → highlight EVERYTHING in
// it (old card, connector arrow, new card) and mount the silver ring on both
// cards together — not just the cell under the cursor.
function SaRow({
  r,
  i,
  mActive,
  isMobile,
}: {
  r: Row
  i: number
  mActive: boolean
  isMobile: boolean
}) {
  const [hover, setHover] = useState(false)
  const active = isMobile ? mActive : hover
  return (
    <div
      className="sa-row"
      data-mactive={mActive ? '' : undefined}
      data-reveal="up"
      data-reveal-delay={String(i * 90)}
      onMouseEnter={isMobile ? undefined : () => setHover(true)}
      onMouseLeave={isMobile ? undefined : () => setHover(false)}
    >
      <SaCell kind="old" icon="x" t={r.old.t} d={r.old.d} active={active} />
      <div className="sa-mid">
        <span className="sa-mid__label">{r.theme}</span>
        <span className="sa-mid__arrow">
          <i data-lucide="arrow-right"></i>
        </span>
      </div>
      <SaCell kind="new" icon="check" t={r.neu.t} d={r.neu.d} active={active} />
    </div>
  )
}

// Fixed icon set for the "Where we never rely on AI" badges (design-only).
const NEVER_AI_ICONS = ['user-round-check', 'stamp', 'shield-check']

// "Where we never rely on AI" chip. Keeps its live SILVER liquid-metal edge
// at rest (data-metal="silver", lazily managed by csa-shaders.js). On hover we
// mount a GOLD liquid-metal ring on top (masked to the border band, so it only
// repaints the hairline gold — never covers the icon/text) and tear it down on
// leave, so the metal reads silver → gold ONLY while hovered.
function SaBadge({
  icon,
  t,
  mActive,
  isMobile,
}: {
  icon: string
  t: string
  mActive: boolean
  isMobile: boolean
}) {
  const [hover, setHover] = useState(false)
  const showGold = isMobile ? mActive : hover
  return (
    <div
      className="sa-badge csa-glass"
      data-metal="silver"
      data-mactive={mActive ? '' : undefined}
      onMouseEnter={isMobile ? undefined : () => setHover(true)}
      onMouseLeave={isMobile ? undefined : () => setHover(false)}
    >
      {showGold && (
        <csa-liquid-metal
          ring=""
          thickness="2px"
          contour="0.92"
          repetition="3"
          tint="#F4D585"
          color-back="#7A5E2A"
          distortion="0.15"
          data-no-lazy=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 1, pointerEvents: 'none' }}
        ></csa-liquid-metal>
      )}
      <span className="sa-badge__icon">
        <i data-lucide={icon}></i>
      </span>
      <span className="sa-badge__t">{t}</span>
    </div>
  )
}

export function StandingApartSection({ home }: { home: HomeDoc }) {
  const rows: Row[] = (home.saRows ?? []).map((r: SaRowType) => ({
    theme: r.theme,
    old: { t: r.oldTitle ?? '', d: r.oldDesc ?? '' },
    neu: { t: r.newTitle ?? '', d: r.newDesc ?? '' },
  }))
  const neverItems = home.saNeverItems ?? []
  const leadParas = lexicalToParagraphs(home.saLead)

  const isMobile = useIsMobile()
  const rowCyc = useMobileCycle(rows.length)
  const badgeCyc = useMobileCycle(neverItems.length)

  return (
    <section className="sa" id="how-we-work" data-screen-label="Standing Apart">
      <div className="sa__haze" />
      <csa-grain
        className="rv-grain"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        intensity="0.22"
        speed="0.4"
      ></csa-grain>

      <div className="sa__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {home.saEyebrow}
        </p>
        <h2 className="csa-h2 sa__title" data-reveal="up" data-reveal-delay="80">
          {home.saHeading}
        </h2>
        {leadParas.map((para, i) => (
          <p
            key={i}
            className="csa-lead sa__lead"
            data-reveal="up"
            data-reveal-delay="160"
          >
            {para}
          </p>
        ))}
      </div>

      <div className="sa__mandate" data-reveal="up" data-reveal-delay="120">
        <span className="sa__mandate-k">{home.saMandateKey}</span>
        <span className="sa__mandate-tag">
          <i data-lucide="user-round-cog"></i> {home.saMandateTag}
        </span>
      </div>

      <div className="sa__grid">
        <div className="sa__heads">
          <div className="sa__colhead old">
            <span className="dot" /> {home.saColOld}
          </div>
          <div></div>
          <div className="sa__colhead new">
            <span className="dot" />
            <i data-lucide="sparkles"></i> {home.saColNew}
          </div>
        </div>

        <div className="sa__rows">
          {rows.map((r, i) => (
            <SaRow key={r.theme} r={r} i={i} mActive={rowCyc === i} isMobile={isMobile} />
          ))}
        </div>

        <div className="sa__human" data-reveal="up">
          <span className="sa__human-label">
            <span className="tick" /> {home.saNeverLabel}
          </span>
          <div className="sa__human-badges">
            {neverItems.map((b, i) => (
              <SaBadge
                key={b.label}
                icon={NEVER_AI_ICONS[i] ?? 'shield-check'}
                t={b.label}
                mActive={badgeCyc === i}
                isMobile={isMobile}
              />
            ))}
          </div>
          <p className="sa__human-note">{home.saNeverNote}</p>
        </div>
      </div>
    </section>
  )
}
