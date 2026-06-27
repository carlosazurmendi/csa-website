/**
 * Maps a Supabase auth user to the minimal shape the nav account menu renders.
 * Dependency-free so both the server layout and the client header can import it.
 */
export type AuthUser = { email: string; fullName: string; initials: string } | null

type SupaUserLike =
  | { email?: string | null; user_metadata?: Record<string, unknown> | null }
  | null
  | undefined

function initialsOf(name: string, email: string): string {
  const base = (name || '').trim() || email || ''
  const parts = base.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return (base.slice(0, 2) || '?').toUpperCase()
}

export function toAuthUser(u: SupaUserLike): AuthUser {
  if (!u) return null
  const email = u.email ?? ''
  const meta = u.user_metadata ?? {}
  const fullName =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    email.split('@')[0] ||
    'Account'
  return { email, fullName, initials: initialsOf(fullName, email) }
}
