/* eslint-disable no-console -- RSS fetch errors are logged for operators */
import Parser from 'rss-parser'
import type { FeedItem } from '../types.js'

export const FEEDS = [
  { name: 'The Neuron', url: 'https://www.theneuron.ai/rss' },
  { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/feed/' },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
] as const

const parser = new Parser({
  timeout: 30_000,
})

/** rss-parser item shape (explicit so root tsc does not need rss-parser types). */
type RssFeedItem = {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
  content?: string
}

function mapItem(raw: RssFeedItem, source: string): FeedItem | null {
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  const url = typeof raw.link === 'string' ? raw.link.trim() : ''
  if (!title || !url) return null
  const publishedAt =
    typeof raw.pubDate === 'string' && raw.pubDate.trim() !== ''
      ? raw.pubDate.trim()
      : new Date().toISOString()
  const summary =
    typeof raw.contentSnippet === 'string' && raw.contentSnippet.trim() !== ''
      ? raw.contentSnippet.trim()
      : typeof raw.content === 'string'
        ? raw.content
            .replace(/<[^>]+>/g, ' ')
            .trim()
            .slice(0, 2000)
        : ''
  return { title, url, source, publishedAt, summary }
}

/**
 * Fetches all feeds in parallel. Failed feeds are skipped (logged to console).
 * Returns up to 30 items total, most recent first across all sources.
 */
export async function fetchAllFeeds(feeds: typeof FEEDS): Promise<FeedItem[]> {
  const results = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url)
        const items = (parsed.items ?? [])
          .map((item: RssFeedItem) => mapItem(item, feed.name))
          .filter((item: FeedItem | null): item is FeedItem => item !== null)
        return items
      } catch (err) {
        console.warn(`[multicorn-content] RSS feed failed (${feed.name}):`, err)
        return [] as FeedItem[]
      }
    }),
  )

  const merged: FeedItem[] = results.flat()
  merged.sort((a: FeedItem, b: FeedItem) => {
    const ta = Date.parse(a.publishedAt)
    const tb = Date.parse(b.publishedAt)
    return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta)
  })

  return merged.slice(0, 30)
}
