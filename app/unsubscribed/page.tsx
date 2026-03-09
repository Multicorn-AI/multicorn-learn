export default function UnsubscribedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 py-14">
      <div className="w-full max-w-xl rounded-card border border-border bg-surface-secondary p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-10 w-10 text-primary"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          You&apos;ve been unsubscribed
        </h1>

        <p className="mt-3 text-base leading-relaxed text-text-secondary">Sorry to see you go.</p>

        <a
          href="https://multicorn.ai"
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          Back to multicorn.ai
        </a>
      </div>
    </main>
  )
}
