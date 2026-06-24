'use client'

/**
 * CSA auth screen primitives — React port of the design's assets/auth.jsx
 * (window.AuthShell / AuthField / …). Classes match assets/auth.css verbatim.
 * Nav + Footer come from the (frontend) layout, so AuthShell renders only the
 * centered card scene. The design's fake-request AuthForm is intentionally NOT
 * ported — each screen wires a real Supabase call instead.
 */
import React, { useEffect, useState } from 'react'

/** Re-run Lucide after render so dynamically-inserted <i data-lucide> become SVGs. */
export function useRelucide() {
  useEffect(() => {
    ;(window as unknown as { lucide?: { createIcons: () => void } }).lucide?.createIcons()
  })
}

export function AuthShell({
  ghost,
  trust = true,
  wide,
  metal,
  label,
  children,
}: {
  ghost?: string
  trust?: boolean
  wide?: boolean
  metal?: 'gold' | 'silver' | true
  label?: string
  children: React.ReactNode
}) {
  useRelucide()
  const metalKind = metal === true ? 'silver' : metal || undefined
  return (
    <main className="auth-main" data-screen-label={label}>
      <div className="auth-haze" />
      <div className="auth-gridbg" />
      <div className="auth-ghost" aria-hidden="true">
        {ghost || 'CSA'}
      </div>
      <div className="auth-belt">
        <div
          className={'auth-card' + (wide ? ' auth-card--wide' : '')}
          data-metal={metalKind}
          data-metal-thickness={metalKind ? '2px' : undefined}
        >
          {children}
        </div>
        {trust && (
          <div className="auth-trust">
            <span>ISO 13849</span>
            <span className="dot">·</span>
            <span>IEC 61508</span>
            <span className="dot">·</span>
            <span>ISO 26262</span>
            <span className="dot">·</span>
            <span>IEC 62061</span>
          </div>
        )}
      </div>
    </main>
  )
}

export function AuthHead({
  icon,
  eyebrow,
  title,
  sub,
}: {
  icon?: string
  eyebrow?: string
  title: string
  sub?: string
}) {
  useRelucide()
  return (
    <div className="auth-head">
      {icon && (
        <div className="auth-mark">
          <i data-lucide={icon} />
        </div>
      )}
      {eyebrow && <p className="csa-eyebrow auth-eyebrow">{eyebrow}</p>}
      <h1 className="csa-h2 auth-title">{title}</h1>
      {sub && <p className="auth-sub">{sub}</p>}
    </div>
  )
}

export function AuthField({
  label,
  type = 'text',
  name,
  placeholder,
  icon,
  autoComplete,
  defaultValue,
  required,
  onInput,
}: {
  label: string
  type?: string
  name: string
  placeholder?: string
  icon?: string
  autoComplete?: string
  defaultValue?: string
  required?: boolean
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
}) {
  const [show, setShow] = useState(false)
  const isPw = type === 'password'
  useRelucide()
  return (
    <label className="auth-field">
      <span className="auth-field__label">{label}</span>
      <div className="auth-field__box">
        {icon && <i className="auth-field__ic" data-lucide={icon} />}
        <input
          type={isPw && show ? 'text' : type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          onInput={onInput}
        />
        {isPw && (
          <button
            type="button"
            className="auth-field__eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <i data-lucide={show ? 'eye-off' : 'eye'} />
          </button>
        )}
      </div>
    </label>
  )
}

export function AuthStrength({
  label = 'Password',
  name = 'password',
  placeholder = 'Create a password',
  autoComplete = 'new-password',
}: {
  label?: string
  name?: string
  placeholder?: string
  autoComplete?: string
}) {
  const [val, setVal] = useState('')
  const score = (() => {
    let s = 0
    if (val.length >= 8) s++
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) s++
    if (/\d/.test(val)) s++
    if (/[^A-Za-z0-9]/.test(val)) s++
    return val ? Math.max(1, s) : 0
  })()
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return (
    <>
      <AuthField
        label={label}
        type="password"
        name={name}
        placeholder={placeholder}
        icon="lock"
        autoComplete={autoComplete}
        required
        onInput={(e) => setVal((e.target as HTMLInputElement).value)}
      />
      <div className="auth-strength">
        <div className="auth-strength__bars">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={'auth-strength__bar' + (i <= score ? ' on-' + score : '')} />
          ))}
        </div>
        <p className="auth-strength__label">
          Password strength: <b>{score ? labels[score] : '—'}</b> · 8+ chars, mixed case, a number
        </p>
      </div>
    </>
  )
}

export function AuthCheck({
  label,
  name,
  defaultChecked,
}: {
  label: React.ReactNode
  name: string
  defaultChecked?: boolean
}) {
  useRelucide()
  return (
    <label className="auth-check">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="auth-check__box">
        <i data-lucide="check" />
      </span>
      <span className="auth-check__label">{label}</span>
    </label>
  )
}

export function AuthOr() {
  return (
    <div className="auth-or">
      <span>or</span>
    </div>
  )
}

export function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}

export function AuthError({ error }: { error?: string | null }) {
  if (!error) return null
  return (
    <p
      role="alert"
      className="auth-strength__label"
      style={{ color: 'var(--status-critical)', marginTop: 0, marginBottom: 14 }}
    >
      {error}
    </p>
  )
}

export function AuthSubmit({
  label,
  loading,
  loadingLabel = 'Working…',
  glow,
}: {
  label: string
  loading?: boolean
  loadingLabel?: string
  glow?: boolean
}) {
  useRelucide()
  const glowAttrs = glow ? { 'data-glow': '', 'data-metal': 'none' } : {}
  return (
    <button
      type="submit"
      className="btn btn--gold-solid btn--block btn--lg auth-submit"
      disabled={loading}
      {...glowAttrs}
    >
      {loading ? loadingLabel : label}
      {!loading && <i data-lucide="arrow-right" />}
    </button>
  )
}

export function AuthDone({
  title,
  children,
  actions,
}: {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  useRelucide()
  return (
    <div className="auth-done">
      <div className="auth-done__check">
        <i data-lucide="check" />
      </div>
      <h2 className="auth-done__title csa-h3">{title}</h2>
      <p className="auth-done__sub">{children}</p>
      {actions && <div className="auth-done__actions">{actions}</div>}
    </div>
  )
}
