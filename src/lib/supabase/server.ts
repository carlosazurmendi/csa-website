import 'server-only'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

/**
 * Server Supabase client (anon key) bound to the request cookie store, for use
 * in Server Components, Route Handlers and Server Actions. Reads the end-user
 * Supabase session. Session refresh on navigation is handled by middleware.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          // In a pure Server Component render, cookies are read-only and this
          // throws — that's expected; middleware refreshes the session cookie.
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            /* no-op in RSC context */
          }
        },
      },
    },
  )
}
