import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access'

/**
 * Payload ADMIN users (the client's content team) — NOT end users. End users
 * (students/customers) authenticate via Supabase Auth and live in `profiles`.
 *
 * Roles gate what an admin user can do. Enforcement across content collections
 * lands in Phase A2; the field + admin-only management is established here.
 *   - admin      → full control (incl. user management + settings)
 *   - editor     → manage content collections; no user mgmt / system settings
 *   - instructor → manage courses / lessons / assessments only
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    defaultColumns: ['email', 'name', 'roles'],
  },
  auth: true,
  access: {
    // Only admins manage other admin users; any signed-in admin can read the list.
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['admin'],
      saveToJWT: true,
      access: {
        // Only admins can CHANGE an existing user's roles (prevents privilege
        // escalation). Create is left open so the default applies on the
        // first-user bootstrap and when an admin adds a teammate.
        update: isAdminFieldLevel,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Instructor', value: 'instructor' },
      ],
      admin: { description: 'Admin role(s). Controls access across the CMS.' },
    },
  ],
}
