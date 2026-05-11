'use client'

import { useState } from 'react'
import React from 'react'
import { cn } from '@/lib/utils'

export function TimelineTabs({
  tabs,
  children,
}: {
  tabs: string[]
  children: React.ReactNode
}) {
  const [active, setActive] = useState(0)
  const panels = React.Children.toArray(children)

  return (
    <div className="not-prose my-6">
      {/* Timeline header */}
      <div className="relative flex items-start">
        {/* connecting line */}
        <div className="absolute top-4 left-0 right-0 h-px bg-border" style={{ zIndex: 0 }} />

        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative flex flex-1 flex-col items-center gap-2 px-1 text-center"
            style={{ zIndex: 1 }}
          >
            <span
              className={cn(
                'timeline-step-circle flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                active === i
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground'
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                'text-xs leading-tight break-keep',
                active === i ? 'font-semibold text-foreground' : 'text-muted-foreground'
              )}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="prose prose-sm mt-6 max-w-none rounded-lg border p-5 dark:prose-invert">
        {panels[active]}
      </div>
    </div>
  )
}
