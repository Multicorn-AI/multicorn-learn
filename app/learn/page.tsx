import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllLearnArticles } from '@/lib/learn'

export const metadata: Metadata = {
  title: 'Learn AI Agent Security — Multicorn',
  description:
    'Free, practical guides on AI agents, permissions, and security. From generative AI basics to spending controls — learn the patterns that matter.',
  openGraph: {
    title: 'Learn AI Agent Security — Multicorn',
    description:
      'Free, practical guides on AI agents, permissions, and security. From generative AI basics to spending controls.',
    type: 'website',
  },
}

export default function LearnPage() {
  const articles = getAllLearnArticles()

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
            Education
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Learn AI Agent Security
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            Free, practical guides on building safe and governed AI agents. From permission models
            to spending controls — learn the patterns that matter.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-border bg-surface-secondary p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-green"
                  aria-hidden="true"
                >
                  <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                </svg>
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">AI 101</h2>
                <p className="text-sm text-text-secondary">
                  {articles.length} articles — Start here if you are new to AI
                </p>
              </div>
            </div>

            <p className="mb-8 leading-relaxed text-text-secondary">
              Everything you need to understand generative AI, from the basics to AI agents and
              permissions. Written in plain English — no technical background required.
            </p>

            <ul className="mb-8 space-y-4">
              {articles.map((article, index) => (
                <li key={article.slug}>
                  <Link
                    href={`/learn/ai-101/${article.slug}`}
                    className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-surface-tertiary"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-bold text-green">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-text-primary group-hover:text-green">
                        {article.meta.title}
                      </span>
                      <p className="mt-0.5 text-sm text-text-secondary">
                        {article.meta.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/learn/ai-101"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-green px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green/90 focus:outline-none focus:ring-2 focus:ring-green/20 focus:ring-offset-2"
            >
              Start learning
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
