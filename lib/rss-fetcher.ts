/**
 * AI news RSS fetcher for the public /learn/news page.
 *
 * Note: packages/multicorn-content has its own RSS layer for the LLM
 * content-curation agent. The two source lists are intentionally
 * independent: this file is for what we render to readers, the package
 * is for what the agent ingests. Update both if a source belongs in
 * both surfaces.
 */
/* eslint-disable no-console -- RSS fetch failures are logged for operators */
import Parser from 'rss-parser'

export interface NewsArticle {
  readonly id: string
  readonly title: string
  readonly url: string
  readonly source: string
  readonly publishedAt: string
  readonly summary: string
}

interface RssSource {
  readonly name: string
  readonly url: string
}

// The Neuron blocks the default rss-parser User-Agent with 403, so we
// always send a polite identifying UA. Axios AI is intentionally omitted
// until a working public RSS URL is confirmed.
export const RSS_SOURCES: readonly RssSource[] = [
  { name: 'The Neuron', url: 'https://www.theneuron.ai/rss' },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
] as const

const USER_AGENT = 'Mozilla/5.0 (compatible; MulticornLearnBot/1.0; +https://multicorn.ai)'
const FETCH_TIMEOUT_MS = 10_000
const MAX_SUMMARY_CHARS = 240

export const NEWS_PAGE_SIZE = 20

export const AI_KEYWORDS = [
  'AI',
  'agent',
  'LLM',
  'GPT',
  'Claude',
  'Gemini',
  'Copilot',
  'artificial intelligence',
] as const

// Short ambiguous tokens use word boundaries to avoid matching
// substrings like "rain" or "again". Multi-word phrases are matched
// as plain lowercase substrings.
const KEYWORD_PATTERNS: readonly RegExp[] = AI_KEYWORDS.map((keyword) => {
  if (keyword.length <= 5 && !keyword.includes(' ')) {
    return new RegExp(`\\b${keyword}\\b`, 'i')
  }
  return new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
})

// rss-parser ships its own item types but we narrow to the fields we
// actually read, so the rest of this file does not depend on the
// library's wider type surface.
interface RssFeedItem {
  readonly title?: string
  readonly link?: string
  readonly guid?: string
  readonly pubDate?: string
  readonly isoDate?: string
  readonly contentSnippet?: string
}

const parser = new Parser()

async function fetchFeedXml(source: RssSource): Promise<string | null> {
  let response: Response
  try {
    response = await fetch(source.url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.5',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
  } catch (err) {
    console.warn(`[rss-fetcher] ${source.name} request failed:`, err)
    return null
  }

  if (!response.ok) {
    console.warn(`[rss-fetcher] ${source.name} returned HTTP ${response.status}`)
    return null
  }

  // Defence in depth: even though sources are hardcoded, redirects
  // could theoretically land us on a different host. Reject anything
  // that did not stay on the original hostname.
  try {
    const expectedHost = new URL(source.url).hostname
    const finalHost = new URL(response.url).hostname
    if (finalHost !== expectedHost) {
      console.warn(
        `[rss-fetcher] ${source.name} redirected off-host (${expectedHost} -> ${finalHost})`,
      )
      return null
    }
  } catch (err) {
    console.warn(`[rss-fetcher] ${source.name} URL validation failed:`, err)
    return null
  }

  try {
    return await response.text()
  } catch (err) {
    console.warn(`[rss-fetcher] ${source.name} body read failed:`, err)
    return null
  }
}

function truncateSummary(snippet: string): string {
  const cleaned = snippet.replace(/\s+/g, ' ').trim()
  if (cleaned.length === 0) return ''

  const sentenceMatch = cleaned.match(/^.*?[.!?](\s|$)/)
  const firstSentenceRaw = sentenceMatch?.[0]
  const firstSentence = firstSentenceRaw ? firstSentenceRaw.trim() : cleaned

  if (firstSentence.length <= MAX_SUMMARY_CHARS) return firstSentence
  return `${firstSentence.slice(0, MAX_SUMMARY_CHARS - 1).trimEnd()}…`
}

function toIsoDate(item: RssFeedItem): string | null {
  const raw = item.isoDate ?? item.pubDate
  if (!raw) return null
  const parsed = Date.parse(raw)
  if (Number.isNaN(parsed)) return null
  return new Date(parsed).toISOString()
}

function mapItem(item: RssFeedItem, source: string): NewsArticle | null {
  const title = item.title?.trim()
  const url = item.link?.trim()
  // We render headlines as outbound links, so an article without a link
  // is not useful. Skipping these also lets us derive a stable id from
  // (source, link) without needing a hash fallback.
  if (!title || !url) return null

  // contentSnippet is rss-parser's pre-stripped plain-text version of
  // the summary. Sticking to it avoids hand-rolling HTML stripping on
  // potentially malformed feed bodies.
  const snippet = item.contentSnippet?.trim()
  if (!snippet) return null

  const publishedAt = toIsoDate(item)
  if (!publishedAt) return null

  return {
    id: `${source}:${item.guid?.trim() ?? url}`,
    title,
    url,
    source,
    publishedAt,
    summary: truncateSummary(snippet),
  }
}

function isAiRelevant(article: NewsArticle): boolean {
  const haystack = `${article.title} ${article.summary}`
  return KEYWORD_PATTERNS.some((pattern) => pattern.test(haystack))
}

function dedupe(articles: readonly NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>()
  const result: NewsArticle[] = []
  for (const article of articles) {
    if (seen.has(article.url)) continue
    seen.add(article.url)
    result.push(article)
  }
  return result
}

/**
 * Fetches every source in parallel, filters for AI/agent topics, and
 * sorts newest first. Never throws: a total failure returns [] so the
 * page can render its empty state.
 */
export async function fetchAiNews(): Promise<NewsArticle[]> {
  const perSource = await Promise.all(
    RSS_SOURCES.map(async (source) => {
      const xml = await fetchFeedXml(source)
      if (xml === null) return [] as NewsArticle[]

      try {
        const parsed = await parser.parseString(xml)
        return (parsed.items ?? [])
          .map((item: RssFeedItem) => mapItem(item, source.name))
          .filter((article): article is NewsArticle => article !== null)
      } catch (err) {
        console.warn(`[rss-fetcher] ${source.name} parse failed:`, err)
        return [] as NewsArticle[]
      }
    }),
  )

  const merged = dedupe(perSource.flat()).filter(isAiRelevant)

  merged.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))

  return merged
}
