import { getAllReleases } from '@/lib/changelog'
import { CHANGE_CATEGORIES } from '@/lib/changelog'
import type { Release } from '@/lib/changelog'

const SITE_URL = 'https://multicorn.ai'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildDescription(release: Release): string {
  const sections: string[] = []

  for (const category of CHANGE_CATEGORIES) {
    const items = release[category.key]
    if (items.length === 0) continue

    const list = items.map((item) => `- ${escapeXml(item)}`).join('\n')
    sections.push(`${category.label}:\n${list}`)
  }

  return sections.join('\n\n')
}

export async function GET() {
  const releases = getAllReleases()

  const items = releases
    .map(
      (release) => `    <item>
      <title>v${escapeXml(release.version)}</title>
      <link>${SITE_URL}/changelog#v${escapeXml(release.version)}</link>
      <guid isPermaLink="true">${SITE_URL}/changelog#v${escapeXml(release.version)}</guid>
      <pubDate>${new Date(release.date).toUTCString()}</pubDate>
      <description>${escapeXml(buildDescription(release))}</description>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Multicorn Shield Changelog</title>
    <link>${SITE_URL}/changelog</link>
    <description>Release history for the Multicorn Shield SDK. New features, fixes, and security updates.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/changelog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
