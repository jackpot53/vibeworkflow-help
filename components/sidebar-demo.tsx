'use client'

import {
  LayoutDashboardIcon, FolderIcon, UsersIcon, SettingsIcon,
  BellIcon, SearchIcon, ChevronRightIcon, BarChartIcon,
  FileTextIcon, MessageSquareIcon, ShieldIcon, HelpCircleIcon,
} from 'lucide-react'
import {
  SidebarProvider, Sidebar, SidebarTrigger, SidebarInset,
  SidebarHeader, SidebarContent, SidebarFooter, SidebarSeparator,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// ─── 구성 요소 테이블 ────────────────────────────────────────────────────────

const PARTS = [
  {
    name: 'SidebarProvider',
    desc: '열림·닫힘 상태를 관리하는 Context Provider',
    preview: null,
  },
  {
    name: 'Sidebar',
    desc: '사이드바 패널 본체. collapsible prop으로 접힘 방식 설정',
    preview: null,
  },
  {
    name: 'SidebarTrigger',
    desc: '사이드바 토글 버튼',
    preview: 'trigger',
  },
  {
    name: 'SidebarInset',
    desc: '사이드바 옆 메인 콘텐츠 영역',
    preview: null,
  },
  {
    name: 'SidebarHeader',
    desc: '사이드바 상단 (로고, 검색 등)',
    preview: 'header',
  },
  {
    name: 'SidebarContent',
    desc: '스크롤 가능한 메뉴 영역',
    preview: null,
  },
  {
    name: 'SidebarFooter',
    desc: '사이드바 하단 (사용자 정보 등)',
    preview: 'footer',
  },
  {
    name: 'SidebarGroup',
    desc: '메뉴 항목의 섹션 묶음',
    preview: 'group',
  },
  {
    name: 'SidebarGroupLabel',
    desc: '섹션 제목 레이블',
    preview: 'group-label',
  },
  {
    name: 'SidebarGroupContent',
    desc: '섹션 내 메뉴 목록 컨테이너',
    preview: 'group-content',
  },
  {
    name: 'SidebarMenu / SidebarMenuItem',
    desc: '메뉴 항목 목록과 개별 항목',
    preview: 'menu',
  },
  {
    name: 'SidebarMenuButton',
    desc: '클릭 가능한 메뉴 버튼. isActive로 활성 상태 표시',
    preview: 'menu-button',
  },
  {
    name: 'SidebarMenuBadge',
    desc: '메뉴 오른쪽의 카운트 뱃지',
    preview: 'menu-badge',
  },
  {
    name: 'SidebarSeparator',
    desc: '섹션 구분선',
    preview: 'separator',
  },
] as const

function PartPreview({ type }: { type: string }) {
  if (type === 'header') {
    return (
      <SidebarHeader className="rounded-lg border border-border bg-sidebar w-44 p-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <Avatar className="size-7 rounded-md">
            <AvatarFallback className="rounded-md bg-primary text-primary-foreground text-xs font-bold">MA</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold leading-tight">My App</p>
            <p className="text-[10px] text-muted-foreground">Starter</p>
          </div>
        </div>
      </SidebarHeader>
    )
  }
  if (type === 'footer') {
    return (
      <SidebarFooter className="rounded-lg border border-border bg-sidebar w-44 p-0">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="size-7 rounded-full">
            <AvatarFallback className="bg-muted text-xs">김지</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium leading-tight">김지수</p>
            <p className="text-[10px] text-muted-foreground">jisoo@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    )
  }
  if (type === 'trigger') {
    return (
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>
    )
  }
  if (type === 'group') {
    return (
      <SidebarGroup className="rounded-lg border border-border bg-sidebar w-44 p-0">
        <SidebarGroupLabel>메인 메뉴</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboardIcon />
                <span>대시보드</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FolderIcon />
                <span>프로젝트</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }
  if (type === 'group-label') {
    return (
      <SidebarGroupLabel className="text-xs">메인 메뉴</SidebarGroupLabel>
    )
  }
  if (type === 'group-content') {
    return (
      <div className="rounded-lg border border-border bg-sidebar w-44 py-1">
        <SidebarGroupLabel>섹션</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {[
              { icon: LayoutDashboardIcon, label: '대시보드' },
              { icon: SettingsIcon, label: '설정' },
            ].map(({ icon: Icon, label }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </div>
    )
  }
  if (type === 'menu') {
    return (
      <SidebarMenu className="w-40">
        {[
          { icon: LayoutDashboardIcon, label: '대시보드' },
          { icon: FolderIcon, label: '프로젝트' },
          { icon: UsersIcon, label: '팀' },
        ].map(({ icon: Icon, label }) => (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton>
              <Icon />
              <span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }
  if (type === 'menu-button') {
    return (
      <div className="flex flex-col gap-1 w-36">
        <SidebarMenuButton isActive>
          <LayoutDashboardIcon />
          <span>대시보드</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <SettingsIcon />
          <span>설정</span>
        </SidebarMenuButton>
      </div>
    )
  }
  if (type === 'menu-badge') {
    return (
      <div className="w-36">
        <SidebarMenuButton>
          <BellIcon />
          <span>알림</span>
          <SidebarMenuBadge>12</SidebarMenuBadge>
        </SidebarMenuButton>
      </div>
    )
  }
  if (type === 'separator') {
    return <SidebarSeparator className="w-24 mx-0" />
  }
  return null
}

export function SidebarPartsDemo() {
  return (
    <div className="not-prose rounded-xl border border-border bg-card my-4 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-[220px]">컴포넌트</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">역할</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-[180px]">미리보기</th>
          </tr>
        </thead>
        <tbody>
          {PARTS.map(({ name, desc, preview }) => (
            <tr key={name} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground align-top pt-4">{name}</td>
              <td className="px-4 py-3 text-muted-foreground align-top pt-4">{desc}</td>
              <td className="px-4 py-3 align-middle">
                {preview ? <PartPreview type={preview} /> : <span className="text-muted-foreground/40">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// 데모 공통: 고정 높이 컨테이너
const DemoShell = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose h-[440px] overflow-hidden rounded-xl border border-border bg-background my-4">
    {children}
  </div>
)

// 데모 공통: 오른쪽 콘텐츠
const STATS = [
  { label: '총 사용자', value: '12,480', delta: '+8.2%' },
  { label: '이번 달 요청', value: '3,291', delta: '+14%' },
  { label: '응답 성공률', value: '99.4%', delta: '+0.3%' },
  { label: '평균 응답속도', value: '142ms', delta: '-12%' },
]

const RECENT = [
  { name: '김지수', action: '새 프로젝트 생성', time: '2분 전' },
  { name: '이민준', action: '배포 완료', time: '14분 전' },
  { name: '박서연', action: '코드 리뷰 요청', time: '1시간 전' },
]

function DemoContent({ title }: { title: string }) {
  return (
    <SidebarInset>
      <header className="flex h-12 items-center gap-2 border-b px-4">
        <span className="text-sm font-semibold">{title}</span>
      </header>
      <div className="flex flex-col gap-4 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-2">
          {STATS.map(({ label, value, delta }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold mt-0.5">{value}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{delta}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">최근 활동</p>
          {RECENT.map(({ name, action, time }) => (
            <div key={name} className="flex items-center justify-between px-3 py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">{name[0]}</div>
                <span className="text-xs">{name} · {action}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}

// ─── 기본 사이드바 ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: LayoutDashboardIcon, label: '대시보드', active: true },
  { icon: FolderIcon,          label: '프로젝트' },
  { icon: UsersIcon,           label: '팀', badge: '3' },
  { icon: BellIcon,            label: '알림', badge: '12' },
  { icon: SettingsIcon,        label: '설정' },
]

export function SidebarBasicDemo() {
  return (
    <DemoShell>
      <SidebarProvider style={{ '--sidebar-width': '16rem' } as React.CSSProperties}>
        <Sidebar collapsible="none">
          <SidebarHeader>
            <div className="flex items-center gap-2.5 px-2 py-1">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">MA</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-tight">My App</p>
                <p className="text-xs text-muted-foreground">Starter</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map(({ icon: Icon, label, active, badge }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={active}>
                        <Icon />
                        <span>{label}</span>
                        {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <DemoContent title="대시보드" />
      </SidebarProvider>
    </DemoShell>
  )
}

// ─── 그룹 사이드바 ──────────────────────────────────────────────────────────

const MAIN_NAV = [
  { icon: LayoutDashboardIcon, label: '개요' },
  { icon: BarChartIcon,        label: '분석', active: true },
  { icon: FileTextIcon,        label: '보고서' },
  { icon: MessageSquareIcon,   label: '메시지', badge: '5' },
]

const ADMIN_NAV = [
  { icon: UsersIcon,    label: '사용자 관리' },
  { icon: ShieldIcon,   label: '권한 설정' },
  { icon: HelpCircleIcon, label: '고객 지원' },
]

export function SidebarGroupDemo() {
  return (
    <DemoShell>
      <SidebarProvider style={{ '--sidebar-width': '16rem' } as React.CSSProperties}>
        <Sidebar collapsible="none">
          <SidebarHeader>
            <div className="flex items-center gap-2.5 px-2 py-1">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">WS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-tight">Workspace</p>
                <p className="text-xs text-muted-foreground">Pro 플랜</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>메인 메뉴</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {MAIN_NAV.map(({ icon: Icon, label, active, badge }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={active}>
                        <Icon />
                        <span>{label}</span>
                        {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>관리</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ADMIN_NAV.map(({ icon: Icon, label }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground">
              <div className="size-6 rounded-full bg-muted" />
              <span>김지수</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <DemoContent title="분석" />
      </SidebarProvider>
    </DemoShell>
  )
}

// ─── 접힘 토글 사이드바 ────────────────────────────────────────────────────

export function SidebarCollapsibleDemo() {
  return (
    <DemoShell>
      <SidebarProvider style={{ '--sidebar-width': '16rem' } as React.CSSProperties}>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenuButton className="h-auto px-2 py-1.5 gap-2.5">
              <Avatar className="size-8 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">MA</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight">My App</p>
                <p className="text-xs text-muted-foreground">Starter</p>
              </div>
            </SidebarMenuButton>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>메뉴</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={active} title={label}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-semibold">대시보드</span>
          </header>
          <div className="flex flex-col gap-4 p-4 overflow-auto">
            <div className="grid grid-cols-2 gap-2">
              {STATS.map(({ label, value, delta }) => (
                <div key={label} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-lg font-semibold mt-0.5">{value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{delta}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-card">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">최근 활동</p>
              {RECENT.map(({ name, action, time }) => (
                <div key={name} className="flex items-center justify-between px-3 py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">{name[0]}</div>
                    <span className="text-xs">{name} · {action}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DemoShell>
  )
}
