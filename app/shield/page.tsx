import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ConsentScreenDemo } from '@/components/ConsentScreenDemo'
import { FeatureCard } from '@/components/FeatureCard'
import { HowItWorks } from '@/components/HowItWorks'
import { ShieldDemo } from '@/components/ShieldDemo'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { ShieldPageTracker } from '@/components/ShieldPageTracker'
import { QuickstartTabs } from '@/components/QuickstartTabs'

export const metadata: Metadata = {
  title: 'Multicorn Shield — Permissions, Control & Audit for AI Agents',
  description:
    'Multicorn Shield gives developers consent screens, granular permissions, spending controls, and activity logging for AI agents. Open-source SDK, enterprise-grade controls.',
  openGraph: {
    title: 'Multicorn Shield — Permissions, Control & Audit for AI Agents',
    description:
      'Consent screens, granular permissions, spending controls, and activity logging for AI agents. Open-source SDK, enterprise-grade controls.',
    url: 'https://multicorn.ai/shield',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'Multicorn Shield — Permissions, Control & Audit for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multicorn Shield — Permissions, Control & Audit for AI Agents',
    description:
      'Consent screens, granular permissions, spending controls, and activity logging for AI agents.',
    images: ['/images/og-card.svg'],
  },
}

interface Capability {
  readonly name: string
  readonly description: string
  readonly icon: React.ReactNode
}

const CAPABILITIES: readonly Capability[] = [
  {
    name: 'Consent screens',
    description:
      'A drop-in approval screen so users can review and approve what an agent wants to do — before it acts. Framework-agnostic, works everywhere.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'Spending controls',
    description:
      'Set per-transaction, daily, and monthly limits. Know exactly what your agents spend and stop them before they go over budget.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: 'Activity logging',
    description:
      'A tamper-evident audit trail of every action every agent takes. See what happened, when, and why — with hash-chain integrity.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    name: 'Permission management',
    description:
      'Define exactly what each agent can access — Gmail, Calendar, Slack, GitHub — with granular, per-service permissions.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    name: 'MCP integration',
    description:
      'Middleware for Model Context Protocol servers. Sits between agents and tools, enforcing permissions on every call automatically.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'Open source',
    description:
      'MIT-licensed, fully auditable. Read the code, run the tests, extend it for your needs. No black boxes.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Team policies',
    description:
      'Set organisation-wide rules for what agents can do. Apply policies across teams so every agent follows the same guardrails.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'Approval workflows',
    description:
      'Require sign-off for high-risk actions. Route approvals automatically based on action type or spending amount.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
]

interface ComparisonRow {
  readonly feature: string
  readonly shield: 'yes' | 'no' | 'partial'
  readonly agentGate: 'yes' | 'no' | 'partial'
  readonly noControl: 'yes' | 'no' | 'partial'
}

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  { feature: 'Consent screens', shield: 'yes', agentGate: 'no', noControl: 'no' },
  { feature: 'Spending controls', shield: 'yes', agentGate: 'partial', noControl: 'no' },
  { feature: 'Activity logging', shield: 'yes', agentGate: 'yes', noControl: 'no' },
  { feature: 'Open source', shield: 'yes', agentGate: 'no', noControl: 'no' },
  { feature: 'MCP support', shield: 'yes', agentGate: 'no', noControl: 'no' },
  { feature: 'Custom permissions', shield: 'yes', agentGate: 'partial', noControl: 'no' },
]

function ComparisonCell({ value }: { readonly value: 'yes' | 'no' | 'partial' }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
        Yes
      </span>
    )
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-orange">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        Limited
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-tertiary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
      No
    </span>
  )
}

const PROXY_QUICKSTART_STEPS = [
  {
    step: '1',
    title: 'Install',
    code: 'npm install -g multicorn-shield',
  },
  {
    step: '2',
    title: 'Set up your API key',
    code: 'npx multicorn-proxy init',
  },
  {
    step: '3',
    title: 'Wrap your MCP server',
    code: 'npx multicorn-proxy --wrap npx @modelcontextprotocol/server-filesystem /tmp',
  },
] as const

