'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallBanner() {
  const [canInstall, setCanInstall] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [standaloneChecked, setStandaloneChecked] = useState(false)
  const installEventRef = useRef<BeforeInstallPromptEvent | null>(null)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)')
    const sync = () => {
      const running =
        mq.matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
      setIsStandalone(running)
      setStandaloneChecked(true)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      installEventRef.current = e as BeforeInstallPromptEvent
      setCanInstall(true)
    }
    const handleInstalled = () => {
      setCanInstall(false)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
      installEventRef.current = null
      setCanInstall(false)
    }
  }, [])

  const handleInstall = async () => {
    const e = installEventRef.current
    if (!e) return
    await e.prompt()
    const { outcome } = await e.userChoice
    if (outcome === 'accepted') setCanInstall(false)
  }

  if (!standaloneChecked || isStandalone || !canInstall || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-violet-600 px-4 py-3 text-white">
      <span>Install Multicorn Learn</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="rounded bg-white px-3 py-1.5 text-sm font-medium text-violet-600 hover:bg-violet-50"
        >
          Install
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-white/80 hover:bg-white/20 hover:text-white"
          aria-label="Dismiss"
        >
          X
        </button>
      </div>
    </div>
  )
}
