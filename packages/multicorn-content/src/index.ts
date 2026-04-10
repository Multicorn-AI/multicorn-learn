/* eslint-disable no-console -- CLI agent logs run summary and diagnostics */
import { createLlmClient } from '@multicorn/llm-adapter'
import { createDraftPR } from './github/pr.js'
import { filterRelevant } from './outline/filter.js'
import { generateOutlines } from './outline/generator.js'
import { ShieldClient } from './shield/client.js'
import type { AgentConfig, FeedItem, RunSummary } from './types.js'
import { FEEDS, fetchAllFeeds } from './rss/feeds.js'
import { filterNew, hashUrl, loadState, saveState, type ContentState } from './rss/dedup.js'

export type { AgentConfig, FeedItem, Outline, RelevanceResult, RunSummary } from './types.js'
export type { ContentState } from './rss/dedup.js'
export { FEEDS, fetchAllFeeds } from './rss/feeds.js'
export { filterRelevant } from './outline/filter.js'
export { generateOutlines } from './outline/generator.js'
export { ShieldClient } from './shield/client.js'
export { createDraftPR } from './github/pr.js'

function mergeFetchedUrlHashes(state: ContentState, items: readonly FeedItem[]): ContentState {
  const now = new Date().toISOString()
  const urlHashes = { ...state.urlHashes }
  for (const item of items) {
    urlHashes[hashUrl(item.url)] = now
  }
  return { ...state, urlHashes }
}

/**
 * Single pass: fetch RSS, dedupe, relevance filter, generate outlines, open PRs, log to Shield, notify.
 */
export async function run(config: AgentConfig, statePath: string): Promise<RunSummary> {
  const llm = createLlmClient()
  const shield = new ShieldClient(config)

  let state = loadState(statePath)

  const feedsFetched = FEEDS.length
  const items = await fetchAllFeeds(FEEDS)
  const articlesFound = items.length

  const freshItems = filterNew(items, state)
  const newArticles = freshItems.length

  const relevance = await filterRelevant(freshItems, llm)
  const relevantItems = relevance.filter((r) => r.relevant).map((r) => r.item)
  const relevantArticles = relevantItems.length

  const outlines = await generateOutlines(relevantItems, llm)

  await shield.findOrRegisterAgent()

  const prRows: Array<{ title: string; prUrl: string }> = []
  let prsCreated = 0

  for (const outline of outlines) {
    let prUrl: string | null
    try {
      prUrl = await createDraftPR(outline, config)
    } catch (e) {
      console.warn('[multicorn-content] createDraftPR failed:', e)
      continue
    }
    if (prUrl === null) {
      continue
    }
    prsCreated++
    void shield.logOutlineCreated(outline, prUrl)
    prRows.push({ title: outline.title, prUrl })
  }

  await shield.sendPrNotification(prRows)

  state = mergeFetchedUrlHashes(state, items)
  saveState(statePath, state)

  const summary: RunSummary = {
    feedsFetched,
    articlesFound,
    newArticles,
    relevantArticles,
    prsCreated,
  }

  console.log(
    `[multicorn-content] run complete: feeds=${summary.feedsFetched} articles=${summary.articlesFound} ` +
      `new=${summary.newArticles} relevant=${summary.relevantArticles} prs=${summary.prsCreated}`,
  )

  return summary
}
