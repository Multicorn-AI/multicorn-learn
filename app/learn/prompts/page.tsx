import type { Metadata } from 'next'
import { PromptLibrary } from '@/components/PromptLibrary'
import { getPrompts } from '@/content/prompts'

export const metadata: Metadata = {
  title: 'AI Prompt Library — Multicorn Learn',
  description:
    'A curated library of prompts for writing, analysis, coding, research, and AI agents. Free tier available, full library with Learn Pro.',
  openGraph: {
    title: 'AI Prompt Library — Multicorn Learn',
    description:
      'A curated library of prompts for writing, analysis, coding, research, and AI agents. Free tier available, full library with Learn Pro.',
    type: 'website',
  },
}

export default function LearnPromptsPage() {
  const prompts = getPrompts()

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mb-12 w-full max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Prompt library
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          AI prompt library
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
          Curated prompts for writing, analysis, coding, research, and agents. Copy what you need on
          the free tier, or unlock the full library with Learn Pro.
        </p>
      </div>

      <div className="w-full max-w-content">
        <div className="mb-10 rounded-lg border border-border bg-surface-secondary p-5 sm:p-6">
          <h2 className="mb-2 text-base font-semibold text-text-primary">
            How to use these prompts
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">
            Fill in the highlighted fields with your own content. Copy the prompt and paste it into
            any AI chat tool. Tweak the wording as you go, these are starting points, not fixed
            scripts.
          </p>
        </div>

        <PromptLibrary prompts={prompts} />
      </div>
    </main>
  )
}
