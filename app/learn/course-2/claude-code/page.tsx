import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isCourse2Enabled } from '@/lib/feature-flags'

export const metadata: Metadata = {
  title: 'Claude Code Track | Multicorn Learn',
  description: 'Vibe coding lessons for Claude Code. Content coming soon.',
  openGraph: {
    title: 'Claude Code Track | Multicorn Learn',
    description: 'Vibe coding lessons for Claude Code. Content coming soon.',
    type: 'website',
  },
}

export default function Course2ClaudeCodePage() {
  if (!isCourse2Enabled()) {
    redirect('/learn')
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <Link
          href="/learn/course-2"
          className="mb-8 flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
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
          Course 2 overview
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Claude Code
        </h1>
        <p className="mt-4 text-lg text-text-secondary">Coming soon</p>
      </div>
    </main>
  )
}
