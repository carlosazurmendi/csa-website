// Concatenates the CSA design CSS (src/styles/csa/*.css) into the single
// browser-served bundle public/assets/csa.bundle.css, in the canonical order
// (review-treatments LAST so its overrides win). Client-specific deviations
// live separately in public/assets/csa-overrides.css, linked AFTER the bundle.
//
// Run: npm run build:css  (after editing any src/styles/csa/*.css)
import fs from 'node:fs'
import path from 'node:path'

const ORDER = [
  'colors_and_type',
  'kit',
  'nav',
  'hero',
  'problem',
  'case-studies',
  'partners',
  'services',
  'standing-apart',
  'about',
  'news',
  'footer',
  'consulting-overview',
  'industry-page',
  'company',
  'resources',
  'templates',
  'training',
  'review-treatments',
]

const srcDir = path.join('src', 'styles', 'csa')
const parts = ORDER.map((name) => {
  const file = path.join(srcDir, `${name}.css`)
  const css = fs.readFileSync(file, 'utf8')
  return `/* ===== ${name}.css ===== */\n${css}`
})

const out = parts.join('\n')
const dest = path.join('public', 'assets', 'csa.bundle.css')
fs.writeFileSync(dest, out)
console.log(`Wrote ${dest} — ${out.length} bytes from ${ORDER.length} files`)
