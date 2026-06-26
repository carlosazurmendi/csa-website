#!/usr/bin/env node
/**
 * CSS fidelity guardrail.
 *
 * The CSA design system is ported VERBATIM from design-reference/project/assets/*.css.
 * Several of its signature effects rely on CSS properties that a minifier/transformer
 * (Next 16 + Turbopack uses lightningcss) can silently DROP or down-level when the
 * build's browser targets are wrong — e.g. `backdrop-filter` (frosted glass) was
 * stripped entirely until a modern `browserslist` was pinned in package.json.
 *
 * This script fails the build if any design-critical effect that exists in the SOURCE
 * CSS is missing from the BUILT CSS. It runs after `next build` (see the `build`
 * script) so a regression can never ship silently again.
 *
 * Add a feature here whenever the design depends on a property the minifier might prune.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC_DIR = 'src/app/(frontend)/styles/csa'
const BUILT_ROOT = '.next/static'

/**
 * Design-critical effects. Each `re` must match the form the build needs to KEEP.
 * NB backdrop-filter requires the UNPREFIXED property — Chrome & Firefox honor
 * `backdrop-filter`, NOT `-webkit-backdrop-filter`. lightningcss has emitted the
 * `-webkit-`-only form for some browser targets, which silently breaks the frosted
 * glass; the negative lookbehind makes that regression FAIL this check.
 */
const FEATURES = [
  { name: 'backdrop-filter, UNPREFIXED (frosted glass / .csa-glass)', re: /(?<!-)backdrop-filter\s*:/i },
  { name: 'background-clip:text (gold-shimmer text)', re: /(?:-webkit-)?background-clip\s*:\s*text/i },
  { name: '-webkit-text-fill-color (gold-shimmer text)', re: /-webkit-text-fill-color\s*:/i },
  { name: 'text-stroke (outlined headlines)', re: /(?:-webkit-)?text-stroke/i },
  { name: 'mask / mask-composite (foil borders)', re: /(?:-webkit-)?mask(?:-composite|-image)?\s*:/i },
  { name: 'clip-path (scroll reveals)', re: /clip-path\s*:/i },
  { name: 'mix-blend-mode', re: /mix-blend-mode\s*:/i },
]

function collectCss(dir) {
  let css = ''
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return css
  }
  for (const e of entries) {
    const p = join(dir, e)
    const s = statSync(p)
    if (s.isDirectory()) css += collectCss(p)
    else if (e.endsWith('.css')) css += '\n' + readFileSync(p, 'utf8')
  }
  return css
}

const sourceCss = collectCss(SRC_DIR)
const builtCss = collectCss(BUILT_ROOT)

if (!sourceCss) {
  console.error(`✗ CSS fidelity: no source CSS found under ${SRC_DIR}`)
  process.exit(1)
}
if (!builtCss) {
  console.error(`✗ CSS fidelity: no built CSS found under ${BUILT_ROOT} — run \`next build\` first`)
  process.exit(1)
}

const failures = []
for (const f of FEATURES) {
  const inSource = f.re.test(sourceCss)
  const inBuilt = f.re.test(builtCss)
  const status = !inSource ? '– skip' : inBuilt ? '✓ ok  ' : '✗ DROP'
  console.log(`  ${status}  ${f.name}`)
  if (inSource && !inBuilt) failures.push(f.name)
}

/*
 * Selector-aware backstop. The "exists anywhere" check above can pass while the
 * signature `.csa-glass` rule itself lost its unprefixed backdrop-filter (another
 * rule still had one). This asserts the `.csa-glass` rule specifically carries an
 * UNPREFIXED backdrop-filter — the exact regression that shipped a flat (un-frosted)
 * glass: lightningcss kept only `-webkit-backdrop-filter`, which Chrome/Firefox ignore.
 */
if (/\.csa-glass\b/.test(sourceCss)) {
  const glassOk = /\.csa-glass[^}]*?(?<!-)backdrop-filter\s*:/s.test(builtCss)
  console.log(`  ${glassOk ? '✓ ok  ' : '✗ DROP'}  .csa-glass rule keeps an unprefixed backdrop-filter`)
  if (!glassOk) failures.push('.csa-glass lost its unprefixed backdrop-filter (frosted glass renders flat)')
}

if (failures.length) {
  console.error(
    `\n✗ CSS fidelity FAILED — the build dropped ${failures.length} design-critical effect(s):\n` +
      failures.map((n) => `    • ${n}`).join('\n') +
      `\n\nThe CSS minifier (lightningcss) stripped these from the output. ` +
      `Usual cause: a too-old or missing \`browserslist\` in package.json. ` +
      `Pin modern targets so the property is preserved (and prefixed), then rebuild.\n`,
  )
  process.exit(1)
}

console.log('\n✓ CSS fidelity OK — all design-critical effects survived the build.')
