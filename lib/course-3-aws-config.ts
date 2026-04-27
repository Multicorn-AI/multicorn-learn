export const COURSE_3_AWS = {
  basePath: '/learn/course-3/aws',
  /** localStorage key for per-browser lesson progress on the AWS track */
  progressStorageKey: 'multicorn_progress_course3_aws_v1',
  /** First lesson slug (kebab-case, matches content/learn/course-3/aws/*.mdx) */
  firstLessonSlug: 'when-to-consider-aws' as const,
  title: 'AWS and larger cloud platforms',
  description:
    'A next step if your app has outgrown a PaaS: when AWS makes sense, account safety, hosting a frontend and backend on AWS, secrets, logs, and cost control.',
  intro:
    'The main Course 3 path is for Vercel, Netlify, and Fly.io. This track is for you if you already shipped there and are weighing AWS, Azure, or GCP, or you want an honest read before you commit. It is not a cloud certification course.',
} as const
