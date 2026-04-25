import type { Metadata } from 'next'
import Link from 'next/link'

interface VerifyPageProps {
  readonly params: Promise<{ agentId: string }>
}

export interface PublicAgentInfo {
  readonly id: string
  readonly name: string
  readonly registeredAt: string
  readonly scopes: Array<{ readonly service: string; readonly permissionLevel: string }>
}

function isPublicAgentInfo(data: unknown): data is PublicAgentInfo {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  const o = data as Record<string, unknown>
  if (
    typeof o.id !== 'string' ||
    typeof o.name !== 'string' ||
    typeof o.registeredAt !== 'string'
  ) {
    return false
  }
  if (!Array.isArray(o.scopes)) {
    return false
  }
  for (const s of o.scopes) {
    if (typeof s !== 'object' || s === null) {
      return false
    }
    const r = s as Record<string, unknown>
    if (typeof r.service !== 'string' || typeof r.permissionLevel !== 'string') {
      return false
    }
  }
  return true
}

type FetchResult = { ok: true; data: PublicAgentInfo } | { ok: false }

// TODO: SCP-12 - wire to real endpoint when GET /api/v1/agents/{id}/public is built
async function fetchPublicAgent(agentId: string): Promise<FetchResult> {
  const apiUrl = process.env.MULTICORN_API_URL || 'https://api.multicorn.ai'
  const url = `${apiUrl}/api/v1/agents/${encodeURIComponent(agentId)}/public`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      return { ok: false }
    }
    const data: unknown = await res.json()
    if (!isPublicAgentInfo(data)) {
      return { ok: false }
    }
    return { ok: true, data }
  } catch {
    return { ok: false }
  }
}

function formatRegisteredDate(registeredAt: string): string {
  const d = new Date(registeredAt)
  if (Number.isNaN(d.getTime())) {
    return registeredAt
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const { agentId } = await params
  return {
    title: 'Agent verification - Multicorn Shield',
    description: `View registered permissions and scopes for a Shield-governed agent. Agent ID: ${agentId}.`,
    openGraph: {
      title: 'Agent verification - Multicorn Shield',
      description: 'Public, read-only summary of a Shield-governed agent and its allowed scopes.',
      url: `https://multicorn.ai/verify/${encodeURIComponent(agentId)}`,
    },
  }
}

export default async function VerifyAgentPage({ params }: VerifyPageProps) {
  const { agentId } = await params
  const result = await fetchPublicAgent(agentId)
  if (result.ok) {
    const { data } = result
    return (
      <main className="min-h-screen bg-surface-secondary px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[600px]">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
            <div className="mb-8 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Verified
              </span>
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {data.name}
            </h1>
            <p className="mt-2 text-center text-sm text-text-secondary">
              Registered {formatRegisteredDate(data.registeredAt)}
            </p>

            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Permissions
              </h2>
              <ul className="mt-4 space-y-3 border-t border-border pt-4">
                {data.scopes.length === 0 ? (
                  <li className="text-sm text-text-secondary">No scopes listed for this agent.</li>
                ) : (
                  data.scopes.map((scope) => (
                    <li
                      key={`${scope.service}:${scope.permissionLevel}`}
                      className="rounded-lg bg-surface-secondary px-3 py-2 text-sm text-text-primary"
                    >
                      <span className="font-mono text-text-primary">
                        {scope.service}: {scope.permissionLevel}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>
          <p className="mt-10 text-center text-sm text-text-secondary">
            <Link href="/shield" className="text-primary hover:underline">
              Secured by Multicorn Shield
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-surface-secondary px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[600px]">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
          <h1 className="text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Agent verification
          </h1>
          <p className="mt-4 text-center text-text-secondary">
            Verification details are not yet available for this agent.
          </p>
          <p className="mt-2 text-center font-mono text-sm text-text-tertiary">ID: {agentId}</p>
        </div>
        <p className="mt-10 text-center text-sm text-text-secondary">
          <Link href="/shield" className="text-primary hover:underline">
            Secured by Multicorn Shield
          </Link>
        </p>
      </div>
    </main>
  )
}
