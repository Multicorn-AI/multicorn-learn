import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Package root (works from `src/*.ts` and bundled `dist/index.js`). */
const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))

export function promptPath(name: string): string {
  return join(packageRoot, 'prompts', name)
}
