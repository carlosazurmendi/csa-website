import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server Supabase client (anon key) bound to the request cookies. Use in Server
 * Components / Route Handlers / Server Actions to read the verified end-user session.
 */
export async function createClient() {
  const cookieStore = await cookies() // cookies() is async in Next 15+

  // Server-side calls reach Supabase Auth at the INTERNAL url when set (e.g. the
  // dev auth-proxy hostname inside Docker); the browser uses NEXT_PUBLIC_SUPABASE_URL.
  // In prod both resolve to the same self-hosted Supabase (SUPABASE_INTERNAL_URL unset).
  return createServerClient(
    process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Must match the browser client's cookie name (see lib/supabase/client.ts).
      cookieOptions: { name: 'sb-csa-auth' },
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
