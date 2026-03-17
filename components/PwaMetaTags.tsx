'use client'

import { useEffect } from 'react'

/**
 * Injects iOS PWA meta tags. Next.js Metadata API does not output
 * mobile-web-app-capable in a way that enables Safari splash screens,
 * so we inject these on the client.
 */
export function PwaMetaTags() {
  useEffect(() => {
    const tags: [string, Record<string, string>][] = [
      ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: 'Learn' }],
    ]
    const elements: HTMLElement[] = []
    tags.forEach(([tagName, attrs]) => {
      const el = document.createElement(tagName)
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
      document.head.appendChild(el)
      elements.push(el)
    })
    return () => elements.forEach((el) => el.remove())
  }, [])
  return null
}
