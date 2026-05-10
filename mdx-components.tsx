import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout } from '@/components/callout'
import { CommandCard } from '@/components/command-card'
import { Screenshot } from '@/components/screenshot'
import { StepBadge } from '@/components/step-badge'
import { GitFlowDiagram } from '@/components/git-flow-diagram'
import { PRFlowDiagram } from '@/components/pr-flow-diagram'
import { HeroSection } from '@/components/hero-section'
import { LottieAnimation } from '@/components/lottie-animation'
import { TimelineTabs } from '@/components/timeline-tabs'
import { ClaudeMdDemo } from '@/components/claude-md-demo'
import { VibeBlock } from '@/components/vibe-block'
import { DevLabelDemo } from '@/components/devlabel-demo'
import { SectionMap } from '@/components/section-map'
import { ShadcnComponentGrid } from '@/components/shadcn-component-grid'

export function useMDXComponents() {
  return getDocsMDXComponents({
    Callout,
    CommandCard,
    Screenshot,
    StepBadge,
    VibeBlock,
    DevLabelDemo,
    SectionMap,
    ShadcnComponentGrid,
    GitFlowDiagram,
    PRFlowDiagram,
    HeroSection,
    LottieAnimation,
    TimelineTabs,
    ClaudeMdDemo,
  })
}
