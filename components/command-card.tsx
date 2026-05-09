import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CommandCard({
  command,
  description,
  example,
}: {
  command: string
  description: string
  example?: string
}) {
  return (
    <Card className="my-3">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Badge variant="secondary" className="font-mono text-sm px-2 py-0.5">
            {command}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-sm text-muted-foreground">
        <p>{description}</p>
        {example && (
          <p className="mt-2 font-mono text-xs bg-muted px-3 py-1.5 rounded">
            예시: {example}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
