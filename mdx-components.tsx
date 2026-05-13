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
import { FileBlock } from '@/components/file-block'
import { DevLabelDemo } from '@/components/devlabel-demo'
import { SectionMap } from '@/components/section-map'
import { ShadcnComponentGrid } from '@/components/shadcn-component-grid'
import { ComponentNameGrid } from '@/components/component-name-grid'
import { PlanTable } from '@/components/plan-table'
import { ToolsDemo } from '@/components/tools-demo'
import { AvatarBasicDemo, AvatarSizeDemo, AvatarBadgeDemo, AvatarGroupDemo } from '@/components/avatar-demo'
import { BadgeVariantTableDemo, BadgeVariantsDemo, BadgeStatusDemo, BadgeWithIconDemo } from '@/components/badge-demo'
import { CardWhenDemo, CardBasicDemo, CardActionDemo, CardUsageDemo } from '@/components/card-demo'
import { SidebarPartsDemo, SidebarBasicDemo, SidebarGroupDemo, SidebarCollapsibleDemo } from '@/components/sidebar-demo'
import { SkeletonBasicDemo, SkeletonCardDemo, SkeletonFeedDemo } from '@/components/skeleton-demo'
import { CollapsibleBasicDemo, CollapsibleFaqDemo, CollapsibleSettingsDemo } from '@/components/collapsible-demo'
import { AlertBasicDemo, AlertIconDemo, AlertActionDemo } from '@/components/alert-demo'
import { TabsBasicDemo, TabsSettingsDemo, TabsDashboardDemo } from '@/components/tabs-demo'
import { TableBasicDemo, TableStatusDemo, TableFooterDemo } from '@/components/table-demo'
import { DataTableDemo, DataTableColumnsDemo, DataTableHookDemo, DataTableToolbarDemo, DataTableRenderDemo, DataTablePaginationDemo } from '@/components/data-table-demo'
import { FileTree } from '@/components/file-tree'
import { AutoMemorySimDemo } from '@/components/auto-memory-sim'

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
    FileBlock,
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
    AvatarBasicDemo,
    AvatarSizeDemo,
    AvatarBadgeDemo,
    AvatarGroupDemo,
    BadgeVariantTableDemo,
    BadgeVariantsDemo,
    BadgeStatusDemo,
    BadgeWithIconDemo,
    CardWhenDemo,
    CardBasicDemo,
    CardActionDemo,
    CardUsageDemo,
    SidebarPartsDemo,
    SidebarBasicDemo,
    SidebarGroupDemo,
    SidebarCollapsibleDemo,
    SkeletonBasicDemo,
    SkeletonCardDemo,
    SkeletonFeedDemo,
    CollapsibleBasicDemo,
    CollapsibleFaqDemo,
    CollapsibleSettingsDemo,
    AlertBasicDemo,
    AlertIconDemo,
    AlertActionDemo,
    TabsBasicDemo,
    TabsSettingsDemo,
    TabsDashboardDemo,
    TableBasicDemo,
    TableStatusDemo,
    TableFooterDemo,
    DataTableDemo,
    DataTableColumnsDemo,
    DataTableHookDemo,
    DataTableToolbarDemo,
    DataTableRenderDemo,
    DataTablePaginationDemo,
    AutoMemorySimDemo,
    FileTree,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Badge,
  })
}
