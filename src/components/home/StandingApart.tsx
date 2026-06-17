'use client'

import { useEffect, useState } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'csa-liquid-metal': any
      'csa-grain': any
    }
  }
}

export type SaRowData = { theme: string; oldTitle: string; oldDesc: string; newTitle: string; newDesc: string }
export type SaBadgeData = { icon: string; label: string }
export type StandingApartProps = {
  eyebrow?: string | null; title?: string | null; lead?: string | null
  mandateKicker?: string | null; mandateTag?: string | null
  oldWayLabel?: string | null; newWayLabel?: string | null
  rows: SaRowData[]
  neverAiLabel?: string | null
  neverAi: SaBadgeData[]
  humanNote?: string | null
}

// A "How we work" comparison cell. Frosted-glass face with a SILVER FOIL
// hairline (.csa-glass::before) at rest. When its ROW is hovered (`active`),
// the whole row brightens and mounts a live SILVER liquid-metal ring on each
// cell (same pattern as the Services accordion).
function SaCell({ kind, icon, t, d, active }: { kind: string; icon: string; t: string; d: string; active: boolean }) {
  return (
    <div className={'sa-cell ' + kind + ' csa-glass'}>
      {active &&
        <csa-liquid-metal
          ring="" thickness="2px" contour="0.92" repetition="3"
          tint="#EAF0F8" color-back="#46505F" data-no-lazy="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none' }}></csa-liquid-metal>
      }
      <span className="sa-cell__mark"><i data-lucide={icon}></i></span>
      <div>
        <p className="sa-cell__t">{t}</p>
        <p className="sa-cell__d">{d}</p>
      </div>
    </div>
  );
}

// A full comparison row. Hover anywhere in the row → highlight EVERYTHING in
// it (old card, connector arrow, new card) and mount the silver ring on both
// cards together — not just the cell under the cursor.
function SaRow({ r, i }: { r: SaRowData; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="sa-row" data-reveal="up" data-reveal-delay={String(i * 90)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <SaCell kind="old" icon="x" t={r.oldTitle} d={r.oldDesc} active={hover} />
      <div className="sa-mid">
        <span className="sa-mid__label">{r.theme}</span>
        <span className="sa-mid__arrow"><i data-lucide="arrow-right"></i></span>
      </div>
      <SaCell kind="new" icon="check" t={r.newTitle} d={r.newDesc} active={hover} />
    </div>
  );
}

// "Where we never rely on AI" chip. Keeps its live SILVER liquid-metal edge
// at rest (data-metal="silver", lazily managed by csa-shaders.js). On hover we
// mount a GOLD liquid-metal ring on top (masked to the border band, so it only
// repaints the hairline gold — never covers the icon/text) and tear it down on
// leave, so the metal reads silver → gold ONLY while hovered.
function SaBadge({ icon, t }: { icon: string; t: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="sa-badge" data-metal="silver"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {hover &&
        <csa-liquid-metal
          ring="" thickness="2px" contour="0.92" repetition="3"
          tint="#F4D585" color-back="#7A5E2A" distortion="0.15" data-no-lazy="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 1, pointerEvents: 'none' }}></csa-liquid-metal>
      }
      <span className="sa-badge__icon"><i data-lucide={icon}></i></span>
      <span className="sa-badge__t">{t}</span>
    </div>
  );
}

export function StandingApart({
  eyebrow, title, lead,
  mandateKicker, mandateTag,
  oldWayLabel, newWayLabel,
  rows,
  neverAiLabel,
  neverAi,
  humanNote,
}: StandingApartProps) {
  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons();
  });

  return (
    <section className="sa" id="how-we-work" data-screen-label="Standing Apart" data-comment-anchor="f0138fbf80-section-43-5">
    <div className="sa__haze" />
    <csa-grain
        className="rv-grain"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        intensity="0.22"
        speed="0.4"></csa-grain>

    <div className="sa__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{eyebrow}</p>
      <h2 className="csa-h2 sa__title" data-reveal="up" data-reveal-delay="80">{title}</h2>
      <p className="csa-lead sa__lead" data-reveal="up" data-reveal-delay="160">{lead}</p>
    </div>

    <div className="sa__mandate" data-reveal="up" data-reveal-delay="120">
      <span className="sa__mandate-k">{mandateKicker}</span>
      <span className="sa__mandate-tag"><i data-lucide="user-round-cog"></i> {mandateTag}</span>
    </div>

    <div className="sa__grid">
      <div className="sa__heads">
        <div className="sa__colhead old"><span className="dot" /> {oldWayLabel}</div>
        <div></div>
        <div className="sa__colhead new"><span className="dot" /><i data-lucide="sparkles"></i> {newWayLabel}</div>
      </div>

      <div className="sa__rows">
        {rows.map((r, i) =>
          <SaRow key={r.theme} r={r} i={i} />
        )}
      </div>

      <div className="sa__human" data-reveal="up">
        <span className="sa__human-label"><span className="tick" /> {neverAiLabel}</span>
        <div className="sa__human-badges">
          {neverAi.map((b) =>
            <SaBadge key={b.label} icon={b.icon} t={b.label} />
            )}
        </div>
        <p className="sa__human-note">{humanNote}</p>
      </div>
    </div>
  </section>);

}
