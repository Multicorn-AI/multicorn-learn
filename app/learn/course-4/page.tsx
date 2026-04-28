import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { Bot, Building2, Sparkles, Users, Workflow } from 'lucide-react'
import { AgentPicker } from '@/components/AgentPicker'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'
import { ToolPickerCard } from '@/components/ToolPickerCard'
import { course4LandingCopy, type Course4PlatformName } from '@/lib/course-4-landing-copy'
import { isCourse4Enabled } from '@/lib/feature-flags'

export const metadata: Metadata = {
  title: 'Build Your First Agent | Multicorn Learn',
  description:
    'Learn what an AI agent is, what you will build in Course 4, and pick a platform track: AutoHive, Dust, MindStudio, or n8n.',
  openGraph: {
    title: 'Build Your First Agent | Multicorn Learn',
    description:
      'Learn what an AI agent is and pick a platform track: AutoHive, Dust, MindStudio, or n8n.',
    type: 'website',
  },
}

function course4PlatformCardUi(name: Course4PlatformName): {
  icon: ReactNode
  accentClass: string
} {
  const iconProps = { className: 'h-5 w-5' as const, strokeWidth: 1.5 as const }
  switch (name) {
    case 'AutoHive':
      return {
        icon: <Building2 {...iconProps} />,
        accentClass:
          'bg-violet-500/10 border-violet-500/20 hover:border-violet-500/40 focus:ring-violet-500/20',
      }
    case 'Dust':
      return {
        icon: <Users {...iconProps} />,
        accentClass:
          'bg-[#6366f1]/10 border-[#6366f1]/20 hover:border-[#6366f1]/40 focus:ring-[#6366f1]/20',
      }
    case 'MindStudio':
      return {
        icon: <Sparkles {...iconProps} />,
        accentClass:
          'bg-[#14b8a6]/10 border-[#14b8a6]/20 hover:border-[#14b8a6]/40 focus:ring-[#14b8a6]/20',
      }
    case 'n8n':
      return {
        icon: <Workflow {...iconProps} />,
        accentClass:
          'bg-sky-500/10 border-sky-500/20 hover:border-sky-500/40 focus:ring-sky-500/20',
      }
  }
}

export default function Course4Page() {
  if (!isCourse4Enabled()) {
    redirect('/learn')
  }

  const copy = course4LandingCopy

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <CourseLandingTopNav activeCourse={4} />

        <CourseLandingHero
          variant="course-4"
          icon={<Bot className="h-6 w-6" strokeWidth={1.5} />}
          courseLabel={copy.hero.courseLabel}
          title={copy.hero.title}
        >
          <p className="text-sm leading-relaxed text-text-secondary">{copy.hero.subtitle}</p>
          <p className="text-lg leading-relaxed text-text-secondary">{copy.hero.intro}</p>
        </CourseLandingHero>

        <div className="mx-auto max-w-3xl space-y-16 px-4">
          <section aria-labelledby="what-is-an-agent">
            <h2
              id="what-is-an-agent"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              {copy.whatIsAnAgent.heading}
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              {copy.whatIsAnAgent.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="what-you-build">
            <h2
              id="what-you-build"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              {copy.whatYouWillBuild.heading}
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              {copy.whatYouWillBuild.intro}
            </p>
            <ul className="list-inside list-disc space-y-2 text-text-secondary">
              {copy.whatYouWillBuild.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="what-you-learn">
            <h2
              id="what-you-learn"
              className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              {copy.whatYouWillLearn.heading}
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              {copy.whatYouWillLearn.intro}
            </p>
            <ul className="list-none space-y-3 leading-relaxed text-text-secondary">
              {copy.whatYouWillLearn.items.map((item) => (
                <li key={item.label}>
                  <span className="font-medium text-text-primary">{item.label}.</span> {item.detail}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="pick-your-platform"
            aria-labelledby="pick-your-platform-heading"
            className="scroll-mt-24"
          >
            <h2
              id="pick-your-platform-heading"
              className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              Pick your platform
            </h2>
            <p className="mb-8 max-w-2xl text-text-secondary">{copy.pickPlatformIntro}</p>
            <div className="mb-10 max-w-2xl">
              <AgentPicker />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {copy.platformCards.map((card) => {
                const { icon, accentClass } = course4PlatformCardUi(card.name)
                return (
                  <ToolPickerCard
                    key={card.href}
                    name={card.name}
                    href={card.href}
                    icon={icon}
                    bestFor={card.bestFor}
                    cost={card.cost}
                    limitation={card.limitation}
                    accentClass={accentClass}
                  />
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
