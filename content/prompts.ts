export const CATEGORIES = ['Writing', 'Analysis', 'Coding', 'Research', 'Agents'] as const

export type Category = (typeof CATEGORIES)[number]

export interface Prompt {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly prompt: string
  readonly category: Category
  readonly tags: readonly string[]
  readonly isFree: boolean
}

const FREE_PER_CATEGORY = 10

interface PromptSeed {
  readonly title: string
  readonly description: string
  readonly prompt: string
  readonly tags: readonly string[]
}

function buildCategory(
  category: Category,
  slug: string,
  seeds: readonly PromptSeed[],
): readonly Prompt[] {
  return seeds.map((seed, index) => ({
    id: `${slug}-${index + 1}`,
    category,
    title: seed.title,
    description: seed.description,
    prompt: seed.prompt,
    tags: seed.tags,
    isFree: index < FREE_PER_CATEGORY,
  }))
}

const WRITING: readonly PromptSeed[] = [
  {
    title: 'Clarify the tone of a draft',
    description: 'Get a read on whether your writing matches the tone you are going for.',
    prompt:
      'Read the draft below and tell me what tone it currently strikes (e.g. formal, casual, urgent, detached). Then tell me which three words best describe the voice. If it does not match a [friendly but professional] tone, suggest specific edits to three sentences that would shift it.\n\nDraft:\n[paste draft here]',
    tags: ['tone', 'editing'],
  },
  {
    title: 'Turn bullet notes into a first draft',
    description: 'Bridge the gap between raw thinking and a usable paragraph.',
    prompt:
      'Turn these bullet points into a first draft of [one paragraph / a short update / a long-form section]. Keep my voice, do not add claims I did not make, and flag anything where you had to invent a connection.\n\nBullets:\n[paste bullets here]',
    tags: ['drafting', 'outlines'],
  },
  {
    title: 'Rewrite for a shorter word count',
    description: 'Cut length without losing the point.',
    prompt:
      'Rewrite the text below so it is under [target word count] words. Preserve the main argument and any specific numbers, names, or examples. Cut hedging, repetition, and filler. Show me the cut version and list the three biggest things you removed.\n\nText:\n[paste text here]',
    tags: ['editing', 'concision'],
  },
  {
    title: 'Explain something to a non-expert',
    description: 'Make technical writing accessible without dumbing it down.',
    prompt:
      'Rewrite the passage below so a [curious non-expert / new hire / executive] can understand it. Keep the accuracy, replace jargon with plain language on first use, and use one concrete analogy. Do not add information that is not already in the passage.\n\nPassage:\n[paste passage here]',
    tags: ['clarity', 'accessibility'],
  },
  {
    title: 'Generate headline options',
    description: 'Get a range of headlines rather than one mediocre compromise.',
    prompt:
      'Based on the draft below, give me 10 headline options across these styles: 3 descriptive (tells you what it is about), 3 curiosity-driven (makes you want to click), 2 provocative (takes a stance), 2 benefit-led (promises what you get). Keep each under 12 words.\n\nDraft:\n[paste draft here]',
    tags: ['headlines', 'ideation'],
  },
  {
    title: 'Outline a long-form article',
    description: 'Scaffold before you write — much easier than restructuring later.',
    prompt:
      'I want to write an article about [topic] for [audience]. The core argument is [one-sentence thesis]. Give me a section-by-section outline with a working heading, the main point of each section, and one example or piece of evidence I should find. Flag any sections where the argument is weakest.',
    tags: ['outlines', 'structure'],
  },
  {
    title: 'Edit for active voice',
    description: 'Tighten prose by converting passive constructions where it helps.',
    prompt:
      'Review the text below and identify every passive voice construction. For each one, decide whether active voice would be clearer (sometimes passive is correct — e.g. when the actor is unknown or unimportant). Show me a before/after for the ones worth changing, and leave the rest.\n\nText:\n[paste text here]',
    tags: ['editing', 'grammar'],
  },
  {
    title: 'Adapt copy for a different channel',
    description: 'Same message, different format — without starting from scratch.',
    prompt:
      'Take the content below, originally written for [original channel, e.g. blog post], and adapt it for [target channel, e.g. LinkedIn post, marketing email, product page]. Adjust length, tone, and structure to fit the channel conventions. Keep the core message and any specific details.\n\nContent:\n[paste content here]',
    tags: ['repurposing', 'channels'],
  },
  {
    title: 'Summarise feedback into concrete edits',
    description: 'Turn vague feedback into a clear revision list.',
    prompt:
      'I got the following feedback on my draft. Help me turn it into a specific list of edits I can action. For each piece of feedback, tell me: (1) what change to make, (2) where in the draft, (3) whether I should push back or accept. Flag any feedback that contradicts other feedback.\n\nDraft:\n[paste draft]\n\nFeedback:\n[paste feedback]',
    tags: ['revision', 'feedback'],
  },
  {
    title: 'Draft a product update',
    description: 'Announce a change to users in a way that is clear and not hypey.',
    prompt:
      "Write a short product update announcing [change]. Audience is [existing users / new users / paying customers]. Length: [one paragraph / a few sentences]. Tone: honest and specific. Cover what changed, why, and what (if anything) the user needs to do. No phrases like 'excited to announce' or 'game-changing'.",
    tags: ['announcements', 'product'],
  },
  {
    title: 'Craft a narrative arc for long-form content',
    description: 'Give a long piece shape so it reads as a story, not a list of points.',
    prompt:
      'I am writing a [long-form article / talk / chapter] on [topic]. The key points I want to cover are [list points]. Help me find a narrative arc: a hook, a tension or question driving the piece, the turning point, and the payoff. Suggest where each of my key points fits in that arc, and what I might cut if it does not serve the arc.',
    tags: ['narrative', 'structure'],
  },
  {
    title: 'Structure a counterargument that stays collegial',
    description: 'Disagree in writing without burning bridges.',
    prompt:
      'I want to push back on the following argument without being dismissive or escalating. Help me draft a response that (1) acknowledges what is valid in their position, (2) names the specific point I disagree with, (3) gives my reasoning with evidence, (4) leaves room for them to update without losing face. Keep it under [word count].\n\nTheir argument:\n[paste argument here]\n\nMy position:\n[paste your position]',
    tags: ['disagreement', 'communication'],
  },
]

