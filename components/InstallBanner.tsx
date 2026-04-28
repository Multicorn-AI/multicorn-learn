'use client'

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'

const LS_DISMISSED = 'multicorn:pwa:dismissed'
const LS_INSTALLED = 'multicorn:pwa:installed'
const LS_FIRST_SEEN = 'multicorn:pwa:firstSeenAt'
const ENGAGEMENT_MS = 20_000

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function detectIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function usePwaInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [standaloneReady, setStandaloneReady] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [hasDismissed, setHasDismissed] = useState(false)
  const [hasInstalled, setHasInstalled] = useState(false)
  const [engagementMet, setEngagementMet] = useState(false)
  const [persistenceReady, setPersistenceReady] = useState(false)
  const installEventRef = useRef<BeforeInstallPromptEvent | null>(null)

  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setIsStandalone(false)
      setStandaloneReady(true)
      return
    }
    const mq = window.matchMedia('(display-mode: standalone)')
    const sync = () => {
      const running =
        mq.matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
      setIsStandalone(running)
    }
    sync()
    mq.addEventListener('change', sync)
    setStandaloneReady(true)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    let engagementTimer: number | undefined

    try {
      setHasDismissed(window.localStorage.getItem(LS_DISMISSED) === '1')
      setHasInstalled(window.localStorage.getItem(LS_INSTALLED) === '1')
      setIsIOS(detectIOS())

      const firstSeen = window.localStorage.getItem(LS_FIRST_SEEN)
      if (!firstSeen) {
        window.localStorage.setItem(LS_FIRST_SEEN, new Date().toISOString())
        engagementTimer = window.setTimeout(() => setEngagementMet(true), ENGAGEMENT_MS)
      } else {
        setEngagementMet(true)
      }
    } catch {
      setEngagementMet(true)
    }
    setPersistenceReady(true)

    const beforeInstall = (e: Event) => {
      e.preventDefault()
      installEventRef.current = e as BeforeInstallPromptEvent
      setCanInstall(true)
    }
    const onInstalled = () => {
      try {
        window.localStorage.setItem(LS_INSTALLED, '1')
      } catch {
        /* ignore */
      }
      setHasInstalled(true)
      setCanInstall(false)
    }
    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      if (engagementTimer !== undefined) window.clearTimeout(engagementTimer)
      installEventRef.current = null
      setCanInstall(false)
    }
  }, [])

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(LS_DISMISSED, '1')
    } catch {
      /* ignore */
    }
    setHasDismissed(true)
  }, [])

  const promptInstall = useCallback(async () => {
    const e = installEventRef.current
    if (!e) return
    await e.prompt()
    const { outcome } = await e.userChoice
    if (outcome === 'accepted') {
      try {
        window.localStorage.setItem(LS_INSTALLED, '1')
      } catch {
        /* ignore */
      }
      setHasInstalled(true)
      setCanInstall(false)
    }
  }, [])

  const isReady = standaloneReady && persistenceReady

  return {
    canInstall,
    isStandalone,
    isIOS,
    isReady,
    hasDismissed,
    hasInstalled,
    engagementMet,
    dismiss,
    promptInstall,
  }
}

export function InstallBanner() {
  const {
    canInstall,
    isStandalone,
    isIOS,
    isReady,
    hasDismissed,
    hasInstalled,
    engagementMet,
    dismiss,
    promptInstall,
  } = usePwaInstallPrompt()

  if (
    !isReady ||
    !canInstall ||
    isStandalone ||
    isIOS ||
    hasDismissed ||
    hasInstalled ||
    !engagementMet
  ) {
    return null
  }

  return (
    <div
      role="region"
      aria-label="Install app"
      className="sticky top-0 z-50 flex min-h-11 shrink-0 items-center justify-between bg-violet-600 px-4 py-2 text-white"
    >
      <span>Install Multicorn Learn</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={promptInstall}
          className="min-h-11 rounded bg-primary-dark px-4 py-2 text-sm font-medium text-white hover:bg-primary"
        >
          Install
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="min-h-11 min-w-11 rounded p-2 text-white/80 hover:bg-white/20 hover:text-white"
          aria-label="Dismiss"
        >
          X
        </button>
      </div>
    </div>
  )
}
