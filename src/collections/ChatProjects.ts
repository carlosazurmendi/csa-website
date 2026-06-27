// Locked down — owner-scoped, server-only access (read/written via src/lib/safetyChat.ts).
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Chat Projects (Safety Chat, M6.5) — a learner's folders for grouping Safety Chat
 * conversations. Mirrors the `projects` rail in design-reference/project/assets/
 * safety-chat-app.jsx (localStorage stand-in there; server-side per user here).
 * Locked on the public API; read/written via the server-only Payload client
 * filtered by the Supabase user id.
 */
export const ChatProjects: CollectionConfig = {
  slug: 'chat-projects',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'name',
    defaultColumns: ['name', 'userId', 'sortOrder'],
    description: 'Safety Chat projects (folders) — one set per user.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Supabase auth.users.id of the owner.' },
    },
    { name: 'name', type: 'text', required: true, admin: { description: 'Project name.' } },
    {
      name: 'icon',
      type: 'text',
      defaultValue: 'folder',
      admin: { description: 'Lucide icon name shown next to the project.' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Sort order in the rail.' },
    },
  ],
}
