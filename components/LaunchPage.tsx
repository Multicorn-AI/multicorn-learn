import { EmailSignupForm } from '@/components/EmailSignupForm'

export function LaunchPage() {
  const hasSignup = !!process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID?.trim()

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-4 pt-10 sm:pb-8 sm:pt-16">
        <div className="flex max-w-xl flex-col items-center text-center">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Coming Soon
          </span>

          <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Multicorn
          </span>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            <span className="bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
              The trust layer for AI agents
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-text-secondary">
            Stay in control of every AI agent your team uses.
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-tertiary">
            Multicorn Shield for agent permissions. Multicorn Learn for AI education.
          </p>

          {hasSignup && (
            <div className="mt-8 w-full max-w-md">
              <EmailSignupForm />
              <p className="mt-3 text-sm font-medium text-text-secondary">Launching soon</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-border px-6 py-6 text-center text-sm text-text-tertiary">
        &copy; {new Date().getFullYear()} Multicorn.{' '}
        <a
          href="https://multicorn.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-text-secondary"
        >
          multicorn.ai
        </a>
      </footer>
    </div>
  )
}