const ANALYSIS: readonly PromptSeed[] = [
  {
    title: 'Compare two options with pros and cons',
    description: 'Get past gut feel with a structured comparison.',
    prompt:
      'I am choosing between [option A] and [option B] for [context / goal]. Give me a pros and cons table for each, then identify the three criteria that matter most for my situation and score each option against them. End with your recommendation and what would change your mind.',
    tags: ['decisions', 'comparison'],
  },
  {
    title: 'Extract risks from a document',
    description: 'Surface what could go wrong before someone else does.',
    prompt:
      'Read the document below and identify every risk it mentions, implies, or fails to address. Categorise each risk as [operational / financial / reputational / legal / technical], rate its likelihood and impact as low/medium/high, and flag the top three I should address first.\n\nDocument:\n[paste document]',
    tags: ['risk', 'review'],
  },
  {
    title: 'Build a simple decision matrix',
    description: 'Make a decision defensible by scoring options against criteria.',
    prompt:
      'I need to decide between [list options]. The criteria that matter are [list criteria]. For each criterion, tell me (1) how to weight it from 1-5 based on my situation ([describe context]), (2) how each option scores on it (1-5 with reasoning). Produce a weighted total and the final ranking.',
    tags: ['decisions', 'frameworks'],
  },
  {
    title: 'Summarise metrics for leadership',
    description: 'Turn raw numbers into a story executives will actually read.',
    prompt:
      "Here are this period's metrics: [paste metrics]. Write a 5-bullet summary for a leadership audience. First bullet is the headline (what is the one thing they need to know). Next three are the most important movements and what drove them. Last is what this means for next period. No jargon, no hedging, no 'excited to report'.",
    tags: ['reporting', 'metrics'],
  },
  {
    title: 'Spot gaps in an argument',
    description: 'Pressure-test your reasoning before someone else does.',
    prompt:
      'Here is an argument I am making: [paste argument]. Play the role of a thoughtful skeptic. What assumptions am I making that I have not justified? What counter-evidence might exist? What alternative explanations could fit the same facts? Rank the three most serious gaps and how I could address them.',
    tags: ['critique', 'reasoning'],
  },
  {
    title: 'Turn raw data into takeaways',
    description: 'Get from "here is the data" to "here is what matters".',
    prompt:
      'Below is raw data from [source / context]. Identify the three to five most important patterns or anomalies. For each, tell me (1) what the pattern is, (2) why it matters, (3) what action it suggests or what further investigation it calls for. Flag anything that looks surprising or counter to expectations.\n\nData:\n[paste data]',
    tags: ['data', 'insights'],
  },
  {
    title: 'Stress-test an assumption',
    description: 'Find out where a belief breaks before reality does.',
    prompt:
      'I am operating on the assumption that [state assumption]. Challenge it systematically: (1) what evidence supports it, (2) what evidence contradicts or complicates it, (3) under what conditions would it no longer hold, (4) what is the cost of being wrong, (5) what would I need to observe to update.',
    tags: ['assumptions', 'reasoning'],
  },
  {
    title: 'Draft questions before a review',
    description: 'Go into a meeting with sharper questions than "any thoughts?".',
    prompt:
      'I am going into a [design review / strategy review / code review / performance review] for [topic]. Here is the material being reviewed: [paste or describe]. Generate 10 specific questions to ask, grouped by: (1) clarifying questions to understand the work, (2) probing questions to stress-test the thinking, (3) forward-looking questions about implications. Skip generic questions.',
    tags: ['meetings', 'review'],
  },
  {
    title: 'Prioritise issues by impact',
    description: 'Cut through a long list and decide what to do first.',
    prompt:
      'Here is a list of issues / bugs / problems: [paste list]. For each, estimate impact (how many people affected, how severe) and effort (hours, complexity). Sort into four buckets: quick wins, big bets, low priority, avoid. Recommend the top three to tackle first and why.',
    tags: ['prioritisation', 'triage'],
  },
  {
    title: 'Explain variance from plan',
    description: 'Investigate why actuals diverged from the plan.',
    prompt:
      'Planned: [paste planned numbers / outcomes]. Actual: [paste actuals]. Walk through the variance: which items are materially off plan, and for each, generate three plausible explanations ranked by likelihood. Note which would be easy vs hard to verify. Flag any variance that might mask a compounding issue.',
    tags: ['variance', 'reporting'],
  },
  {
    title: 'Diagnose a team performance drop',
    description: 'Separate real signal from noise when metrics slip.',
    prompt:
      'A team metric ([specify metric]) has dropped from [baseline] to [current] over [timeframe]. Help me think through root causes. Generate a diagnostic tree: possible causes grouped by [people / process / product / external]. For each leaf, suggest one piece of evidence that would confirm or rule it out. Highlight the two cheapest to investigate.',
    tags: ['diagnostics', 'metrics'],
  },
  {
    title: 'Evaluate a proposal against strategy',
    description: 'Check whether a shiny idea actually fits the plan.',
    prompt:
      'Our strategy is [paste strategy or key priorities]. Someone has proposed [paste proposal]. Evaluate: (1) does this serve our stated priorities, (2) what would it trade off, (3) what assumptions does it make about our resources or market, (4) is the timing right. Give a clear verdict and the one question whose answer would change it.',
    tags: ['strategy', 'evaluation'],
  },
]

