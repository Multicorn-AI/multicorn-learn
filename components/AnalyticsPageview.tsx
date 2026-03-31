'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { trackPageview } from '@/lib/analytics'

export function AnalyticsPageview() {
  const pathname = usePathname()

  useEffect(() => {
    trackPageview()
  }, [pathname])

  return null
}
