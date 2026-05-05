import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

const CANONICAL_URL = 'https://multicorn.ai/shield/threat-model'
const OG_IMAGE_URL = 'https://multicorn.ai/images/og-image.png'

const META_DESCRIPTION =
  'How Multicorn Shield governs AI agents in native plugin mode versus hosted MCP proxy mode. What threats Shield catches, what sits outside the proxy, and how to choose an integration.'

export const metadata: Metadata = {
  title: 'Shield threat model | Multicorn Shield',
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Shield threat model | Multicorn Shield',
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Shield threat model',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shield threat model | Multicorn Shield',
    description: META_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

type Coverage = 'covered' | 'not-covered'

const THREAT_ROWS: readonly {
  readonly scenario: string
  readonly nativePlugin: Coverage
  readonly hostedProxy: Coverage
}[] = [
  {
    scenario: 'Rogue or malicious MCP server',
    nativePlugin: 'covered',
    hostedProxy: 'covered',
  },
  {
    scenario: 'Credential replay against recorded activity',
    nativePlugin: 'covered',
    hostedProxy: 'covered',
  },
  {
    scenario: 'Agent misuses approved MCP access',
    nativePlugin: 'covered',
    hostedProxy: 'covered',
  },
  {
    scenario: 'Runaway spending on governed actions',
    nativePlugin: 'covered',
    hostedProxy: 'covered',
  },
  {
    scenario: "Misuse of the host app's built-in tools",
    nativePlugin: 'covered',
    hostedProxy: 'not-covered',
  },
  {
    scenario: 'Direct external API calls that bypass MCP',
    nativePlugin: 'covered',
    hostedProxy: 'not-covered',
  },
  {
    scenario: 'Native shell, file, or system access outside MCP',
    nativePlugin: 'covered',
    hostedProxy: 'not-covered',
  },
]

function CoverageCell({ value }: { readonly value: Coverage }) {
  if (value === 'covered') {
    return (
      <span className="inline-flex items-center text-green" aria-label="Covered">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center text-text-tertiary" aria-label="Not covered">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </span>
  )
}

export default function ShieldThreatModelPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-16 sm:pt-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
          />
          <div className="mx-auto max-w-content text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Shield threat model
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Multicorn Shield is a control layer for AI agents. Where it sits in your stack decides
              what it can govern. This page explains the two integration shapes we ship today, what
              kinds of misuse Shield is designed to catch, and what sits outside the boundary so you
              are not surprised after you connect a host.
            </p>
          </div>
        </section>

        <section className="px-6 pb-14 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              How Shield integrates
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="rounded-card border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-text-primary">Native plugin</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  The plugin runs inside the host. It sees the same tool and action surface the host
                  exposes to the model, not only traffic that happens to go out through MCP.
                  Consent, permissions, spending checks, and activity records can apply to the full
                  picture of what the agent tried to do.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Native plugin integrations today include OpenClaw, Claude Code, Windsurf, Cline,
                  and Gemini CLI. When we say &quot;full coverage&quot; on this page, we mean this
                  path.
                </p>
              </div>
              <div className="rounded-card border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-text-primary">Hosted MCP proxy</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  The host sends MCP tool calls through Shield&apos;s hosted proxy. Shield governs
                  that MCP-shaped traffic: approvals, policy, logging, and spend rules attach to
                  calls that flow through the proxy. Anything the host does without routing through
                  MCP never touches Shield, by design.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  This is the right mental model for Cursor, Claude Desktop, Kilo Code, GitHub
                  Copilot, Continue, Goose, Aider, and other clients you connect through the proxy.
                  Windsurf also supports hosted proxy mode alongside its native plugin. You get
                  strong governance for MCP tools. You do not get visibility into built-in host
                  capabilities that never pass through MCP.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border-light bg-surface-secondary px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Coverage by scenario
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              The table is read left to right: each row is a situation teams ask about. A check
              means Shield is positioned to detect, block, or record that class of behavior in that
              integration mode. An × means the behavior can happen without passing through Shield in
              hosted-proxy mode, so Shield does not see it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Credential replay is a special case. For every action Shield logs, the activity trail
              is tamper-evident: entries are chained so a forged &quot;past&quot; record does not
              match the chain. That property holds for hosted-proxy mode as well as native plugin
              mode, as long as the action was one Shield recorded. Replay of credentials or history
              outside that recorded surface is a different problem.
            </p>

            <div className="mt-10 overflow-x-auto rounded-card border border-border bg-surface">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th scope="col" className="px-4 py-4 font-semibold text-text-primary sm:px-6">
                      Scenario
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-center font-semibold text-text-primary sm:px-6"
                    >
                      Native plugin
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-center font-semibold text-text-primary sm:px-6"
                    >
                      Hosted proxy (MCP)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {THREAT_ROWS.map((row, index) => (
                    <tr
                      key={row.scenario}
                      className={
                        index < THREAT_ROWS.length - 1 ? 'border-b border-border' : undefined
                      }
                    >
                      <td className="px-4 py-4 font-medium text-text-primary sm:px-6">
                        {row.scenario}
                      </td>
                      <td className="px-4 py-4 text-center sm:px-6">
                        <CoverageCell value={row.nativePlugin} />
                      </td>
                      <td className="px-4 py-4 text-center sm:px-6">
                        <CoverageCell value={row.hostedProxy} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-text-secondary">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              What Shield is built to catch
            </h2>
            <p>
              <strong className="text-text-primary">Rogue or malicious MCP server.</strong> Shield
              sits on the path between your agent and MCP tools you configure. Traffic can be
              inspected, policy can require approval, and unexpected servers or tool shapes surface
              in activity rather than failing silently inside a long-running session.
            </p>
            <p>
              <strong className="text-text-primary">Credential replay and audit integrity.</strong>{' '}
              When Shield writes an activity record, it becomes part of a hash-linked chain. An
              attacker who wants to pretend an action already happened, or to substitute a different
              past, breaks that chain. That is true in native plugin mode for the full action set,
              and in hosted-proxy mode for every MCP call Shield actually logged.
            </p>
            <p>
              <strong className="text-text-primary">
                An agent stretching past the access you granted.
              </strong>{' '}
              If the model keeps calling tools you did not approve, or probes for broader access,
              Shield can block, prompt, or flag those attempts depending on your policy. The
              important part is the attempt is visible and attributable, not lost in console noise.
            </p>
            <p>
              <strong className="text-text-primary">Runaway spending on governed actions.</strong>{' '}
              {`Limits and alerts attach to the operations Shield sees. On the native plugin path that is the broadest set of spend. On the hosted-proxy path that is spend that flows through MCP under Shield. Both are real controls; the difference is how much of the host's behavior Shield can govern.`}
            </p>
          </div>
        </section>

        <section className="border-t border-border-light bg-surface-secondary px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-text-secondary">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              What hosted proxy does not see
            </h2>
            <p>
              Hosted MCP proxy mode is intentional about its boundary. The host application may ship
              its own tools: file pickers, terminals, browser automation, first-party APIs, and
              other shortcuts that never emit an MCP request through your Shield URL. Shield does
              not intercept those calls. They are not hidden on purpose; they are simply a different
              channel.
            </p>
            <p>
              That shows up in three ways teams care about.{' '}
              <strong className="text-text-primary">Built-in tools</strong> can read, write, or call
              services without MCP.{' '}
              <strong className="text-text-primary">Direct external API</strong> usage from the host
              skips the proxy if the integration is not MCP-shaped.{' '}
              <strong className="text-text-primary">Native shell or file access</strong> on the
              machine runs under the host&apos;s own permissions. None of that traffic is
              automatically mirrored into Shield unless you route it there.
            </p>
            <p>
              If your risk model assumes Shield &quot;sees everything the agent can do,&quot; hosted
              proxy mode does not meet that bar. It meets the bar for &quot;everything the agent
              does through MCP while pointed at Shield.&quot; That is a meaningful slice for many
              teams, but it is not the same as full host coverage.
            </p>
          </div>
        </section>

        <section className="px-6 py-14 sm:py-20 sm:pb-24">
          <div className="mx-auto max-w-3xl rounded-card border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              When you need full coverage
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              For the strongest governance story, use a native plugin integration where your host
              supports one. You get consent, permissions, activity, and spending aligned to the full
              tool surface the model can reach, not only MCP-routed work. Start from the docs if you
              are wiring a new agent:{' '}
              <Link
                href="/docs/getting-started"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Getting started
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-text-tertiary">
              If you stay on hosted proxy mode, treat MCP traffic as the governed zone and plan
              controls elsewhere for anything the host can still do on its own.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
