'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from '@/components/CodeBlock'

interface FlowStepLink {
  readonly label: string
  readonly href: string
  readonly primary?: boolean
}

interface FlowStep {
  readonly title: string
  readonly description: string
  readonly code?: string
  readonly codeLanguage?: string
  readonly links?: readonly FlowStepLink[]
  readonly note?: string
}

const SDK_STEPS: readonly FlowStep[] = [
  {
    title: 'Install the SDK',
    description: 'Add Shield to your project with one command.',
    code: 'npm install multicorn-shield',
    codeLanguage: 'Terminal',
  },
  {
    title: 'Get your API key',
    description:
      'Sign up at app.multicorn.ai and create an API key in Settings. You will paste it into the snippet below.',
    links: [
      { label: 'Sign up', href: 'https://app.multicorn.ai/signup', primary: true },
      { label: 'I already have an account', href: 'https://app.multicorn.ai/settings#api-keys' },
    ],
  },
  {
    title: 'Add to your agent code',
    description:
      'Initialize Shield and request consent from users. Store your key in an environment variable - do not commit it to source control.',
    code: `import { MulticornShield } from "multicorn-shield";

const shield = new MulticornShield({
  apiKey: process.env.MULTICORN_API_KEY,
});`,
    codeLanguage: 'JavaScript',
  },
  {
    title: 'Consent screen shown',
    description: 'Users review and approve what the agent wants to do, before it acts.',
  },
  {
    title: 'Actions logged',
    description: 'Every action recorded with a tamper-evident audit trail.',
  },
  {
    title: 'View in your dashboard',
    description: 'See all agent activity, permissions, and spending in one place.',
  },
]

const PROXY_STEPS: readonly FlowStep[] = [
  {
    title: 'Wrap your MCP server',
    description: 'Point Shield at your existing MCP server. No code changes needed.',
    code: `MULTICORN_API_KEY=mcs_your_key_here npx multicorn-proxy --wrap \\
  npx @modelcontextprotocol/server-filesystem /tmp`,
    codeLanguage: 'Terminal',
    note: 'Get your API key at app.multicorn.ai/settings#api-keys. Prefer a config file? Run npx multicorn-proxy init and pick "Local MCP / Other".',
  },
  {
    title: 'Agent runs normally',
    description: 'No changes to your agent. It works exactly as before.',
  },
  {
    title: 'All calls intercepted',
    description: 'Shield checks every tool call against your permissions.',
  },
  {
    title: 'Consent on first run',
    description: 'Users approve permissions once. Subsequent calls flow through.',
  },
  {
    title: 'View in your dashboard',
    description: 'See all agent activity, permissions, and spending in one place.',
  },
]

const VIEW_OPTIONS = [
  { id: 'sdk' as const, label: 'SDK' },
  { id: 'proxy' as const, label: 'Proxy' },
  { id: 'both' as const, label: 'Both' },
]

type ViewId = 'sdk' | 'proxy' | 'both'

export function HowItWorks() {
  const [activeView, setActiveView] = useState<ViewId>('sdk')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    try {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setActiveView('both')
      }
    } catch {
      // matchMedia unavailable or query unsupported
    }
  }, [])

  const showSdk = activeView === 'sdk' || activeView === 'both'
  const showProxy = activeView === 'proxy' || activeView === 'both'
  const sideBySide = activeView === 'both'

  return (
    <div role="region" aria-label="How Shield works">
      <div
        className="mx-auto flex max-w-xs gap-1 rounded-lg border border-border bg-surface p-1"
        role="tablist"
        aria-label="Choose integration path"
      >
        {VIEW_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={id === activeView}
            id={`hiw-tab-${id}`}
            aria-controls="hiw-panel"
            onClick={() => setActiveView(id)}
            className={`min-h-[44px] flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
              id === activeView
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }${id === 'both' ? 'hidden lg:block' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="hiw-panel" role="tabpanel" className="mt-12">
        <div
          className={sideBySide ? 'grid gap-12 lg:grid-cols-2' : 'mx-auto max-w-lg px-2 sm:px-0'}
        >
          {showSdk && (
            <PathColumn
              label="Path A: SDK"
              accentColor="text-indigo"
              accentBg="bg-indigo/10"
              dotBg="bg-indigo"
              steps={SDK_STEPS}
            />
          )}
          {showProxy && (
            <PathColumn
              label="Path B: Proxy"
              accentColor="text-teal"
              accentBg="bg-teal/10"
              dotBg="bg-teal"
              steps={PROXY_STEPS}
            />
          )}
        </div>

        <div className="mt-4 flex flex-col items-center">
          {sideBySide ? (
            <>
              <svg
                className="h-10 w-full max-w-2xl text-border"
                viewBox="0 0 400 40"
                fill="none"
                preserveAspectRatio="xMidYMax meet"
                aria-hidden="true"
              >
                <path
                  d="M 60 0 Q 60 30 200 34"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <path
                  d="M 340 0 Q 340 30 200 34"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </svg>
              <FlowConnector />
            </>
          ) : (
            <FlowConnector />
          )}

          <div className="rounded-lg border-2 border-shield bg-shield/5 px-8 py-4 text-center">
            <p className="text-sm font-bold text-shield">Shield API</p>
            <p className="mt-0.5 text-xs text-text-tertiary">Permissions, logging, controls</p>
          </div>

          <FlowConnector />

          <div className="rounded-lg border-2 border-primary bg-primary/5 px-8 py-4 text-center">
            <p className="text-sm font-bold text-primary">Dashboard</p>
            <p className="mt-0.5 text-xs text-text-tertiary">Same view, regardless of path</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowConnector() {
  return (
    <div className="relative flex h-10 justify-center py-2" aria-hidden="true">
      <div className="h-full w-px bg-border" />
      <span
        className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-shield motion-safe:animate-flow-dot"
        style={{ '--flow-distance': '24px' } as React.CSSProperties}
      />
    </div>
  )
}

function PathColumn({
  label,
  accentColor,
  accentBg,
  dotBg,
  steps,
}: {
  readonly label: string
  readonly accentColor: string
  readonly accentBg: string
  readonly dotBg: string
  readonly steps: readonly FlowStep[]
}) {
  return (
    <div>
      <h3 className={`mb-8 text-center text-lg font-bold ${accentColor}`}>{label}</h3>
      {steps.map((step, index) => (
        <div key={step.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${accentBg} ${accentColor}`}
            >
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <div className="relative my-1 flex-1" aria-hidden="true">
                <div className="mx-auto h-full w-px bg-border" />
                <span
                  className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${dotBg} motion-safe:animate-flow-dot`}
                  style={
                    {
                      '--flow-distance': '40px',
                      animationDelay: `${index * 0.4}s`,
                    } as React.CSSProperties
                  }
                />
              </div>
            )}
          </div>
          <div className={`min-w-0 flex-1 ${index < steps.length - 1 ? 'pb-6' : 'pb-2'}`}>
            <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
            <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            {step.links && step.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {step.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                      link.primary
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'border border-border text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            {step.code && step.codeLanguage && (
              <div className="mt-3">
                <CodeBlock code={step.code} language={step.codeLanguage} />
              </div>
            )}
            {step.note && (
              <p className="mt-2 text-xs leading-relaxed text-text-tertiary">{step.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
