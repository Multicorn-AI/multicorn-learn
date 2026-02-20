interface FeatureCardProps {
  readonly icon: React.ReactNode
  readonly name: string
  readonly description: string
  readonly accentClass?: string
}

export function FeatureCard({
  icon,
  name,
  description,
  accentClass = 'bg-primary/10 text-primary',
}: FeatureCardProps) {
  return (
    <div className="rounded-card border border-border bg-surface-secondary p-6">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${accentClass}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-text-primary">{name}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  )
}
