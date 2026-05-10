export function StepBadge({ step }: { step: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold mr-2 shrink-0">
      {step}
    </span>
  )
}
