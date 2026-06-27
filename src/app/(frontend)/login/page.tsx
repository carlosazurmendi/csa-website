import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { AuthScreen, type AuthCopy } from '../_components/auth/AuthScreen'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Log In | CSA',
    description:
      'Log in to Critical Systems Analysis — access your dashboard, on-demand training, and purchased functional-safety templates.',
  }
}

export default async function LoginPage() {
  const copy = (await getGlobalSafe<AuthCopy>('auth-pages')) ?? {}
  return (
    <AuthScreen screen="login" copy={copy} googleEnabled={process.env.NEXT_PUBLIC_AUTH_GOOGLE === 'true'} />
  )
}
