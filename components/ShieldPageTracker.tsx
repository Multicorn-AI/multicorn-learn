'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/plausible'

export function ShieldPageTracker() {
  useEffect(() => {
    trackEvent('shield_page_view')
  }, [])

  return null
}
