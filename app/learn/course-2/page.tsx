import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Code2, Terminal, Waves } from 'lucide-react'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'
import { ToolPicker } from '@/components/ToolPicker'
import { ToolPickerCard } from '@/components/ToolPickerCard'
import { isCourse2Enabled } from '@/lib/feature-flags'

export const metadata: Metadata = {
  title: 'Build Your First App with AI | Multicorn Learn',
  description:
    'Learn vibe coding: build a real web app with AI agents, step by step. Pick Cursor, Claude Code, or Windsurf and start your track.',
  openGraph: {
    title: 'Build Your First App with AI | Multicorn Learn',
    description:
      'Learn vibe coding: build a real web app with AI agents, step by step. Pick your tool and start.',
    type: 'website',
  },
}

export default function Course2Page() {
  if (!isCourse2Enabled()) {
    redirect('/learn')
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <CourseLandingTopNav activeCourse={2} />

        <CourseLandingHero
          variant="primary"
          icon={<Code2 className="h-6 w-6" strokeWidth={1.5} />}
          courseLabel="Course 2"
          title="Build your first app with AI"
        >
          <p className="text-lg leading-relaxed text-text-secondary">
            You describe what you want in everyday language, and an AI coding partner drafts and
            adjusts the software while you steer. No computer science degree required, just
            curiosity and willingness to try.
          </p>
        </CourseLandingHero>

        <div className="mx-auto max-w-3xl space-y-16 px-4">
          <section aria-labelledby="what-is-vibe-coding">
            <h2
              id="what-is-vibe-coding"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              What is vibe coding?
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Vibe coding means you stay in plain English while a coding agent turns your ideas
                into working software. You say what the app should do, how it should feel, and what
                should happen when someone clicks a button. The agent proposes files, edits, and
                fixes. You read the results, ask for changes, and keep going until it feels right.
              </p>
              <p>
                You are still in charge. The agent is fast at typing and remembering details, but
                you decide what ships. That back-and-forth is the skill you are building here, not
                memorizing syntax. If you can explain a small business process or a habit you want
                to support with software, you have enough to start.
              </p>
              <p>
                When something breaks, you describe the problem and try again. Each round makes the
                picture clearer for you and for the agent. You do not need to know every technical
                term up front. You will learn the words as they matter for what you are building.
              </p>
            </div>
          </section>

          <section aria-labelledby="what-you-build">
            <h2
              id="what-you-build"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              What you will build
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              By the end of this course path you will have a real web application: something people
              can open in a browser, sign into, and use. You will connect it to a database, deploy
              it so it lives on a public URL with your own domain, and add automated tests so
              changes do not break what already works.
            </p>
            <ul className="list-inside list-disc space-y-2 text-text-secondary">
              <li>A working app with pages people can click through</li>
              <li>Accounts and data stored safely on a server</li>
              <li>A deployment on a real URL with DNS pointed at your domain</li>
              <li>Tests that run when you change code</li>
            </ul>
          </section>

          <section aria-labelledby="what-you-learn">
            <h2
              id="what-you-learn"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              What you will learn along the way
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              None of this is a wall you climb before you start. You will pick it up as you build:
            </p>
            <ul className="list-inside list-disc space-y-2 text-text-secondary">
              <li>How to keep versions of your project so you can undo mistakes</li>
              <li>How to run small tests before you ship a change</li>
              <li>How deployment and hosting fit together</li>
              <li>How to store secrets and settings without pasting passwords into chat</li>
              <li>Basics of securing logins and data in a small app</li>
            </ul>
          </section>

          <section
            id="pick-your-tool"
            aria-labelledby="pick-your-tool-heading"
            className="scroll-mt-24"
          >
            <h2
              id="pick-your-tool-heading"
              className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              Pick your tool
            </h2>
            <p className="mb-8 max-w-2xl text-text-secondary">
              Choose the coding environment you want to learn in. Each track covers the same outcome
              with tool-specific steps. You can switch later if your needs change.
            </p>
            <div className="mb-10 max-w-2xl">
              <ToolPicker />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ToolPickerCard
                name="Cursor"
                href="/learn/course-2/cursor"
                icon={<Code2 className="h-5 w-5" strokeWidth={1.5} />}
                bestFor="Visual learners who want to see changes in real time"
                cost="Free tier available, Pro $20/month"
                limitation="Requires a local code editor install"
                accentClass="bg-primary/10 text-primary border-primary/20"
              />
              <ToolPickerCard
                name="Claude Code"
                href="/learn/course-2/claude-code"
                icon={<Terminal className="h-5 w-5" strokeWidth={1.5} />}
                bestFor="People comfortable with a terminal"
                cost="Free with Claude account, usage limits apply"
                limitation="Terminal only - no visual editor"
                accentClass="bg-indigo/10 text-indigo border-indigo/20"
              />
              <ToolPickerCard
                name="Windsurf"
                href="/learn/course-2/windsurf"
                icon={<Waves className="h-5 w-5" strokeWidth={1.5} />}
                bestFor="Beginners who want the simplest setup"
                cost="Free tier available"
                limitation="Smaller model selection than Cursor"
                accentClass="bg-teal/10 text-teal border-teal/20"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
