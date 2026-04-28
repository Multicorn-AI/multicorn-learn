export interface LessonNavLink {
  readonly slug: string
  readonly title: string
}

export interface LessonNavigationData {
  readonly prev: LessonNavLink | null
  readonly next: LessonNavLink | null
}
