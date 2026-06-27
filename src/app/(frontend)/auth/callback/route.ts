import { NextResponse, type NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'

/**
 * Supabase auth callback — exchanges the PKCE `code` from an email confirmation,
 * password-recovery, or OAuth redirect for a session (cookies set on the response),
 * then forwards to `next` (default home; the forgot-password flow passes
 * /reset-password). On failure, back to login with an error flag.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
