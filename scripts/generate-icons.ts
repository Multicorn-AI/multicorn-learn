/**
 * Generates PWA placeholder icons (192x192, 512x512) from an inline SVG.
 * Run: pnpm run generate-icons
 * When swapping in the final Mirza logo, replace the SVG below or point to an asset path
 * and re-run. For maskable icons with the real logo, you may need a dedicated variant
 * with extra padding so the inner 80% safe zone contains the logo.
 */

import sharp from 'sharp'
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'learn')

const THEME_COLOR = '#7C3AED'

const svgTemplate = (size: number) =>
  `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${THEME_COLOR}"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-weight="700" font-size="${size * 0.5}">M</text>
</svg>
`.trim()

async function main() {
  await mkdir(outDir, { recursive: true })

  for (const size of [192, 512]) {
    const svg = Buffer.from(svgTemplate(size))
    const png = await sharp(svg).png().toBuffer()
    const path = join(outDir, `icon-${size}x${size}.png`)
    await writeFile(path, png)
    console.log(`Wrote ${path}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
