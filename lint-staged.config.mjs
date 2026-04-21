/**
 * Exclude Vite/Vitest cache and node_modules paths from lint-staged.
 * Staged files under .vite (e.g. results.json) are ignored by Prettier and would make
 * `prettier --write` fail with "No matching files" when every path is ignored.
 */
function notCacheOrDeps(f) {
  return !f.includes('node_modules') && !f.includes('.vite')
}

/** Build-generated from multicorn-shield CHANGELOG; do not format on commit. */
function notGeneratedChangelog(f) {
  const n = f.replace(/\\/g, '/')
  return !n.endsWith('content/changelog.json')
}

export default {
  '*.{ts,tsx}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return [
      `pnpm exec eslint --fix --cache --cache-location .eslintcache ${files.join(' ')}`,
      `pnpm exec prettier --write ${files.join(' ')}`,
    ]
  },
  '*.{css,md,mdx}': (filenames) => {
    const files = filenames.filter(notCacheOrDeps)
    if (files.length === 0) return []
    return `pnpm exec prettier --write ${files.join(' ')}`
  },
  '*.json': (filenames) => {
    const files = filenames
      .filter(notCacheOrDeps)
      .filter(notGeneratedChangelog)
    if (files.length === 0) return []
    return `pnpm exec prettier --write ${files.join(' ')}`
  },
}
