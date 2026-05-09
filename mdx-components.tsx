import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout } from '@/components/callout'
import { CommandCard } from '@/components/command-card'
import { Screenshot } from '@/components/screenshot'
import { StepBadge } from '@/components/step-badge'
import { GitFlowDiagram } from '@/components/git-flow-diagram'
import { PRFlowDiagram } from '@/components/pr-flow-diagram'

export function useMDXComponents() {
  return getDocsMDXComponents({
    Callout,
    CommandCard,
    Screenshot,
    StepBadge,
    GitFlowDiagram,
    PRFlowDiagram,
  })
}
