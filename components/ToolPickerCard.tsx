import Link from 'next/link'
import type { ReactNode } from 'react'

export interface ToolPickerCardProps {
  readonly name: string
  readonly href: string
  readonly icon: ReactNode
  readonly bestFor: string
  readonly cost: string
  readonly limitation: string
  readonly accentClass: string
}

export function ToolPickerCard({
  name,
  href,
  icon,
  bestFor,
  cost,
  limitation,
  accentClass,
}: ToolPickerCardProps) {
  return (
    <Link
      href={href}
      className={`group block rounded-card border p-6 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentClass}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{bestFor}</p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white/50"
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="font-medium text-text-primary">Cost</dt>
          <dd className="text-text-secondary">{cost}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Limitation</dt>
          <dd className="text-text-secondary">{limitation}</dd>
        </div>
      </dl>
    </Link>
  )
}
