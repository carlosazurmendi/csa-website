import type { Metadata } from 'next'
import { ForgotForm } from '@/components/auth/ForgotForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Forgot Password' }

export default function ForgotPasswordPage() {
  return <ForgotForm />
}
