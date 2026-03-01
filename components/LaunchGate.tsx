import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { LaunchPage } from '@/components/LaunchPage'
import { isLaunchGatePublicPath, isLaunchGateStandalonePath } from '@/lib/launchGatePaths'
import { SiteHeader } from '@/components/SiteHeader'

interface LaunchGateProps {
  readonly children: React.ReactNode
}

export async function LaunchGate({ children }: LaunchGateProps) {
  const requestHeaders = await headers()
  const pathname = requestHeaders.get('x-pathname') ?? '/'
  const publicPathHeader = requestHeaders.get('x-launch-gate-public')
  const isStandalonePath = isLaunchGateStandalonePath(pathname)

  if (isStandalonePath) {
    return children
  }

  // Check feature flag from backend API
  const apiUrl = process.env.MULTICORN_API_URL || 'https://api.multicorn.ai'
  let isLaunchMode = false
  try {
    const response = await fetch(`${apiUrl}/api/v1/feature-flags/learn_launch`, {
      cache: 'no-store',
    })
    if (response.ok) {
      const data = await response.json()
      isLaunchMode = data.data?.enabled === true
    }
  } catch {
    // If flag check fails, default to not launch mode (allow access)
    isLaunchMode = false
  }

  const isPublicPath =
    publicPathHeader !== null ? publicPathHeader === '1' : isLaunchGatePublicPath(pathname)

  if (isLaunchMode && !isPublicPath) {
    const cookieStore = await cookies()
    const hasPreview = cookieStore.has('multicorn_preview')

    if (!hasPreview) {
      return <LaunchPage />
    }
  }

  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
