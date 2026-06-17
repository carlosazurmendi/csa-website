'use client'

import type { ReactNode } from 'react'

/**
 * "View Open Roles" anchor — smooth-scrolls to the #roles section, ported from
 * the design's CompanyCareers `toRoles` handler (assets/company.jsx). Used in
 * the Careers hero and closing CTA. Class-names are passed in so the same link
 * can be a gold pill (hero) or any variant.
 */
export function RolesScrollLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const toRoles = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('roles')
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      })
    }
  }
  return (
    <a className={className} href="#roles" onClick={toRoles}>
      {children}
    </a>
  )
}
