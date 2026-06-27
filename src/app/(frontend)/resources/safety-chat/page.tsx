import type { Metadata } from 'next'
import Link from 'next/link'

import { findBySlug } from '@/lib/cms'
import { getCurrentCustomer } from '@/lib/customer'
import { ResourcesReveal } from '../../_sections/resources/ResourcesOverviewClient'

export const dynamic = 'force-dynamic'

/**
 * Safety Chat (/resources/safety-chat) — pixel-faithful port of the Resources
 * landing page design-reference/project/Resources/Safety Chat.html (the inline
 * <script> that composes <Hero> · <Closing>). This is the MARKETING landing, not
 * the full chat app.
 *
 * Editorial copy comes from the `resources` page-collection row with slug
 * `safety-chat` (see src/collections/pages/ResourcesPages.ts +
 * src/seed/pages/resources.ts). The page is a server component; the only client
 * behavior — the page-wide `.res-reveal` scroll observer (reused from
 * ResourcesOverviewClient, mirroring the export's `useReveal`) — lives in a
 * co-located client component.
 *
 * DEFERRED:
 *   • Auth (M6+): the export's <ChatPanel> renders an auth-gated lock that swaps
 *     between a logged-out "Sign in to chat" CTA and a logged-in "Go to Chat"
 *     CTA. With no live auth, we render the export's DEFAULT (logged-out) state
 *     faithfully — the lock links to /login. The signed-in "Go to Chat" variant
 *     (which would open the real chat app) is the M6.5 stub and is not shown.
 *   • The live chat app (M6.5): the embedded panel is the export's STATIC preview
 *     shell — seeded thread bubbles, suggestion chips, and a non-functional
 *     composer row (no live model, no input handler).
 *
 * The hero/closing primary CTAs (export href "Login.html") and the panel lock
 * CTA map to the /login route; the hero secondary "Talk to an Engineer" link
 * (export href "Book a Consultation.html") maps to /book-a-consultation. The
 * global nav/footer chrome is rendered by the layout. The lucide icon hydration
 * + shaders are handled globally, so the export's window.lucide.createIcons /
 * window.csaInit calls are dropped.
 */

type SafetyChat = {
  // Hero (split)
  heroEyebrow?: string
  heroEyebrowIcon?: string
  heroGhost?: string
  heroHeadline?: string
  heroSub?: string
  heroNote?: string
  heroCtaLabel?: string
  heroSecondaryLabel?: string
  // Chat-shell intro labels (reused Identifier-tool fields)
  toolName?: string
  toolSub?: string
  toolBadge?: string
  toolNote?: string
  toolCtaLabel?: string
  // Closing CTA
  closeEyebrow?: string
  closeHeading?: string
  closeSub?: string
  closeCtaLabel?: string
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string }
}

// UI-preview content baked into the export's chat shell (no live model). These
// are design-only constants the CMS does not carry, so they stay inline.
const THREAD: { who: 'bot' | 'user'; text: string }[] = [
  {
    who: 'bot',
    text: 'Hi — I’m Safety Chat. Ask me about a Safety Integrity Level, a Performance Level, or a requirement buried in a standard, and I’ll give you a high-level engineering answer to point you in the right direction.',
  },
  { who: 'user', text: 'What’s the difference between SIL 2 and PL d?' },
  {
    who: 'bot',
    text: 'They come from different standards — SIL (IEC 61508 / 62061) and PL (ISO 13849) — but they overlap. At a high level, PL d roughly corresponds to SIL 2 for many machinery control functions. The right target still depends on your risk assessment, so treat this as orientation, not a determination.',
  },
]

const SUGGESTIONS: string[] = [
  'When do I need ISO 3691-4?',
  'How is a Performance Level determined?',
  'What goes in a HARA?',
]

export async function generateMetadata(): Promise<Metadata> {
  const row = await findBySlug<SafetyChat>('resources', 'safety-chat')
  return {
    title: row?.seo?.metaTitle ?? 'Safety Chat — AI Functional Safety Assistant | CSA',
    description:
      row?.seo?.metaDescription ??
      'Have a quick question about a SIL or a complex standard? Safety Chat gives immediate, high-level functional safety engineering insights to help you move faster.',
  }
}

