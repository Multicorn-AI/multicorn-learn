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

  const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'true'
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