const CODING: readonly PromptSeed[] = [
  {
    title: 'Explain a bug from a stack trace',
    description: 'Get a second opinion on what the error is actually telling you.',
    prompt:
      'Here is a stack trace and the relevant code. Walk me through: (1) what the error actually means, (2) the most likely cause given this code, (3) two less likely but plausible causes, (4) the smallest change that would verify the diagnosis. Do not suggest a fix yet.\n\nStack trace:\n[paste trace]\n\nCode:\n[paste code]',
    tags: ['debugging', 'errors'],
  },
  {
    title: 'Suggest tests for a function',
    description: 'Make sure you cover the cases you would otherwise forget.',
    prompt:
      'Here is a function. Suggest a test suite covering: happy path, edge cases (empty input, boundary values, nulls), error paths (invalid input, downstream failures), and any concurrency or ordering concerns. For each test, give a descriptive name that reads like a specification and a one-line note on what it proves.\n\nFunction:\n[paste function]',
    tags: ['testing', 'coverage'],
  },
  {
    title: 'Refactor for readability',
    description: 'Clean up code without changing what it does.',
    prompt:
      'Refactor the code below for readability without changing its behaviour. Prioritise: clearer names, smaller functions with single responsibilities, removing duplication, and making control flow easier to follow. Show the refactored code and a short list of the specific changes you made and why.\n\nCode:\n[paste code]',
    tags: ['refactoring', 'readability'],
  },
  {
    title: 'Review a pull request diff',
    description: 'Get a rigorous first pass before your teammate sees it.',
    prompt:
      'Review this diff as if you were a senior engineer on the team. Call out: correctness issues, potential bugs, security concerns, test gaps, style inconsistencies, and anything that would confuse a future reader. Distinguish blocking comments from nitpicks. End with a verdict: approve, request changes, or comment.\n\nDiff:\n[paste diff]',
    tags: ['code review', 'quality'],
  },
  {
    title: 'Generate a commit message',
    description: 'Write commits that your future self and reviewers will thank you for.',
    prompt:
      'Here is the diff of changes I am about to commit. Write a conventional commit message: a type prefix (feat/fix/docs/refactor/test/chore), a concise summary line under 72 characters, and a body paragraph explaining the why (not the what — the diff shows the what). Flag anything that should probably be split into a separate commit.\n\nDiff:\n[paste diff]',
    tags: ['git', 'commits'],
  },
  {
    title: 'Break a feature into tasks',
    description: 'Turn a vague feature request into a plan you can actually execute.',
    prompt:
      "I need to build [feature description]. The stack is [languages/frameworks]. Break this down into a sequence of small PRs, each shippable on its own. For each, give a title, the scope (what's in, what's out), approximate size (XS/S/M/L), and dependencies on previous PRs. Flag anywhere I should de-risk with a spike first.",
    tags: ['planning', 'decomposition'],
  },
  {
    title: 'Document an API endpoint',
    description: 'Produce reference docs a stranger could use without guessing.',
    prompt:
      'Document the following endpoint in a format suitable for [OpenAPI / Markdown reference / JSDoc]. Include: method and path, purpose, auth requirements, request schema with field descriptions, response schema, all possible error responses with causes, and a realistic curl example. Flag anything ambiguous that needs clarification from the implementer.\n\nEndpoint code:\n[paste code or description]',
    tags: ['documentation', 'api'],
  },
  {
    title: 'Debug a failing CI step',
    description: 'Get unstuck when the pipeline is red.',
    prompt:
      'My CI pipeline is failing at [step name]. Here is the log output and the config for that step. Walk me through the diagnosis: what the log is telling me, the three most likely causes, what to check first, and a minimal change to test each hypothesis. Call out anything that looks like a flaky test vs a real failure.\n\nLog:\n[paste log]\n\nConfig:\n[paste config]',
    tags: ['ci', 'debugging'],
  },
  {
    title: 'Propose a minimal fix',
    description: 'Fix the bug without rewriting the module.',
    prompt:
      'Here is a bug and the surrounding code. Propose the minimal change that fixes the bug without introducing new risk. Show the exact diff. Then tell me: what is the larger refactor this code needs (if any), and why I should or should not do it in the same PR.\n\nBug:\n[describe bug]\n\nCode:\n[paste code]',
    tags: ['bugs', 'fixes'],
  },
  {
    title: 'Translate requirements into acceptance criteria',
    description: 'Write criteria so unambiguous that the test cases write themselves.',
    prompt:
      'Here is a feature requirement: [paste requirement]. Rewrite it as a set of acceptance criteria in Given/When/Then format. Cover the happy path, the main edge cases, and at least two error conditions. Flag anywhere the requirement is ambiguous and you had to make an assumption.',
    tags: ['requirements', 'specs'],
  },
  {
    title: 'Assess the cost of a dependency',
    description: 'Before you npm install, decide if you actually should.',
    prompt:
      "I am considering adding [library name] to solve [problem]. Evaluate: (1) what does it actually do, (2) what are the lighter-weight alternatives (including writing it yourself), (3) maintenance signals (last release, open issues, maintainer activity), (4) security and licence considerations, (5) bundle or build impact. Give a recommendation: add, avoid, or 'build a small version yourself'.",
    tags: ['dependencies', 'architecture'],
  },
  {
    title: 'Design the interface before the implementation',
    description: 'Shape the API first so the code that uses it reads well.',
    prompt:
      'I need to build [component / module / function] that does [purpose]. Before I write the implementation, design its public interface. Give me: function signatures with types, naming conventions, error handling contract, and an example of what calling code looks like. Explain tradeoffs you considered (e.g. one function vs many, sync vs async, options object vs positional args).',
    tags: ['api design', 'architecture'],
  },
]

