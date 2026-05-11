import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ShieldThreatModelPage, { metadata } from '@/app/shield/threat-model/page'

afterEach(() => {
  cleanup()
})

describe('/shield/threat-model page', () => {
  it('renders the hero heading and no TODO placeholder strings', () => {
    const { container } = render(<ShieldThreatModelPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Shield threat model/ }),
    ).toBeInTheDocument()

    expect(container.textContent ?? '').not.toContain('TODO')
  })

  it('renders the coverage table with both integration columns', () => {
    render(<ShieldThreatModelPage />)

    expect(screen.getByRole('columnheader', { name: /Native plugin/ })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Hosted proxy \(MCP\)/ })).toBeInTheDocument()
  })

  it('links the recommendation to getting started docs', () => {
    render(<ShieldThreatModelPage />)

    const docLink = screen.getByRole('link', { name: /^Getting started$/ })
    expect(docLink).toHaveAttribute('href', '/docs/getting-started')
  })

  it('lists native plugin integrations including Gemini CLI', () => {
    render(<ShieldThreatModelPage />)

    expect(
      screen.getByText(
        /Native plugin integrations today include OpenClaw, Claude Code, Windsurf, Cline, and Gemini CLI/i,
      ),
    ).toBeInTheDocument()
  })

  it('declares the correct canonical URL', () => {
    expect(metadata.alternates?.canonical).toBe('https://multicorn.ai/shield/threat-model')
  })
})
