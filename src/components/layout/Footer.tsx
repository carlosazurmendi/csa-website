'use client'

import { useEffect } from 'react'
import type { NavItem } from './Nav'

type LegalLink = { label: string; href: string }
type Social = { linkedin?: string | null; x?: string | null; youtube?: string | null }

type Props = {
  logoUrl?: string
  nav: NavItem[]
  social: Social
  closingCta: {
    eyebrow?: string | null
    title?: string | null
    sub?: string | null
    primaryLabel?: string | null
    primaryHref?: string | null
    secondaryLabel?: string | null
    secondaryHref?: string | null
  }
  brandBlurb?: string | null
  legalLinks: LegalLink[]
  copyright?: string | null
}

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
  </svg>
)
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)
const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.51 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.49 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.49zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
)

/** Footer — ported from footer.jsx; link columns mirror the nav groups. */
export function Footer({ logoUrl, nav, social, closingCta, brandBlurb, legalLinks, copyright }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) (window as any).lucide.createIcons()
  })

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const cols = nav.filter((i) => i.children && i.children.length > 0)
  const titleLines = (closingCta.title || '').split('\n')
  const copyParts = (copyright || '').split('·')

  return (
    <footer className="ft" data-screen-label="Footer">
      {/* Closing CTA */}
      <div className="ft-cta">
        <div className="ft-cta__haze"></div>
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {closingCta.eyebrow}
        </p>
        <h2 className="csa-display ft-cta__title" data-reveal="up" data-reveal-delay="80">
          {titleLines.map((l, i) => (
            <span key={i}>
              {l}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="ft-cta__sub" data-reveal="up" data-reveal-delay="160">
          {closingCta.sub}
        </p>
        <div className="ft-cta__actions" data-reveal="up" data-reveal-delay="240">
          <a className="btn btn--gold-pill btn--lg" href={closingCta.primaryHref || '#'} data-metal="gold">
            {closingCta.primaryLabel} <i data-lucide="arrow-right"></i>
          </a>
          <a className="btn btn--link" href={closingCta.secondaryHref || '#'}>
            {closingCta.secondaryLabel} <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="ft__main">
        <div className="ft__brand" data-reveal="up">
          <a href="/" className="ft__logo-link" aria-label="CSA — home">
            {logoUrl ? (
              <img className="ft__logo" src={logoUrl} alt="CSA — Critical Systems Analysis" />
            ) : (
              <span style={{ color: 'var(--fg-1)', fontWeight: 800, fontSize: 22 }}>CSA</span>
            )}
          </a>
          <p className="ft__blurb">{brandBlurb}</p>
          <div className="ft__socials">
            {social.linkedin && (
              <a className="ft__social-ic" href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            )}
            {social.x && (
              <a className="ft__social-ic" href={social.x} target="_blank" rel="noopener" aria-label="X">
                <XIcon />
              </a>
            )}
            {social.youtube && (
              <a className="ft__social-ic" href={social.youtube} target="_blank" rel="noopener" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            )}
          </div>
        </div>

        {cols.map((col, i) => (
          <div className="ft-col" key={col.label} data-reveal="up" data-reveal-delay={String((i + 1) * 70)}>
            <p className="ft-col__label">{col.label}</p>
            <ul className="ft-col__links">
              {(col.children || []).map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    {l.label}
                    {l.isCTA && <i data-lucide="arrow-up-right"></i>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="ft__bottom">
        <p className="ft__copy">
          {copyParts.map((p, i) => (
            <span key={i}>
              {p}
              {i < copyParts.length - 1 && <span className="dot">·</span>}
            </span>
          ))}
        </p>
        <div className="ft__legal">
          {legalLinks.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          {social.linkedin && (
            <a className="ft__social" href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          )}
          <button className="ft__totop" onClick={toTop} aria-label="Back to top">
            Top <i data-lucide="arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  )
}
