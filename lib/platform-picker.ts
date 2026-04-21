/**
 * Data and scoring for the Course 3 platform picker. One track only: answers pick a
 * recommended platform; lessons stay a single Vercel-forward path.
 */

export type Q1Answer = 'frontend' | 'backend' | 'not_sure'
export type Q2Answer = 'free' | 'can_pay' | 'paid_plan'
export type Q3Answer = 'fine' | 'follow' | 'not_comfortable'

export interface PlatformPickerAnswers {
  readonly q1: Q1Answer
  readonly q2: Q2Answer
  readonly q3: Q3Answer
}

export type PlatformSlug = 'vercel' | 'netlify' | 'fly-io'

export interface PlatformRecommendation {
  readonly slug: PlatformSlug
  readonly name: 'Vercel' | 'Netlify' | 'Fly.io'
  readonly reason: string
  readonly accentClass: string
}

export const PLATFORM_RECOMMENDATIONS: Readonly<Record<PlatformSlug, PlatformRecommendation>> = {
  vercel: {
    slug: 'vercel',
    name: 'Vercel',
    reason:
      'Vercel is the easiest path for what you built, and it is what Multicorn itself runs on.',
    accentClass: 'bg-primary/10',
  },
  netlify: {
    slug: 'netlify',
    name: 'Netlify',
    reason:
      'Netlify has the most generous free tier and a simpler dashboard if terminals make you nervous.',
    accentClass: 'bg-teal/10',
  },
  'fly-io': {
    slug: 'fly-io',
    name: 'Fly.io',
    reason: 'Fly.io is the right fit for a backend service that needs to run continuously.',
    accentClass: 'bg-indigo-500/10',
  },
} as const

export type PlatformOption = {
  readonly id: string
  readonly label: string
}

export type PlatformPickerQuestion = {
  readonly id: 'q1' | 'q2' | 'q3'
  readonly label: string
  readonly options: readonly PlatformOption[]
}

export const PLATFORM_PICKER_QUESTIONS: readonly PlatformPickerQuestion[] = [
  {
    id: 'q1',
    label: 'What did you build in Course 2?',
    options: [
      { id: 'frontend', label: 'A frontend web app (most common)' },
      { id: 'backend', label: 'A backend API or service' },
      { id: 'not_sure', label: "I'm not sure / I skipped Course 2" },
    ],
  },
  {
    id: 'q2',
    label: 'How much do you want to pay for hosting right now?',
    options: [
      { id: 'free', label: 'Free is fine for now' },
      { id: 'can_pay', label: 'I can pay a small amount if it helps' },
      { id: 'paid_plan', label: 'I already have a paid plan somewhere' },
    ],
  },
  {
    id: 'q3',
    label: 'How comfortable are you running commands in a terminal?',
    options: [
      { id: 'fine', label: 'Fine with it' },
      { id: 'follow', label: 'I can follow instructions if they are clear' },
      { id: 'not_comfortable', label: 'Not comfortable' },
    ],
  },
] as const

/**
 * | Q1 (built)  | Q2 (pay)    | Q3 (terminal)     | -> Recommendation |
 * | backend     | any         | any               | Fly.io            |
 * | frontend    | free        | not_comfortable   | Netlify           |
 * | frontend    | free        | any other         | Vercel            |
 * | frontend    | can/paid    | any               | Vercel            |
 * | not_sure    | any         | any               | Vercel            |
 */
export function getPlatformRecommendation(answers: PlatformPickerAnswers): PlatformRecommendation {
  if (answers.q1 === 'backend') {
    return PLATFORM_RECOMMENDATIONS['fly-io']
  }
  if (answers.q1 === 'not_sure') {
    return PLATFORM_RECOMMENDATIONS.vercel
  }

  // q1 === 'frontend'
  if (answers.q2 === 'free' && answers.q3 === 'not_comfortable') {
    return PLATFORM_RECOMMENDATIONS.netlify
  }
  if (answers.q2 === 'free') {
    return PLATFORM_RECOMMENDATIONS.vercel
  }
  if (answers.q2 === 'can_pay' || answers.q2 === 'paid_plan') {
    return PLATFORM_RECOMMENDATIONS.vercel
  }

  return PLATFORM_RECOMMENDATIONS.vercel
}
