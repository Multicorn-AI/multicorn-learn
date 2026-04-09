import { afterEach, describe, expect, it } from 'vitest'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { filterNew, hashUrl, loadState, saveState, type ContentState } from '../rss/dedup.js'
import type { FeedItem } from '../types.js'

function item(url: string, title = 't'): FeedItem {
  return {
    title,
    url,
    source: 's',
    publishedAt: new Date().toISOString(),
    summary: 'sum',
  }
}

describe('dedup', () => {
  const tmpPaths: string[] = []

  afterEach(() => {
    for (const p of tmpPaths) {
      try {
        if (existsSync(p)) {
          rmSync(p, { force: true })
        }
      } catch {
        /* ignore */
      }
    }
    tmpPaths.length = 0
  })

  function tmpFile(name: string): string {
    const dir = join(
      tmpdir(),
      `multicorn-content-test-${process.pid}-${Math.random().toString(36).slice(2)}`,
    )
    mkdirSync(dir, { recursive: true })
    const path = join(dir, name)
    tmpPaths.push(path)
    return path
  }

  it('hashUrl returns a consistent SHA-256 hex string for the same URL', () => {
    const u = 'https://example.com/article'
    expect(hashUrl(u)).toBe(hashUrl(u))
    expect(hashUrl(u)).toMatch(/^[a-f0-9]{64}$/)
  })

  it('hashUrl returns different hashes for different URLs', () => {
    expect(hashUrl('https://a.com/1')).not.toBe(hashUrl('https://a.com/2'))
  })

  it('filterNew removes items whose URL hash already exists in state', () => {
    const u = 'https://example.com/x'
    const h = hashUrl(u)
    const state: ContentState = {
      urlHashes: { [h]: new Date().toISOString() },
      submittedReviewIds: [],
      prUrlsByActionId: {},
    }
    const items = [item(u), item('https://other.com/y')]
    const out = filterNew(items, state)
    expect(out).toHaveLength(1)
    expect(out[0].url).toBe('https://other.com/y')
  })

  it('filterNew passes through items not in state', () => {
    const state: ContentState = {
      urlHashes: {},
      submittedReviewIds: [],
      prUrlsByActionId: {},
    }
    const items = [item('https://a.com'), item('https://b.com')]
    expect(filterNew(items, state)).toEqual(items)
  })

  it('loadState returns empty state when file does not exist', () => {
    const path = join(tmpdir(), `multicorn-content-no-state-${Date.now()}-${Math.random()}.json`)
    const s = loadState(path)
    expect(s.urlHashes).toEqual({})
    expect(s.submittedReviewIds).toEqual([])
    expect(s.prUrlsByActionId).toEqual({})
  })

  it('saveState then loadState round-trips correctly', () => {
    const path = tmpFile('state.json')
    const recentIso = new Date().toISOString()
    const state: ContentState = {
      urlHashes: { abc: recentIso },
      submittedReviewIds: ['id1'],
      prUrlsByActionId: { x: 'https://pr' },
    }
    saveState(path, state)
    expect(loadState(path)).toEqual(state)
  })

  it('saveState prunes entries older than 8 weeks', () => {
    const path = tmpFile('prune.json')
    const oldIso = '2000-01-01T00:00:00.000Z'
    const recentIso = new Date().toISOString()
    const oldHash = 'deadbeef'
    const recentHash = 'cafebabe'
    const state: ContentState = {
      urlHashes: {
        [oldHash]: oldIso,
        [recentHash]: recentIso,
      },
      submittedReviewIds: [],
      prUrlsByActionId: {},
    }
    saveState(path, state)
    const loaded = loadState(path)
    expect(loaded.urlHashes[oldHash]).toBeUndefined()
    expect(loaded.urlHashes[recentHash]).toBe(recentIso)
  })
})
