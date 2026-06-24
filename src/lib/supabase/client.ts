'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser Supabase client — uses the PUBLIC anon key only (constrained by RLS).
 * The service-role key is never available here. Used by the auth forms and any
 * client component that needs the current session.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  )
}
