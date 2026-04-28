import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InstallBanner } from '@/components/InstallBanner'

const LS_DISMISSED = 'multicorn:pwa:dismissed'
const LS_INSTALLED = 'multicorn:pwa:installed'
const LS_FIRST_SEEN = 'multicorn:pwa:firstSeenAt'

function mockMatchMedia(standalone: boolean) {
  return vi.fn().mockImplementation((query: string) => {
    const matches = query === '(display-mode: standalone)' && standalone
    return {
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
    } as unknown as MediaQueryList
  })
}

function dispatchBeforeInstallPrompt() {
  const e = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  }
  e.prompt = vi.fn().mockResolvedValue(undefined)
  e.userChoice = Promise.resolve({ outcome: 'dismissed' as const })
  act(() => {
    window.dispatchEvent(e)
  })
}

describe('InstallBanner', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('matchMedia', mockMatchMedia(false))
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    localStorage.clear()
    vi.useRealTimers()
  })

  it('does not render when dismissed is stored', async () => {
    localStorage.setItem(LS_DISMISSED, '1')
    localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()
    await waitFor(() => {
      expect(screen.queryByRole('region', { name: 'Install app' })).not.toBeInTheDocument()
    })
  })

  it('does not render in standalone display mode', async () => {
    vi.stubGlobal('matchMedia', mockMatchMedia(true))
    localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()
    await waitFor(() => {
      expect(screen.queryByRole('region', { name: 'Install app' })).not.toBeInTheDocument()
    })
  })

  it('does not render until engagement timer completes on first visit', async () => {
    vi.useFakeTimers()
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()

    expect(screen.queryByRole('region', { name: 'Install app' })).not.toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(20_000)
    })

    expect(screen.getByRole('region', { name: 'Install app' })).toBeInTheDocument()
    expect(screen.getByText('Install Multicorn Learn')).toBeInTheDocument()
  })

  it('renders immediately for a returning visitor when install is available', async () => {
    localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()

    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Install app' })).toBeInTheDocument()
    })
  })

  it('persists dismiss across remounts', async () => {
    localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
    const { unmount } = render(<InstallBanner />)
    dispatchBeforeInstallPrompt()

    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Install app' })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(localStorage.getItem(LS_DISMISSED)).toBe('1')

    unmount()
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()

    await waitFor(() => {
      expect(screen.queryByRole('region', { name: 'Install app' })).not.toBeInTheDocument()
    })
  })

  it('does not render when installed flag is stored', async () => {
    localStorage.setItem(LS_INSTALLED, '1')
    localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
    render(<InstallBanner />)
    dispatchBeforeInstallPrompt()
    await waitFor(() => {
      expect(screen.queryByRole('region', { name: 'Install app' })).not.toBeInTheDocument()
    })
  })
})
