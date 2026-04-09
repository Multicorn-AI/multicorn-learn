import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { LlmClient } from '@multicorn/llm-adapter'
import { extractJsonArray } from '../outline/json.js'
import { filterRelevant } from '../outline/filter.js'
import { generateOutlines } from '../outline/generator.js'
import type { FeedItem } from '../types.js'

function feed(url: string, title: string, summary: string): FeedItem {
  return {
    title,
    url,
    source: 'src',
    publishedAt: new Date().toISOString(),
    summary,
  }
}

function makeLlm(complete: LlmClient['complete']): LlmClient {
  return { complete }
}

describe('outline/filter', () => {
  it('maps relevant and irrelevant items from LLM JSON', async () => {
    const items = [feed('https://a.com/1', 'A', 'sa'), feed('https://b.com/2', 'B', 'sb')]
    const json = JSON.stringify([
      { url: 'https://a.com/1', relevant: true, reason: 'fits' },
      { url: 'https://b.com/2', relevant: false, reason: 'skip' },
    ])
    const llm = makeLlm(async () => ({ content: json, model: 'test' }))
    const results = await filterRelevant(items, llm)
    expect(results).toHaveLength(2)
    expect(results[0]).toMatchObject({ relevant: true, reason: 'fits' })
    expect(results[1]).toMatchObject({ relevant: false, reason: 'skip' })
  })

  it('discards entries with invalid shape from the LLM response', async () => {
    const items = [feed('https://a.com/x', 'T', 's')]
    const json = JSON.stringify([
      'not-an-object',
      { url: 'https://a.com/x', relevant: true, reason: 'ok' },
    ])
    const llm = makeLlm(async () => ({ content: json, model: 'test' }))
    const results = await filterRelevant(items, llm)
    expect(results).toHaveLength(1)
    expect(results[0].relevant).toBe(true)
    expect(results[0].reason).toBe('ok')
  })
})

describe('outline/generator', () => {
  const outlineRow = (suffix: string) => ({
    title: `Title ${suffix}`,
    summary: `Summary ${suffix}`,
    sections: ['s1', 's2', 's3', 's4', 's5'],
    audienceLevel: 'beginner' as const,
    sourceUrl: `https://src.com/${suffix}`,
  })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('caps output at 3 outlines even if the model returns more', async () => {
    const items = Array.from({ length: 5 }, (_, i) =>
      feed(`https://ex.com/${i}`, `T${i}`, 'summary text here'),
    )
    const rows = Array.from({ length: 5 }, (_, i) => outlineRow(String(i)))
    const json = JSON.stringify(rows)
    const llm = makeLlm(async () => ({ content: json, model: 'test' }))
    const outlines = await generateOutlines(items, llm)
    expect(outlines).toHaveLength(3)
  })

  it('generates a slug from the title (lowercase, hyphens, no special chars)', async () => {
    const items = [feed('https://x.com', 'Hello World! @# 2024', 's')]
    const row = {
      title: 'Hello World! @# 2024',
      summary: 'Sum',
      sections: ['a', 'b', 'c', 'd', 'e'],
      audienceLevel: 'intermediate' as const,
      sourceUrl: 'https://x.com',
    }
    const llm = makeLlm(async () => ({ content: JSON.stringify([row]), model: 'test' }))
    const outlines = await generateOutlines(items, llm)
    expect(outlines[0].slug).toBe('hello-world-2024')
  })

  it('sets the date to today (ISO date)', async () => {
    const items = [feed('https://d.com', 'T', 's')]
    const row = outlineRow('1')
    const llm = makeLlm(async () => ({ content: JSON.stringify([row]), model: 'test' }))
    const outlines = await generateOutlines(items, llm)
    expect(outlines[0].date).toBe('2025-06-15')
  })
})

describe('outline/json extractJsonArray', () => {
  it('handles responses wrapped in json fences', () => {
    const text = '```json\n[{"a":1}]\n```'
    expect(extractJsonArray(text)).toEqual([{ a: 1 }])
  })

  it('handles plain JSON without fences', () => {
    const text = '[{"x":true}]'
    expect(extractJsonArray(text)).toEqual([{ x: true }])
  })
})
