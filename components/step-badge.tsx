import { Badge } from '@/components/ui/badge'

export function StepBadge({ step }: { step: number }) {
  return (
    <Badge className="mr-2 rounded-full w-7 h-7 p-0 inline-flex items-center justify-center text-xs font-bold">
      {step}
    </Badge>
  )
}
