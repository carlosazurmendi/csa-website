// Locked down — owner-scoped, server-only access (read/written via src/lib/safetyChat.ts).
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

/**
 * Chat Threads (Safety Chat, M6.5) — a single Safety Chat conversation, optionally
 * grouped under a Chat Project. Messages are stored as a JSON array on the thread
 * ({ role, text, atts } — atts are display-safe file metadata, not file content):
 * chat history is a natural blob we never query into, so json keeps the schema flat
 * (no nested message/attachment tables). Mirrors the `chats` model in
 * design-reference/project/assets/safety-chat-app.jsx (localStorage stand-in there;
 * server-side per user here). Locked on the public API; read/written via the
 * server-only Payload client filtered by the Supabase user id.
 */
export const ChatThreads: CollectionConfig = {
  slug: 'chat-threads',
  admin: {
    group: 'Customers (App Data)',
    useAsTitle: 'title',
    defaultColumns: ['title', 'userId', 'project', 'updatedAt'],
    description: 'Safety Chat conversations. Messages are stored as a JSON array.',
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
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'chat-projects',
      admin: { description: 'Optional project (folder) this chat belongs to.' },
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'New chat',
      admin: { description: 'Conversation title (first user message, truncated).' },
    },
    {
      name: 'messages',
      type: 'json',
      defaultValue: [],
      admin: {
        description:
          'Ordered messages: [{ role: "user"|"bot", text, atts: [{ name, ext, sizeLabel }] }]. Attachments store display metadata only — file content is never persisted, only sent to the model on the turn it was attached.',
      },
    },
    // Payload's automatic `updatedAt` (timestamps: true) drives rail ordering.
  ],
}
