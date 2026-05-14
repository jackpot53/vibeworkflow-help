import type { ComponentProps } from 'react'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Callout } from '@/components/callout'
import { CommandCard } from '@/components/command-card'
import { Screenshot } from '@/components/screenshot'
import { StepBadge } from '@/components/step-badge'
import { GitFlowDiagram } from '@/components/git-flow-diagram'
import { StackArchitectureDiagram } from '@/components/stack-architecture-diagram'
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
import { AccordionBasicDemo, AccordionMultipleDemo, AccordionFaqDemo } from '@/components/accordion-demo'
import { CarouselBasicDemo, CarouselSizeDemo, CarouselCardDemo } from '@/components/carousel-demo'
import { CommandBasicDemo, CommandDialogDemo, CommandGroupDemo } from '@/components/command-demo'
import { SeparatorBasicDemo, SeparatorOrientationDemo, SeparatorMenuDemo } from '@/components/separator-demo'
import { CollapsibleBasicDemo, CollapsibleFaqDemo, CollapsibleSettingsDemo } from '@/components/collapsible-demo'
import { AlertBasicDemo, AlertIconDemo, AlertActionDemo } from '@/components/alert-demo'
import { TabsBasicDemo, TabsSettingsDemo, TabsDashboardDemo } from '@/components/tabs-demo'
import { TableBasicDemo, TableStatusDemo, TableFooterDemo } from '@/components/table-demo'
import { DataTableDemo, DataTableColumnsDemo, DataTableHookDemo, DataTableToolbarDemo, DataTableRenderDemo, DataTablePaginationDemo } from '@/components/data-table-demo'
import { FileTree } from '@/components/file-tree'
import { AutoMemorySimDemo } from '@/components/auto-memory-sim'
import { WebLayersDemo } from '@/components/web-layers-demo'
import { NavbarDemo, HeroDemo, FeaturesDemo, HowItWorksDemo, PricingDemo, TestimonialsDemo, FAQDemo, CTADemo, FooterDemo } from '@/components/section-demo'

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
      <div className="output-block border border-gray-200 rounded-md overflow-hidden">
        <div className="flex items-center bg-gray-100 border-b border-gray-200 px-3 py-1.5">
          <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-gray-200 text-gray-600 border border-gray-300">
            터미널 출력
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
    StackArchitectureDiagram,
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
    AccordionBasicDemo,
    AccordionMultipleDemo,
    AccordionFaqDemo,
    CarouselBasicDemo,
    CarouselSizeDemo,
    CarouselCardDemo,
    CommandBasicDemo,
    CommandDialogDemo,
    CommandGroupDemo,
    SeparatorBasicDemo,
    SeparatorOrientationDemo,
    SeparatorMenuDemo,
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
    WebLayersDemo,
    NavbarDemo,
    HeroDemo,
    FeaturesDemo,
    HowItWorksDemo,
    PricingDemo,
    TestimonialsDemo,
    FAQDemo,
    CTADemo,
    FooterDemo,
    FileTree,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Badge,
  })
}
