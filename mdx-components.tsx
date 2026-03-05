import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-semibold tracking-tight text-text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-text-primary">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4 leading-relaxed text-text-secondary">{children}</p>,
    a: ({ href, children }) => {
      const isExternal =
        typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))
      return (
        <a
          href={href}
          className="font-medium text-primary underline decoration-primary/30 hover:decoration-primary"
          {...(isExternal && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        >
          {children}
        </a>
      )
    },
    code: ({ children, className, ...rest }) => {
      if (className && className.startsWith('language-')) {
        return (
          <code className={className} {...rest}>
            {children}
          </code>
        )
      }
      return (
        <code className="rounded bg-surface-tertiary px-1.5 py-0.5 text-sm font-medium">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-card bg-text-primary p-4 text-sm text-white">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-text-secondary">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-text-secondary">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-text-secondary">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