const RESEARCH: readonly PromptSeed[] = [
  {
    title: 'Create a research brief',
    description: 'Scope a piece of research before you start collecting.',
    prompt:
      'I want to research [topic] to answer [research question]. Draft a research brief covering: scope (what is in, what is out), key sub-questions to investigate, types of sources to prioritise, what success looks like (when will I know I am done), and the main risks of getting this wrong. Call out anything I should clarify before starting.',
    tags: ['planning', 'scoping'],
  },
  {
    title: 'Draft interview questions',
    description: 'Get interview questions that surface insight, not just confirmation.',
    prompt:
      'I am interviewing [who, e.g. a product manager at a SaaS company] about [topic]. My goal is to learn [specific learning goal]. Draft 10 questions, mixing: (1) open-ended context questions, (2) behavioural questions about specific past events, (3) questions that probe for contradictions, (4) one or two hypothesis-testing questions. Avoid leading questions and yes/no traps.',
    tags: ['interviews', 'user research'],
  },
  {
    title: 'Summarise a source with citations',
    description: 'Produce a clean summary you can actually reference later.',
    prompt:
      "Summarise the source below in [target length]. Capture: the main argument, the evidence used, the author's stance, and any notable caveats. Use direct quotes only where the exact wording matters, and always with a reference back to the source (page or section). At the end, note any claims that seem underdefended or contradicted by other things you know.\n\nSource:\n[paste or link]",
    tags: ['summarisation', 'sources'],
  },
  {
    title: 'Compare methodologies',
    description: 'Pick the right approach by understanding what each one gives up.',
    prompt:
      'I need to study [research question]. Compare these methodologies: [list methods, e.g. surveys, user interviews, diary studies, A/B tests]. For each: what it is good at, what it misses, cost and time to run, and the kind of evidence it produces. Recommend one primary and one complementary method for my question.',
    tags: ['methodology', 'comparison'],
  },
  {
    title: 'Extract open questions from notes',
    description: 'Find the gaps in what you know before someone else does.',
    prompt:
      'Read the notes below and extract every open question or unresolved issue, whether it is stated explicitly or implied. For each, note (1) the question, (2) why it matters, (3) who or what could answer it, (4) how urgent it is to resolve. Group related questions together.\n\nNotes:\n[paste notes]',
    tags: ['gaps', 'synthesis'],
  },
  {
    title: 'Build a literature-style outline',
    description: 'Organise what you have read into an argument, not a list.',
    prompt:
      'I have read [list sources or paste summaries] on [topic]. Build a literature-style outline that organises these by theme or position, not chronologically. Show: the main debates or tensions, where sources agree, where they disagree, and what no one has addressed. Suggest where my own contribution could fit.',
    tags: ['literature review', 'synthesis'],
  },
  {
    title: 'Evaluate source credibility',
    description: 'Decide how much to trust something before you quote it.',
    prompt:
      'Evaluate the credibility of this source: [paste or link]. Consider: who is the author and what are their qualifications and potential biases, what is the publication venue and its editorial standards, when was it published (is currency a concern), what evidence does it cite, and how do its claims compare to the consensus in the field. Give a credibility rating from 1-5 with justification.',
    tags: ['evaluation', 'sources'],
  },
  {
    title: 'Turn research notes into a memo',
    description: 'Convert a scattered knowledge dump into a one-pager someone will read.',
    prompt:
      'Take my research notes and turn them into a one-page memo for [audience]. Structure: (1) headline finding in one sentence, (2) context (why we investigated this), (3) key findings (three to five, each with the evidence), (4) implications / recommendations, (5) what is still uncertain. Cut anything that does not serve this structure.\n\nNotes:\n[paste notes]',
    tags: ['memos', 'communication'],
  },
  {
    title: 'Define scope for a research topic',
    description: 'Rein in a topic that wants to sprawl.',
    prompt:
      'I want to research [broad topic]. Help me narrow it. Propose three different scoping angles — a narrow version, a medium version, and a broad version — and for each, specify the research question, what would be in scope, what would be out, and roughly how much time it would take. Recommend which to pick if my goal is [state goal].',
    tags: ['scoping', 'planning'],
  },
  {
    title: 'List unknowns to validate next',
    description: 'Turn "we do not know enough" into a prioritised list.',
    prompt:
      'Based on the work below, produce a list of the most important things we do not yet know. For each unknown, note: (1) why it matters for the decision or next step, (2) the cheapest way to find out, (3) what we would do differently depending on the answer. Rank them so the biggest decision-changers are at the top.\n\nContext:\n[paste context]',
    tags: ['unknowns', 'prioritisation'],
  },
  {
    title: 'Find analogous cases from other domains',
    description: 'Borrow insight from fields that have already solved a version of your problem.',
    prompt:
      'I am working on [problem]. Suggest five analogous situations from other domains (e.g. other industries, historical examples, scientific fields) where a similar structural problem shows up. For each, describe the analogy, what worked in that domain, and what would and would not transfer to mine.',
    tags: ['analogies', 'inspiration'],
  },
  {
    title: 'Design a small validation study',
    description: 'Plan a lightweight study that can change your mind.',
    prompt:
      'I have a hypothesis: [state hypothesis]. Design a small study that could validate or invalidate it in [timeframe, e.g. one week] with [available resources]. Specify: the method, the participants or data sources, the signal I am looking for, the decision rule (what result would make me update), and the main threats to validity. Keep it scrappy and focused.',
    tags: ['validation', 'experiments'],
  },
]

