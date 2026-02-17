export default function LearnPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
          Education
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Learn AI Agent Security
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
          Free, practical guides on building safe and governed AI agents. From permission models to
          spending controls — learn the patterns that matter.
        </p>
      </div>
    </main>
  )
}
