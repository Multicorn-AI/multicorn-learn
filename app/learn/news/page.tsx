import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchAiNews, NEWS_PAGE_SIZE, type NewsArticle } from '@/lib/rss-fetcher'

export const revalidate = 14400 // 4 hours in seconds

export const metadata: Metadata = {
  title: 'AI news - Multicorn Learn',
  description: 'A curated AI and agent news feed from across the web. Updated every few hours.',
  openGraph: {
    title: 'AI news - Multicorn Learn',
    description: 'A curated AI and agent news feed from across the web. Updated every few hours.',
    type: 'website',
  },
}

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

function clampPage(raw: string | undefined, totalPages: number): number {
  const parsed = Number.parseInt(raw ?? '1', 10)
  if (Number.isNaN(parsed) || parsed < 1) return 1
  if (parsed > totalPages) return totalPages
  return parsed
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function formatDate(iso: string): string {
  const parsed = Date.parse(iso)
  if (Number.isNaN(parsed)) return ''
  return dateFormatter.format(new Date(parsed))
}

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <article className="rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary/25 sm:p-6">
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-tertiary sm:text-sm">
        <span className="font-medium text-text-secondary">{article.source}</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </div>
      <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-text-primary sm:text-xl">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          {article.title}
        </a>
      </h2>
      {article.summary !== '' ? (
        <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
          {article.summary}
        </p>
      ) : null}
    </article>
  )
}

function PageNav({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const baseClass =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
  const enabledClass = `${baseClass} bg-surface text-text-primary hover:border-primary/25 hover:text-primary`
  const disabledClass = `${baseClass} cursor-not-allowed bg-surface-secondary text-text-tertiary`

  return (
    <nav
      aria-label="News pages"
      className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      {prevPage >= 1 ? (
        <Link
          href={prevPage === 1 ? '/learn/news' : `/learn/news?page=${prevPage}`}
          className={enabledClass}
          aria-label={`Go to page ${prevPage}`}
          rel="prev"
        >
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true" aria-label="No previous page">
          Previous
        </span>
      )}

      <p className="text-sm text-text-secondary" aria-live="polite">
        Page {currentPage} of {totalPages}
      </p>

      {nextPage <= totalPages ? (
        <Link
          href={`/learn/news?page=${nextPage}`}
          className={enabledClass}
          aria-label={`Go to page ${nextPage}`}
          rel="next"
        >
          Next
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true" aria-label="No next page">
          Next
        </span>
      )}
    </nav>
  )
}

function EmptyState() {
  return (
    <div className="rounded-card border border-dashed border-border bg-surface-secondary p-8 text-center sm:p-10">
      <p className="text-base font-semibold text-text-primary">
        AI news feed is temporarily unavailable
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
        This page refreshes every 4 hours. Check back shortly.
      </p>
    </div>
  )
}

export default async function NewsPage({ searchParams }: PageProps) {
  const articles = await fetchAiNews()

  const totalPages = Math.max(1, Math.ceil(articles.length / NEWS_PAGE_SIZE))
  const params = await searchParams
  const currentPage = clampPage(params.page, totalPages)

  const start = (currentPage - 1) * NEWS_PAGE_SIZE
  const visible = articles.slice(start, start + NEWS_PAGE_SIZE)

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mb-12 w-full max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Latest
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          AI news
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
          Curated stories on AI and agents from The Neuron, The Verge, and MIT Technology Review.
          Updated every few hours.
        </p>
      </div>

      <div className="w-full max-w-content">
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ol className="flex flex-col gap-4" role="list">
              {visible.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ol>
            <PageNav currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </main>
  )
}
