'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export type AboutCert = { icon: string; title: string; subtitle: string }
export type AboutConf = { icon: string; label: string }
export type AboutProps = {
  eyebrow?: string | null; title?: string | null
  portraitUrl?: string | null; portraitAlt?: string | null
  name?: string | null; role?: string | null; location?: string | null
  calloutLabel?: string | null
  bio?: ReactNode            // pre-rendered rich text passed from the server
  certs: AboutCert[]
  experienceLabel?: string | null
  experienceTags: { label: string }[]
  activeLabel?: string | null; activeNote?: string | null
  conferences: AboutConf[]
  ctaLabel?: string | null; ctaHref?: string | null
}

export function About({
  eyebrow,
  title,
  portraitUrl,
  portraitAlt,
  name,
  role,
  location,
  calloutLabel,
  bio,
  certs,
  experienceLabel,
  experienceTags,
  activeLabel,
  activeNote,
  conferences,
  ctaLabel,
  ctaHref,
}: AboutProps) {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons();
  });

  const onMove = (e: any) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', ((px - 0.5) * 2 * 6).toFixed(2) + 'deg');
    el.style.setProperty('--ry', (-(py - 0.5) * 2 * 6).toFixed(2) + 'deg');
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="ab" data-screen-label="About">
    <div className="ab__haze" />

    <div className="ab__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{eyebrow}</p>
      <h2 className="csa-h2 ab__title" data-reveal="up" data-reveal-delay="80">{title}</h2>
    </div>

    <div className="ab__body">
      <div className="ab__left" data-reveal="right">
        <div className="ab-portrait-scene">
          <div
              className="ab-portrait"
              ref={tiltRef}
              data-metal="silver"
              onMouseMove={onMove}
              onMouseLeave={onLeave}>

            {portraitUrl ? (
              <img
                className="ab-portrait__img"
                src={portraitUrl}
                alt={portraitAlt || name || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : null}
            <div className="ab-portrait__scrim" />
            <span className="ab-callout"><span className="ab-callout__node" />{calloutLabel}</span>
            <div className="ab-portrait__gloss" />
            <div className="ab-portrait__plate">
              <p className="ab-portrait__name">{name}</p>
              <p className="ab-portrait__role">{role}<span className="sep" /><span className="ab-portrait__loc">{location}</span></p>
            </div>
          </div>
        </div>

        <div className="ab-certs">
          {certs.map((cert) =>
            <div className="ab-cert csa-glass" data-metal="silver" key={cert.title}>
              <span className="ab-cert__icon"><i data-lucide={cert.icon}></i></span>
              <span>
                <span className="ab-cert__t">{cert.title}</span><br />
                <span className="ab-cert__s">{cert.subtitle}</span>
              </span>
            </div>
            )}
        </div>
      </div>

      <div className="ab__right" data-reveal="left" data-reveal-delay="120">
        <div className="ab__bio">
          {bio}
        </div>

        <div className="ab-block">
          <p className="ab-block__label"><span className="tick" /> {experienceLabel}</p>
          <div className="ab-tags">
            {experienceTags.map((t) => <span className="ab-tag" key={t.label}>{t.label}</span>)}
          </div>
        </div>

        <div className="ab-block">
          <p className="ab-block__label"><span className="tick" /> {activeLabel}</p>
          <p className="ab-field__note">{activeNote}</p>
          <div className="ab-confs">
            {conferences.map((c) =>
              <span className="ab-conf" key={c.label}><i data-lucide={c.icon}></i>{c.label}</span>
              )}
          </div>
        </div>

        <div className="ab__cta">
          <a className="btn btn--lg rv-glass-btn" data-metal="gold" href={ctaHref || '#'}>
            {ctaLabel} <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </section>);

}