const SDK_QUICKSTART_STEPS = [
  {
    step: '1',
    title: 'Install the SDK',
    code: 'npm install multicorn-shield',
  },
  {
    step: '2',
    title: 'Initialize Shield',
    code: `import { MulticornShield } from "multicorn-shield";

const shield = new MulticornShield({
  apiKey: "mcs_your_key_here",
});`,
  },
  {
    step: '3',
    title: 'Request consent from users',
    code: `const decision = await shield.requestConsent({
  agent: "OpenClaw",
  scopes: ["read:gmail", "write:calendar"],
  spendLimit: 200,
});

// decision.grantedScopes — what the user approved`,
  },
] as const

export default function ShieldPage() {
  return (
    <>
      <ShieldPageTracker />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-16 sm:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
          />
          <div className="mx-auto max-w-content text-center">
            <span className="mb-4 inline-block rounded-full bg-indigo/10 px-4 py-1.5 text-sm font-medium text-indigo">
              Product
            </span>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              The control layer for{' '}
              <span className="bg-gradient-to-r from-primary via-indigo to-pink bg-clip-text text-transparent">
                AI agents
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Multicorn Shield gives your team consent screens, spending controls, and activity
              logging for every AI agent. One SDK — full oversight.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <TrackedCtaLink
                href="https://app.multicorn.ai/signup"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                eventName="signup_cta_click"
                eventProps={{ location: 'shield_hero' }}
              >
                Start for free
              </TrackedCtaLink>
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield"
                target="_blank"
                rel="noopener noreferrer"
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
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                Two paths to add Shield — pick the one that fits your setup. Both give you the same
                dashboard, the same controls, the same peace of mind.
              </p>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* Feature Deep-Dive */}
        <section className="px-6 pb-14 pt-8 sm:pb-28 sm:pt-16">
          <div className="mx-auto max-w-content">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Everything you need to govern AI agents
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                One SDK to define what agents can do, track what they did, and keep your users in
                control.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITIES.map((capability) => (
                <FeatureCard
                  key={capability.name}
                  icon={capability.icon}
                  name={capability.name}
                  description={capability.description}
                  accentClass="bg-shield/10 text-shield"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Consent Screen Demo */}
        <section className="bg-[#0d0d14] px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                See the consent screen in action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8888a0]">
                This is how the consent screen appears to your users. Try toggling permissions,
                adjusting the spending limit, and approving or denying the agent.
              </p>
            </div>
            <ConsentScreenDemo />
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                See everything your agents do
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                The Shield dashboard gives you a real-time view of every agent, every action, and
                every permission — all in one place.
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <ShieldDemo />
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section className="bg-surface-secondary px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Up and running in minutes
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                Two paths to start controlling your AI agents. Pick the one that fits your setup.
              </p>
            </div>

            <div className="mt-16">
              <QuickstartTabs
                paths={[
                  {
                    id: 'proxy',
                    label: 'Wrap your agents (no code changes)',
                    description:
                      'Already using an MCP server with Claude Code, OpenClaw, or another agent? Add Shield as a proxy in front of it.',
                    steps: PROXY_QUICKSTART_STEPS.map((s) => ({
                      ...s,
                      language: 'Terminal',
                    })),
                    note: 'Already using Claude Code, OpenClaw, or another MCP client?',
                    noteHref: '/docs/mcp-proxy',
                    noteLinkText: 'See the full guide',
                  },
                  {
                    id: 'sdk',
                    label: 'Integrate the SDK',
                    description:
                      'For full control over consent screens, spending limits, and action logging in your application code.',
                    steps: SDK_QUICKSTART_STEPS.map((s) => ({
                      ...s,
                      language: s.step === '1' ? 'Terminal' : 'TypeScript',
                    })),
                  },
                ]}
              />
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
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
              <a
                href="https://www.npmjs.com/package/multicorn-shield"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-red"
                  aria-hidden="true"
                >
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0h-2.666v-4h-1.334v4h-1.335v-4h-1.333v4h-2.666V8.667H22.666v5.331zM11.333 8.667h1.334v4h-1.334v-4z" />
                </svg>
                npm
              </a>
            </div>
          </div>
        </section>

        {/* Proxy Demo */}
        <section className="px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                See it in action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                Run the proxy, make a tool call, and watch it appear in the dashboard in real time.
              </p>
            </div>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-2 border-b border-border bg-surface-secondary px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red/60" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-orange/60" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-green/60" aria-hidden="true" />
                <span className="ml-2 text-xs text-text-tertiary">Terminal</span>
              </div>
              <div className="bg-[#1a1a2e] px-6 py-8 font-mono text-sm leading-relaxed text-green">
                <p className="text-text-tertiary">
                  $ npx multicorn-proxy --wrap npx @modelcontextprotocol/server-filesystem /tmp
                </p>
                <p className="mt-3 text-[#8888a0]">
                  [multicorn-proxy] Proxy starting. agent=filesystem
                </p>
                <p className="text-[#8888a0]">
                  [multicorn-proxy] Agent resolved. agent=filesystem scopes=3
                </p>
                <p className="text-green">[multicorn-proxy] Proxy ready. agent=filesystem</p>
                <p className="mt-3 text-[#8888a0]">
                  [multicorn-proxy] Tool call intercepted. tool=filesystem_read_file allowed=true
                </p>
                <p className="text-green">
                  [multicorn-proxy] Action logged. service=filesystem action=read_file
                  status=approved
                </p>
                <p className="mt-3 text-[#8888a0]">
                  [multicorn-proxy] Tool call intercepted. tool=gmail_send_email allowed=false
                </p>
                <p className="text-red">
                  [multicorn-proxy] Action blocked. service=gmail reason=no execute access
                </p>
                <p className="mt-4 animate-pulse text-text-tertiary">█</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-border-light px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
              {/* MIT licensed */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-shield/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-shield"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">MIT licensed</p>
                  <p className="text-xs text-text-tertiary">Use, modify, and self-host</p>
                </div>
              </div>

              {/* Open source */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-text-primary/5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-text-primary"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Open source</p>
                  <p className="text-xs text-text-tertiary">Code and issues on GitHub</p>
                </div>
              </div>

              {/* Built in Australia */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3a14 14 0 0 1 0 18" />
                    <path d="M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Built in Australia</p>
                  <p className="text-xs text-text-tertiary">Designed by the Multicorn team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-surface-secondary px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                How Shield compares
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                See how Multicorn Shield stacks up against alternatives.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-3xl overflow-x-auto rounded-card border border-border bg-surface">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th scope="col" className="px-6 py-4 font-semibold text-text-primary">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold text-primary">
                      Multicorn Shield
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold text-text-primary">
                      AgentGate
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold text-text-primary">
                      No control
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={index < COMPARISON_ROWS.length - 1 ? 'border-b border-border' : ''}
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                      <td className="px-6 py-4">
                        <ComparisonCell value={row.shield} />
                      </td>
                      <td className="px-6 py-4">
                        <ComparisonCell value={row.agentGate} />
                      </td>
                      <td className="px-6 py-4">
                        <ComparisonCell value={row.noControl} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-14 sm:py-28">
          <div className="mx-auto max-w-content text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Start controlling your AI agents today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Free to start, no credit card required. Set up consent screens and spending controls
              in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <TrackedCtaLink
                href="https://app.multicorn.ai/signup"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                eventName="signup_cta_click"
                eventProps={{ location: 'shield_bottom_cta' }}
              >
                Start for free
              </TrackedCtaLink>
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield"
                target="_blank"
                rel="noopener noreferrer"
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
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
