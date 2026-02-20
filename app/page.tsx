import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { LearnSection } from '@/components/LearnSection'
import { SocialProof } from '@/components/SocialProof'
import { Pricing } from '@/components/Pricing'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <LearnSection />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
