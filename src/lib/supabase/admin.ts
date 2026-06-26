import 'server-only' // build fails if this module is imported into client code
import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client — BYPASSES RLS. Server-only.
 * Used for trusted mirroring of Supabase users → customerProfiles and other privileged
 * server operations (Milestone 5+). Never import from a Client Component; the key must
 * never reach the browser bundle (no NEXT_PUBLIC_ prefix).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
