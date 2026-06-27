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

  // Reach Supabase Auth at the internal url inside the container; browser uses the public one.
  const url = process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Supabase Auth not configured yet — pass requests through untouched.
  if (!url || !anon) return supabaseResponse

  const supabase = createServerClient(url, anon, {
    // Must match the browser client's cookie name (see lib/supabase/client.ts).
    cookieOptions: { name: 'sb-csa-auth' },
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
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Self-hosted Supabase unreachable/misconfigured — never break the page.
  }

  // Route gating (M5): the customer area requires a session. Unauthenticated
  // requests are redirected to login with a `next` param to return afterwards.
  const path = request.nextUrl.pathname
  const PROTECTED = ['/dashboard', '/portal', '/account', '/learn', '/assessment', '/safety-chat']
  const needsAuth = PROTECTED.some((p) => path === p || path.startsWith(p + '/'))
  if (!user && needsAuth) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.search = ''
    redirectUrl.searchParams.set('next', path)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
