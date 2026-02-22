import { Footer } from '@/components/Footer'

export default function LearnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
