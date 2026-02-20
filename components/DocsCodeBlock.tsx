import { CopyButton } from '@/components/CopyButton'

interface DocsCodeBlockProps {
  readonly code: string
  readonly language: string
  readonly filename?: string
}

export function DocsCodeBlock({ code, language, filename }: DocsCodeBlockProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-border bg-text-primary">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-tertiary">{language}</span>
          {filename && (
            <>
              <span className="text-xs text-white/20" aria-hidden="true">
                |
              </span>
              <span className="text-xs text-text-tertiary">{filename}</span>
            </>
          )}
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3">
        <code className="text-sm text-green">{code}</code>
      </pre>
    </div>
  )
}
