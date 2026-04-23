import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { getAllLearnArticles } from '@/lib/learn'
import { ArticleSearch } from '@/components/ArticleSearch'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'

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

  const searchableArticles = articles.map((article) => ({
    slug: article.slug,
    title: article.meta.title,
    description: article.meta.description,
    tags: article.meta.tags,
  }))

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <CourseLandingTopNav activeCourse={1} />

        <CourseLandingHero
          variant="green"
          icon={<BookOpen className="h-6 w-6" strokeWidth={1.5} />}
          courseLabel="Course 1"
          title="AI 101"
        >
          <p className="text-lg leading-relaxed text-text-secondary">
            Everything you need to understand generative AI, from the basics to AI agents and
            permissions. Written in plain English — no technical background required.
          </p>
        </CourseLandingHero>

        <div className="mx-auto max-w-3xl px-4">
          {articles.length === 0 ? (
            <p className="text-center text-text-secondary">No articles yet. Check back soon.</p>
          ) : (
            <ArticleSearch articles={searchableArticles} articleHrefBase="/learn/ai-101" />
          )}
        </div>
      </div>
    </main>
  )
}
