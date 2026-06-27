import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { AuthScreen, type AuthCopy } from '../_components/auth/AuthScreen'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Reset Password | CSA',
    description: 'Set a new password for your CSA account.',
  }
}

export default async function ResetPasswordPage() {
  const copy = (await getGlobalSafe<AuthCopy>('auth-pages')) ?? {}
  return <AuthScreen screen="reset" copy={copy} />
}
