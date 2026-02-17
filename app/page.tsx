export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Coming Soon
        </span>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
          AI agents need{' '}
          <span className="bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
            guardrails
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Multicorn helps teams understand, secure, and govern AI agents. From open-source education
          to enterprise-grade permission controls — we are building the trust layer for autonomous
          AI.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/learn"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Start Learning
          </a>
          <a
            href="/shield"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary"
          >
            Explore Shield
          </a>
        </div>
      </div>
    </main>
  )
}
