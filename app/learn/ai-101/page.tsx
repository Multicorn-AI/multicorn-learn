import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllLearnArticles } from '@/lib/learn'

export const metadata: Metadata = {
  title: 'AI 101 — Multicorn Learn',
  description:
    'Foundational guides to generative AI, prompts, and AI agents. Free, plain-English articles for anyone getting started with AI.',
  openGraph: {
    title: 'AI 101 — Multicorn Learn',
    description:
      'Foundational guides to generative AI, prompts, and AI agents. Free, plain-English articles for anyone getting started with AI.',
    type: 'website',
  },
}

export default function AI101IndexPage() {
  const articles = getAllLearnArticles()

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-16 text-center">
          <Link
            href="/learn"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            All courses
          </Link>

          <span className="mb-4 inline-block rounded-full bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
            3 articles
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            AI 101
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            Everything you need to understand generative AI, from the basics to AI agents and
            permissions. Written in plain English — no technical background required.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-text-secondary">No articles yet. Check back soon.</p>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/learn/ai-101/${article.slug}`}
                className="group block rounded-card border border-border bg-surface-secondary p-6 transition-colors hover:border-green/30 hover:bg-surface-tertiary sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-sm font-bold text-green">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="mb-2 text-xl font-bold tracking-tight text-text-primary group-hover:text-green sm:text-2xl">
                      {article.meta.title}
                    </h2>
                    <p className="leading-relaxed text-text-secondary">
                      {article.meta.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.meta.tags.map((tag) => (
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
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
