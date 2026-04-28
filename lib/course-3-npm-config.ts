export const COURSE_3_NPM = {
  basePath: '/learn/course-3/npm',
  /** localStorage key for per-browser lesson progress on the npm publishing track */
  progressStorageKey: 'multicorn_progress_course3_npm_v1',
  /** First lesson slug (kebab-case, matches content/learn/course-3/npm/*.mdx) */
  firstLessonSlug: 'what-it-means-to-publish' as const,
  title: 'Publishing to npm',
  description:
    'For SDKs, CLIs, and libraries: publishing to the npm registry, semver, CHANGELOG discipline, Multicorn Shield style release workflows, and supply-chain basics.',
  intro:
    'The main Course 3 path assumes you ship a deployable web app. If your Course 2 project is something other developers install instead (an SDK, a CLI tool, or a shared library), this track is where your releases live: npm account, versioning, publishes, and how we ship Multicorn Shield.',
} as const
