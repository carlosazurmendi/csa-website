import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server Supabase client (anon key) bound to the request cookies. Use in Server
 * Components / Route Handlers / Server Actions to read the verified end-user session.
 */
export async function createClient() {
  const cookieStore = await cookies() // cookies() is async in Next 15+

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component (read-only cookies) — middleware refreshes instead.
          }
        },
      },
    },
  )
}
