import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ShieldComparePage from '@/app/shield/compare/page'
import { COMPARE_COMPETITORS, SHIELD_COMPARE } from '@/lib/compare-data'

afterEach(() => {
  cleanup()
})

describe('/shield/compare page', () => {
  it('renders all four use-case tool names and no visible TODO placeholder strings', () => {
    const { container } = render(<ShieldComparePage />)

    for (const competitor of COMPARE_COMPETITORS) {
      expect(screen.getByText(competitor.name)).toBeInTheDocument()
    }

    expect(screen.getByText(SHIELD_COMPARE.name)).toBeInTheDocument()

    expect(container.textContent ?? '').not.toContain('TODO')
  })

  it('renders exactly four article cards', () => {
    const { container } = render(<ShieldComparePage />)
    expect(container.querySelectorAll('article')).toHaveLength(4)
  })

  it('renders Multicorn Shield as the last compare card', () => {
    const { container } = render(<ShieldComparePage />)
    const articles = container.querySelectorAll('article')
    expect(articles).toHaveLength(4)
    const lastHeading = articles[3]?.querySelector('h2')
    expect(lastHeading?.textContent).toBe(SHIELD_COMPARE.useCase)
  })

  it('renders the hero heading about choosing the right tool', () => {
    render(<ShieldComparePage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Choosing the right tool/,
      }),
    ).toBeInTheDocument()
  })
})
