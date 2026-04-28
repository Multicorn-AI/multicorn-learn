/**
 * LC-12 Course 4 platform overview pages (/learn/course-4/{platform}).
 */
export const course4PlatformStubCopy = {
  autohive: {
    name: 'AutoHive',
    url: 'https://www.autohive.com/',
    tagline: 'No-code agent building for everyday teams',
    intro:
      'AutoHive is a no-code agent platform built by Raygun, a New Zealand software company. It is designed for small and medium-sized teams that want to create agents without writing code. You describe a task in plain English, attach the tools the agent needs, and let it run.',
    whatItDoes: [
      'You type a description of what the agent should do. AutoHive turns that into a working agent with the right connections.',
      'Agents plug into tools your team already uses: Slack, HubSpot, Google Drive, Gmail, Xero, and others. The integration list is growing.',
      'You can schedule agents to run on a timer (every morning, every Monday) or trigger them from a chat message. Results land in Slack, email, or wherever your team works.',
      'Multiple agents can work together in a single workspace. One agent pulls data, another formats a report, a third posts it to your channel.',
    ],
    whoItsFor:
      'Teams that want results fast and do not have a developer on hand. If your first question is "can I just describe what I want?" rather than "can I see the API docs?", AutoHive is a strong fit.',
    firstBuild:
      'The most common first agent on AutoHive is a reporting agent. Connect a data source (your CRM, analytics dashboard, or accounting tool), tell the agent what to summarise, and schedule it to deliver a report to Slack or email at the start of each week. One AutoHive user compressed two days of GST reconciliation into an 18-minute conversation with an agent.',
    honestLimitations:
      'AutoHive gives you less control over the internals than a code-first platform. If you need to write custom logic, chain complex conditional steps, or swap between models at each stage, you will feel the boundaries. For most business automation tasks, those boundaries will not matter. For highly custom agent behaviour, they will.',
    getStarted:
      'Create a free account at autohive.com. The onboarding walks you through building your first agent in minutes. No credit card required to start.',
  },
  dust: {
    name: 'Dust',
    url: 'https://dust.tt/',
    tagline: "AI agents connected to your company's knowledge",
    intro:
      "Dust is an agent platform built for teams that need AI connected to their internal documents, conversations, and tools. You create agents inside a shared workspace, connect them to your company's data sources, and control who can see what through fine-grained permissions.",
    whatItDoes: [
      'You build agents by writing instructions in plain language and attaching tools: semantic search across your docs, data analysis, web navigation, and more.',
      'Dust connects to Notion, Slack, GitHub, Google Drive, Intercom, Salesforce, and other tools your team already uses. Agents search across all of them at once.',
      'Permissions are built into the platform. You control which data sources each agent can access using Spaces, and role-based access controls decide who can use which agents.',
      'You call agents by typing @agent-name in a conversation. Multiple agents can work together in the same thread, each with its own speciality.',
    ],
    whoItsFor:
      'Teams where the value of an agent depends on what it knows about your company. If your first thought is "I want an agent that can answer questions about our docs" or "I need to pull insights from our Slack and Notion at the same time", Dust is the platform to look at.',
    firstBuild:
      "The classic first Dust agent is a knowledge assistant. Connect your team's Notion workspace or Google Drive folder, write instructions that tell the agent how to answer questions about that content, and publish it to your workspace. Team members call it with @your-agent-name and get answers grounded in your actual documentation, not generic web results.",
    honestLimitations:
      'Dust is strongest when the data sources you care about have native connectors. If your key systems are not on the integrations list, the agent will not be able to reach them without custom API work. The platform is also team-oriented by design, so solo users or very small operations may find the workspace model heavier than they need.',
    getStarted:
      "Create a workspace at dust.tt. The free tier lets you explore the builder and connect data sources. Dust's own documentation at docs.dust.tt walks through creating your first agent step by step.",
  },
  mindstudio: {
    name: 'MindStudio',
    url: 'https://www.mindstudio.ai/',
    tagline: 'Multi-model agent builder with a visual workflow editor',
    intro:
      'MindStudio is an agent platform that gives you access to over 200 AI models (OpenAI, Anthropic, Google, and others) through a single visual builder. You design agent workflows by dragging steps into a canvas, choosing which model handles each step, and connecting integrations. No separate API keys or accounts needed for each model provider.',
    whatItDoes: [
      'You build agents in a visual editor. Each step in the workflow can use a different model, so you can pick the cheapest model for simple tasks and the most capable one for complex reasoning.',
      'Agents can be deployed as web apps, scheduled automations, browser extensions, email-triggered workflows, or API endpoints. You choose how people interact with your agent.',
      'MindStudio connects to over 1,000 integrations: CRMs, communication tools, file storage, web scraping, image generation, video production, and more.',
      'There is a template library with over 100 pre-built agents. You can start from a template and customise it, or build from scratch using the visual editor or by describing what you want in plain English.',
    ],
    whoItsFor:
      'Builders who want flexibility. If you want to pick which AI model handles each part of the job, deploy your agent in multiple ways, or build something that goes beyond a simple chat-and-respond pattern, MindStudio gives you the controls.',
    firstBuild:
      'A good first MindStudio agent is a content repurposing workflow. Feed it a long document, podcast transcript, or meeting notes, and have it produce a summary, three social media posts, and a follow-up email. Each step can use a different model optimised for that output type. The visual editor makes it easy to see the full chain and adjust individual steps.',
    honestLimitations:
      'More options means more decisions. MindStudio has a moderate learning curve compared to simpler no-code platforms. If all you need is a basic agent that answers questions about your docs, you may find the model selection and workflow builder more complex than necessary. The platform rewards people who want to tinker and optimise.',
    getStarted:
      'Sign up free at mindstudio.ai. The free tier includes community access and enough runs to build and test your first agents. MindStudio also runs a Bootcamp and Agent Academy if you want structured learning.',
  },
  n8n: {
    name: 'n8n',
    url: 'https://n8n.io/',
    tagline: 'Visual workflow automation with a self-host option',
    intro:
      'n8n is an open-source workflow automation platform that has added AI agent capabilities on top of its existing trigger-and-action model. If you have used Zapier or Make, the mental model is familiar: nodes on a canvas, connected by wires, with data flowing between them. The difference is that n8n lets you self-host the entire platform and has added AI-native nodes for building agents.',
    whatItDoes: [
      'You build workflows visually by connecting nodes on a canvas. Trigger nodes start the workflow (a schedule, a webhook, a new email), processing nodes transform the data, and action nodes do something with it (send a message, update a record, call an API).',
      'AI agent nodes let you add reasoning steps powered by language models. The agent can decide which tools to call, process the results, and take further action based on what it finds.',
      'n8n has over 400 integrations and the list keeps growing. You can also hit any API using the generic HTTP node.',
      'You can self-host n8n on your own infrastructure for complete control over your data, or use n8n Cloud if you prefer a managed service.',
    ],
    whoItsFor:
      'People who are comfortable with technical tools and want full control. If you already use n8n for automation and want to add AI to your existing workflows, this is the natural next step. If data sovereignty matters to your organisation, the self-host option is a real differentiator.',
    firstBuild:
      'A good first n8n agent workflow is email triage. Set up a trigger that fires when a new email arrives, pass it to an AI agent node that classifies the email by urgency and topic, then route it to different actions: urgent emails get a Slack notification, routine emails get filed, and emails needing a reply get a draft generated and saved as a task. The visual canvas makes it easy to see the full flow and add branches.',
    honestLimitations:
      'Self-hosting means you are responsible for keeping the platform running, applying updates, and hardening security. That is real operational work. If you do not have someone on the team comfortable with server administration, use n8n Cloud instead. The AI agent capabilities are also newer than the core automation features, so the agent-specific documentation is still catching up to the rest of the platform.',
    getStarted:
      'Try n8n Cloud free at n8n.io, or self-host using the Docker image from GitHub. The quickstart guide walks through building your first workflow in under ten minutes. For AI agent workflows specifically, look for the AI Agent node in the node panel.',
  },
} as const

export type Course4PlatformStubKey = keyof typeof course4PlatformStubCopy

const taglineAccentClass: Record<Course4PlatformStubKey, string> = {
  autohive: 'text-violet-600',
  dust: 'text-[#4f46e5]',
  mindstudio: 'text-[#0d9488]',
  n8n: 'text-sky-600',
}

export function course4PlatformTaglineClass(key: Course4PlatformStubKey): string {
  return taglineAccentClass[key]
}
