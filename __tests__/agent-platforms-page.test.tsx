import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import AgentPlatformsPage from '@/app/learn/agent-platforms/page'
import { AGENT_PLATFORMS } from '@/lib/agent-platform-data'

afterEach(() => {
  cleanup()
})

describe('/learn/agent-platforms page', () => {
  it('renders hero, picker copy, eight platform sections, quarterly note, and JSON-LD', async () => {
    const { container } = render(<AgentPlatformsPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Compare agent platforms without the hype/,
      }),
    ).toBeInTheDocument()

    const jsonLdScripts = container.querySelectorAll('script[type="application/ld+json"]')
    expect(jsonLdScripts.length).toBe(1)
    const raw = jsonLdScripts[0]?.textContent ?? ''
    expect(raw).toContain('"Article"')

    await waitFor(() => {
      expect(screen.getByText('What tools do you already use?')).toBeInTheDocument()
    })

    for (const p of AGENT_PLATFORMS) {
      expect(screen.getAllByRole('heading', { level: 3, name: p.name }).length).toBeGreaterThan(0)
    }

    expect(screen.getByText(/This page is refreshed quarterly/i)).toBeInTheDocument()

    expect(container.querySelectorAll('article')).toHaveLength(AGENT_PLATFORMS.length)
  })
})
