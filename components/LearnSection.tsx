export function LearnSection() {
  return (
    <section id="learn" className="bg-surface-secondary px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
          Free education
        </span>

        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          New to AI agents? Start here.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
          Multicorn Learn is a free, practical guide to understanding AI agents — what they are, how
          they work, and how to use them safely. No jargon, no fluff.
        </p>

        <a
          href="/learn"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-green px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green/90 focus:outline-none focus:ring-2 focus:ring-green/20 focus:ring-offset-2"
        >
          Explore AI 101
        </a>
      </div>
    </section>
  )
}
