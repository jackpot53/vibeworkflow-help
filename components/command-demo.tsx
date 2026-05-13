'use client'

import { useState, useEffect } from 'react'
import {
  FileIcon,
  SettingsIcon,
  TerminalIcon,
  SearchIcon,
  BookOpenIcon,
  CodeIcon,
  GitBranchIcon,
  ZapIcon,
  UsersIcon,
  DatabaseIcon,
} from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

const WRAP = 'not-prose rounded-xl border border-border bg-card p-4 my-4'

// 기본 커맨드
export function CommandBasicDemo() {
  return (
    <div className={WRAP}>
      <Command className="rounded-lg border border-border shadow-sm">
        <CommandInput placeholder="명령어를 검색하세요..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없어요.</CommandEmpty>
          <CommandGroup heading="파일">
            <CommandItem>
              <FileIcon />
              <span>새 파일 만들기</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SearchIcon />
              <span>파일 검색</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="설정">
            <CommandItem>
              <SettingsIcon />
              <span>환경설정 열기</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <TerminalIcon />
              <span>터미널 열기</span>
              <CommandShortcut>⌘`</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

// 커맨드 다이얼로그 (⌘K)
export function CommandDialogDemo() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div className={WRAP}>
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-sm text-muted-foreground">
          버튼을 클릭하거나{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>{' '}
          를 눌러보세요
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <SearchIcon className="size-4" />
          명령어 검색
          <kbd className="pointer-events-none ml-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="무엇을 찾으세요?" />
          <CommandList>
            <CommandEmpty>검색 결과가 없어요.</CommandEmpty>
            <CommandGroup heading="빠른 실행">
              <CommandItem onSelect={() => setOpen(false)}>
                <ZapIcon />
                <span>새 프로젝트 시작</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <GitBranchIcon />
                <span>브랜치 전환</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <TerminalIcon />
                <span>터미널 열기</span>
                <CommandShortcut>⌘`</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="도구">
              <CommandItem onSelect={() => setOpen(false)}>
                <SettingsIcon />
                <span>환경설정</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <BookOpenIcon />
                <span>문서 열기</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

// 그룹 커맨드
export function CommandGroupDemo() {
  return (
    <div className={WRAP}>
      <Command className="rounded-lg border border-border shadow-sm">
        <CommandInput placeholder="검색..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없어요.</CommandEmpty>
          <CommandGroup heading="프로젝트">
            <CommandItem>
              <CodeIcon />
              <span>vibe-shop</span>
            </CommandItem>
            <CommandItem>
              <CodeIcon />
              <span>dashboard-app</span>
            </CommandItem>
            <CommandItem>
              <CodeIcon />
              <span>api-server</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="팀원">
            <CommandItem>
              <UsersIcon />
              <span>김지수</span>
            </CommandItem>
            <CommandItem>
              <UsersIcon />
              <span>박준혁</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="데이터베이스">
            <CommandItem>
              <DatabaseIcon />
              <span>prod-db</span>
            </CommandItem>
            <CommandItem>
              <DatabaseIcon />
              <span>staging-db</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
