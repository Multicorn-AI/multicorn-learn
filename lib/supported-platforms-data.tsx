import {
  ArrowRight,
  Bird,
  Code2,
  Github,
  Puzzle,
  Sparkles,
  SquareTerminal,
  Wind,
} from 'lucide-react'

export const SUPPORTED_PLATFORMS = [
  {
    name: 'OpenClaw',
    badge: 'Native plugin',
    description: 'Open-source AI agent TUI. Shield connects via native plugin - no proxy needed.',
    icon: Puzzle,
    comingSoon: false,
  },
  {
    name: 'Claude Code',
    badge: 'Native plugin',
    description:
      "Anthropic's CLI coding agent. Shield hooks in through the marketplace plugin system.",
    icon: Sparkles,
    comingSoon: false,
  },
  {
    name: 'Cursor',
    badge: 'Hosted proxy',
    description: 'AI-powered code editor. Shield wraps your MCP server through the hosted proxy.',
    icon: Code2,
    comingSoon: false,
  },
  {
    name: 'Windsurf',
    badge: 'Hosted proxy',
    description:
      "Codeium's AI editor. Connect through Shield's hosted proxy - no code changes needed.",
    icon: Wind,
    comingSoon: false,
  },
  {
    name: 'Cline',
    badge: 'Hosted proxy',
    description: "VS Code extension for autonomous coding. Routes through Shield's hosted proxy.",
    icon: SquareTerminal,
    comingSoon: false,
  },
  {
    name: 'GitHub Copilot',
    badge: 'Coming soon',
    description: "GitHub's AI pair programmer. Shield support coming soon.",
    icon: Github,
    comingSoon: true,
  },
  {
    name: 'Continue',
    badge: 'Coming soon',
    description: 'Open-source AI code assistant. Shield support coming soon.',
    icon: ArrowRight,
    comingSoon: true,
  },
  {
    name: 'Goose',
    badge: 'Coming soon',
    description: "Block's open-source AI agent. Shield support coming soon.",
    icon: Bird,
    comingSoon: true,
  },
  {
    name: 'Gemini CLI',
    badge: 'Native plugin',
    description:
      "Google's open-source terminal agent. Shield hooks into Gemini CLI's BeforeTool/AfterTool system.",
    icon: Sparkles,
    comingSoon: false,
  },
] as const

export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]
export type SupportedPlatformName = SupportedPlatform['name']

const claudeEntry = SUPPORTED_PLATFORMS.find((p) => p.name === 'Claude Code')
/** Default recommendation when resolver returns no catalog row (keeps Claude Code as intended fallback). */
export const FALLBACK_RECOMMENDATION_PLATFORM_NAME: SupportedPlatformName = claudeEntry
  ? claudeEntry.name
  : SUPPORTED_PLATFORMS[0].name

export const PLATFORM_NAMES = SUPPORTED_PLATFORMS.map((p) => p.name)

export function findSupportedPlatform(name: SupportedPlatformName): SupportedPlatform | undefined {
  return SUPPORTED_PLATFORMS.find((p) => p.name === name)
}
