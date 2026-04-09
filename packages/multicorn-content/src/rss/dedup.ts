import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import type { FeedItem } from '../types.js'

const WEEKS_MS = 8 * 7 * 24 * 60 * 60 * 1000

export interface ContentState {
  /** SHA-256 hex of URL -> ISO date first seen */
  readonly urlHashes: Record<string, string>
  /** Content review or action IDs submitted for approval (strings for flexibility) */
  readonly submittedReviewIds: readonly string[]
  /** Action ID -> PR URL for outlines already drafted */
  readonly prUrlsByActionId: Record<string, string>
}

function emptyState(): ContentState {
  return {
    urlHashes: {},
    submittedReviewIds: [],
    prUrlsByActionId: {},
  }
}

function pruneUrlHashes(urlHashes: Record<string, string>): Record<string, string> {
  const cutoff = Date.now() - WEEKS_MS
  const next: Record<string, string> = {}
  for (const [hash, iso] of Object.entries(urlHashes)) {
    const t = Date.parse(iso)
    if (!Number.isNaN(t) && t >= cutoff) {
      next[hash] = iso
    }
  }
  return next
}

export function hashUrl(url: string): string {
  return createHash('sha256').update(url, 'utf8').digest('hex')
}

export function loadState(path: string): ContentState {
  if (!existsSync(path)) {
    return emptyState()
  }
  try {
    const raw = readFileSync(path, 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (typeof parsed !== 'object' || parsed === null) return emptyState()
    const o = parsed as Record<string, unknown>
    const urlHashes =
      typeof o.urlHashes === 'object' && o.urlHashes !== null && !Array.isArray(o.urlHashes)
        ? (o.urlHashes as Record<string, string>)
        : {}
    const submittedReviewIds = Array.isArray(o.submittedReviewIds)
      ? o.submittedReviewIds.filter((x): x is string => typeof x === 'string')
      : []
    const prUrlsByActionId =
      typeof o.prUrlsByActionId === 'object' &&
      o.prUrlsByActionId !== null &&
      !Array.isArray(o.prUrlsByActionId)
        ? (o.prUrlsByActionId as Record<string, string>)
        : {}
    return {
      urlHashes,
      submittedReviewIds,
      prUrlsByActionId,
    }
  } catch {
    return emptyState()
  }
}

export function saveState(path: string, state: ContentState): void {
  const pruned: ContentState = {
    urlHashes: pruneUrlHashes({ ...state.urlHashes }),
    submittedReviewIds: [...state.submittedReviewIds],
    prUrlsByActionId: { ...state.prUrlsByActionId },
  }
  const dir = dirname(path)
  if (dir !== '.' && dir !== '') {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(path, JSON.stringify(pruned, null, 2), 'utf8')
}

export function filterNew(items: readonly FeedItem[], state: ContentState): FeedItem[] {
  return items.filter((item) => {
    const h = hashUrl(item.url)
    return state.urlHashes[h] === undefined
  })
}
