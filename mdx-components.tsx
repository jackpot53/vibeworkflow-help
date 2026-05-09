import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout } from '@/components/callout'
import { CommandCard } from '@/components/command-card'
import { Screenshot } from '@/components/screenshot'
import { StepBadge } from '@/components/step-badge'

export function useMDXComponents() {
  return getDocsMDXComponents({
    Callout,
    CommandCard,
    Screenshot,
    StepBadge,
  })
}
