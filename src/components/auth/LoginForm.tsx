'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { AuthShell, AuthHead, AuthField, AuthCheck, AuthSubmit, AuthError, AuthOr, GoogleMark } from './AuthUI'

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const returnTo = params.get('returnTo') || '/dashboard'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') || ''),
      password: String(form.get('password') || ''),
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push(returnTo)
    router.refresh()
  }

  const google = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(returnTo)}` },
    })
  }

  return (
    <AuthShell ghost="LOGIN" label="Login" metal="silver">
      <AuthHead
        icon="log-in"
        eyebrow="Welcome back"
        title="Sign in to CSA."
        sub="Access your courses, certificates, and template downloads."
      />
      <div className="auth-sso">
        <button type="button" className="auth-sso__btn" onClick={google}>
          <GoogleMark /> Continue with Google
        </button>
      </div>
      <AuthOr />
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <AuthField label="Email" type="email" name="email" placeholder="you@company.com" icon="mail" autoComplete="email" required />
        <AuthField label="Password" type="password" name="password" placeholder="Your password" icon="lock" autoComplete="current-password" required />
        <div className="auth-row">
          <AuthCheck label="Remember me" name="remember" defaultChecked />
          <Link className="auth-link" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <AuthError error={error} />
        <AuthSubmit label="Sign In" loading={loading} />
      </form>
      <p className="auth-alt">
        New to CSA? <Link href="/signup">Create an account</Link>
      </p>
    </AuthShell>
  )
}
