/* eslint-disable no-console -- LLM parse failures are logged for operators */
import type { LlmClient } from '@multicorn/llm-adapter'
import type { FeedItem, RelevanceResult } from '../types.js'
import { readFileSync } from 'node:fs'
import { promptPath } from '../paths.js'
import { extractJsonArray } from './json.js'

function isFilterRow(x: unknown): x is { url: string; relevant: boolean; reason: string } {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return (
    typeof o.url === 'string' && typeof o.relevant === 'boolean' && typeof o.reason === 'string'
  )
}

/**
 * Scores articles for Learn relevance in one LLM call. Invalid rows are discarded.
 */
export async function filterRelevant(
  items: readonly FeedItem[],
  llm: LlmClient,
): Promise<RelevanceResult[]> {
  if (items.length === 0) return []

  const template = readFileSync(promptPath('filter.md'), 'utf8')
  const lines = items
    .map((i) => `- URL: ${i.url}\n  Title: ${i.title}\n  Summary: ${i.summary.slice(0, 1500)}`)
    .join('\n\n')

  const userContent = `${template}\n\nArticles:\n${lines}\n\nRespond with a JSON array only.`

  const { content } = await llm.complete(
    [
      {
        role: 'user',
        content: userContent,
      },
    ],
    { maxTokens: 4096, temperature: 0.2 },
  )

  let parsed: unknown
  try {
    parsed = extractJsonArray(content)
  } catch {
    console.warn('[multicorn-content] filter: failed to parse LLM JSON')
    return []
  }

  if (!Array.isArray(parsed)) {
    console.warn('[multicorn-content] filter: LLM response is not an array')
    return []
  }

  const byUrl = new Map<string, { relevant: boolean; reason: string }>()
  for (const row of parsed) {
    if (!isFilterRow(row)) continue
    byUrl.set(row.url, { relevant: row.relevant, reason: row.reason })
  }

  const results: RelevanceResult[] = []
  for (const item of items) {
    const hit = byUrl.get(item.url)
    if (!hit) {
      results.push({ item, relevant: false, reason: 'Not scored by model' })
    } else {
      results.push({ item, relevant: hit.relevant, reason: hit.reason })
    }
  }

  return results
}
