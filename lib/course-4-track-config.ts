import type { ReactNode } from 'react'

export type Course4Track = 'autohive' | 'dust' | 'mindstudio' | 'n8n'

export interface Course4TrackConfig {
  readonly slug: Course4Track
  readonly title: string
  readonly description: string
  readonly icon: () => ReactNode
  readonly accentClass: string
  readonly basePath: string
  readonly progressStorageKey: string
  readonly firstLessonSlug: string
  readonly analyticsCategory: string
}

export const COURSE_4_TRACKS: Record<Course4Track, Course4TrackConfig> = {
  autohive: {
    slug: 'autohive',
    title: 'AutoHive',
    description:
      'Build no-code agents with AutoHive: create your first agent, connect tools, set up schedules, coordinate agent teams, and manage permissions.',
    icon: () => null,
    accentClass: 'text-course-4-accent',
    basePath: '/learn/course-4/autohive',
    progressStorageKey: 'multicorn_progress_course4_autohive_v1',
    firstLessonSlug: 'creating-your-first-agent',
    analyticsCategory: 'course4_autohive',
  },
  dust: {
    slug: 'dust',
    title: 'Dust',
    description:
      'Build knowledge-connected agents with Dust: connect company data, build agents, manage permissions and spaces, chain multi-agent workflows, and improve output.',
    icon: () => null,
    accentClass: 'text-course-4-accent',
    basePath: '/learn/course-4/dust',
    progressStorageKey: 'multicorn_progress_course4_dust_v1',
    firstLessonSlug: 'connecting-your-data',
    analyticsCategory: 'course4_dust',
  },
  mindstudio: {
    slug: 'mindstudio',
    title: 'MindStudio',
    description:
      'Build multi-model agents with MindStudio: create workflows, choose models, add branching logic, connect external tools, and publish your agent.',
    icon: () => null,
    accentClass: 'text-course-4-accent',
    basePath: '/learn/course-4/mindstudio',
    progressStorageKey: 'multicorn_progress_course4_mindstudio_v1',
    firstLessonSlug: 'your-first-workflow',
    analyticsCategory: 'course4_mindstudio',
  },
  n8n: {
    slug: 'n8n',
    title: 'n8n',
    description:
      'Build agent workflows with n8n: create your first workflow, set up triggers, add AI nodes, handle errors, and manage self-hosting and credentials.',
    icon: () => null,
    accentClass: 'text-course-4-accent',
    basePath: '/learn/course-4/n8n',
    progressStorageKey: 'multicorn_progress_course4_n8n_v1',
    firstLessonSlug: 'your-first-workflow',
    analyticsCategory: 'course4_n8n',
  },
}

export const COURSE_4_TRACK_SLUGS: readonly Course4Track[] = [
  'autohive',
  'dust',
  'mindstudio',
  'n8n',
]

export function getCourse4TrackConfig(track: Course4Track): Course4TrackConfig {
  return COURSE_4_TRACKS[track]
}
