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

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms))
}

async function withRetries<T>(label: string, fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: Error | undefined
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (e) {
      last = e instanceof Error ? e : new Error(String(e))
      const delay = 1000 * 4 ** i
      console.warn(
        `[multicorn-content] ${label} failed (attempt ${i + 1}/${attempts}): ${last.message}`,
      )
      if (i < attempts - 1) await sleep(delay)
    }
  }
  throw last ?? new Error(`${label} failed`)
}

function mergeFetchedUrlHashes(state: ContentState, items: readonly FeedItem[]): ContentState {
  const now = new Date().toISOString()
  const urlHashes = { ...state.urlHashes }
  for (const item of items) {
    urlHashes[hashUrl(item.url)] = now
  }
  return { ...state, urlHashes }
}

/**
 * Phase 1: fetch RSS, dedupe, relevance filter, outline generation, submit to Shield.
 * Phase 2: approved outlines from Shield, create PRs for any not yet drafted.
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

  const agentId = await shield.findOrRegisterAgent()

  let outlinesSubmitted = 0
  const submittedIds = [...state.submittedReviewIds]
  const actionIdsThisRun: string[] = []

  for (const outline of outlines) {
    try {
      const actionId = await withRetries('submitForApproval', () =>
        shield.submitForApproval(outline),
      )
      submittedIds.push(actionId)
      actionIdsThisRun.push(actionId)
      outlinesSubmitted++
    } catch (e) {
      console.warn('[multicorn-content] submitForApproval gave up:', e)
    }
  }

  if (actionIdsThisRun.length > 0) {
    try {
      await shield.sendApprovalNotification(actionIdsThisRun)
    } catch (e) {
      console.warn('[multicorn-content] sendApprovalNotification failed:', e)
    }
  }

  state = mergeFetchedUrlHashes(state, items)
  state = { ...state, submittedReviewIds: submittedIds }

  let prsCreated = 0
  const prUrls = { ...state.prUrlsByActionId }

  try {
    console.log(`[multicorn-content] Phase 2: polling for approved outlines, agentId=${agentId}`)
    const approved = await withRetries('getApprovedOutlines', () =>
      shield.getApprovedOutlines(agentId),
    )
    console.log(`[multicorn-content] Phase 2: found ${approved.length} approved outlines`)

    for (const outline of approved) {
      console.log(
        `[multicorn-content] Phase 2: outline actionId=${outline.actionId}, title=${outline.title}`,
      )
      const aid = outline.actionId
      if (!aid || prUrls[aid]) {
        if (aid && prUrls[aid]) {
          console.log(
            `[multicorn-content] Phase 2: skipping ${outline.actionId} (PR already exists: ${prUrls[aid]})`,
          )
        }
        continue
      }

      try {
        console.log(`[multicorn-content] Phase 2: before createDraftPR for actionId=${aid}`)
        let prUrl: string
        try {
          prUrl = await createDraftPR(outline, config)
        } catch (first) {
          console.warn('[multicorn-content] createDraftPR retry once:', first)
          prUrl = await createDraftPR(outline, config)
        }
        console.log(
          `[multicorn-content] Phase 2: after createDraftPR for actionId=${aid}, prUrl=${prUrl}`,
        )
        prUrls[aid] = prUrl
        prsCreated++
      } catch (e) {
        console.warn('[multicorn-content] createDraftPR failed:', e)
      }
    }
  } catch (e) {
    console.warn('[multicorn-content] phase 2 failed:', e)
  }

  state = { ...state, prUrlsByActionId: prUrls }
  saveState(statePath, state)

  const summary: RunSummary = {
    feedsFetched,
    articlesFound,
    newArticles,
    relevantArticles,
    outlinesSubmitted,
    prsCreated,
  }

  console.log(
    `[multicorn-content] run complete: feeds=${summary.feedsFetched} articles=${summary.articlesFound} ` +
      `new=${summary.newArticles} relevant=${summary.relevantArticles} submitted=${summary.outlinesSubmitted} prs=${summary.prsCreated}`,
  )

  return summary
}
