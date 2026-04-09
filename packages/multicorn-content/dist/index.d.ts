import { LlmClient } from '@multicorn/llm-adapter'

interface FeedItem {
  readonly title: string
  readonly url: string
  readonly source: string
  readonly publishedAt: string
  readonly summary: string
}
interface RelevanceResult {
  readonly item: FeedItem
  readonly relevant: boolean
  readonly reason: string
}
interface Outline {
  readonly title: string
  readonly summary: string
  readonly sections: readonly string[]
  readonly audienceLevel: 'beginner' | 'intermediate' | 'advanced'
  readonly sourceUrl: string
  readonly slug: string
  readonly date: string
  /** Set when loading from Shield approved actions (PR phase). */
  readonly actionId?: string
}
interface AgentConfig {
  readonly shieldApiUrl: string
  readonly shieldApiKey: string
  readonly githubToken: string
  readonly githubRepo: string
}
interface RunSummary {
  readonly feedsFetched: number
  readonly articlesFound: number
  readonly newArticles: number
  readonly relevantArticles: number
  readonly outlinesSubmitted: number
  readonly prsCreated: number
}

interface ContentState {
  /** SHA-256 hex of URL -> ISO date first seen */
  readonly urlHashes: Record<string, string>
  /** Content review or action IDs submitted for approval (strings for flexibility) */
  readonly submittedReviewIds: readonly string[]
  /** Action ID -> PR URL for outlines already drafted */
  readonly prUrlsByActionId: Record<string, string>
}

declare const FEEDS: readonly [
  {
    readonly name: 'The Neuron'
    readonly url: 'https://www.theneuron.ai/rss'
  },
  {
    readonly name: 'MIT Tech Review AI'
    readonly url: 'https://www.technologyreview.com/feed/'
  },
  {
    readonly name: 'The Verge AI'
    readonly url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'
  },
]
/**
 * Fetches all feeds in parallel. Failed feeds are skipped (logged to console).
 * Returns up to 30 items total, most recent first across all sources.
 */
declare function fetchAllFeeds(feeds: typeof FEEDS): Promise<FeedItem[]>

/**
 * Scores articles for Learn relevance in one LLM call. Invalid rows are discarded.
 */
declare function filterRelevant(
  items: readonly FeedItem[],
  llm: LlmClient,
): Promise<RelevanceResult[]>

/**
 * Generates up to 3 outlines from the first items (caller should pass relevant items only).
 */
declare function generateOutlines(items: readonly FeedItem[], llm: LlmClient): Promise<Outline[]>

declare class ShieldClient {
  private readonly config
  private readonly api
  private readonly apiKey
  private agentId
  constructor(config: AgentConfig)
  findOrRegisterAgent(): Promise<string>
  /**
   * Logs a requires_approval action; server creates a content review. Returns action id (used for PR tracking).
   */
  submitForApproval(outline: Outline): Promise<string>
  /**
   * Triggers the batched content outline approval email for the submitted action IDs.
   */
  sendApprovalNotification(actionIds: string[]): Promise<void>
  /**
   * Loads approved outline submissions for this agent (drafts service) that are ready for PR creation.
   */
  getApprovedOutlines(agentId: string): Promise<Outline[]>
  getAgentId(): string | null
}

/**
 * Creates a branch, commits the draft outline, opens a PR to main.
 */
declare function createDraftPR(outline: Outline, config: AgentConfig): Promise<string>

/**
 * Phase 1: fetch RSS, dedupe, relevance filter, outline generation, submit to Shield.
 * Phase 2: approved outlines from Shield, create PRs for any not yet drafted.
 */
declare function run(config: AgentConfig, statePath: string): Promise<RunSummary>

export {
  type AgentConfig,
  type ContentState,
  FEEDS,
  type FeedItem,
  type Outline,
  type RelevanceResult,
  type RunSummary,
  ShieldClient,
  createDraftPR,
  fetchAllFeeds,
  filterRelevant,
  generateOutlines,
  run,
}
