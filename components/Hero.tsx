import Image from 'next/image'

import { TrackedCtaLink } from '@/components/TrackedCtaLink'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-24 sm:pb-20 sm:pt-32 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
      />

      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            The trusted layer between{' '}
            <span className="bg-gradient-to-r from-primary via-indigo to-pink bg-clip-text text-transparent">
              humans and AI agents
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Multicorn Shield gives your team consent screens, spending controls, and activity
            logging for every AI agent. So you stay in control.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <TrackedCtaLink
              href="https://app.multicorn.ai/signup"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              eventName="signup_cta_click"
              eventProps={{ location: 'home_hero' }}
            >
              Get Started - Free
            </TrackedCtaLink>
            <a
              href="https://github.com/Multicorn-AI/multicorn-shield"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px] origin-center scale-[0.94] lg:scale-[0.92]">
            <div className="overflow-hidden rounded-card border border-border bg-surface-secondary shadow-2xl shadow-primary/15 ring-1 ring-primary/10">
              <Image
                src="/images/consent-screen-real.png"
                alt="Multicorn Shield consent screen showing permission controls for an AI agent accessing Gmail, Google Calendar, Payments, Slack, and Google Drive with spending limits"
                width={824}
                height={1610}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
