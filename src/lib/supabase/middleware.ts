import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes the Supabase end-user session on each request and returns the response.
 *
 * Milestone 1: refresh ONLY — no route gating. The public marketing site must stay public.
 * Protected-route redirects (/dashboard, learn routes, /safety-chat) are layered on in
 * Milestone 5 by inspecting the user here and redirecting unauthenticated requests.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Supabase Auth not configured yet — pass requests through untouched.
  if (!url || !anon) return supabaseResponse

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // Do not run logic between createServerClient and the auth call. This touches the session
  // so an expired access token is refreshed into the response cookies.
  try {
    await supabase.auth.getUser()
  } catch {
    // Self-hosted Supabase unreachable/misconfigured — never break the page in M1.
  }

  return supabaseResponse
}
