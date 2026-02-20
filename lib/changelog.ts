import fs from 'fs'
import path from 'path'

const CHANGELOG_PATH = path.join(process.cwd(), 'content', 'changelog.json')

interface ChangeCategory {
  readonly label: string
  readonly key: keyof Pick<RawRelease, 'added' | 'changed' | 'fixed' | 'security'>
  readonly accentClass: string
}

export const CHANGE_CATEGORIES: readonly ChangeCategory[] = [
  { label: 'Added', key: 'added', accentClass: 'text-green' },
  { label: 'Changed', key: 'changed', accentClass: 'text-blue' },
  { label: 'Fixed', key: 'fixed', accentClass: 'text-orange' },
  { label: 'Security', key: 'security', accentClass: 'text-red' },
] as const

interface RawRelease {
  readonly version: string
  readonly date: string
  readonly added?: readonly string[]
  readonly changed?: readonly string[]
  readonly fixed?: readonly string[]
  readonly security?: readonly string[]
}

export interface Release {
  readonly version: string
  readonly date: string
  readonly added: readonly string[]
  readonly changed: readonly string[]
  readonly fixed: readonly string[]
  readonly security: readonly string[]
}

function normaliseRelease(raw: RawRelease): Release {
  return {
    version: raw.version,
    date: raw.date,
    added: raw.added ?? [],
    changed: raw.changed ?? [],
    fixed: raw.fixed ?? [],
    security: raw.security ?? [],
  }
}

export function getAllReleases(): readonly Release[] {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    return []
  }

  const raw = fs.readFileSync(CHANGELOG_PATH, 'utf-8')
  const parsed: readonly RawRelease[] = JSON.parse(raw)

  return parsed.map(normaliseRelease)
}
