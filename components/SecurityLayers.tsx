const SHIELD_GROUP_LAYERS = [
  {
    title: 'Organisation layer',
    subtitle: 'Who approved it? Can you prove it?',
  },
  {
    title: 'Protocol layer',
    subtitle: 'What tool calls does the agent request?',
  },
] as const

const EXECUTION_LAYER = {
  title: 'Execution layer',
  subtitle: 'What syscalls does the agent make?',
} as const

const SHIELD_GROUP_LABEL_ID = 'security-layers-shield-group-label'
const EXECUTION_GROUP_LABEL_ID = 'security-layers-execution-group-label'

type LayerHeadingLevel = 'h2' | 'h3' | 'h4'

type LayerCardProps = {
  readonly title: string
  readonly subtitle: string
  readonly headingLevel?: LayerHeadingLevel
}

function LayerCard({ title, subtitle, headingLevel = 'h3' }: LayerCardProps) {
  const Heading = headingLevel

  return (
    <div className="rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
      <Heading className="text-sm font-semibold text-text-primary">{title}</Heading>
      <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
    </div>
  )
}

export function SecurityLayers() {
  return (
    <figure
      className="my-10 overflow-hidden rounded-lg border border-border bg-surface-secondary/40 p-4 sm:p-6"
      aria-label="Three layers of agent security and example tools at each layer"
    >
      <figcaption className="sr-only">
        Organisation layer: who approved it and can you prove it. Protocol layer: what tool calls
        the agent requests. Execution layer: what syscalls the agent makes. Shield maps to protocol
        and organisation. Agent Safehouse and agentsh map to execution.
      </figcaption>

      <div className="flex flex-col gap-3">
        <section
          className="flex flex-col gap-3 md:flex-row md:items-stretch"
          aria-labelledby={SHIELD_GROUP_LABEL_ID}
        >
          <div
            id={SHIELD_GROUP_LABEL_ID}
            className="flex shrink-0 flex-col justify-center rounded-lg border border-primary/25 bg-surface-tertiary/80 px-3 py-4 md:basis-36"
          >
            <p className="text-sm font-semibold text-primary">Shield</p>
            <p className="mt-1 text-xs leading-snug text-text-tertiary">
              Protocol and organisation
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {SHIELD_GROUP_LAYERS.map((layer) => (
              <LayerCard
                key={layer.title}
                title={layer.title}
                subtitle={layer.subtitle}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>

        <section
          className="flex flex-col gap-3 md:flex-row md:items-stretch"
          aria-labelledby={EXECUTION_GROUP_LABEL_ID}
        >
          <div
            id={EXECUTION_GROUP_LABEL_ID}
            className="flex shrink-0 flex-col justify-center gap-2 rounded-lg border border-border bg-surface-tertiary/80 px-3 py-4 md:basis-36"
          >
            <p className="text-sm font-semibold text-text-primary">Agent Safehouse</p>
            <p className="text-sm font-semibold text-text-primary">agentsh</p>
            <p className="mt-1 text-xs text-text-tertiary">Execution</p>
          </div>
          <div className="min-w-0 flex-1">
            <LayerCard
              title={EXECUTION_LAYER.title}
              subtitle={EXECUTION_LAYER.subtitle}
              headingLevel="h3"
            />
          </div>
        </section>
      </div>
    </figure>
  )
}
