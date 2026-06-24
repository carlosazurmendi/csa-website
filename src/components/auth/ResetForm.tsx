'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { AuthShell, AuthHead, AuthStrength, AuthField, AuthSubmit, AuthError, AuthDone } from './AuthUI'

/**
 * Lands here after clicking the recovery email link: /auth/callback exchanges
 * the code for a (recovery) session, then redirects here. We just set the new
 * password on that session via supabase.auth.updateUser.
 */
export function ResetForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    const form = new FormData(e.currentTarget)
    const pw = String(form.get('password') || '')
    const confirm = String(form.get('confirm') || '')
    if (pw.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (pw !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.updateUser({ password: pw })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setDone(true)
  }

  return (
    <AuthShell ghost="RESET" label="Reset Password" metal="silver">
      {done ? (
        <AuthDone
          title="Password updated."
          actions={
            <Link className="btn btn--gold-solid btn--block" href="/login">
              Sign in
            </Link>
          }
        >
          Your password has been changed. Sign in with your new credentials.
        </AuthDone>
      ) : (
        <>
          <AuthHead
            icon="lock"
            eyebrow="Set a new password"
            title="Choose a new password."
            sub="Pick a strong password you don't use elsewhere."
          />
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <AuthStrength label="New password" name="password" placeholder="Create a password" />
            <AuthField label="Confirm password" type="password" name="confirm" placeholder="Re-enter password" icon="lock" autoComplete="new-password" required />
            <AuthError error={error} />
            <AuthSubmit label="Update Password" loading={loading} />
          </form>
        </>
      )}
    </AuthShell>
  )
}
