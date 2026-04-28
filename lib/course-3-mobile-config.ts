export const COURSE_3_MOBILE = {
  basePath: '/learn/course-3/mobile',
  /** localStorage key for per-browser lesson progress on the mobile track */
  progressStorageKey: 'multicorn_progress_course3_mobile_v1',
  /** First lesson slug (kebab-case, matches content/learn/course-3/mobile/*.mdx) */
  firstLessonSlug: 'what-mobile-deployment-involves' as const,
  title: 'Mobile app deployment',
  description:
    'Move from a working iOS or Android app build to the App Store and Google Play: accounts, signing, test builds, review, and what happens after release.',
  intro:
    'The main Course 3 path is for web apps (hosting, domains, HTTPS). This track is for the same end goal, getting your product to real users, when your product is a mobile app. It works for common cross-platform stacks (for example React Native, Flutter, or Expo).',
} as const
