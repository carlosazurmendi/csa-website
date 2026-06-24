import type { Metadata } from 'next'
import { ResetForm } from '@/components/auth/ResetForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Reset Password' }

export default function ResetPasswordPage() {
  return <ResetForm />
}
