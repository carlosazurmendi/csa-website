'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { AuthShell, AuthHead, AuthField, AuthSubmit, AuthError, AuthDone } from './AuthUI'

export function ForgotForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    const email = String(new FormData(e.currentTarget).get('email') || '')
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setSentTo(email)
  }

  return (
    <AuthShell ghost="RESET" label="Forgot Password" metal="silver">
      {sentTo ? (
        <AuthDone
          title="Check your email."
          actions={
            <Link className="btn btn--ghost btn--block" href="/login">
              Back to sign in
            </Link>
          }
        >
          If an account exists for <b>{sentTo}</b>, a password-reset link is on its way.
        </AuthDone>
      ) : (
        <>
          <AuthHead
            icon="key-round"
            eyebrow="Account recovery"
            title="Reset your password."
            sub="Enter your account email and we'll send you a secure reset link."
          />
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <AuthField label="Email" type="email" name="email" placeholder="you@company.com" icon="mail" autoComplete="email" required />
            <AuthError error={error} />
            <AuthSubmit label="Send Reset Link" loading={loading} />
          </form>
          <p className="auth-alt">
            Remembered it? <Link href="/login">Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
