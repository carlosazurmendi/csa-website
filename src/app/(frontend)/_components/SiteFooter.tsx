import Link from 'next/link'
import { BackToTop } from './BackToTop'

/**
 * SiteFooter — faithful port of design-reference/project/assets/footer.jsx.
 * Closing CTA band + brand/socials + section link columns + legal bar. Content
 * comes from the Payload `footer` global, falling back to the design defaults.
 */

export type FooterData = {
  closingCta?: {
    eyebrow?: string
    heading?: string
    subtext?: string
    ctas?: { label?: string; href?: string; style?: string }[]
  }
  blurb?: string
  columns?: { heading: string; links?: { label: string; href: string }[] }[]
  legalLinks?: { label: string; href: string }[]
  copyright?: string
} | null

const DEFAULT_COLUMNS = [
  {
    heading: 'Consulting',
    links: [
      { label: 'Overview', href: '/consulting' },
      { label: 'Rail', href: '/consulting/rail' },
      { label: 'Robotics', href: '/consulting/robotics' },
      { label: 'Machinery', href: '/consulting/machinery' },
      { label: 'Physical AI', href: '/consulting/physical-ai' },
      { label: 'Construction & Mining Equipment', href: '/consulting/construction-mining-equipment' },
      { label: 'Automotive', href: '/consulting/automotive' },
      { label: 'Defense', href: '/consulting/defense' },
      { label: 'Process', href: '/consulting/process' },
    ],
  },
  {
    heading: 'Training & Templates',
    links: [
      { label: 'Overview', href: '/training' },
      { label: 'Digital Courses', href: '/training/digital-courses' },
      { label: 'Course Catalog', href: '/training/course-catalog' },
      { label: 'Purchase Templates', href: '/training/purchase-templates' },
      { label: 'Browse All Templates', href: '/training/browse-all-templates' },
      { label: 'Request a Private Course', href: '/training/request-a-private-course' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Overview', href: '/company' },
      { label: 'Experience', href: '/company/experience' },
      { label: 'Services', href: '/company/services' },
      { label: 'Careers', href: '/company/careers' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Overview', href: '/resources' },
      { label: 'Standards Identifier', href: '/resources/standards-identifier' },
      { label: 'Safety Chat', href: '/resources/safety-chat' },
      { label: 'Downloadable Resources', href: '/resources/downloadable-resources' },
      { label: 'Articles', href: '/resources/articles' },
      { label: 'Events & Webinars', href: '/resources/events-webinars' },
      { label: 'Free Trainings', href: '/resources/free-trainings' },
    ],
  },
]

const DEFAULT_LEGAL = [
  { label: 'Terms of Service', href: '/legal/terms-of-service' },
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Digital Refund Policy', href: '/legal/digital-refund-policy' },
]

/** Render a heading like "Build Safer. Scale Confidently." across two lines. */
function headingLines(heading: string) {
  const parts = heading
    .split('. ')
    .map((p, i, arr) => (i < arr.length - 1 ? p + '.' : p))
    .filter(Boolean)
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ))
}

export function SiteFooter({ data }: { data: FooterData }) {
  const cta = data?.closingCta
  const eyebrow = cta?.eyebrow || 'Ready when you are.'
  const heading = cta?.heading || 'Build Safer. Scale Confidently.'
  const subtext =
    cta?.subtext ||
    'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.'
  const primaryCta = cta?.ctas?.[0]
  const primaryLabel = primaryCta?.label || 'Book a Consultation'
  const primaryHref = primaryCta?.href || '/book-a-consultation'
  const secondaryCta = cta?.ctas?.[1]
  const secondaryLabel = secondaryCta?.label || 'See Our Services'
  const secondaryHref = secondaryCta?.href || '/consulting'

  const blurb =
    data?.blurb ||
    'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.'
  const columns = data?.columns && data.columns.length > 0 ? data.columns : DEFAULT_COLUMNS
  const legal = data?.legalLinks && data.legalLinks.length > 0 ? data.legalLinks : DEFAULT_LEGAL
  const copyright = data?.copyright || '© 2026 Critical Systems Analysis · All rights reserved.'

  return (
    <footer className="ft">
      {/* Closing CTA */}
      <div className="ft-cta">
        <div className="ft-cta__haze"></div>
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {eyebrow}
        </p>
        <h2 className="csa-display ft-cta__title" data-reveal="up" data-reveal-delay="80">
          {headingLines(heading)}
        </h2>
        <p className="ft-cta__sub" data-reveal="up" data-reveal-delay="160">
          {subtext}
        </p>
        <div className="ft-cta__actions" data-reveal="up" data-reveal-delay="240">
          <Link className="btn btn--gold-pill btn--lg csa-glass" href={primaryHref} data-metal="gold">
            {primaryLabel} <i data-lucide="arrow-right"></i>
          </Link>
          <Link className="btn btn--link" href={secondaryHref}>
            {secondaryLabel} <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="ft__main">
        <div className="ft__brand" data-reveal="up">
          <Link href="/" className="ft__logo-link" aria-label="CSA — home">
            <img className="ft__logo" src="/csa/logo-white.png" alt="CSA — Critical Systems Analysis" />
          </Link>
          <p className="ft__blurb">{blurb}</p>
          <div className="ft__socials">
            <a
              className="ft__social-ic"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              className="ft__social-ic"
              href="https://x.com/"
              target="_blank"
              rel="noopener"
              aria-label="X"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              className="ft__social-ic"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.51 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.49 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.49zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
              </svg>
            </a>
          </div>
        </div>

        {columns.map((col, i) => (
          <div className="ft-col" key={col.heading} data-reveal="up" data-reveal-delay={String((i + 1) * 70)}>
            <p className="ft-col__label">{col.heading}</p>
            <ul className="ft-col__links">
              {(col.links || []).map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="ft__bottom">
        <p className="ft__copy">{copyright}</p>
        <div className="ft__legal">
          {legal.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a
            className="ft__social"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
            </svg>
          </a>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
