import Link from 'next/link'
import type { Metadata } from 'next'
import { Code2, Library, Newspaper, Rocket, ShieldCheck } from 'lucide-react'
import { getAllLearnArticles } from '@/lib/learn'
import { isCourse2Enabled, isCourse3Enabled } from '@/lib/feature-flags'
import { EmailSignupForm } from '@/components/EmailSignupForm'

export const metadata: Metadata = {
  title: 'Learn AI Agent Security | Multicorn',
  description:
    'Free, practical guides on AI agents, permissions, and security. From generative AI basics to spending controls.',
  openGraph: {
    title: 'Learn AI Agent Security | Multicorn',
    description:
      'Free, practical guides on AI agents, permissions, and security. From generative AI basics to spending controls.',
    type: 'website',
  },
}

export default function LearnPage() {
  const course2Enabled = isCourse2Enabled()
  const course3Enabled = isCourse3Enabled()
  const articles = getAllLearnArticles()

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-course-1-accent/10 px-4 py-1.5 text-sm font-medium text-course-1-accent">
            Education
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Learn AI Agent Security
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            Free, practical guides on building safe and governed AI agents. From permission models
            to spending controls. Learn the patterns that matter.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-border bg-surface-secondary p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-course-1-accent/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-course-1-accent"
                  aria-hidden="true"
                >
                  <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                </svg>
              </span>
              <div>
                <span className="mb-1 inline-block rounded-full bg-course-1-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-course-1-accent">
                  Course 1
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">AI 101</h2>
                <p className="text-sm text-text-secondary">
                  {articles.length} articles. Start here if you are new to AI.
                </p>
              </div>
            </div>

            <p className="mb-8 leading-relaxed text-text-secondary">
              Everything you need to understand generative AI, from the basics to AI agents and
              permissions. Written in plain English. No technical background required.
            </p>

            <Link
              href="/learn/ai-101/articles"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-course-1-accent px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-course-1-accent/90 focus:outline-none focus:ring-2 focus:ring-course-1-accent/20 focus:ring-offset-2"
            >
              Start learning
            </Link>
          </div>

          {course2Enabled ? (
            <div className="mt-6 rounded-card border border-border bg-surface-secondary p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-course-2-accent/10">
                  <Code2
                    className="h-5 w-5 text-course-2-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <span className="mb-1 inline-block rounded-full bg-course-2-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-course-2-accent">
                    Course 2
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    Build your first app with AI
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Vibe coding - from idea to deployed app
                  </p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-text-secondary">
                Move from reading about AI to building with it. You will ship a real web app with
                help from an AI coding partner, pick up testing and security as you go, and choose a
                tool track that fits how you like to work.
              </p>

              <Link
                href="/learn/course-2"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-course-2-accent px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-course-2-accent/90 focus:outline-none focus:ring-2 focus:ring-course-2-accent/20 focus:ring-offset-2"
              >
                Start building
              </Link>
            </div>
          ) : (
            <div className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center sm:p-10">
              <p className="text-lg font-semibold text-text-primary">More courses coming soon</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                We are building courses on agent deployment, security best practices, and governance
                for teams. Sign up below to get notified when new courses launch.
              </p>
              <div className="mt-6 flex justify-center">
                <EmailSignupForm source="learn-blog" />
              </div>
            </div>
          )}

          {course3Enabled ? (
            <div className="mt-6 rounded-card border border-border bg-surface-secondary p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-course-3-accent/10">
                  <Rocket
                    className="h-5 w-5 text-course-3-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <span className="mb-1 inline-block rounded-full bg-course-3-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-course-3-accent">
                    Course 3
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    Getting to production
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Hosting, domains, HTTPS, and safe secrets
                  </p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-text-secondary">
                Take the app you built locally and put it on the internet with a real URL and
                domain. Vercel is the main path; you will also see where Netlify or Fly.io fit.
              </p>

              <Link
                href="/learn/course-3"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-course-3-accent px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-course-3-accent/90 focus:outline-none focus:ring-2 focus:ring-course-3-accent/20 focus:ring-offset-2"
              >
                Start shipping
              </Link>
            </div>
          ) : null}

          <div className="mt-6 rounded-card border border-border bg-surface-secondary p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10">
                <ShieldCheck className="h-5 w-5 text-green" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <span className="mb-1 inline-block rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-green">
                  Agent Safety
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                  Agent Safety Guides
                </h2>
              </div>
            </div>

            <p className="mb-8 leading-relaxed text-text-secondary">
              Short guides on AI agents, permissions, and what to check before giving one access to
              your tools.
            </p>

            <Link
              href="/learn/agents"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-green px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green/90 focus:outline-none focus:ring-2 focus:ring-green/20 focus:ring-offset-2"
            >
              Read the guides
            </Link>
          </div>

          <section
            className="mt-12 border-t border-border pt-10"
            aria-labelledby="learn-resources-heading"
          >
            <h2
              id="learn-resources-heading"
              className="mb-4 text-lg font-semibold tracking-tight text-text-primary"
            >
              Resources
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/learn/prompts"
                className="group flex min-h-[44px] flex-row items-start gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/25 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:gap-5 sm:p-5"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-primary"
                  aria-hidden="true"
                >
                  <Library className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-semibold text-text-primary group-hover:text-primary">
                    Prompt Library
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
                    Copy-ready prompts for writing, analysis, coding, research, and agents. A free
                    tier is included.
                  </p>
                </div>
              </Link>

              <Link
                href="/learn/news"
                className="group flex min-h-[44px] flex-row items-start gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/25 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:gap-5 sm:p-5"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-primary"
                  aria-hidden="true"
                >
                  <Newspaper className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-semibold text-text-primary group-hover:text-primary">
                    AI News
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
                    Curated AI and agent stories from across the web. Refreshed every few hours.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
