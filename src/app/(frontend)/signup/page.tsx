import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { AuthScreen, type AuthCopy } from '../_components/auth/AuthScreen'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sign Up | CSA',
    description:
      'Create your CSA account — one login for functional-safety training, templates, and your customer portal.',
  }
}

export default async function SignupPage() {
  const copy = (await getGlobalSafe<AuthCopy>('auth-pages')) ?? {}
  return (
    <AuthScreen screen="signup" copy={copy} googleEnabled={process.env.NEXT_PUBLIC_AUTH_GOOGLE === 'true'} />
  )
}
