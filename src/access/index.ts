import type { Access, FieldAccess } from 'payload'

/**
 * Payload access-control helpers for the admin Users roles (admin / editor /
 * instructor) and for content publish-gating.
 *
 * NOTE on end-user app data (enrollments, progress, attempts, certificates,
 * orders, entitlements, profiles): those collections are API-locked to
 * authenticated Payload admins only. End users (Supabase-authenticated, with
 * NO Payload session) never reach these access functions via the public API —
 * all their reads/writes go through trusted server code using overrideAccess.
 */

export type Role = 'admin' | 'editor' | 'instructor'

const rolesOf = (req: { user?: unknown }): Role[] => {
  const user = req?.user as { roles?: Role[] } | undefined
  return user?.roles ?? []
}

/** Any signed-in Payload admin user. */
export const authenticated: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => rolesOf(req).includes('admin')

export const isAdminFieldLevel: FieldAccess = ({ req }) => rolesOf(req).includes('admin')

export const isAdminOrEditor: Access = ({ req }) => {
  const r = rolesOf(req)
  return r.includes('admin') || r.includes('editor')
}

export const isAdminOrInstructor: Access = ({ req }) => {
  const r = rolesOf(req)
  return r.includes('admin') || r.includes('instructor')
}

/**
 * Public read limited to PUBLISHED docs; signed-in admins see drafts too.
 * Apply as `read` on draft-enabled content collections (Phase A2).
 */
export const publishedOrAuthed: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
