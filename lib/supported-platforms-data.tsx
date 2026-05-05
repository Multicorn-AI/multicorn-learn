import type { LucideIcon } from 'lucide-react'
import {
  Bird,
  Code2,
  Github,
  GitBranch,
  Infinity as InfinityIcon,
  Layers,
  Puzzle,
  Sparkles,
  SquareTerminal,
  Wind,
} from 'lucide-react'

export interface SupportedPlatform {
  readonly name: string
  readonly badge: string
  readonly description: string
  readonly icon: LucideIcon
  readonly comingSoon: boolean
}

/** Small pill matching dashboard PlatformSelect (native vs hosted proxy). */
export function supportedPlatformBadgeClass(badge: SupportedPlatform['badge']): string {
  if (badge === 'Native plugin') {
    return 'rounded bg-green-dim px-2 py-0.5 text-[10px] font-medium leading-tight text-green/80'
  }
  return 'rounded bg-cyan-dim px-2 py-0.5 text-[10px] font-medium leading-tight text-cyan'
}

export const SUPPORTED_PLATFORMS: readonly SupportedPlatform[] = [
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
    name: 'Windsurf',
    badge: 'Native plugin',
    description:
      'AI-powered code editor. Shield hooks into Cascade Hooks for full governance. Hosted proxy also available.',
    icon: Wind,
    comingSoon: false,
  },
  {
    name: 'Cline',
    badge: 'Native plugin',
    description:
      'VS Code extension for autonomous coding. Shield connects via native Cline Hooks. Hosted proxy also available.',
    icon: SquareTerminal,
    comingSoon: false,
  },
  {
    name: 'Gemini CLI',
    badge: 'Native plugin',
    description:
      "Google's open-source terminal agent. Shield hooks into Gemini CLI's BeforeTool/AfterTool system.",
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
    name: 'Claude Desktop',
    badge: 'Hosted proxy',
    description: 'Claude Desktop connects to Shield via hosted proxy. Governs MCP tool calls.',
    icon: Sparkles,
    comingSoon: false,
  },
  {
    name: 'Kilo Code',
    badge: 'Hosted proxy',
    description: 'IDE extension. Shield wraps MCP through the hosted proxy.',
    icon: Layers,
    comingSoon: false,
  },
  {
    name: 'GitHub Copilot',
    badge: 'Hosted proxy',
    description:
      "GitHub's AI pair programmer. Shield governs MCP tools through the hosted proxy in VS Code and JetBrains.",
    icon: Github,
    comingSoon: false,
  },
  {
    name: 'Continue',
    badge: 'Hosted proxy',
    description:
      'Open-source AI code assistant for VS Code and JetBrains. Shield governs MCP through the hosted proxy.',
    icon: InfinityIcon,
    comingSoon: false,
  },
  {
    name: 'Goose',
    badge: 'Hosted proxy',
    description: 'Open-source AI agent from AAIF. Shield support via hosted proxy.',
    icon: Bird,
    comingSoon: false,
  },
  {
    name: 'Aider',
    badge: 'Hosted proxy',
    description: 'Terminal-first coding agent. Shield wraps MCP through the hosted proxy.',
    icon: GitBranch,
    comingSoon: false,
  },
]

export type SupportedPlatformName = (typeof SUPPORTED_PLATFORMS)[number]['name']

const claudeEntry = SUPPORTED_PLATFORMS.find((p) => p.name === 'Claude Code')
/** Default recommendation when resolver returns no catalog row (keeps Claude Code as intended fallback). */
export const FALLBACK_RECOMMENDATION_PLATFORM_NAME: SupportedPlatformName =
  claudeEntry !== undefined ? claudeEntry.name : 'OpenClaw'

export const PLATFORM_NAMES = SUPPORTED_PLATFORMS.map((p) => p.name)

export function findSupportedPlatform(name: SupportedPlatformName): SupportedPlatform | undefined {
  return SUPPORTED_PLATFORMS.find((p) => p.name === name)
}
