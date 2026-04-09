/* eslint-disable no-console -- LLM parse failures are logged for operators */
import type { LlmClient } from '@multicorn/llm-adapter'
import type { FeedItem, Outline } from '../types.js'
import { readFileSync } from 'node:fs'
import { promptPath } from '../paths.js'
import { extractJsonArray } from './json.js'

const MAX_OUTLINES = 3

function slugifyTitle(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'untitled'
  )
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

function isAudience(x: unknown): x is Outline['audienceLevel'] {
  return x === 'beginner' || x === 'intermediate' || x === 'advanced'
}

function isOutlineRow(x: unknown): x is {
  title: string
  summary: string
  sections: string[]
  audienceLevel: Outline['audienceLevel']
  sourceUrl: string
} {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  if (typeof o.title !== 'string' || typeof o.summary !== 'string') return false
  if (!Array.isArray(o.sections) || o.sections.length !== 5) return false
  if (!o.sections.every((s) => typeof s === 'string')) return false
  if (typeof o.sourceUrl !== 'string') return false
  return isAudience(o.audienceLevel)
}

/**
 * Generates up to 3 outlines from the first items (caller should pass relevant items only).
 */
export async function generateOutlines(
  items: readonly FeedItem[],
  llm: LlmClient,
): Promise<Outline[]> {
  const batch = items.slice(0, MAX_OUTLINES)
  if (batch.length === 0) return []

  const template = readFileSync(promptPath('outline.md'), 'utf8')
  const lines = batch
    .map((i) => `- URL: ${i.url}\n  Title: ${i.title}\n  Summary: ${i.summary.slice(0, 2000)}`)
    .join('\n\n')

  const userContent = `${template}\n\nArticles (generate at most ${MAX_OUTLINES} outlines):\n${lines}\n\nRespond with a JSON array only.`

  const { content } = await llm.complete([{ role: 'user', content: userContent }], {
    maxTokens: 8192,
    temperature: 0.3,
  })

  let parsed: unknown
  try {
    parsed = extractJsonArray(content)
  } catch {
    console.warn('[multicorn-content] generator: failed to parse LLM JSON')
    return []
  }

  if (!Array.isArray(parsed)) {
    console.warn('[multicorn-content] generator: LLM response is not an array')
    return []
  }

  const date = todayIsoDate()
  const outlines: Outline[] = []

  for (const row of parsed) {
    if (outlines.length >= MAX_OUTLINES) break
    if (!isOutlineRow(row)) continue
    outlines.push({
      title: row.title.trim(),
      summary: row.summary.trim(),
      sections: row.sections.map((s) => s.trim()),
      audienceLevel: row.audienceLevel,
      sourceUrl: row.sourceUrl.trim(),
      slug: slugifyTitle(row.title),
      date,
    })
  }

  return outlines
}
