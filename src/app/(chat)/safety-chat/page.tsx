import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentCustomer } from '@/lib/customer'
import { getMyProjects, getMyThreads } from '@/lib/safetyChat'
import { SafetyChatClient } from './SafetyChatClient'

/**
 * Safety Chat app (/safety-chat) — port of design-reference/project/Customer Portal/
 * Safety Chat.html (assets/safety-chat-app.jsx). A ChatGPT-style functional-safety
 * assistant: left rail of Projects + Chats, a thread, and a composer. Gated by
 * middleware (session). Conversations persist server-side per user (chat-projects /
 * chat-threads); the assistant reply streams from the server-only Anthropic route.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Safety Chat | CSA',
  robots: { index: false, follow: false },
}

function initialsOf(name?: string | null): string {
  return (
    (name || 'U')
      .split(' ')
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'
  )
}

export default async function SafetyChatPage() {
  const customer = await getCurrentCustomer()
  if (!customer) redirect('/login?next=/safety-chat')

  const [projects, threads] = await Promise.all([
    getMyProjects(customer.userId),
    getMyThreads(customer.userId),
  ])

  return (
    <SafetyChatClient
      projects={projects}
      threads={threads}
      user={{
        fullName: customer.profile.fullName || 'You',
        initials: initialsOf(customer.profile.fullName),
        plan: customer.profile.plan || 'Customer',
      }}
    />
  )
}
