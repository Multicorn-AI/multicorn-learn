export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-content text-center">
        <span className="mb-4 inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
          Pricing
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
          Start free. Scale as your team grows. No hidden costs, no surprises.
        </p>
      </div>
    </main>
  )
}
