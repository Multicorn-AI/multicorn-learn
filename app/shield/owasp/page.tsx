import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

const CANONICAL_URL = 'https://multicorn.ai/shield/owasp'
const OG_IMAGE_URL = 'https://multicorn.ai/images/og-image.png'

const META_DESCRIPTION =
  'See how Multicorn Shield maps to each of the 10 risks in the OWASP Top 10 for Agentic Applications (2026).'

export const metadata: Metadata = {
  title: 'OWASP Top 10 for Agentic Applications - Shield compliance mapping',
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'OWASP Top 10 for Agentic Applications - Shield compliance mapping',
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Shield OWASP compliance mapping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OWASP Top 10 for Agentic Applications - Shield compliance mapping',
    description: META_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

type MitigationStatus = 'mitigated' | 'partially-mitigated' | 'not-applicable'

interface OwaspRisk {
  readonly id: string
  readonly name: string
  readonly status: MitigationStatus
  readonly description: string
  readonly shieldResponse: string
  readonly docLink: string
  readonly docLabel: string
}

const OWASP_RISKS: readonly OwaspRisk[] = [
  {
    id: 'ASI-01',
    name: 'Agent goal hijack',
    status: 'partially-mitigated',
    description:
      'An attacker manipulates the agent into pursuing a different objective than the one the user intended.',
    shieldResponse:
      'Consent screens require explicit user approval before the agent acts. Scope-based permissions restrict what the agent can target. Action logging creates an audit trail of what the agent actually did vs what it was asked to do.',
    docLink: '/docs/consent-screen',
    docLabel: 'Consent screen docs',
  },
  {
    id: 'ASI-02',
    name: 'Tool misuse',
    status: 'mitigated',
    description:
      'The agent calls tools in ways that were not intended, causing unintended side effects or data loss.',
    shieldResponse:
      'The MCP proxy intercepts every tool call before execution. Permission scopes restrict which tools each agent can access. Spending controls cap financial exposure per transaction, per day, and per month. Approval workflows gate high-risk tool calls on human review.',
    docLink: '/docs/permissions',
    docLabel: 'Permissions docs',
  },
  {
    id: 'ASI-03',
    name: 'Excessive permissions',
    status: 'mitigated',
    description:
      'An agent holds broader access than it needs, increasing the blast radius when something goes wrong.',
    shieldResponse:
      "This is Shield's core value proposition. Scoped permissions enforce least privilege per agent per service. The consent screen makes permission grants visible and revocable. The dashboard shows exactly what each agent can access.",
    docLink: '/docs/permissions',
    docLabel: 'Permissions docs',
  },
  {
    id: 'ASI-04',
    name: 'Inadequate sandboxing',
    status: 'not-applicable',
    description:
      'The agent runs without OS-level isolation, so a compromised agent can reach host resources directly.',
    shieldResponse:
      'Shield operates at the MCP protocol layer, not the OS/runtime layer. Sandboxing is handled by tools like Agent Safehouse (macOS) or agentsh (Linux). Shield complements these by governing what the agent is allowed to do within its sandbox.',
    docLink: '/shield/compare',
    docLabel: 'Compare Shield to alternatives',
  },
  {
    id: 'ASI-05',
    name: 'Unexpected code execution',
    status: 'partially-mitigated',
    description:
      'The agent generates and runs code that the user did not review, opening the door to arbitrary execution.',
    shieldResponse:
      "Shield's permission scopes can restrict execute-level access. The MCP proxy blocks tool calls outside the granted scope set. However, Shield does not inspect generated code for safety.",
    docLink: '/docs/permissions',
    docLabel: 'Permissions docs',
  },
  {
    id: 'ASI-06',
    name: 'Context manipulation',
    status: 'partially-mitigated',
    description:
      'An attacker tampers with the data the agent reads, poisoning its decisions without changing the model itself.',
    shieldResponse:
      'The audit trail with SHA-256 hash chaining provides tamper-evident logging. Reconnaissance detection flags agents probing metadata or context they should not have access to. However, Shield does not inspect or validate RAG context directly.',
    docLink: '/docs/action-logging',
    docLabel: 'Action logging docs',
  },
  {
    id: 'ASI-07',
    name: 'Insecure inter-agent communication',
    status: 'not-applicable',
    description:
      'Agents pass messages to each other without authentication or integrity checks, allowing spoofing or injection.',
    shieldResponse:
      'Shield governs individual agent-to-tool interactions, not agent-to-agent protocols. Multi-agent delegation and trust chains are on the future roadmap.',
    docLink: '/shield',
    docLabel: 'Shield overview',
  },
  {
    id: 'ASI-08',
    name: 'Cascading failures',
    status: 'partially-mitigated',
    description:
      'One agent error triggers a chain reaction across connected systems, amplifying a small problem into a large outage.',
    shieldResponse:
      'Spending controls and burst detection act as circuit breakers. When an agent triggers a spending alert or burst activity threshold, it can be auto-frozen, stopping the cascade. Retaliation detection catches escalation patterns where a blocked agent targets the entity that blocked it.',
    docLink: '/docs/spending-controls',
    docLabel: 'Spending controls docs',
  },
  {
    id: 'ASI-09',
    name: 'Human-agent trust exploitation',
    status: 'mitigated',
    description:
      'The agent presents misleading information to trick a human into approving something they should not.',
    shieldResponse:
      'Consent screens present permission requests in a clear, user-facing UI that cannot be manipulated by the agent. The consent screen uses Shadow DOM to prevent CSS injection. Approval workflows require explicit human decisions for high-risk actions.',
    docLink: '/docs/consent-screen',
    docLabel: 'Consent screen docs',
  },
  {
    id: 'ASI-10',
    name: 'Rogue agents',
    status: 'mitigated',
    description:
      'An agent operates outside its intended boundaries, taking actions that were never authorised.',
    shieldResponse:
      'Agent freeze capability provides a kill switch. Anomaly detection identifies rogue behaviour patterns automatically. The audit trail provides forensic evidence of what a rogue agent did. Scope revocation is immediate and takes effect on the next tool call.',
    docLink: '/docs/action-logging',
    docLabel: 'Action logging docs',
  },
]

const STATUS_CONFIG: Record<
  MitigationStatus,
  { readonly label: string; readonly className: string }
> = {
  mitigated: {
    label: 'Mitigated',
    className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  },
  'partially-mitigated': {
    label: 'Partially mitigated',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  'not-applicable': {
    label: 'Not applicable',
    className: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  },
}

function StatusBadge({ status }: { readonly status: MitigationStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

export default function OwaspCompliancePage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-16 sm:pt-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
          />
          <div className="mx-auto max-w-content text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              How Shield maps to the OWASP Top 10 for Agentic Applications
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Shield was built to solve the problems OWASP formalised. Here is how each risk maps to
              a shipping feature.
            </p>
          </div>
        </section>

        {/* Summary coverage table */}
        <section className="px-6 pb-14 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Coverage at a glance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Shield is not OWASP-certified. This table shows how each risk in the OWASP Top 10 for
              Agentic Applications maps to features Shield ships today.
            </p>

            <div className="mt-10 overflow-x-auto rounded-card border border-border bg-surface">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th scope="col" className="px-4 py-4 font-semibold text-text-primary sm:px-6">
                      ID
                    </th>
                    <th scope="col" className="px-4 py-4 font-semibold text-text-primary sm:px-6">
                      Risk
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-right font-semibold text-text-primary sm:px-6"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {OWASP_RISKS.map((risk, index) => (
                    <tr
                      key={risk.id}
                      className={
                        index < OWASP_RISKS.length - 1 ? 'border-b border-border' : undefined
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-text-tertiary sm:px-6">
                        {risk.id}
                      </td>
                      <td className="px-4 py-4 font-medium text-text-primary sm:px-6">
                        <a href={`#${risk.id.toLowerCase()}`} className="hover:underline">
                          {risk.name}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-right sm:px-6">
                        <StatusBadge status={risk.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Individual risk sections */}
        <section className="border-t border-border-light bg-surface-secondary px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-16">
            {OWASP_RISKS.map((risk) => (
              <div key={risk.id} id={risk.id.toLowerCase()}>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                    {risk.id}: {risk.name}
                  </h2>
                  <StatusBadge status={risk.status} />
                </div>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  {risk.description}
                </p>
                <div className="mt-6 rounded-card border border-border bg-surface p-6">
                  <h3 className="text-lg font-semibold text-text-primary">
                    How Shield addresses this
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {risk.shieldResponse}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={risk.docLink}
                      className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {risk.docLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise callout */}
        <section className="px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-card border border-border bg-surface p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Need more from your compliance tooling?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Need compliance audit exports or custom data retention? These are available on the{' '}
              <Link
                href="/pricing"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Enterprise plan
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 py-14 sm:py-20 sm:pb-24">
          <div className="mx-auto max-w-3xl rounded-card border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Get started with Shield
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Shield gives your team consent screens, spending controls, and activity logging for
              every AI agent. Set up in minutes, free to start.
            </p>
            <div className="mt-6">
              <Link
                href="/shield"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Explore Shield
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
