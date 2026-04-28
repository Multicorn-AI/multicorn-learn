import { ShieldCheck } from 'lucide-react'

interface SecurityNoteProps {
  readonly title?: string
  readonly children: React.ReactNode
}

export function SecurityNote({ title, children }: SecurityNoteProps) {
  return (
    <aside
      className="mb-6 rounded-r-lg border-l-4 border-primary bg-primary/5 px-4 py-4 sm:px-5"
      aria-label="Security tip"
    >
      <div className="flex gap-3">
        <ShieldCheck
          className="h-5 w-5 shrink-0 text-primary"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <div className="min-w-0 space-y-2">
          {title ? <p className="text-sm font-semibold text-text-primary">{title}</p> : null}
          <div className="text-sm leading-relaxed text-text-secondary [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:mb-3">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
