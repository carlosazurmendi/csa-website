import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'
import { resolveTrustedOrigin, sanitizeNextPath } from '@/lib/origin'

/**
 * Supabase auth callback — turns an email-confirmation / password-recovery / OAuth
 * redirect into a session (cookies set on the response), then forwards to `next`
 * (default home; the forgot-password flow passes /reset-password). On failure, back
 * to login with an error flag.
 *
 * Handles BOTH GoTrue email flows:
 *   • PKCE        — `?code=...`            → exchangeCodeForSession (same-browser confirm/OAuth)
 *   • token_hash  — `?token_hash=&type=`  → verifyOtp (email-confirmation links; works
 *                                           cross-device since no code_verifier is needed)
 *
 * Hardened (M9): `next` is constrained to a same-site path (no //host, /\host, or
 * absolute URL → open redirect), and the redirect base is the trusted canonical
 * origin rather than the inbound Host header.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const tokenHash = url.searchParams.get('token_hash')
  const otpType = url.searchParams.get('type') as EmailOtpType | null
  const next = sanitizeNextPath(url.searchParams.get('next'))
  // Trusted base; in dev (or if the request host is allow-listed) this is the
  // request origin, otherwise the canonical origin. Last-resort same-host fallback
  // is safe because `next` is already constrained to a local path.
  const origin =
    resolveTrustedOrigin({ host: url.host, proto: url.protocol.replace(/:$/, '') }) ?? url.origin

  if (code || (tokenHash && otpType)) {
    const supabase = await createClient()
    const { error } = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({ type: otpType as EmailOtpType, token_hash: tokenHash as string })
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
