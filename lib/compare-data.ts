export interface CompareCompetitor {
  readonly id: string
  readonly name: string
  readonly useCase: string
  readonly summary: string
  readonly strengths: readonly string[]
  readonly gaps: readonly string[]
  readonly url?: string
}

export interface CompareShieldEntry {
  readonly name: string
  readonly useCase: string
  readonly summary: string
  readonly strengths: readonly string[]
  readonly gaps: readonly string[]
}

export const COMPARE_COMPETITORS: readonly CompareCompetitor[] = [
  {
    id: 'agent-safehouse',
    name: 'Agent Safehouse',
    useCase: 'I want to lock down AI coding agents on my own Mac.',
    summary:
      "A macOS-only sandbox that wraps local AI coding agents in a kernel-enforced deny-first policy. Single shell script, zero dependencies, uses Apple's built-in sandbox-exec.",
    strengths: [
      'Kernel-level enforcement on macOS via sandbox-exec, not a wrapper or proxy',
      'Zero dependencies, single self-contained shell script',
      'Tested against major coding agents including Claude Code, Codex, Cursor, Gemini CLI, Cline, and Aider',
      'Open source under Apache 2.0',
    ],
    gaps: [
      'macOS only - does not work on Linux or Windows',
      'Designed for individual developer machines, not teams or shared environments',
      'No consent UX, organisation-wide policies, or audit trail you can share with a security team',
      'No spending controls for agent API usage',
      'The author describes it as a hardening layer, not a security boundary against a determined attacker',
    ],
    url: 'https://agent-safehouse.dev',
  },
  {
    id: 'agentsh',
    name: 'agentsh',
    useCase: 'I want kernel-level enforcement for agents running in CI and pipelines.',
    summary:
      'Execution-layer security for AI agents in CI, containers, and pipelines. Drops into sandboxes you already run (Vercel, E2B, Daytona, Cloudflare, Modal, and others) and enforces policy at the syscall level using Landlock, seccomp, and similar Linux primitives.',
    strengths: [
      'Drop-in SDK that wraps existing sandbox providers - does not replace your sandbox',
      'Enforces at the kernel level via Landlock, network proxy, and shell shim, with seccomp and ptrace where available',
      'Built for headless agent runs in CI and pipelines where there is no human to prompt',
      'Open source, with a parallel commercial offering (Beacon, Watchtower) for fleet-wide control',
    ],
    gaps: [
      'Linux-focused - designed for server, container, and CI environments, not local macOS coding workflows',
      'No consent UX for non-technical end users',
      'No spending controls for agent API usage',
      'Requires infrastructure knowledge to deploy and write policies',
    ],
    url: 'https://www.agentsh.org',
  },
  {
    id: 'agentgate',
    name: 'AgentGate',
    useCase: 'I want developer-focused approval workflows with Slack and Discord routing.',
    summary:
      'Open-source human-in-the-loop approval system. Agents request, policies decide, humans approve via Slack, Discord, email, or dashboard.',
    strengths: [
      'Multi-channel approval routing (Slack, Discord, email, web)',
      'Policy engine for auto-approve and auto-deny rules',
      'TypeScript SDK and MCP server included',
      'Self-hosted with Docker, full audit trail',
    ],
    gaps: [
      'Developer-focused - no consent UX designed for non-technical end users',
      'No spending controls or budget enforcement',
      'Self-hosted only - no managed option for teams without ops capacity',
    ],
    url: 'https://github.com/agentkitai/agentgate',
  },
]

for (const competitor of COMPARE_COMPETITORS) {
  if (competitor.url && !competitor.url.startsWith('https://')) {
    throw new Error(`Invalid URL for competitor "${competitor.name}": must start with https://`)
  }
}

export const SHIELD_COMPARE: CompareShieldEntry = {
  name: 'Multicorn Shield',
  useCase: 'I want org-level governance with consent UX and audit trails.',
  summary:
    'A control layer for AI agents in teams. Shield adds consent screens, spending limits, permissions, and activity logging so people can approve risky work and you can review what happened later.',
  strengths: [
    'Consent screens before an agent acts, written for people who are not security engineers',
    'Organisation-wide policies and roles',
    'Tamper-evident activity logging for audit and review',
    'Spending limits and budgets for agent usage',
    'MCP-aware path so tool calls can be governed in one place',
    'Works across macOS, Linux, and Windows so distributed teams use the same controls',
    'Designed for teams from day one, not retrofitted from a single-developer tool',
  ],
  gaps: [
    'Not a personal sandbox for locking down your laptop like a dedicated local isolation product',
    'Not syscall-level container enforcement; it governs agent behaviour and tool access, not the kernel',
    'You need to connect it to how your agents and MCP servers run in your environment',
    'Not as lightweight as a self-hosted developer tool - Shield is built for teams that need managed infrastructure and compliance support',
  ],
}
