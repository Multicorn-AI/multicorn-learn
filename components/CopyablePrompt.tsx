'use client'

import { extractTextFromChildren } from '@/lib/extract-text-from-children'
import { CopyButton } from '@/components/CopyButton'

interface CopyablePromptProps {
  readonly label: string
  readonly children: React.ReactNode
}

export function CopyablePrompt({ label, children }: CopyablePromptProps) {
  const text = extractTextFromChildren(children).trim()

  return (
    <figure className="mb-6 overflow-hidden rounded-lg border border-border bg-surface-secondary">
      <figcaption className="border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-text-primary">{label}</p>
      </figcaption>
      <div className="flex items-start justify-between gap-3 bg-text-primary px-4 py-3">
        <div className="flex-1 text-sm leading-relaxed text-green [&_p:last-child]:mb-0 [&_p]:mb-2 [&_p]:text-green">
          {children}
        </div>
        <CopyButton
          text={text}
          label="Copy prompt"
          analyticsEvent={{ event: 'prompt_copied', props: { category: 'course2_cursor_prompt' } }}
        />
      </div>
    </figure>
  )
}
