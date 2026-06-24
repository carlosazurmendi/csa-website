import 'server-only'

import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client — SERVER ONLY. Bypasses RLS. Never import this
 * into a client component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 * Used for privileged operations: minting signed Storage URLs after a
 * server-side entitlement check, admin user lookups, etc.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}
