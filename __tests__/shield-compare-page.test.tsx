import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ShieldComparePage from '@/app/shield/compare/page'
import { COMPARE_COMPETITORS, SHIELD_COMPARE } from '@/lib/compare-data'

describe('/shield/compare page', () => {
  it('renders all four use-case tool names and no visible TODO placeholder strings', () => {
    const { container } = render(<ShieldComparePage />)

    for (const competitor of COMPARE_COMPETITORS) {
      expect(screen.getByText(competitor.name)).toBeInTheDocument()
    }

    expect(screen.getByText(SHIELD_COMPARE.name)).toBeInTheDocument()

    expect(container.textContent ?? '').not.toContain('TODO')
  })
})
