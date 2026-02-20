import { useMDXComponents } from '@/mdx-components'
import { CopyButton } from '@/components/CopyButton'

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (!children) return ''

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }

  if (typeof children === 'object' && children !== null && 'props' in children) {
    const element = children as { props: { children?: React.ReactNode } }
    return extractTextFromChildren(element.props.children)
  }

  return ''
}

function extractLanguageFromClassName(className: string | undefined): string {
  if (!className) return ''
  const match = className.match(/language-(\w+)/)
  return match?.[1] ?? ''
}

// eslint-disable-next-line react-hooks/rules-of-hooks -- useMDXComponents is not a React hook despite the naming convention; it returns a plain object of component overrides
const baseComponents = useMDXComponents({})

export const docsComponents = {
  ...baseComponents,
  pre: ({ children }: { children: React.ReactNode }) => {
    const codeElement = children as React.ReactElement<{
      children: React.ReactNode
      className?: string
    }>
    const codeText = extractTextFromChildren(codeElement?.props?.children).trim()
    const language = extractLanguageFromClassName(codeElement?.props?.className)

    return (
      <div className="mb-6 overflow-hidden rounded-lg border border-border bg-text-primary">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-xs text-text-tertiary">{language || 'code'}</span>
          <CopyButton text={codeText} />
        </div>
        <pre className="overflow-x-auto px-4 py-3">
          <code className="text-sm text-green">{codeText}</code>
        </pre>
      </div>
    )
  },
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="border-b border-border bg-surface-secondary">{children}</thead>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 font-semibold text-text-primary">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border-t border-border px-4 py-3 text-text-secondary">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border" />,
}
