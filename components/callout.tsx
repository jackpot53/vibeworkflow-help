import { Lightbulb, TriangleAlert, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'warning' | 'info'

const variants: Record<CalloutType, {
  title: string
  className: string
  icon: React.ReactNode
}> = {
  tip: {
    title: '팁',
    icon: <Lightbulb size={14} className="text-green-600 dark:text-green-400" />,
    className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
  },
  warning: {
    title: '주의',
    icon: <TriangleAlert size={14} className="text-yellow-600 dark:text-yellow-400" />,
    className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
  },
  info: {
    title: '참고',
    icon: <Info size={14} className="text-blue-600 dark:text-blue-400" />,
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
  const { title, icon, className } = variants[type]
  return (
    <Alert className={cn('my-4', className)}>
      <AlertTitle className="flex items-center gap-1.5">
        {icon}
        {title}
      </AlertTitle>
      <AlertDescription className="mt-1 text-sm">{children}</AlertDescription>
    </Alert>
  )
}
