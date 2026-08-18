import React from 'react'

/**
 * Renders Schema.org structured data as an application/ld+json script for
 * search engines and AI crawlers. An array becomes one @graph blob (single
 * script per page keeps the node graph connected — @id references between
 * nodes resolve within it). `<` is escaped to its unicode form so
 * CMS-authored text can never break out of the script element (standard
 * JSON-LD XSS guard).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  )
}
