import { LaunchPage } from '@/components/LaunchPage'

interface LaunchGateProps {
  readonly children: React.ReactNode
}

export function LaunchGate({ children }: LaunchGateProps) {
  const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'true'

  if (isLaunchMode) {
    return <LaunchPage />
  }

  return <>{children}</>
}
