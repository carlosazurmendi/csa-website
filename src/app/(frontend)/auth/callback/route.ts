import { NextResponse } from 'next/server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ensureProfile } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * OAuth / email-verification / password-recovery landing. Exchanges the code
 * for a session (sets the cookies), mirrors the Payload profile, then redirects
 * to `next`. Recovery links pass `next=/reset-password`.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      try {
        await ensureProfile(data.user)
      } catch {
        /* profile mirror is non-fatal; it will be retried on next authed load */
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
