/* eslint-disable no-console -- Shield client logs warnings for fire-and-forget calls */
import type { AgentConfig, Outline } from '../types.js'

const AGENT_NAME = 'multicorn-content'

interface ApiEnvelope<T> {
  readonly success: boolean
  readonly data: T
}

function baseUrl(url: string): string {
  return url.replace(/\/+$/, '')
}

function authHeaders(apiKey: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Multicorn-Key': apiKey,
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  let body: unknown
  try {
    body = JSON.parse(text) as unknown
  } catch {
    throw new Error(`Shield API: invalid JSON (${res.status}): ${text.slice(0, 200)}`)
  }
  return body as T
}

export class ShieldClient {
  private readonly api: string
  private readonly apiKey: string
  private agentId: string | null = null

  constructor(private readonly config: AgentConfig) {
    this.api = baseUrl(config.shieldApiUrl)
    this.apiKey = config.shieldApiKey
  }

  async findOrRegisterAgent(): Promise<string> {
    const listRes = await fetch(`${this.api}/api/v1/agents`, {
      headers: authHeaders(this.apiKey),
    })
    if (!listRes.ok) {
      throw new Error(`Shield API: list agents failed (${listRes.status})`)
    }
    const listBody = await parseJson<ApiEnvelope<unknown>>(listRes)
    const agents = Array.isArray(listBody.data) ? listBody.data : []
    const existing = agents.find(
      (a): a is { id: string; name: string } =>
        typeof a === 'object' &&
        a !== null &&
        typeof (a as { id?: unknown }).id === 'string' &&
        typeof (a as { name?: unknown }).name === 'string' &&
        (a as { name: string }).name === AGENT_NAME,
    )
    if (existing) {
      this.agentId = existing.id
      return existing.id
    }

    const createRes = await fetch(`${this.api}/api/v1/agents`, {
      method: 'POST',
      headers: authHeaders(this.apiKey),
      body: JSON.stringify({
        name: AGENT_NAME,
        colour: '#6366F1',
        platform: 'github-actions',
        scopes: [{ service: 'news', read: true, write: false, execute: false }],
      }),
    })
    if (!createRes.ok) {
      const errText = await createRes.text()
      throw new Error(
        `Shield API: create agent failed (${createRes.status}): ${errText.slice(0, 300)}`,
      )
    }
    const created = await parseJson<ApiEnvelope<{ id: string; name: string }>>(createRes)
    this.agentId = created.data.id
    return created.data.id
  }

  /**
   * Logs an approved create_draft_pr action for audit. Does not throw; logs a warning on failure.
   */
  async logOutlineCreated(outline: Outline, prUrl: string): Promise<void> {
    try {
      const metadata: Record<string, unknown> = {
        title: outline.title,
        summary: outline.summary,
        sections: [...outline.sections],
        audience_level: outline.audienceLevel,
        source_url: outline.sourceUrl,
        slug: outline.slug,
        date: outline.date,
        pr_url: prUrl,
      }
      const res = await fetch(`${this.api}/api/v1/actions`, {
        method: 'POST',
        headers: authHeaders(this.apiKey),
        body: JSON.stringify({
          agent: AGENT_NAME,
          service: 'drafts',
          actionType: 'create_draft_pr',
          status: 'approved',
          cost: 0,
          metadata,
          platform: 'github-actions',
        }),
      })
      if (!res.ok) {
        const errText = await res.text()
        console.warn(
          `[multicorn-content] logOutlineCreated failed (${res.status}): ${errText.slice(0, 300)}`,
        )
      }
    } catch (e) {
      console.warn('[multicorn-content] logOutlineCreated failed:', e)
    }
  }

  /**
   * Notifies about created PRs. Does not throw; logs a warning on failure.
   */
  async sendPrNotification(prs: Array<{ title: string; prUrl: string }>): Promise<void> {
    if (prs.length === 0) {
      return
    }
    try {
      const res = await fetch(`${this.api}/api/v1/content-outlines/notify-prs`, {
        method: 'POST',
        headers: authHeaders(this.apiKey),
        body: JSON.stringify({
          prs: prs.map((p) => ({ title: p.title, pr_url: p.prUrl })),
        }),
      })
      if (!res.ok) {
        const errText = await res.text()
        console.warn(
          `[multicorn-content] sendPrNotification failed (${res.status}): ${errText.slice(0, 300)}`,
        )
      }
    } catch (e) {
      console.warn('[multicorn-content] sendPrNotification failed:', e)
    }
  }

  getAgentId(): string | null {
    return this.agentId
  }
}
