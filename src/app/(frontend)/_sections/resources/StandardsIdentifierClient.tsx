'use client'

import { useState } from 'react'

/**
 * Client-only behavior for the Standards Identifier page
 * (/resources/standards-identifier), ported from the inline <script> in
 * design-reference/project/Resources/Standards Identifier.html.
 *
 * The page-wide `.res-reveal` scroll observer is identical to the one on the
 * Resources Overview, so it is reused from ResourcesOverviewClient
 * (<ResourcesReveal/>) — only the interactive tool shell lives here.
 *
 * DEFERRED (M6+): the AI standards-mapping engine. This is a faithful STATIC
 * shell — the chip selectors carry visual selection state only (matches the
 * export's `ToolShell`, whose comment notes "no live mapping"), the primary
 * action button is disabled, and the sample roadmap + veil are placeholder
 * copy. No results wiring. The lucide icon hydration / shaders are handled
 * globally, so the export's window.lucide.createIcons / window.csaInit calls
 * are dropped.
 */

/* ---------- Tool-shell options (UI preview — no live mapping) ---------- */
type Selector = { key: 'industry' | 'mobility' | 'environment'; step: string; label: string; options: string[] }

const SELECTORS: Selector[] = [
  { key: 'industry', step: '01', label: 'Industry vertical', options: ['Robotics', 'Automotive & EV', 'Rail', 'Machinery', 'Agriculture', 'Process'] },
  { key: 'mobility', step: '02', label: 'Mobility configuration', options: ['Fixed / stationary', 'Mobile (AMR)', 'On-road autonomous', 'Rail-bound'] },
  { key: 'environment', step: '03', label: 'Operational environment', options: ['Human-shared', 'Caged / restricted', 'Public roadway', 'Harsh / high-energy'] },
]

/* Static placeholder roadmap shown in the preview panel. */
const SAMPLE_ROADMAP = [
  { code: 'ISO 10218-2', meta: 'Industrial robot integration', pill: 'Primary' },
  { code: 'ISO 3691-4', meta: 'Driverless industrial trucks', pill: 'Primary' },
  { code: 'ISO 13849-1', meta: 'Performance Level · PL d', pill: 'Target PL' },
  { code: 'IEC 61508', meta: 'Foundational E/E/PE safety', pill: 'Baseline' },
]

type ToolShellProps = {
  toolName: string
  toolSub: string
  toolCtaLabel: string
  toolNote: string
  toolResultLabel: string
  toolResultVeil: string
}

/* ---------- Interactive tool shell (visual selection only) ---------- */
export function ToolShell({
  toolName,
  toolSub,
  toolCtaLabel,
  toolNote,
  toolResultLabel,
  toolResultVeil,
}: ToolShellProps) {
  // Visual selection state only — no standards-mapping logic is wired (DEFERRED, M6+).
  const [sel, setSel] = useState<Record<Selector['key'], string>>({
    industry: 'Robotics',
    mobility: 'Mobile (AMR)',
    environment: 'Human-shared',
  })
  return (
    <div className="si-shell csa-glass">
      <div className="si-shell__bar">
        <div className="si-shell__id">
          <span className="si-shell__dot">
            <i data-lucide="scan-search"></i>
          </span>
          <div>
            <div className="si-shell__name">{toolName}</div>
            <div className="si-shell__sub">{toolSub}</div>
          </div>
        </div>
      </div>

      <div className="si-shell__body">
        <div className="si-form">
          {SELECTORS.map((f) => (
            <div className="si-field" key={f.key}>
              <p className="si-field__label">
                <span className="si-field__step">{f.step}</span> {f.label}
              </p>
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
              {toolCtaLabel} <i data-lucide="arrow-right"></i>
            </button>
            <p className="si-form__note">
              <i data-lucide="info"></i> {toolNote}
            </p>
          </div>
        </div>

        <div className="si-result">
          <div className="si-result__head">
            <span className="si-result__label">{toolResultLabel}</span>
            <span className="si-result__preview">Sample output</span>
          </div>
          <div className="si-roadmap">
            {SAMPLE_ROADMAP.map((r) => (
              <div className="si-rm" key={r.code}>
                <div className="si-rm__l">
                  <span className="si-rm__ico">
                    <i data-lucide="file-check"></i>
                  </span>
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
            <span>{toolResultVeil}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
