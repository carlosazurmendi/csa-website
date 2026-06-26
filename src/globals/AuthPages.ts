import type { GlobalConfig } from 'payload'
import { seoField } from '@/fields/seo'
import { publishedOrAdmin, editorWrite } from '@/access'

/**
 * Auth Pages (slug 'auth-pages') — copy for all four authentication screens
 * (log in, sign up, forgot password, reset password) as typed groups, plus
 * the shared SSO label, legal/consent copy, and the trust-strip standards.
 * The forms themselves post to Supabase auth — this global only carries copy.
 */
export const AuthPages: GlobalConfig = {
  slug: 'auth-pages',
  dbName: 'auth_pg',
  label: 'Auth Pages (Login / Sign Up / Reset)',
  versions: { drafts: true },
  access: { read: publishedOrAdmin, update: editorWrite },
  admin: {
    group: 'Pages',
    description: 'Copy for the login, sign-up, and password-reset screens.',
  },
  fields: [
    {
      type: 'group',
      name: 'shared',
      label: 'Shared copy',
      fields: [
        {
          name: 'googleSsoLabelLogin',
          type: 'text',
          label: 'Google SSO label (login)',
          defaultValue: 'Continue with Google',
        },
        {
          name: 'googleSsoLabelSignup',
          type: 'text',
          label: 'Google SSO label (sign up)',
          defaultValue: 'Sign up with Google',
        },
        {
          name: 'orDivider',
          type: 'text',
          label: 'Divider label',
          defaultValue: 'or',
        },
        {
          name: 'trustStandards',
          type: 'array',
          label: 'Trust-strip standards',
          admin: { description: 'Standards codes shown beneath the auth card.' },
          fields: [{ name: 'code', type: 'text', required: true }],
          defaultValue: [
            { code: 'ISO 13849' },
            { code: 'IEC 61508' },
            { code: 'ISO 26262' },
            { code: 'IEC 62061' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'login',
      label: 'Log In screen',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Welcome back' },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Log in to CSA' },
        {
          name: 'sub',
          type: 'textarea',
          defaultValue:
            'Access your dashboard, on-demand training, and purchased templates.',
        },
        { name: 'submitLabel', type: 'text', defaultValue: 'Log In' },
        { name: 'forgotLinkLabel', type: 'text', defaultValue: 'Forgot password?' },
        { name: 'rememberLabel', type: 'text', defaultValue: 'Remember me' },
        {
          name: 'signupPrompt',
          type: 'text',
          label: 'Sign-up prompt',
          defaultValue: 'New to CSA? Create an account',
        },
        {
          name: 'successHeading',
          type: 'text',
          label: 'Success heading',
          defaultValue: 'You’re signed in',
        },
      ],
    },
    {
      type: 'group',
      name: 'signup',
      label: 'Sign Up screen',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Create your account' },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Join CSA' },
        {
          name: 'sub',
          type: 'textarea',
          defaultValue:
            'One account for functional-safety training, templates, and your customer portal.',
        },
        { name: 'submitLabel', type: 'text', defaultValue: 'Create Account' },
        {
          name: 'termsConsentLabel',
          type: 'text',
          label: 'Terms checkbox label',
          defaultValue: 'I agree to the Terms & Privacy Policy',
        },
        {
          name: 'legalCopy',
          type: 'textarea',
          label: 'Legal / consent copy',
          defaultValue:
            'By creating an account you agree to CSA’s Terms of Service and Privacy Policy.',
        },
        {
          name: 'loginPrompt',
          type: 'text',
          label: 'Log-in prompt',
          defaultValue: 'Already have an account? Log in',
        },
        {
          name: 'successHeading',
          type: 'text',
          label: 'Success heading',
          defaultValue: 'Account created',
        },
        {
          name: 'successBody',
          type: 'textarea',
          label: 'Success body',
          defaultValue:
            'We sent a verification link to your inbox. Confirm your email to unlock training and template downloads.',
        },
      ],
    },
    {
      type: 'group',
      name: 'forgotPassword',
      label: 'Forgot Password screen',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Account recovery' },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Forgot your password?' },
        {
          name: 'sub',
          type: 'textarea',
          defaultValue:
            "Enter the email tied to your account and we'll send a secure reset link.",
        },
        { name: 'submitLabel', type: 'text', defaultValue: 'Send Reset Link' },
        {
          name: 'successHeading',
          type: 'text',
          label: 'Success heading',
          defaultValue: 'Check your email',
        },
        {
          name: 'successBody',
          type: 'textarea',
          label: 'Success body',
          admin: { description: 'Neutral confirmation — never reveals whether an account exists.' },
          defaultValue:
            'If an account exists for that address, a secure password-reset link is on its way. The link expires in 30 minutes.',
        },
        {
          name: 'backToLoginLabel',
          type: 'text',
          defaultValue: '← Back to log in',
        },
      ],
    },
    {
      type: 'group',
      name: 'resetPassword',
      label: 'Reset Password screen',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Set a new password' },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Reset password' },
        {
          name: 'sub',
          type: 'textarea',
          defaultValue: 'Choose a strong new password for your account.',
        },
        { name: 'submitLabel', type: 'text', defaultValue: 'Update Password' },
        {
          name: 'strengthHint',
          type: 'text',
          label: 'Password-strength hint',
          defaultValue: '8+ chars, mixed case, a number',
        },
        {
          name: 'successHeading',
          type: 'text',
          label: 'Success heading',
          defaultValue: 'Password updated',
        },
        {
          name: 'successBody',
          type: 'textarea',
          label: 'Success body',
          defaultValue:
            'Your password has been changed. For your security, all other sessions have been signed out.',
        },
      ],
    },
    seoField,
  ],
}
