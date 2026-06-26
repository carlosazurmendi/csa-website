import type { Access, FieldAccess } from 'payload'

type MaybeUser = { roles?: string[] | null } | null | undefined

export const isAdmin = (user: MaybeUser): boolean => !!user?.roles?.includes('admin')

export const isEditor = (user: MaybeUser): boolean =>
  !!user?.roles?.some((r) => r === 'admin' || r === 'editor')

export const isInstructor = (user: MaybeUser): boolean =>
  !!user?.roles?.some((r) => r === 'admin' || r === 'instructor')

/**
 * Public read = PUBLISHED entries only. Any authenticated Payload admin user
 * (content team) sees drafts too. Supabase end users are NOT Payload users, so on the
 * public REST/GraphQL API they are unauthenticated → published-only. End-user data is
 * served exclusively through session-scoped server code (Milestone 5), never this API.
 */
export const publishedOrAdmin: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** Content editors (admin or editor) may write. */
export const editorWrite: Access = ({ req: { user } }) => isEditor(user as MaybeUser)

/** Admin-only access (used as the safe default for app/user-owned collections in M2). */
export const adminOnly: Access = ({ req: { user } }) => isAdmin(user as MaybeUser)

/** Any authenticated Payload user. */
export const authenticated: Access = ({ req: { user } }) => !!user

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => isAdmin(user as MaybeUser)
