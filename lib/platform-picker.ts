/**
 * Data and scoring for the Course 3 platform picker. Web answers pick a hosting platform;
 * choosing "mobile app" on Q1 short-circuits to the mobile deployment track under Course 3;
 * "thinking about AWS" short-circuits to the AWS extension track.
 */

export type Q1Answer = 'frontend' | 'backend' | 'not_sure' | 'mobile_app' | 'thinking_about_aws'
export type Q2Answer = 'free' | 'can_pay' | 'paid_plan'
export type Q3Answer = 'fine' | 'follow' | 'not_comfortable'

/** Answers for the three-question web hosting path (Q1 is never `mobile_app` or `thinking_about_aws` here). */
export interface WebPlatformPickerAnswers {
  readonly q1: 'frontend' | 'backend' | 'not_sure'
  readonly q2: Q2Answer
  readonly q3: Q3Answer
}

/** @deprecated use {@link WebPlatformPickerAnswers} */
export type PlatformPickerAnswers = WebPlatformPickerAnswers

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
    accentClass: 'bg-course-3-accent/10',
  },
  netlify: {
    slug: 'netlify',
    name: 'Netlify',
    reason:
      'Netlify has the most generous free tier and a simpler dashboard if terminals make you nervous.',
    accentClass: 'bg-course-3-accent/10',
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
      { id: 'mobile_app', label: 'A mobile app (iOS / Android)' },
      { id: 'backend', label: 'A backend API or service' },
      {
        id: 'thinking_about_aws',
        label: 'I am thinking about AWS or a larger cloud',
      },
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

export type MobileTrackPickerResult = {
  readonly kind: 'mobile'
  readonly name: string
  readonly reason: string
  readonly accentClass: string
}

export const MOBILE_TRACK_PICKER_RESULT: MobileTrackPickerResult = {
  kind: 'mobile',
  name: 'Mobile app deployment',
  reason:
    'Course 3 is mostly about web hosting. The mobile track covers App Store and Play Store accounts, test builds, review, and release for iOS and Android, without mixing that into the Vercel or Netlify path.',
  accentClass: 'bg-course-3-accent/10',
}

export type AwsTrackPickerResult = {
  readonly kind: 'aws'
  readonly name: string
  readonly reason: string
  readonly accentClass: string
}

export const AWS_TRACK_PICKER_RESULT: AwsTrackPickerResult = {
  kind: 'aws',
  name: 'AWS and larger clouds',
  reason:
    'If your app is already live and you are weighing AWS, Azure, or GCP, start with when it is worth the complexity. The AWS track is a short reality check and a safe minimum path, not a certification course.',
  accentClass: 'bg-course-3-accent/10',
}

export function isMobileTrackPickerResult(
  r: PlatformRecommendation | MobileTrackPickerResult | AwsTrackPickerResult,
): r is MobileTrackPickerResult {
  return 'kind' in r && r.kind === 'mobile'
}

export function isAwsTrackPickerResult(
  r: PlatformRecommendation | MobileTrackPickerResult | AwsTrackPickerResult,
): r is AwsTrackPickerResult {
  return 'kind' in r && r.kind === 'aws'
}

/**
 * | Q1 (built)  | Q2 (pay)    | Q3 (terminal)     | -> Recommendation |
 * | backend     | any         | any               | Fly.io            |
 * | frontend    | free        | not_comfortable   | Netlify           |
 * | frontend    | free        | any other         | Vercel            |
 * | frontend    | can/paid    | any               | Vercel            |
 * | not_sure    | any         | any               | Vercel            |
 */
export function getPlatformRecommendation(
  answers: WebPlatformPickerAnswers,
): PlatformRecommendation {
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
