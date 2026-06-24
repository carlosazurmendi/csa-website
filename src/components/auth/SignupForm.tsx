'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  AuthShell,
  AuthHead,
  AuthField,
  AuthStrength,
  AuthCheck,
  AuthSubmit,
  AuthError,
  AuthOr,
  AuthDone,
  GoogleMark,
} from './AuthUI'

export function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    const form = new FormData(e.currentTarget)
    if (!form.get('terms')) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.')
      return
    }
    setLoading(true)
    const email = String(form.get('email') || '')
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password: String(form.get('password') || ''),
      options: {
        data: { full_name: String(form.get('fullName') || '') },
        emailRedirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setSentTo(email)
  }

  const google = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=/dashboard` },
    })
  }

  return (
    <AuthShell ghost="JOIN" label="Sign Up" wide metal="silver">
      {sentTo ? (
        <AuthDone
          title="Check your email."
          actions={
            <Link className="btn btn--ghost btn--block" href="/login">
              Back to sign in
            </Link>
          }
        >
          We sent a verification link to <b>{sentTo}</b>. Confirm it to activate your CSA account.
        </AuthDone>
      ) : (
        <>
          <AuthHead
            icon="user-plus"
            eyebrow="Create your account"
            title="Join CSA."
            sub="Enroll in courses, earn certificates, and access your template library."
          />
          <div className="auth-sso">
            <button type="button" className="auth-sso__btn" onClick={google}>
              <GoogleMark /> Continue with Google
            </button>
          </div>
          <AuthOr />
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <AuthField label="Full name" name="fullName" placeholder="Jane Engineer" icon="user" autoComplete="name" required />
            <AuthField label="Work email" type="email" name="email" placeholder="you@company.com" icon="mail" autoComplete="email" required />
            <AuthStrength />
            <div className="auth-row">
              <AuthCheck
                name="terms"
                label={
                  <>
                    I agree to the{' '}
                    <Link className="auth-link" href="/legal/terms">
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link className="auth-link" href="/legal/privacy">
                      Privacy Policy
                    </Link>
                  </>
                }
              />
            </div>
            <AuthError error={error} />
            <AuthSubmit label="Create Account" loading={loading} glow />
          </form>
          <p className="auth-alt">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
