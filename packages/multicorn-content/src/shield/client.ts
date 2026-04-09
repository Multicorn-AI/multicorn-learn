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
   * Logs a requires_approval action; server creates a content review. Returns action id (used for PR tracking).
   */
  async submitForApproval(outline: Outline): Promise<string> {
    const metadata = {
      title: outline.title,
      summary: outline.summary,
      sections: [...outline.sections],
      audience_level: outline.audienceLevel,
      source_url: outline.sourceUrl,
      slug: outline.slug,
      date: outline.date,
    }

    const res = await fetch(`${this.api}/api/v1/actions`, {
      method: 'POST',
      headers: authHeaders(this.apiKey),
      body: JSON.stringify({
        agent: AGENT_NAME,
        service: 'drafts',
        actionType: 'submit_outline',
        status: 'requires_approval',
        cost: 0,
        metadata,
        platform: 'github-actions',
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Shield API: log action failed (${res.status}): ${errText.slice(0, 300)}`)
    }

    const body = await parseJson<ApiEnvelope<{ id: string }>>(res)
    if (!body.data?.id) {
      throw new Error('Shield API: log action response missing data.id')
    }
    return body.data.id
  }

  /**
   * Triggers the batched content outline approval email for the submitted action IDs.
   */
  async sendApprovalNotification(actionIds: string[]): Promise<void> {
    if (actionIds.length === 0) {
      return
    }
    const res = await fetch(`${this.api}/api/v1/content-outlines/notify`, {
      method: 'POST',
      headers: authHeaders(this.apiKey),
      body: JSON.stringify({ action_ids: actionIds }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(
        `Shield API: content outline notify failed (${res.status}): ${errText.slice(0, 300)}`,
      )
    }
  }

  /**
   * Loads approved outline submissions for this agent (drafts service) that are ready for PR creation.
   */
  async getApprovedOutlines(agentId: string): Promise<Outline[]> {
    const params = new URLSearchParams({
      agent_id: agentId,
      status: 'approved',
      service: 'drafts',
      page: '0',
      size: '100',
    })
    const res = await fetch(`${this.api}/api/v1/actions?${params}`, {
      headers: authHeaders(this.apiKey),
    })
    if (!res.ok) {
      throw new Error(`Shield API: query actions failed (${res.status})`)
    }
    const body = await parseJson<ApiEnvelope<Record<string, unknown>>>(res)
    const page = body.data
    const rows = Array.isArray(page?.content) ? page.content : []

    const outlines: Outline[] = []
    for (const raw of rows) {
      if (typeof raw !== 'object' || raw === null) continue
      const row = raw as Record<string, unknown>
      const id = typeof row.id === 'string' ? row.id : ''
      const actionType =
        typeof row.action_type === 'string'
          ? row.action_type
          : typeof row.actionType === 'string'
            ? row.actionType
            : ''
      if (actionType !== 'submit_outline' || !row.metadata) continue
      try {
        const rawMeta = row.metadata
        const meta =
          typeof rawMeta === 'string'
            ? (JSON.parse(rawMeta) as Record<string, unknown>)
            : (rawMeta as Record<string, unknown>)
        const title = typeof meta.title === 'string' ? meta.title : ''
        const summary = typeof meta.summary === 'string' ? meta.summary : ''
        const sections = Array.isArray(meta.sections)
          ? meta.sections.filter((s): s is string => typeof s === 'string')
          : []
        const audienceLevel = meta.audience_level
        const sourceUrl = typeof meta.source_url === 'string' ? meta.source_url : ''
        const slug = typeof meta.slug === 'string' ? meta.slug : ''
        const date = typeof meta.date === 'string' ? meta.date : ''
        if (
          !title ||
          sections.length !== 5 ||
          (audienceLevel !== 'beginner' &&
            audienceLevel !== 'intermediate' &&
            audienceLevel !== 'advanced')
        ) {
          continue
        }
        outlines.push({
          title,
          summary,
          sections,
          audienceLevel,
          sourceUrl,
          slug,
          date,
          actionId: id,
        })
      } catch {
        continue
      }
    }
    return outlines
  }

  getAgentId(): string | null {
    return this.agentId
  }
}
