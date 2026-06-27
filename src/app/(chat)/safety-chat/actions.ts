'use server'

import { getCurrentCustomer } from '@/lib/customer'
import {
  createProject as createProjectLib,
  renameThread as renameThreadLib,
  moveThread as moveThreadLib,
  deleteThread as deleteThreadLib,
  type ChatProject,
} from '@/lib/safetyChat'

/**
 * Safety Chat CRUD (M6.5), owner-scoped. Project + thread mutations that don't
 * stream (new project, rename / move / delete chat). Sending a message + the model
 * reply is the streaming route (./stream/route.ts). Threads are created lazily on
 * first send, so there is no "create empty thread" action here.
 */

export async function createProjectAction(
  name: string,
): Promise<{ project?: ChatProject; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'Not signed in.' }
  const clean = (name || '').trim()
  if (!clean) return { error: 'Name required.' }
  try {
    const project = await createProjectLib(customer.userId, clean)
    return { project }
  } catch {
    return { error: 'Could not create the project.' }
  }
}

export async function renameThreadAction(
  threadId: number,
  title: string,
): Promise<{ ok?: true; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'Not signed in.' }
  const clean = (title || '').trim()
  if (!clean) return { error: 'Title required.' }
  const ok = await renameThreadLib(customer.userId, threadId, clean)
  return ok ? { ok: true } : { error: 'Could not rename.' }
}

export async function moveThreadAction(
  threadId: number,
  projectId: number | null,
): Promise<{ ok?: true; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'Not signed in.' }
  const ok = await moveThreadLib(customer.userId, threadId, projectId)
  return ok ? { ok: true } : { error: 'Could not move.' }
}

export async function deleteThreadAction(
  threadId: number,
): Promise<{ ok?: true; error?: string }> {
  const customer = await getCurrentCustomer()
  if (!customer) return { error: 'Not signed in.' }
  const ok = await deleteThreadLib(customer.userId, threadId)
  return ok ? { ok: true } : { error: 'Could not delete.' }
}
