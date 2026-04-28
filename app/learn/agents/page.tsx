import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllAgentGuides } from '@/lib/agents'
import { ArticleSearch } from '@/components/ArticleSearch'

export const metadata: Metadata = {
  title: 'Agent Safety Guides - Multicorn Learn',
  description:
    'Short guides on AI agents, permissions, and how to judge whether a tool is safe before you ship it.',
  openGraph: {
    title: 'Agent Safety Guides - Multicorn Learn',
    description:
      'Short guides on AI agents, permissions, and how to judge whether a tool is safe before you ship it.',
    type: 'website',
  },
}

export default function AgentSafetyGuidesIndexPage() {
  const guides = getAllAgentGuides()

  const searchableArticles = guides.map((guide) => ({
    slug: guide.slug,
    title: guide.meta.title,
    description: guide.meta.description,
    tags: guide.meta.tags,
  }))

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-16 text-center">
          <Link
            href="/learn"
            className="mb-6 flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
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
            {guides.length} guides
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Agent Safety Guides
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            From &quot;what is an agent?&quot; to what to check before you give one access to your
            tools. Plain language, built to pair with Multicorn Shield.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary">
            Looking for agent platforms?{' '}
            <Link
              href="/learn/agent-platforms"
              className="font-medium text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            >
              See the comparison guide
            </Link>
            .
          </p>
        </div>

        {guides.length === 0 ? (
          <p className="text-center text-text-secondary">No guides yet. Check back soon.</p>
        ) : (
          <ArticleSearch articles={searchableArticles} articleHrefBase="/learn/agents" />
        )}
      </div>
    </main>
  )
}
