export type Course2Track = 'cursor' | 'claude-code'

export interface Course2TrackConfig {
  readonly slug: Course2Track
  readonly basePath: string
  readonly progressStorageKey: string
  readonly title: string
  readonly shortTitle: string
  readonly description: string
  readonly intro: string
}

export const COURSE_2_TRACKS: Record<Course2Track, Course2TrackConfig> = {
  cursor: {
    slug: 'cursor',
    basePath: '/learn/course-2/cursor',
    progressStorageKey: 'multicorn_progress_cursor_track_v1',
    title: 'Build with Cursor',
    shortTitle: 'Cursor',
    description:
      'Step-by-step lessons for non-technical founders: install Cursor, steer an AI coding partner, read what it built, iterate safely, and run tests on your machine.',
    intro:
      'These lessons follow Sarah, a founder with no coding background, as she installs Cursor, asks for a real app, reads the files Cursor creates, fixes things in plain English, and runs tests before anyone else sees her work. You can stop after any lesson and still have something useful. Progress saves in your browser only, no account needed.',
  },
  'claude-code': {
    slug: 'claude-code',
    basePath: '/learn/course-2/claude-code',
    progressStorageKey: 'multicorn_progress_claude_code_track_v1',
    title: 'Build with Claude Code',
    shortTitle: 'Claude Code',
    description:
      'Terminal-first lessons for developers: install Claude Code, drive it from the command line, edit real files, connect MCP tools, and run tests without leaving your shell.',
    intro:
      'These lessons follow Priya, a developer who lives in the terminal, as she installs Claude Code, asks for a real app, watches it edit files in place, connects an MCP tool, and runs tests from the same shell. You can stop after any lesson and still have something useful. Progress saves in your browser only, no account needed.',
  },
}

export const COURSE_2_TRACK_SLUGS: readonly Course2Track[] = ['cursor', 'claude-code']

export function getTrackConfig(track: Course2Track): Course2TrackConfig {
  return COURSE_2_TRACKS[track]
}