const AGENTS: readonly PromptSeed[] = [
  {
    title: 'Define a safe task for an agent',
    description: 'Scope an agent task tightly so it cannot do something you did not intend.',
    prompt:
      'I want an agent to [describe task]. Help me define this as a safe, bounded task. Specify: (1) exactly what inputs the agent can access, (2) what outputs or actions it is allowed to produce, (3) explicit things it must never do, (4) the human checkpoint where I review before anything irreversible happens. Flag any part of the task that is too vague to delegate safely.',
    tags: ['scoping', 'safety'],
  },
  {
    title: 'Write a handoff between agents',
    description: 'Pass context cleanly from one agent to the next.',
    prompt:
      "Agent A has just finished [task]. Agent B needs to pick up from there to do [next task]. Write the handoff payload: (1) the relevant context Agent B needs, (2) anything Agent A tried that did not work, (3) explicit assumptions carried forward, (4) the success criteria for Agent B's portion. Keep it short enough that context does not balloon.",
    tags: ['multi-agent', 'handoff'],
  },
  {
    title: 'Draft guardrails for a workflow',
    description: 'Turn "be careful" into specific rules an agent can follow.',
    prompt:
      "I am setting up an agent workflow for [use case]. Draft guardrails covering: (1) hard limits (actions that should never happen, e.g. spending over $X, touching production data), (2) soft limits (actions that require human approval), (3) escalation triggers (when the agent should stop and ask), (4) audit requirements (what must be logged). Be specific — avoid generic phrases like 'use good judgment'.",
    tags: ['guardrails', 'governance'],
  },
  {
    title: 'Specify success criteria for automation',
    description: 'Know whether the agent did what you wanted.',
    prompt:
      'I am automating [process]. Define success criteria that I could use to evaluate whether the agent did a good job: (1) measurable outcomes (what should be true when it is done), (2) quality criteria (how to tell a good result from a bad one), (3) failure signatures (what a bad run looks like, not just "it failed"), (4) what I should spot-check manually even when it appears to succeed.',
    tags: ['evaluation', 'success criteria'],
  },
  {
    title: 'Plan a human review checkpoint',
    description: 'Insert the right review at the right moment — not every moment.',
    prompt:
      "For an agent doing [task], design human review checkpoints. For each checkpoint, specify: (1) where in the flow it sits, (2) what the human is actually reviewing (not 'everything'), (3) what decision they are being asked to make, (4) what the agent does while waiting. Avoid reviewing things a human cannot meaningfully evaluate faster than re-doing the work.",
    tags: ['human-in-the-loop', 'review'],
  },
  {
    title: 'List permissions an agent needs',
    description: 'Scope permissions tightly — no more, no less.',
    prompt:
      "I want an agent to [task]. List the minimum permissions it needs: (1) which tools or APIs, (2) scoped to what data or actions (e.g. 'read-only', 'write to this folder only'), (3) any time or rate limits. For each permission, justify why it is needed. Flag any permission that feels broader than strictly required and suggest a tighter alternative.",
    tags: ['permissions', 'security'],
  },
  {
    title: 'Write a failure-mode checklist',
    description: 'Think through what can go wrong before it does.',
    prompt:
      'For an agent doing [task], enumerate the failure modes. Cover: (1) input errors (malformed, missing, adversarial), (2) reasoning errors (wrong conclusions, hallucinations, loops), (3) tool errors (API failures, rate limits, permission denied), (4) downstream impact (who gets hurt when it fails silently). For each, note the earliest signal and how the agent should respond.',
    tags: ['failure modes', 'reliability'],
  },
  {
    title: 'Summarise what an agent did',
    description: 'Produce a review-friendly summary from an agent run.',
    prompt:
      'Here is the log of an agent run. Summarise it for a human reviewer: (1) what the agent set out to do, (2) the key actions it actually took, (3) anything it tried and abandoned, (4) the final outcome, (5) anything notable or unexpected that deserves a second look. Keep it under [target length] and flag anything that warrants follow-up.\n\nLog:\n[paste log]',
    tags: ['audit', 'summarisation'],
  },
  {
    title: 'Request a rollback plan',
    description: 'Know how to undo before you let an agent do.',
    prompt:
      "I am about to let an agent perform [action]. Before I run it, write the rollback plan: (1) what state change the action will cause, (2) exactly how to reverse it step by step, (3) what is not reversible (flag these prominently), (4) what to do if rollback itself fails. If any part of this is 'you cannot roll it back', say so clearly.",
    tags: ['rollback', 'safety'],
  },
  {
    title: 'Clarify boundaries for tool use',
    description: 'Set clear rules about when an agent reaches for a tool vs asks a human.',
    prompt:
      'An agent has access to the following tools: [list tools with descriptions]. For each tool, specify: (1) when the agent should use it, (2) when it should not (prefer asking or doing nothing), (3) parameters or inputs that should always be validated first, (4) how to handle the tool failing or returning unexpected output.',
    tags: ['tool use', 'policy'],
  },
  {
    title: 'Design an approval flow for sensitive actions',
    description: 'Route risky actions through a human approval step that actually works.',
    prompt:
      'For an agent that may need to perform [sensitive action type], design an approval flow. Specify: (1) what triggers an approval request (be specific — dollar amount, data type, action category), (2) what information the approver sees (enough to decide, not a wall of logs), (3) who approves and their timeout behaviour, (4) what the agent does while waiting, (5) how the approval is recorded for audit.',
    tags: ['approvals', 'governance'],
  },
  {
    title: 'Audit an agent integration for security gaps',
    description: 'Review an existing agent setup the way a security engineer would.',
    prompt:
      "Here is my agent integration: [describe setup — what the agent does, what it can access, how it is triggered]. Audit it the way a security engineer would. Identify: (1) over-broad permissions, (2) missing validation at trust boundaries, (3) actions that should require approval but currently don't, (4) logging or audit gaps, (5) ways the agent could be prompted or manipulated into unintended actions. Rank findings by severity.",
    tags: ['security', 'audit'],
  },
]

const ALL_PROMPTS: readonly Prompt[] = [
  ...buildCategory('Writing', 'writing', WRITING),
  ...buildCategory('Analysis', 'analysis', ANALYSIS),
  ...buildCategory('Coding', 'coding', CODING),
  ...buildCategory('Research', 'research', RESEARCH),
  ...buildCategory('Agents', 'agents', AGENTS),
]

export function getPrompts(): readonly Prompt[] {
  return ALL_PROMPTS
}

export function countPromptsForCategory(category: Category): {
  readonly total: number
  readonly free: number
} {
  // Static data — recalculate if prompts become dynamic
  const inCat = ALL_PROMPTS.filter((p) => p.category === category)
  const free = inCat.filter((p) => p.isFree).length
  return { total: inCat.length, free }
}
