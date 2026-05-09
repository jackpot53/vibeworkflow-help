import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'warning' | 'info'

const variants: Record<CalloutType, { title: string; className: string }> = {
  tip: {
    title: '💡 팁',
    className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
  },
  warning: {
    title: '⚠️ 주의',
    className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
  },
  info: {
    title: 'ℹ️ 참고',
    className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
  },
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType
  children: React.ReactNode
}) {
  const { title, className } = variants[type]
  return (
    <Alert className={cn('my-4', className)}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-1 text-sm">{children}</AlertDescription>
    </Alert>
  )
}
