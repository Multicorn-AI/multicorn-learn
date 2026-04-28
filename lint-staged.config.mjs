/**
 * Exclude Vite/Vitest cache and node_modules paths from lint-staged.
 * Staged files under .vite (e.g. results.json) are ignored by Prettier and would make
 * `prettier --write` fail with "No matching files" when every path is ignored.
 */
function notCacheOrDeps(f) {
  return !f.includes('node_modules') && !f.includes('.vite')
}

const DIR = new URL('.', import.meta.url).pathname.replace(/\/$/, '')
const ESLINT = `${DIR}/node_modules/.bin/eslint`
const PRETTIER = `${DIR}/node_modules/.bin/prettier`

export default {
  '*.{ts,tsx}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return [
      `${ESLINT} --fix --cache --cache-location .eslintcache ${files.join(' ')}`,
      `${PRETTIER} --write ${files.join(' ')}`,
    ]
  },
  '*.{css,md,mdx}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return `${PRETTIER} --write ${files.join(' ')}`
  },
  '*.{json}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return `${PRETTIER} --write ${files.join(' ')}`
  },
}
