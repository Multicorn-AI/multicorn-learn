import Link from 'next/link'

function StarSparkle({
  className,
  size = 16,
}: {
  readonly className?: string
  readonly size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-gradient-shift bg-gradient-to-br from-primary/[0.03] via-pink/[0.03] to-indigo/[0.03] bg-[length:200%_200%]"
      />

      <StarSparkle
        className="pointer-events-none absolute left-[12%] top-[18%] animate-drift text-primary/40"
        size={20}
      />
      <StarSparkle
        className="pointer-events-none absolute right-[15%] top-[12%] animate-drift-reverse text-pink/40 [animation-delay:1s]"
        size={14}
      />
      <StarSparkle
        className="pointer-events-none absolute bottom-[22%] left-[20%] animate-drift text-indigo/40 [animation-delay:2s]"
        size={12}
      />
      <StarSparkle
        className="pointer-events-none absolute bottom-[15%] right-[18%] animate-drift-reverse text-orange/40 [animation-delay:0.5s]"
        size={18}
      />
      <StarSparkle
        className="pointer-events-none absolute right-[30%] top-[30%] animate-drift text-green/30 [animation-delay:3s]"
        size={10}
      />
      <StarSparkle
        className="pointer-events-none absolute bottom-[35%] left-[8%] animate-drift-reverse text-teal/30 [animation-delay:1.5s]"
        size={16}
      />

      <div className="text-center">
        {/* TODO: Replace with final 404 illustration asset from Mirza once delivered */}
        {/* Asset should be placed at /public/images/404-unicorn.png */}
        <img
          src="/images/404-unicorn.png"
          alt=""
          width="120"
          height="120"
          className="mx-auto"
          aria-hidden="true"
        />

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">404</p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-primary via-indigo to-pink bg-clip-text text-transparent">
            This horn doesn&apos;t exist
          </span>{' '}
          <span className="text-text-primary">...yet</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
          You&apos;ve wandered beyond the Multicorn universe. The page you&apos;re looking for may
          have moved or never existed.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/learn"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:w-auto"
          >
            Explore Learn
          </Link>
        </div>
      </div>
    </main>
  )
}
