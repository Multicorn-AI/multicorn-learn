import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Multicorn: The Trust Layer for AI Agents',
  description:
    "Multicorn AI builds the trust layer for AI agents. Founded by Rachelle Rathbone, a backend engineer from Atlassian's Rovo Agents team and former primary school teacher.",
  openGraph: {
    title: 'About Multicorn: The Trust Layer for AI Agents',
    description:
      "Multicorn AI builds the trust layer for AI agents. Founded by Rachelle Rathbone, a backend engineer from Atlassian's Rovo Agents team and former primary school teacher.",
    url: 'https://multicorn.ai/about',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'About Multicorn: The Trust Layer for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Multicorn: The Trust Layer for AI Agents',
    description:
      "Multicorn AI builds the trust layer for AI agents. Founded by Rachelle Rathbone, a backend engineer from Atlassian's Rovo Agents team and former primary school teacher.",
    images: ['/images/og-card.svg'],
  },
}

interface Value {
  readonly name: string
  readonly description: string
}

const VALUES: readonly Value[] = [
  {
    name: 'Transparency',
    description:
      'You should always know what an agent is doing, why, and what data it can access. No black boxes.',
  },
  {
    name: 'User control',
    description:
      'People, not agents, decide what happens. Every action should be reviewable, every permission revocable.',
  },
  {
    name: 'Privacy by default',
    description:
      'Agents should have the least access they need to do their job. Data stays where it belongs.',
  },
  {
    name: 'Developer experience',
    description:
      'Safety tools only work if developers actually use them. We build for real workflows, not compliance theatre.',
  },
]

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 sm:pt-32">
          <div className="mx-auto max-w-content text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              About
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              The trust layer for AI agents
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
              Multicorn builds the infrastructure that keeps humans in control of what AI agents can
              do on their behalf.
            </p>
          </div>
        </section>

        {/* Company + Mission */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              The company
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Multicorn AI Pty Ltd is registered in Australia. We build open-source tools that give
              people visibility and control over the AI agents acting on their behalf.
            </p>

            <h2 className="mb-6 mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Why Multicorn exists
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              AI agents are proliferating faster than the safety infrastructure around them. Today,
              agents can send emails, spend money, and access sensitive data with little oversight.
              Users deserve to know what these agents are doing and have meaningful control over it.
              Multicorn exists to close that gap. Not by slowing agents down, but by making their
              actions visible, auditable, and revocable.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              An AI agent connected to your Gmail can read, send, and delete your emails with no
              oversight. An agent with access to your company&apos;s tools can spend money, publish
              content, and access sensitive data - all without asking. Shield gives you a consent
              screen to choose what each agent can do, a live dashboard to see what it&apos;s doing,
              and a kill switch to stop it instantly.
            </p>
          </div>
        </section>

        {/* Founder */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              The founder
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Multicorn was founded by Rachelle Rathbone. Rachelle is a backend engineer on
              Atlassian&apos;s Rovo Agents team, where she works on the infrastructure that powers
              AI agents at enterprise scale. Before moving into engineering, she spent years as a
              primary school teacher, which is why Multicorn&apos;s documentation is written for
              humans, error messages are actionable, and nothing requires a manual to understand.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              That background shows in the product. The SDK is built by someone who understands
              agent infrastructure from the inside. The docs and error messages are written by
              someone who believes clarity is never optional. That experience is why Multicorn
              exists - she knew what good agent governance looked like, and saw that nobody had
              built it for everyone else.
            </p>
          </div>
        </section>

        {/* Open source */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Open source at the core
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Multicorn follows an open-core model. The Shield SDK is free, MIT-licensed, and fully
              auditable. You can read every line of code, run the tests, and extend it for your
              needs. The hosted platform (dashboard, team management, compliance features) is how we
              sustain the business.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              We believe trust tools should themselves be trustworthy. Open source is how we earn
              that.
            </p>
            <div className="mt-8">
              <a
                href="https://github.com/Multicorn-AI"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Multicorn on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              What we stand for
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div key={value.name}>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">{value.name}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-content text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Get in touch
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Have a question, want to partner, or just want to say hello? We would love to hear
              from you.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:hello@multicorn.ai"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Email us
              </a>
              <a
                href="https://github.com/Multicorn-AI"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
