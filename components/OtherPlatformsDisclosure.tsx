/**
 * Collapsible "other platforms" block used in Course 3 MDX. Children are often
 * {@link PlatformContent} blocks so only the matching one renders.
 */
export function OtherPlatformsDisclosure({ children }: { readonly children: React.ReactNode }) {
  return (
    <details className="mb-6 rounded-lg border border-border bg-surface-secondary p-4 sm:p-5 [&>summary::-webkit-details-marker]:hidden">
      <summary className="min-h-[44px] cursor-pointer list-none pr-1 text-sm font-semibold leading-snug text-text-primary sm:pr-0">
        Read about other platforms
      </summary>
      <div className="mt-4 space-y-4 border-t border-border pt-4">{children}</div>
    </details>
  )
}
