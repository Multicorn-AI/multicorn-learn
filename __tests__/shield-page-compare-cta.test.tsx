import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import ShieldPage from '@/app/shield/page'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => {
  cleanup()
})

describe('/shield page compare CTA', () => {
  it('shows compare section heading and link to /shield/compare', () => {
    render(<ShieldPage />)

    expect(
      screen.getByRole('heading', { name: /Not sure if Shield is right for you/i }),
    ).toBeInTheDocument()

    const compareLink = screen.getByRole('link', { name: /Compare Shield to alternatives/i })
    expect(compareLink).toHaveAttribute('href', '/shield/compare')

    const threatModelLink = screen.getByRole('link', { name: /Read the threat model/i })
    expect(threatModelLink).toHaveAttribute('href', '/shield/threat-model')
  })
})
