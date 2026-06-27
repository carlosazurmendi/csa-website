import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser Supabase client (anon key only). Safe to import into Client Components.
 *
 * Reads the public Supabase config from `window.__CSA_ENV__` — injected at RUNTIME
 * by the (frontend) layout from server-side process.env — rather than from inlined
 * NEXT_PUBLIC_* values. The production image is built without env (env_file is
 * runtime only), so build-time inlining would bake `undefined`; runtime injection
 * keeps one portable image that points at dev MinIO/GoTrue or prod Supabase by env.
 */
export function createClient() {
  const env = (typeof window !== 'undefined' && window.__CSA_ENV__) || {}
  const url = env.supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anon = env.supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  // Pin an explicit cookie name so browser + server clients agree regardless of
  // their (dual) URLs — @supabase/ssr otherwise derives the name from the URL ref,
  // and the dev browser/container URLs differ, so the server wouldn't see the session.
  return createBrowserClient(url, anon, { cookieOptions: { name: 'sb-csa-auth' } })
}
