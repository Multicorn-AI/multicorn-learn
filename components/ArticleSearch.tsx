'use client'

import { useState, useMemo, useRef, useId } from 'react'
import Link from 'next/link'

interface ArticleItem {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
}

interface ArticleSearchProps {
  readonly articles: readonly ArticleItem[]
  readonly variant?: 'cards' | 'compact'
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

function matchesQuery(article: ArticleItem, query: string): boolean {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return true

  const searchable = normalize(`${article.title} ${article.description} ${article.tags.join(' ')}`)

  return terms.every((term) => searchable.includes(term))
}

function EmptyState({ onClear }: { readonly onClear: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-surface-secondary px-6 py-10 text-center">
      <p className="font-medium text-text-primary">No articles match your search</p>
      <p className="mt-2 text-sm text-text-secondary">
        Try different keywords or{' '}
        <button
          type="button"
          onClick={onClear}
          className="font-medium text-green underline underline-offset-2 hover:text-green/80"
        >
          clear the search
        </button>{' '}
        to see all articles.
      </p>
    </div>
  )
}

function ArticleCard({
  article,
  index,
}: {
  readonly article: ArticleItem
  readonly index: number
}) {
  return (
    <Link
      href={`/learn/ai-101/${article.slug}`}
      className="group block rounded-card border border-border bg-surface-secondary p-6 transition-colors hover:border-green/30 hover:bg-surface-tertiary sm:p-8"
    >
      <div className="flex items-start gap-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-sm font-bold text-green">
          {index + 1}
        </span>
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-text-primary group-hover:text-green sm:text-2xl">
            {article.title}
          </h2>
          <p className="leading-relaxed text-text-secondary">{article.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-medium text-green"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArticleListItem({
  article,
  index,
}: {
  readonly article: ArticleItem
  readonly index: number
}) {
  return (
    <li>
      <Link
        href={`/learn/ai-101/${article.slug}`}
        className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-surface-tertiary"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-bold text-green">
          {index + 1}
        </span>
        <div>
          <span className="font-semibold text-text-primary group-hover:text-green">
            {article.title}
          </span>
          <p className="mt-0.5 text-sm text-text-secondary">{article.description}</p>
        </div>
      </Link>
    </li>
  )
}

export function ArticleSearch({ articles, variant = 'cards' }: ArticleSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const resultsId = useId()

  const filtered = useMemo(() => {
    if (!query.trim()) return articles
    return articles.filter((article) => matchesQuery(article, query))
  }, [articles, query])

  const isFiltered = query.trim().length > 0

  function handleClear() {
    setQuery('')
    inputRef.current?.focus()
  }

  const isCompact = variant === 'compact'

  return (
    <>
      <div className={isCompact ? 'mb-6' : 'mx-auto mb-10 max-w-3xl'}>
        <label
          htmlFor={inputId}
          className={`mb-2 block text-sm font-medium text-text-primary ${isCompact ? 'sr-only' : ''}`}
        >
          Search articles
        </label>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            aria-controls={resultsId}
            aria-describedby={`${inputId}-count`}
            className={`w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-text-primary placeholder:text-text-tertiary focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20 ${
              isCompact ? 'min-h-[40px] py-2 text-sm' : 'min-h-[44px] py-3'
            }`}
          />
        </div>
        <p
          id={`${inputId}-count`}
          className="mt-1.5 text-sm text-text-secondary"
          aria-live="polite"
        >
          {isFiltered
            ? `${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'} found`
            : `${articles.length} articles`}
        </p>
      </div>

      {isCompact ? (
        <ul id={resultsId} className="space-y-4">
          {filtered.length === 0 ? (
            <li>
              <EmptyState onClear={handleClear} />
            </li>
          ) : (
            filtered.map((article) => (
              <ArticleListItem
                key={article.slug}
                article={article}
                index={articles.indexOf(article)}
              />
            ))
          )}
        </ul>
      ) : (
        <div id={resultsId} className="mx-auto max-w-3xl space-y-6">
          {filtered.length === 0 ? (
            <EmptyState onClear={handleClear} />
          ) : (
            filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} index={articles.indexOf(article)} />
            ))
          )}
        </div>
      )}
    </>
  )
}
