export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-pink/10 px-4 py-1.5 text-sm font-medium text-pink">
          Blog
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Multicorn Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
          Insights on AI agent governance, security best practices, and the future of autonomous AI
          in the enterprise.
        </p>
      </div>
    </main>
  )
}
