export const AGENT_PLATFORM_IDS = [
  'autohive',
  'dust',
  'lindy',
  'mindstudio',
  'relevance-ai',
  'taskade',
  'zapier-ai-actions',
  'n8n',
] as const

export type AgentPlatformId = (typeof AGENT_PLATFORM_IDS)[number]

export interface AgentPlatform {
  readonly id: AgentPlatformId
  readonly name: string
  readonly tagline: string
  readonly bestAt: string
  readonly notBestAt: string
  readonly startingPrice: string
  readonly builtFor: string
  readonly url: string
}

export const AGENT_PLATFORMS: readonly AgentPlatform[] = [
  {
    id: 'autohive',
    name: 'AutoHive',
    tagline: 'No-code agents for teams that describe tasks in plain English.',
    bestAt:
      'Team workflows where multiple agents collaborate on recurring jobs like report generation, content repurposing, and vendor data checks. The marketplace has ready-made agents you can deploy in minutes.',
    notBestAt:
      'Solo experiments or highly custom pipelines. AutoHive is built around shared agent runs, so it adds friction if you just want a personal assistant for ad-hoc tasks.',
    startingPrice: 'Free tier available. Starter from US $99/mo.',
    builtFor:
      'Operations teams and small businesses automating repetitive group tasks without writing code.',
    url: 'https://www.autohive.com',
  },
  {
    id: 'dust',
    name: 'Dust',
    tagline: 'Company knowledge meets multi-model agents, built by ex-OpenAI and Stripe engineers.',
    bestAt:
      'Connecting agents to internal data across Slack, Notion, Google Drive, and GitHub so your whole team gets context-aware answers. Model-agnostic: swap between GPT, Claude, Gemini, and Mistral per agent.',
    notBestAt:
      'Heavy custom code inside the product. Dust is a knowledge and orchestration layer, not a full development environment. The 1 GB per-user storage limit on Pro can also pinch if your agents work with large files.',
    startingPrice: '14-day free trial. Pro from EUR 29/user/mo.',
    builtFor:
      'Mid-size teams that already live in chat and docs and want agents embedded in that flow.',
    url: 'https://dust.tt',
  },
  {
    id: 'lindy',
    name: 'Lindy',
    tagline: 'A personal AI assistant you control by text message.',
    bestAt:
      'Email triage, calendar management, meeting notes, and follow-ups. Lindy learns your writing style and handles the back-and-forth so you stay in flow. The iMessage and SMS interface means you never open another dashboard.',
    notBestAt:
      'Team-wide deployments or self-hosted setups. Lindy is a personal productivity tool first; if you need agents running across a department with shared permissions, look elsewhere.',
    startingPrice: '7-day free trial. Plus from US $49.99/mo (credit-based).',
    builtFor:
      'Busy professionals who want one AI assistant managing their inbox and calendar without switching apps.',
    url: 'https://www.lindy.ai',
  },
  {
    id: 'mindstudio',
    name: 'MindStudio',
    tagline: 'Visual agent builder with 200+ AI models and zero markup on token costs.',
    bestAt:
      'Drag-and-drop agent design where you mix and match models (GPT, Claude, Gemini, and more) inside the same workflow. You pay exactly what the model providers charge, nothing extra. Good template library and an active builder community.',
    notBestAt:
      'If you need a turnkey assistant that works out of the box. MindStudio is a builder platform; you design the agent yourself. The learning curve for advanced branching logic and custom functions is real.',
    startingPrice: 'Free tier (1,000 runs/mo). Individual from US $20/mo.',
    builtFor:
      'Builders and operators who want full control over which models power each step of a workflow.',
    url: 'https://www.mindstudio.ai',
  },
  {
    id: 'relevance-ai',
    name: 'Relevance AI',
    tagline: 'Low-code AI workforce platform, strongest in sales and GTM automation.',
    bestAt:
      'Sales-oriented agent templates (BDR outreach, lead research, CRM updates) plus a flexible tool builder for custom agents. Bring your own API keys on paid plans to control model costs directly. Sydney-based, backed by Bessemer.',
    notBestAt:
      'Predictable monthly billing. The dual credit system (Actions plus Vendor Credits) means costs can climb faster than expected at high volume. Setup requires real investment in designing and testing agents.',
    startingPrice: 'Free tier (200 actions/mo). Pro from US $19/mo.',
    builtFor:
      'GTM and revenue teams building repeatable agent workflows for prospecting, outreach, and reporting.',
    url: 'https://relevanceai.com',
  },
  {
    id: 'taskade',
    name: 'Taskade',
    tagline:
      'AI workspace that bundles task management, agents, and video chat in one subscription.',
    bestAt:
      'Replacing multiple productivity tools with a single platform. Tasks, notes, mind maps, AI agents, and team video calls live in the same workspace. Flat pricing that covers the whole team is unusually affordable for what you get.',
    notBestAt:
      "Deep, autonomous agent work. The AI features are tightly coupled to the task management layer, so if you need standalone agents that operate outside Taskade's workspace, the fit is awkward.",
    startingPrice: 'Free tier available. Pro from US $16/mo (up to 10 users, billed annually).',
    builtFor:
      'Small teams that want AI-assisted project management and lightweight automation without paying per seat.',
    url: 'https://www.taskade.com',
  },
  {
    id: 'zapier-ai-actions',
    name: 'Zapier with AI Actions',
    tagline:
      '8,000+ app connectors with AI steps bolted on top of the automation engine you already know.',
    bestAt:
      'Connecting any two SaaS tools quickly. If the apps you use have Zapier connectors (and most do), you can wire a working automation in under five minutes. The new Copilot and Agents features add AI reasoning to traditional trigger-action flows.',
    notBestAt:
      'High-volume or complex AI workflows. Zapier bills per task (every action step counts), so a 10-step Zap running 1,000 times eats 10,000 tasks. Costs scale steeply, and the AI agent features are add-ons with separate pricing.',
    startingPrice: 'Free tier (100 tasks/mo). Starter from US $19.99/mo.',
    builtFor:
      'Non-technical teams that need fast, reliable app-to-app automation and are comfortable with per-task billing.',
    url: 'https://zapier.com',
  },
  {
    id: 'n8n',
    name: 'n8n',
    tagline: 'Open-source workflow automation with native AI nodes and a self-host option.',
    bestAt:
      'Complex, high-volume workflows where you want full control. Charges per workflow execution (not per step), so a 20-node workflow costs the same as a 2-node one. 70+ LangChain-based AI nodes for building agent pipelines. Self-host for free on your own server.',
    notBestAt:
      'Non-technical users who want zero setup. n8n has a steeper learning curve than Zapier, and the self-hosted path requires someone comfortable with Docker and server maintenance.',
    startingPrice: 'Community Edition is free (self-hosted). Cloud from EUR 24/mo.',
    builtFor:
      'Technical teams and developers who need data sovereignty, deep customisation, and cost control at scale.',
    url: 'https://n8n.io',
  },
]

const idSet = new Set<string>(AGENT_PLATFORM_IDS)
for (const p of AGENT_PLATFORMS) {
  if (!idSet.has(p.id)) {
    throw new Error(`Invalid platform id: ${p.id}`)
  }
  if (!p.url.startsWith('https://')) {
    throw new Error(`Invalid URL for platform "${p.name}": must start with https://`)
  }
}

export function getAgentPlatformById(id: AgentPlatformId): AgentPlatform | undefined {
  return AGENT_PLATFORMS.find((p) => p.id === id)
}
