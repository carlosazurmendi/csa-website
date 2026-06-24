import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Refreshes the Supabase session cookie on navigation and gates the
 * authenticated end-user areas. End-user auth = Supabase (separate from the
 * Payload admin at /admin, which has its own auth and is excluded below).
 *
 * Until SUPABASE env is configured, this is a no-op pass-through so the public
 * site keeps working.
 */
const PROTECTED_PREFIXES = ['/dashboard', '/portal', '/account', '/learn', '/assessment']

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return NextResponse.next({ request })

  let response = NextResponse.next({ request })

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  // getUser() validates the token with Supabase and triggers cookie refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const needsAuth = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))

  if (needsAuth && !user) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/login'
    redirect.search = ''
    redirect.searchParams.set('returnTo', path)
    return NextResponse.redirect(redirect)
  }

  return response
}

export const config = {
  // Run on everything except static assets, the Payload admin, and API routes.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets|admin|api).*)'],
}
