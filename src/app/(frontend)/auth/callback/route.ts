import { NextResponse, type NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'
import { resolveTrustedOrigin, sanitizeNextPath } from '@/lib/origin'

/**
 * Supabase auth callback — exchanges the PKCE `code` from an email confirmation,
 * password-recovery, or OAuth redirect for a session (cookies set on the response),
 * then forwards to `next` (default home; the forgot-password flow passes
 * /reset-password). On failure, back to login with an error flag.
 *
 * Hardened (M9): `next` is constrained to a same-site path (no //host, /\host, or
 * absolute URL → open redirect after code exchange), and the redirect base is the
 * trusted canonical origin rather than the inbound Host header.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = sanitizeNextPath(url.searchParams.get('next'))
  // Trusted base; in dev (or if the request host is allow-listed) this is the
  // request origin, otherwise the canonical origin. Last-resort same-host fallback
  // is safe because `next` is already constrained to a local path.
  const origin =
    resolveTrustedOrigin({ host: url.host, proto: url.protocol.replace(/:$/, '') }) ?? url.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
