'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { lexicalToParagraphs } from '@/lib/lexical'
import { attachTilt } from '../../_components/tilt'
import type { HomeDoc } from './types'

/**
 * AboutSection — faithful port of design-reference/project/assets/about.jsx.
 * Editorial copy (eyebrow, heading, founder identity, certs, bio, experience
 * tags, conferences, CTA) comes from the `home` record; the per-cert and
 * per-conference Lucide icons are design-only constants zipped to the CMS
 * arrays by order. The portrait tilt is a design interaction kept verbatim.
 */

// Per-cert Lucide icons (design-only), in the same order as the seeded abCerts.
const CERT_ICONS = ['badge-check', 'award']

// Per-conference Lucide icons (design-only), in the same order as abConferences.
const CONF_ICONS = ['bot', 'cpu', 'shield-check']

export function AboutSection({ home }: { home: HomeDoc }) {
  const tiltRef = useRef<HTMLDivElement>(null)

  // Portrait 3D tilt — document-level tracking so it never flickers when the
  // hovered edge recedes under the cursor (see _components/tilt.ts).
  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    return attachTilt(el, {
      onTilt: (px, py) => {
        el.style.setProperty('--rx', ((px - 0.5) * 2 * 6).toFixed(2) + 'deg')
        el.style.setProperty('--ry', (-(py - 0.5) * 2 * 6).toFixed(2) + 'deg')
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%')
      },
      onReset: () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      },
    })
  }, [])

  const certs = home.abCerts ?? []
  const experience = home.abExperience ?? []
  const conferences = home.abConferences ?? []
  const bioParagraphs = lexicalToParagraphs(home.abBio)

  return (
    <section className="ab">
      <div className="ab__haze" />

      <div className="ab__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>{home.abEyebrow}</p>
        <h2 className="csa-h2 ab__title" data-reveal="up" data-reveal-delay="80">{home.abHeading}</h2>
      </div>

      <div className="ab__body">
        <div className="ab__left" data-reveal="right">
          <div className="ab-portrait-scene">
            <div
              className="ab-portrait"
              ref={tiltRef}
              data-metal="silver">

              <image-slot id="about-ben" shape="rect" fit="cover" placeholder="Drop a photo of Ben"></image-slot>
              <div className="ab-portrait__scrim" />
              <span className="ab-callout"><span className="ab-callout__node" />{home.abCallout}</span>
              <div className="ab-portrait__gloss" />
              <div className="ab-portrait__plate">
                <p className="ab-portrait__name">{home.abName}</p>
                <p className="ab-portrait__role">{home.abRole}<span className="sep" /><span className="ab-portrait__loc">{home.abLocation}</span></p>
              </div>
            </div>
          </div>

          <div className="ab-certs">
            {certs.map((c, i) => (
              <div className="ab-cert csa-glass" data-metal="silver" key={c.title}>
                <span className="ab-cert__icon"><i data-lucide={CERT_ICONS[i]}></i></span>
                <span>
                  <span className="ab-cert__t">{c.title}</span><br />
                  <span className="ab-cert__s">{c.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ab__right" data-reveal="left" data-reveal-delay="120">
          <div className="ab__bio">
            {bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="ab-block">
            <p className="ab-block__label"><span className="tick" /> {home.abExperienceLabel}</p>
            <div className="ab-tags">
              {experience.map((t) => <span className="ab-tag" key={t.label}>{t.label}</span>)}
            </div>
          </div>

          <div className="ab-block">
            <p className="ab-block__label"><span className="tick" /> {home.abFieldLabel}</p>
            <p className="ab-field__note">{home.abFieldNote}</p>
            <div className="ab-confs">
              {conferences.map((c, i) =>
                <span className="ab-conf" key={c.label}><i data-lucide={CONF_ICONS[i]}></i>{c.label}</span>
              )}
            </div>
          </div>

          <div className="ab__cta">
            <Link className="btn btn--lg rv-glass-btn" data-metal="gold" href="/company/experience">
              {home.abCtaLabel} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
