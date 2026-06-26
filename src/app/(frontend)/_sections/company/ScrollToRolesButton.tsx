'use client'

import type { MouseEvent } from 'react'

/**
 * ScrollToRolesButton — the only interactive bit of the Careers page. Faithful
 * port of the `toRoles` handler in design-reference/project/assets/company.jsx
 * (CompanyCareers): an in-page anchor to #roles that smooth-scrolls with an
 * 80px sticky-nav offset. Both the hero "View Open Roles" (arrow-down) and the
 * closing "View Open Roles" (arrow-up) CTAs use it. Rendered as an <a> with the
 * same classes/markup the export emits; the click is intercepted client-side.
 */
export function ScrollToRolesButton({
  className,
  label,
  icon,
}: {
  className: string
  label: string
  icon: string
}) {
  const toRoles = (e: MouseEvent<HTMLAnchorElement>) => {
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
      {label} <i data-lucide={icon}></i>
    </a>
  )
}
