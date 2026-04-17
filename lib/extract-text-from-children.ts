import type { ReactNode } from 'react'

export function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (!children) return ''

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }

  if (typeof children === 'object' && children !== null && 'props' in children) {
    const element = children as { props: { children?: ReactNode } }
    return extractTextFromChildren(element.props.children)
  }

  return ''
}
