import { CopyButton } from '@/components/CopyButton'

interface CodeBlockProps {
  readonly code: string
  readonly language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-text-primary">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-text-tertiary">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3">
        <code className="text-sm text-green">{code}</code>
      </pre>
    </div>
  )
}
