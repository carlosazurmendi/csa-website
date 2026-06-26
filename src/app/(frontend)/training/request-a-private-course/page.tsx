import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

/**
 * Request a Private Course — pixel-faithful port of
 * design-reference/project/Training - Templates/Request a Private Course.html.
 *
 * In the static export this route is an "In build" STUB: a centered hero with a
 * breadcrumb, title, status badge, blurb, two CTAs and a giant background
 * wordmark. There is NO CMS row for it and the export ships no request-form
 * markup, so this is a static copy port — the primary CTA links to
 * /book-a-consultation (the deferred request flow), the secondary returns Home.
 *
 * The page-local `.stub*` styles are unique to this export page (not part of the
 * global design system), so they are inlined here exactly as the export's
 * <style> block to preserve the appearance.
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Request a Private Course | CSA',
    description:
      'Request a Private Course — Critical Systems Analysis. Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
  }
}

const stubStyles = `
  .stub { position: relative; min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 210px 24px 150px; overflow: hidden; }
  .stub__haze { position: absolute; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(60% 72% at 50% 28%, rgba(52,70,94,0.36) 0%, rgba(10,14,20,0) 64%); }
  .stub__inner { position: relative; z-index: 2; max-width: 760px; }
  .stub__crumb { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-400); margin: 0 0 18px; }
  .stub__title { margin: 0 0 22px; font-size: clamp(40px, 6vw, 78px); line-height: 0.98; }
  .stub__sub { margin: 0 auto 28px; max-width: 540px; color: var(--fg-2); font-size: 18px; line-height: 1.55; }
  .stub__badge { display: inline-flex; align-items: center; white-space: nowrap; gap: 9px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3); border: 1px solid var(--border-2); border-radius: var(--r-pill); padding: 7px 15px; margin-bottom: 30px; }
  .stub__badge .d { width: 6px; height: 6px; border-radius: 50%; background: var(--status-warn); box-shadow: 0 0 10px var(--status-warn); }
  .stub__actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .stub__ghost { position: absolute; left: 0; right: 0; bottom: -4.5vw; text-align: center; font-family: var(--font-display); font-weight: 900; font-size: 22vw; line-height: 0.8; letter-spacing: -0.04em; text-transform: uppercase; color: rgba(255,255,255,0.022); z-index: 0; pointer-events: none; user-select: none; }
`

export default async function RequestPrivateCoursePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stubStyles }} />
      <main className="stub">
        <div className="stub__haze"></div>
        <div className="stub__inner">
          <p className="stub__crumb">Training & Templates</p>
          <h1 className="csa-display stub__title">Request a Private Course</h1>
          <div className="stub__badge">
            <span className="d"></span> In build
          </div>
          <p className="stub__sub">
            This page is part of the CSA website build. The global navigation and footer are live
            across the site — full content for this page is on the way.
          </p>
          <div className="stub__actions">
            <Link className="btn btn--gold-pill btn--lg" href="/book-a-consultation">
              Book a Consultation <i data-lucide="arrow-right"></i>
            </Link>
            <Link className="btn btn--link" href="/">
              Back to Home <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="stub__ghost" aria-hidden="true">
          CSA
        </div>
      </main>
    </>
  )
}
