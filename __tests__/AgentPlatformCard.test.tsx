import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AgentPlatformCard } from '@/components/AgentPlatformCard'
import type { AgentPlatform } from '@/lib/agent-platform-data'

const SAMPLE: AgentPlatform = {
  id: 'n8n',
  name: 'n8n',
  tagline: 'Short positioning line for tests.',
  bestAt: 'Self-hosted workflows.',
  notBestAt: 'Not zero setup.',
  startingPrice: 'Varies',
  builtFor: 'Developers',
  url: 'https://n8n.io',
}

afterEach(() => {
  cleanup()
})

describe('AgentPlatformCard', () => {
  it('renders all fields and a visit link with external attributes', () => {
    const { container } = render(<AgentPlatformCard platform={SAMPLE} />)

    expect(screen.getByRole('heading', { level: 3, name: 'n8n' })).toBeInTheDocument()
    expect(screen.getByText('Short positioning line for tests.')).toBeInTheDocument()
    expect(screen.getByText('Self-hosted workflows.')).toBeInTheDocument()
    expect(screen.getByText('Not zero setup.')).toBeInTheDocument()
    expect(screen.getByText('Varies')).toBeInTheDocument()
    expect(screen.getByText('Developers')).toBeInTheDocument()

    const srSpans = [...container.querySelectorAll('.sr-only')]
    expect(srSpans.some((el) => (el.textContent ?? '').trim().startsWith('Best at'))).toBe(true)
    expect(srSpans.some((el) => (el.textContent ?? '').trim().startsWith('Not ideal for'))).toBe(
      true,
    )

    const link = screen.getByRole('link', { name: 'Visit n8n' })
    expect(link).toHaveAttribute('href', 'https://n8n.io')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('adds emphasis classes when highlight is true', () => {
    const { container } = render(<AgentPlatformCard platform={SAMPLE} highlight />)
    const article = container.querySelector('article')
    expect(article?.className).toContain('border-primary/30')
    expect(article?.className).toContain('ring-primary/10')
  })

  it('does not add emphasis ring when highlight is false', () => {
    const { container } = render(<AgentPlatformCard platform={SAMPLE} />)
    const article = container.querySelector('article')
    expect(article?.className).toContain('border-border')
  })
})
