/**
 * Exclude Vite/Vitest cache and node_modules paths from lint-staged.
 * Staged files under .vite (e.g. results.json) are ignored by Prettier and would make
 * `prettier --write` fail with "No matching files" when every path is ignored.
 */
function notCacheOrDeps(f) {
  return !f.includes('node_modules') && !f.includes('.vite')
}

export default {
  '*.{ts,tsx}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return [
      `eslint --fix --cache --cache-location .eslintcache ${files.join(' ')}`,
      `prettier --write ${files.join(' ')}`,
    ]
  },
  '*.{css,md,mdx}': 'prettier --write',
  '*.{json}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return `prettier --write ${files.join(' ')}`
  },
}
