/**
 * LC-12 Course 4 landing module copy. Hub + course-4 page pull from here.
 */
export const course4LandingCopy = {
  hubCard: {
    badge: 'Course 4',
    title: 'Build your first agent',
    subtitle: 'Agents, tools, and guardrails in plain language',
    body: 'Move from reading about agents to running one in a platform that fits your team. You will connect sources, define allowed actions, and keep humans in the loop where it matters.',
    /** Hub CTA label (product: short button text). */
    cta: 'Build agents',
  },
  hero: {
    courseLabel: 'Course 4',
    title: 'Build your first agent',
    subtitle: 'Agents, tools, and guardrails in plain language',
    intro:
      'An agent is software that can read context, call tools, and take steps toward a goal while you stay in charge of scope and guardrails. In this course you will stand up a real agent in a platform that fits how your team works, without skipping the safety basics.',
  },
  whatIsAnAgent: {
    heading: 'What is an agent?',
    paragraphs: [
      'A chat bot answers one message at a time. An agent can plan a short sequence: look up a doc, draft a reply, open a ticket, or run an approved action through an API. You still define what it may do, what data it can see, and when a human must confirm.',
      'Think of it like hiring a new assistant. You would not hand them every password on day one. You would start with a narrow task, watch how they handle it, and widen access as trust builds. Agent platforms work the same way: you connect a data source, write a prompt that describes the job, set boundaries, and let the agent run within them.',
      'The agent is not the model. The model (GPT, Claude, Gemini, or any other) is the brain. The agent is the wiring around it: which tools it can reach, which actions need approval, and what happens when something goes wrong. This course focuses on the wiring.',
    ],
  },
  whatYouWillBuild: {
    heading: 'What you will build',
    intro:
      'By the end of this course you will have a working agent that does one useful thing end to end. The classic first build is inbox triage: the agent reads new messages, sorts them by urgency, and drafts replies for you to review before sending. You can swap inbox triage for any task that fits your work. What matters is the pattern.',
    deliverables: [
      'A working agent connected to a real data source (email, documents, or a support queue)',
      'A prompt that tells the agent what to do and where to stop',
      'Permission boundaries so the agent cannot act outside its scope',
      'A human-in-the-loop step for any action that changes data or sends a message',
      'A test run you can watch from start to finish before giving the agent real work',
    ],
  },
  whatYouWillLearn: {
    heading: 'What you will learn along the way',
    intro:
      'You will pick these up naturally as you build. None of them is a wall you climb before you start.',
    items: [
      {
        label: 'Prompting for agents',
        detail:
          'Writing instructions that work when the agent runs on its own, not just when you are watching.',
      },
      {
        label: 'Connecting tools and sources',
        detail: 'Giving the agent access to the data it needs without opening every door at once.',
      },
      {
        label: 'Permissions and guardrails',
        detail:
          'Deciding which actions the agent may take on its own, which need a human to confirm, and which are off limits entirely.',
      },
      {
        label: 'Testing before you trust',
        detail:
          'Running the agent on real data in a safe way so you can see what it does before it matters.',
      },
      {
        label: 'When to keep a human in the loop',
        detail: 'Recognising the actions where speed is less important than a second pair of eyes.',
      },
    ],
  },
  pickPlatformIntro:
    'Four tracks cover the same learning goals with different tools. Use the short quiz or jump straight to the card that matches your team. You can change tracks later if your needs shift.',
  platformCards: [
    {
      name: 'AutoHive',
      bestFor: 'No-code friendly teams and SMBs that want a guided path',
      cost: 'Vendor plans vary; check current pricing for your size',
      limitation: 'Less room for custom low-level control than a full dev stack',
      href: '/learn/course-4/autohive',
    },
    {
      name: 'Dust',
      bestFor: 'Teams that need agents tied to shared docs and context',
      cost: 'Team-style pricing; see Dust for your organisation',
      limitation: 'Strongest when sources you care about are connectable there',
      href: '/learn/course-4/dust',
    },
    {
      name: 'MindStudio',
      bestFor: 'Builders who want multiple models and more custom behaviour',
      cost: 'Depends on models and usage; check MindStudio tiers',
      limitation: 'More options to configure than a minimal no-code bot',
      href: '/learn/course-4/mindstudio',
    },
    {
      name: 'n8n',
      bestFor: 'Visual workflows with a developer-leaning, self-host option',
      cost: 'Community edition self-hosted; cloud plans available',
      limitation: 'You own hosting, upgrades, and hardening if you self-host',
      href: '/learn/course-4/n8n',
    },
  ],
} as const

export type Course4PlatformName = (typeof course4LandingCopy.platformCards)[number]['name']
