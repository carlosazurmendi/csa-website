'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { AuthIcon } from './AuthIcon'

/**
 * Auth screens (Login / Sign Up / Forgot Password / Reset Password) — pixel-faithful
 * port of design-reference/project/assets/auth.jsx + the four *.html compositions.
 * The export's AuthForm was a stub that faked a request; here the form calls real
 * Supabase Auth (signInWithPassword / signUp / resetPasswordForEmail / updateUser).
 * Copy comes from the `auth-pages` global. Nav/footer come from the layout, so this
 * renders only the centered auth belt. Icons are React-owned (AuthIcon) to avoid the
 * lucide swap race in this re-rendering form.
 */

export type AuthScreenKind = 'login' | 'signup' | 'forgot' | 'reset'

type Group = Record<string, unknown>
export type AuthCopy = {
  shared?: Group
  login?: Group
  signup?: Group
  forgotPassword?: Group
  resetPassword?: Group
}

const s = (v: unknown, fallback = ''): string => (typeof v === 'string' && v ? v : fallback)

/* ---------- shared field building blocks ---------- */
function Field({
  label,
  type = 'text',
  name,
  placeholder,
  icon,
  autoComplete,
  onValue,
}: {
  label: string
  type?: string
  name: string
  placeholder?: string
  icon?: string
  autoComplete?: string
  onValue?: (v: string) => void
}) {
  const [show, setShow] = useState(false)
  const isPw = type === 'password'
  return (
    <label className="auth-field">
      <span className="auth-field__label">{label}</span>
      <div className="auth-field__box">
        {icon && <AuthIcon name={icon} className="auth-field__ic" />}
        <input
          type={isPw && show ? 'text' : type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onInput={onValue ? (e) => onValue((e.target as HTMLInputElement).value) : undefined}
        />
        {isPw && (
          <button
            type="button"
            className="auth-field__eye"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <AuthIcon name={show ? 'eye-off' : 'eye'} />
          </button>
        )}
      </div>
    </label>
  )
}

function Strength({
  label = 'Password',
  name = 'password',
  placeholder = 'Create a password',
  hint,
}: {
  label?: string
  name?: string
  placeholder?: string
  hint?: string
}) {
  const [val, setVal] = useState('')
  let score = 0
  if (val.length >= 8) score++
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++
  if (/\d/.test(val)) score++
  if (/[^A-Za-z0-9]/.test(val)) score++
  if (val) score = Math.max(1, score)
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return (
    <>
      <Field
        label={label}
        type="password"
        name={name}
        placeholder={placeholder}
        icon="lock"
        autoComplete="new-password"
        onValue={setVal}
      />
      <div className="auth-strength">
        <div className="auth-strength__bars">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={'auth-strength__bar' + (i <= score ? ' on-' + score : '')}></span>
          ))}
        </div>
        <p className="auth-strength__label">
          Password strength: <b>{score ? labels[score] : '—'}</b>
          {hint ? ' · ' + hint : ''}
        </p>
      </div>
    </>
  )
}

function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="auth-check">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="auth-check__box">
        <AuthIcon name="check" />
      </span>
      <span className="auth-check__label">{label}</span>
    </label>
  )
}

type DonePanel = { icon: string; heading: string; body: string; actions: { label: string; href: string; primary?: boolean }[] }

function Done({ panel }: { panel: DonePanel }) {
  return (
    <div className="auth-done">
      <div className="auth-done__check">
        <AuthIcon name={panel.icon} />
      </div>
      <h2 className="csa-h2 auth-done__title">{panel.heading}</h2>
      <p className="auth-done__sub">{panel.body}</p>
      <div className="auth-done__actions">
        {panel.actions.map((a) =>
          a.primary ? (
            <Link key={a.label} className="btn btn--gold-solid btn--block btn--lg" href={a.href}>
              {a.label} <AuthIcon name="arrow-right" />
            </Link>
          ) : (
            <Link key={a.label} className="btn btn--link btn--block" href={a.href}>
              {a.label}
            </Link>
          ),
        )}
      </div>
    </div>
  )
}

