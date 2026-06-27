import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { AuthScreen, type AuthCopy } from '../_components/auth/AuthScreen'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Forgot Password | CSA',
    description: 'Reset your CSA account password — we’ll email you a secure reset link.',
  }
}

export default async function ForgotPasswordPage() {
  const copy = (await getGlobalSafe<AuthCopy>('auth-pages')) ?? {}
  return <AuthScreen screen="forgot" copy={copy} />
}
