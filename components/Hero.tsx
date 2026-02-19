import { EmailSignupForm } from '@/components/EmailSignupForm'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
      />

      <div className="mx-auto max-w-content text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          The trusted layer between{' '}
          <span className="bg-gradient-to-r from-primary via-indigo to-pink bg-clip-text text-transparent">
            humans and AI agents
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          Multicorn Shield gives your team consent screens, spending controls, and activity logging
          for every AI agent — so you stay in control.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/shield"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
          >
            Get Started — Free
          </a>
          <a
            href="https://github.com/Multicorn-AI/multicorn-shield"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
          >
            View on GitHub
          </a>
        </div>

        <div className="mx-auto mt-14 max-w-md">
          <p className="mb-3 text-sm font-medium text-text-secondary">
            Get updates on Multicorn — no spam, ever.
          </p>
          <EmailSignupForm />
        </div>
      </div>
    </section>
  )
}
