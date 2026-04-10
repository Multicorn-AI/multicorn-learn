function LayerCard({ title, subtitle }: { readonly title: string; readonly subtitle: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
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

      <div className="hidden md:flex md:flex-col md:gap-3">
        <div className="flex gap-3">
          <div className="flex w-[9.5rem] shrink-0 flex-col justify-center rounded-lg border border-primary/25 bg-surface-tertiary/80 px-3 py-4">
            <p className="text-sm font-semibold text-primary">Shield</p>
            <p className="mt-1 text-xs leading-snug text-text-tertiary">
              Protocol and organisation
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <LayerCard title="Organisation layer" subtitle="Who approved it? Can you prove it?" />
            <LayerCard title="Protocol layer" subtitle="What tool calls does the agent request?" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex w-[9.5rem] shrink-0 flex-col justify-center gap-2 rounded-lg border border-border bg-surface-tertiary/80 px-3 py-4">
            <p className="text-sm font-semibold text-text-primary">Agent Safehouse</p>
            <p className="text-sm font-semibold text-text-primary">agentsh</p>
            <p className="mt-1 text-xs text-text-tertiary">Execution</p>
          </div>
          <div className="min-w-0 flex-1">
            <LayerCard title="Execution layer" subtitle="What syscalls does the agent make?" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        <div className="rounded-lg border border-border bg-surface-secondary p-4">
          <p className="mb-2 text-xs font-medium text-primary">
            Shield · Protocol and organisation
          </p>
          <h3 className="text-sm font-semibold text-text-primary">Organisation layer</h3>
          <p className="mt-1 text-sm text-text-secondary">Who approved it? Can you prove it?</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-secondary p-4">
          <p className="mb-2 text-xs font-medium text-primary">
            Shield · Protocol and organisation
          </p>
          <h3 className="text-sm font-semibold text-text-primary">Protocol layer</h3>
          <p className="mt-1 text-sm text-text-secondary">
            What tool calls does the agent request?
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-secondary p-4">
          <p className="mb-2 text-xs font-medium text-text-secondary">
            Agent Safehouse · agentsh · Execution
          </p>
          <h3 className="text-sm font-semibold text-text-primary">Execution layer</h3>
          <p className="mt-1 text-sm text-text-secondary">What syscalls does the agent make?</p>
        </div>
      </div>
    </figure>
  )
}
