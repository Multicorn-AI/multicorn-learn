export const COURSE_3 = {
  basePath: '/learn/course-3',
  /** localStorage key for per-browser lesson progress */
  progressStorageKey: 'multicorn_progress_course3_v1',
  title: 'Getting to production',
  description:
    'Go from a working local app to a public URL on a real domain: Vercel as the main path, environment variables, HTTPS, and what to do when a deploy fails.',
  intro:
    'This course starts where Course 2 ends: you already have a project that runs on your computer. Now you will put that app on the internet, connect a domain, and keep secrets out of your code. Progress saves in this browser only, no account needed.',
} as const
