export interface FeedItem {
  readonly title: string
  readonly url: string
  readonly source: string
  readonly publishedAt: string
  readonly summary: string
}

export interface RelevanceResult {
  readonly item: FeedItem
  readonly relevant: boolean
  readonly reason: string
}

export interface Outline {
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

export interface AgentConfig {
  readonly shieldApiUrl: string
  readonly shieldApiKey: string
  readonly githubToken: string
  readonly githubRepo: string
}

export interface RunSummary {
  readonly feedsFetched: number
  readonly articlesFound: number
  readonly newArticles: number
  readonly relevantArticles: number
  readonly outlinesSubmitted: number
  readonly prsCreated: number
}
