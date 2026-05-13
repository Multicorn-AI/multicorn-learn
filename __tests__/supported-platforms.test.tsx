import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it } from 'vitest'
import { SupportedPlatforms } from '@/components/SupportedPlatforms'
import {
  platformBadgeToVisualStatus,
  supportedPlatformBadgeClass,
} from '@/lib/supported-platforms-data'

afterEach(() => {
  cleanup()
})

describe('supportedPlatformBadgeClass', () => {
  it('returns native-style classes for supported', () => {
    const c = supportedPlatformBadgeClass('supported')
    expect(c).toContain('green-dim')
    expect(c).toContain('text-green/80')
  })

  it('returns hosted-style classes for new', () => {
    const c = supportedPlatformBadgeClass('new')
    expect(c).toContain('cyan-dim')
    expect(c).toContain('text-cyan')
  })

  it('returns muted uppercase pill classes for coming-soon', () => {
    const c = supportedPlatformBadgeClass('coming-soon')
    expect(c).toContain('rounded-full')
    expect(c).toContain('bg-surface')
    expect(c).toContain('ring-border')
    expect(c).toContain('uppercase')
  })

  it('maps platform badge strings to supported or new', () => {
    expect(platformBadgeToVisualStatus('Native plugin')).toBe('supported')
    expect(platformBadgeToVisualStatus('Hosted proxy')).toBe('new')
  })
})

describe('SupportedPlatforms', () => {
  it('SSR output does not use role=presentation', () => {
    const html = renderToString(<SupportedPlatforms />)
    expect(html).not.toContain('role="presentation"')
    expect(html).toContain('OpenClaw')
  })

  it('after mount, expandable card is a button with expand/collapse aria-label', async () => {
    render(<SupportedPlatforms />)
    const btn = await screen.findByRole('button', {
      name: /OpenClaw - click to expand details/i,
    })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles expand/collapse on platform card click', async () => {
    render(<SupportedPlatforms />)
    const btn = await screen.findByRole('button', {
      name: /OpenClaw - click to expand details/i,
    })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    await waitFor(() => {
      expect(btn).toHaveAttribute('aria-expanded', 'true')
    })
    fireEvent.click(btn)
    await waitFor(() => {
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
