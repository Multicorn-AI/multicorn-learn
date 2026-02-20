export function LaunchPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="flex max-w-xl flex-col items-center text-center">
        <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Coming Soon
        </span>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          <span className="bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
            Multicorn
          </span>
        </h1>

        <p className="max-w-md text-lg leading-relaxed text-text-secondary">
          Learn how to build safe AI agents — and get the tools to keep them in check.
        </p>
      </div>
    </main>
  )
}
