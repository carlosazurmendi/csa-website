import React from 'react'

/**
 * Auth screens share the cinematic glass-card scene. Nav/Footer + the base
 * design bundle come from the parent (frontend) layout; this only adds the
 * auth-specific stylesheet (React hoists the <link>).
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/auth.css" precedence="csa-auth" />
      {children}
    </>
  )
}