/* ---------- the screen ---------- */
export function AuthScreen({
  screen,
  copy,
  googleEnabled = false,
}: {
  screen: AuthScreenKind
  copy: AuthCopy
  googleEnabled?: boolean
}) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)

  const shared = copy.shared ?? {}
  const cfg = SCREENS[screen]
  const c = (copy[cfg.copyKey] ?? {}) as Group

  // Login: after the success panel shows, refresh server components (nav picks up
  // the session) and head home.
  useEffect(() => {
    if (status === 'done' && screen === 'login') {
      router.refresh()
      let next = '/'
      try {
        const n = new URLSearchParams(window.location.search).get('next')
        if (n && n.startsWith('/') && !n.startsWith('//')) next = n
      } catch {
        // keep default
      }
      const t = setTimeout(() => router.push(next), 1100)
      return () => clearTimeout(t)
    }
  }, [status, screen, router])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return
    setError(null)
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '')
    setStatus('loading')
    const sb = createClient()
    try {
      if (screen === 'login') {
        const { error } = await sb.auth.signInWithPassword({ email: get('email'), password: get('password') })
        if (error) throw error
      } else if (screen === 'signup') {
        const { error } = await sb.auth.signUp({
          email: get('email'),
          password: get('password'),
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: { full_name: get('fullName'), company: get('company') },
          },
        })
        if (error) throw error
      } else if (screen === 'forgot') {
        // Neutral confirmation regardless of outcome (no account enumeration).
        await sb.auth.resetPasswordForEmail(get('email'), {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        })
      } else {
        const password = get('password')
        if (password !== get('confirm')) throw new Error('Passwords do not match.')
        const { error } = await sb.auth.updateUser({ password })
        if (error) throw error
      }
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  async function onGoogle() {
    const sb = createClient()
    await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const ssoLabel = screen === 'signup' ? s(shared.googleSsoLabelSignup, 'Sign up with Google') : s(shared.googleSsoLabelLogin, 'Continue with Google')
  const submitLabel = s(c.submitLabel, cfg.submitFallback)

  return (
    <main className="auth-main" data-screen-label={cfg.label}>
      <div className="auth-haze"></div>
      <div className="auth-gridbg"></div>
      <div className="auth-ghost" aria-hidden="true">
        {cfg.ghost}
      </div>
      <div className="auth-belt">
        <div
          className={'auth-card' + (cfg.wide ? ' auth-card--wide' : '')}
          data-metal={cfg.metal}
          data-metal-thickness={cfg.metal ? '2px' : undefined}
        >
          {status === 'done' ? (
            <Done panel={cfg.done(c)} />
          ) : (
            <>
              <div className="auth-head">
                {cfg.headIcon && (
                  <div className="auth-mark">
                    <AuthIcon name={cfg.headIcon} />
                  </div>
                )}
                {s(c.eyebrow) && <p className="csa-eyebrow auth-eyebrow">{s(c.eyebrow)}</p>}
                <h1 className="csa-h2 auth-title">{s(c.heading, cfg.headingFallback)}</h1>
                {s(c.sub) && <p className="auth-sub">{s(c.sub)}</p>}
              </div>

              {cfg.sso && googleEnabled && (
                <>
                  <div className="auth-sso">
                    <button type="button" className="auth-sso__btn" onClick={onGoogle}>
                      <GoogleMark /> {ssoLabel}
                    </button>
                  </div>
                  <div className="auth-or">
                    <span>{s(shared.orDivider, 'or')}</span>
                  </div>
                </>
              )}

              <form className="auth-form" onSubmit={onSubmit} noValidate>
                {cfg.fields(c)}
                {error && <p className="auth-error" role="alert">{error}</p>}
                <button
                  type="submit"
                  className="csa-btn csa-btn-ghost btn--block btn--lg auth-submit"
                  disabled={status === 'loading'}
                  {...(cfg.glow ? { 'data-glow': '', 'data-metal': 'none' } : {})}
                >
                  {status === 'loading' ? cfg.loadingLabel : submitLabel}
                  {status !== 'loading' && <AuthIcon name="arrow-right" />}
                </button>
              </form>

              {cfg.footer(c)}
            </>
          )}
        </div>

        <div className="auth-trust">
          {((shared.trustStandards as { code?: string }[] | undefined) ?? [
            { code: 'ISO 13849' },
            { code: 'IEC 61508' },
            { code: 'ISO 26262' },
            { code: 'IEC 62061' },
          ]).map((t, i, arr) => (
            <span key={t.code ?? i} style={{ display: 'contents' }}>
              <span>{t.code}</span>
              {i < arr.length - 1 && <span className="dot">·</span>}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  )
}

/* ---------- per-screen config ---------- */
type ScreenCfg = {
  copyKey: keyof AuthCopy
  label: string
  ghost: string
  metal?: string
  wide?: boolean
  glow?: boolean
  sso?: boolean
  headIcon?: string
  headingFallback: string
  submitFallback: string
  loadingLabel: string
  fields: (c: Group) => React.ReactNode
  footer: (c: Group) => React.ReactNode
  done: (c: Group) => DonePanel
}

const SCREENS: Record<AuthScreenKind, ScreenCfg> = {
  login: {
    copyKey: 'login',
    label: 'Login',
    ghost: 'ACCESS',
    metal: 'gold',
    glow: true,
    sso: true,
    headingFallback: 'Log in to CSA',
    submitFallback: 'Log In',
    loadingLabel: 'Signing in…',
    fields: (c) => (
      <>
        <Field label="Work email" type="email" name="email" icon="mail" placeholder="you@company.com" autoComplete="email" />
        <Field label="Password" type="password" name="password" icon="lock" placeholder="Your password" autoComplete="current-password" />
        <div className="auth-row">
          <Check label={s(c.rememberLabel, 'Remember me')} name="remember" defaultChecked />
          <Link className="auth-link" href="/forgot-password">
            {s(c.forgotLinkLabel, 'Forgot password?')}
          </Link>
        </div>
      </>
    ),
    footer: (c) => (
      <p className="auth-alt">
        <Link href="/signup">{s(c.signupPrompt, 'New to CSA? Create an account')}</Link>
      </p>
    ),
    done: (c) => ({
      icon: 'check',
      heading: s(c.successHeading, 'You’re signed in'),
      body: 'Redirecting you now…',
      actions: [{ label: 'Continue', href: '/', primary: true }],
    }),
  },
  signup: {
    copyKey: 'signup',
    label: 'Sign Up',
    ghost: 'ENROLL',
    metal: 'gold',
    wide: true,
    glow: true,
    sso: true,
    headingFallback: 'Join CSA',
    submitFallback: 'Create Account',
    loadingLabel: 'Creating account…',
    fields: (c) => (
      <>
        <div className="field-row">
          <Field label="Full name" name="fullName" icon="user" placeholder="Alex Reyes" autoComplete="name" />
          <Field label="Company" name="company" icon="building-2" placeholder="Northstar Robotics" autoComplete="organization" />
        </div>
        <Field label="Work email" type="email" name="email" icon="mail" placeholder="you@company.com" autoComplete="email" />
        <Strength hint="8+ chars, mixed case, a number" />
        <div className="auth-row" style={{ marginTop: 0 }}>
          <Check label={s(c.termsConsentLabel, 'I agree to the Terms & Privacy Policy')} name="terms" />
        </div>
      </>
    ),
    footer: (c) => (
      <>
        <p className="auth-alt">
          <Link href="/login">{s(c.loginPrompt, 'Already have an account? Log in')}</Link>
        </p>
        <p className="auth-legal">{s(c.legalCopy)}</p>
      </>
    ),
    done: (c) => ({
      icon: 'check',
      heading: s(c.successHeading, 'Account created'),
      body: s(c.successBody, 'Your account is ready.'),
      actions: [
        { label: 'Continue', href: '/', primary: true },
        { label: 'Browse Courses', href: '/training/course-catalog' },
      ],
    }),
  },
  forgot: {
    copyKey: 'forgotPassword',
    label: 'Forgot Password',
    ghost: 'RESET',
    headIcon: 'key-round',
    headingFallback: 'Forgot your password?',
    submitFallback: 'Send Reset Link',
    loadingLabel: 'Sending…',
    fields: () => (
      <Field label="Work email" type="email" name="email" icon="mail" placeholder="you@company.com" autoComplete="email" />
    ),
    footer: (c) => (
      <p className="auth-alt">
        <Link href="/login">{s(c.backToLoginLabel, '← Back to log in')}</Link>
      </p>
    ),
    done: (c) => ({
      icon: 'mail-check',
      heading: s(c.successHeading, 'Check your email'),
      body: s(c.successBody, 'If an account exists for that address, a reset link is on its way.'),
      actions: [{ label: 'Back to Log In', href: '/login', primary: true }],
    }),
  },
  reset: {
    copyKey: 'resetPassword',
    label: 'Reset Password',
    ghost: 'SECURE',
    headIcon: 'lock-keyhole',
    headingFallback: 'Reset password',
    submitFallback: 'Update Password',
    loadingLabel: 'Updating…',
    fields: (c) => (
      <>
        <Strength label="New password" name="password" placeholder="Create a new password" hint={s(c.strengthHint, '8+ chars, mixed case, a number')} />
        <Field label="Confirm password" type="password" name="confirm" icon="lock" placeholder="Re-enter new password" autoComplete="new-password" />
      </>
    ),
    footer: () => (
      <p className="auth-alt">
        <Link href="/login">← Back to log in</Link>
      </p>
    ),
    done: (c) => ({
      icon: 'shield-check',
      heading: s(c.successHeading, 'Password updated'),
      body: s(c.successBody, 'Your password has been changed.'),
      actions: [{ label: 'Continue to Log In', href: '/login', primary: true }],
    }),
  },
}
