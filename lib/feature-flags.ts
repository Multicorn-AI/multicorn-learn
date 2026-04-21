/**
 * Content and feature gates for Learn. Import from here so flags stay consistent.
 */
export function isCourse2Enabled(): boolean {
  return process.env.NEXT_PUBLIC_COURSE_2_ENABLED === 'true'
}

export function isCourse3Enabled(): boolean {
  return process.env.NEXT_PUBLIC_COURSE_3_ENABLED === 'true'
}
