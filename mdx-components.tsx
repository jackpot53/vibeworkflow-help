import type { ComponentProps } from 'react'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
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
import { ClaudeGitDemo } from '@/components/claude-git-demo'
import { VibeBlock } from '@/components/vibe-block'
import { ClaudeBlock } from '@/components/claude-block'
import { ShellBlock } from '@/components/shell-block'
import { SlashBlock } from '@/components/slash-block'
import { DevLabelDemo } from '@/components/devlabel-demo'
import { SectionMap } from '@/components/section-map'
import { ShadcnComponentGrid } from '@/components/shadcn-component-grid'
import { ComponentNameGrid } from '@/components/component-name-grid'
import { PlanTable } from '@/components/plan-table'
import { ToolsDemo } from '@/components/tools-demo'

const SHELL_LANGS = new Set(['shell', 'bash', 'zsh', 'sh', 'fish'])
const { pre: DefaultPre } = getDocsMDXComponents()

function CodePre(props: ComponentProps<'pre'> & { 'data-language'?: string }) {
  const Pre = DefaultPre as React.ComponentType<typeof props>
  const lang = props['data-language']
  if (lang && SHELL_LANGS.has(lang)) {
    return (
      <div className="shell-block" data-language={lang}>
        <Pre {...props} />
      </div>
    )
  }
  if (lang === 'output') {
    return (
      <div className="output-block">
        <div className="flex items-center bg-[#0d1117] border-b border-zinc-500/20 px-3 py-1.5">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-zinc-500/15 text-zinc-400 border border-zinc-500/30">
            출력
          </span>
        </div>
        <Pre {...props} />
      </div>
    )
  }
  return <Pre {...props} />
}

export function useMDXComponents() {
  return getDocsMDXComponents({
    pre: CodePre,
    Callout,
    CommandCard,
    Screenshot,
    StepBadge,
    VibeBlock,
    ClaudeBlock,
    ShellBlock,
    SlashBlock,
    DevLabelDemo,
    SectionMap,
    ShadcnComponentGrid,
    ComponentNameGrid,
    PlanTable,
    GitFlowDiagram,
    PRFlowDiagram,
    HeroSection,
    LottieAnimation,
    TimelineTabs,
    ClaudeMdDemo,
    ClaudeGitDemo,
    ToolsDemo,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Badge,
  })
}