export default async function SafetyChatPage() {
  const row = (await findBySlug<SafetyChat>('resources', 'safety-chat')) ?? {}
  // Signed-in visitors get the live app ("Go to Chat"); everyone else routes to login.
  const signedIn = Boolean(await getCurrentCustomer())
  const chatHref = signedIn ? '/safety-chat' : '/login'

  return (
    <>
      <ResourcesReveal />
      <main className="res">
        {/* ---------- Hero (split) ---------- */}
        <header className="res-hero res-hero--split">
          <div className="res-hero__ghost" aria-hidden="true">
            {row.heroGhost ?? 'Safety Chat'}
          </div>
          <div className="res-hero__inner">
            <div className="res-hero__copy">
              <p className="csa-eyebrow">
                <span className="res-hero__eyebrow-ico">
                  <i data-lucide={row.heroEyebrowIcon ?? 'message-square-text'}></i>
                </span>
                {row.heroEyebrow ?? 'Safety Chat'}
              </p>
              <h1 className="csa-display res-hero__title">
                {row.heroHeadline ?? 'Safety Chat: immediate engineering insight.'}
              </h1>
              <p className="res-hero__sub">
                {row.heroSub ??
                  'Have a quick question about a specific Safety Integrity Level (SIL) or a requirement buried in a complex standard? Our Safety Chat tool provides immediate, high-level engineering insight to help you navigate the safety lifecycle faster.'}
              </p>
              <div className="res-hero__note">
                <i data-lucide="info"></i>
                <span>
                  {row.heroNote ??
                    'Safety Chat is AI-augmented and designed to supplement — not replace — expert engineering audits.'}
                </span>
              </div>
              <div className="res-hero__cta">
                <Link className="btn btn--gold-pill btn--lg" href={chatHref}>
                  {row.heroCtaLabel ?? 'Ask Safety Chat'} <i data-lucide="arrow-right"></i>
                </Link>
                <Link className="btn btn--link" href="/book-a-consultation">
                  {row.heroSecondaryLabel ?? 'Talk to an Engineer'} <i data-lucide="arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* ---------- Chat panel (static UI preview — no live model) ---------- */}
            <div className="sc-panel csa-glass">
              <div className="sc-panel__bar">
                <div className="sc-panel__id">
                  <span className="sc-panel__avatar">
                    <i data-lucide="shield-check"></i>
                  </span>
                  <div>
                    <div className="sc-panel__name">{row.toolName ?? 'Safety Chat'}</div>
                    <div className="sc-panel__status">
                      <span className="d"></span> {row.toolSub ?? 'AI Assistant'}
                    </div>
                  </div>
                </div>
                <span className="sc-panel__tag">{row.toolBadge ?? 'AI-Augmented'}</span>
              </div>

              <div className="sc-thread">
                {THREAD.map((m, i) => (
                  <div className={'sc-msg sc-msg--' + m.who} key={i}>
                    <span className="sc-msg__ava">
                      <i data-lucide={m.who === 'bot' ? 'shield-check' : 'user'}></i>
                    </span>
                    <div className="sc-msg__bubble">{m.text}</div>
                  </div>
                ))}
              </div>

              <div className="sc-suggest">
                {SUGGESTIONS.map((s) => (
                  <span className="sc-suggest__chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="sc-compose">
                <div className="sc-compose__row">
                  <span className="sc-compose__ph">Ask a functional safety question…</span>
                  <span
                    className="sc-compose__send"
                    data-glow
                    data-glow-bleed="15"
                    style={{ backgroundColor: 'var(--bg-elevated-2)' }}
                  >
                    <i data-lucide="arrow-up"></i>
                  </span>
                </div>
              </div>

              {/* Auth-aware lock: signed-in → open the live app; else → sign in. */}
              {signedIn ? (
                <div className="sc-lock">
                  <span className="sc-lock__ico">
                    <i data-lucide="message-square-text"></i>
                  </span>
                  <p className="sc-lock__t">You&rsquo;re signed in. Pick up the conversation in Safety Chat.</p>
                  <Link className="btn btn--gold-pill" href="/safety-chat">
                    Go to Chat <i data-lucide="arrow-right"></i>
                  </Link>
                </div>
              ) : (
                <div className="sc-lock">
                  <span className="sc-lock__ico">
                    <i data-lucide="lock"></i>
                  </span>
                  <p className="sc-lock__t">
                    {row.toolNote ?? 'Sign in to start chatting. Safety Chat is available to logged-in users.'}
                  </p>
                  <Link className="btn btn--gold-pill" href="/login">
                    {row.toolCtaLabel ?? 'Sign in to chat'} <i data-lucide="arrow-right"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------- Closing CTA ---------- */}
        <section className="res-close">
          <div className="res-close__haze" aria-hidden="true"></div>
          <div className="res-close__inner">
            <span className="csa-eyebrow">{row.closeEyebrow ?? 'Move faster'}</span>
            <h2 className="csa-display res-close__title">{row.closeHeading ?? 'Ask Safety Chat.'}</h2>
            <p className="csa-lead res-close__sub">
              {row.closeSub ??
                'Sign in to ask quick functional safety questions and get immediate, high-level engineering insight — then escalate the hard ones to a principal engineer.'}
            </p>
            <Link className="btn btn--gold-pill btn--lg" href={chatHref}>
              {row.closeCtaLabel ?? 'Ask Safety Chat'} <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
