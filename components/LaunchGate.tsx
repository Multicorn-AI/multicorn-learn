import { cookies } from 'next/headers'
import { LaunchPage } from '@/components/LaunchPage'
import { SiteHeader } from '@/components/SiteHeader'

interface LaunchGateProps {
  readonly children: React.ReactNode
}

export async function LaunchGate({ children }: LaunchGateProps) {
  const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'true'

  if (isLaunchMode) {
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
