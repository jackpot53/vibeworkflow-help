'use client'

import { ChevronDownIcon, ChevronRightIcon, BellIcon, LockIcon, UserIcon } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '@/components/ui/collapsible'

const WRAP = 'not-prose rounded-xl border border-border bg-card px-6 py-5 my-4'

const FAQ = [
  { q: 'Claude Code는 무료인가요?', a: 'Pro 이상 플랜에서 사용할 수 있어요. 사용량에 따라 추가 요금이 발생할 수 있어요.' },
  { q: 'CLAUDE.md는 어디에 만들어야 하나요?', a: '프로젝트 루트 디렉터리에 만들면 돼요. Claude Code가 시작할 때 자동으로 읽어요.' },
  { q: '여러 파일을 한 번에 수정할 수 있나요?', a: '네, 가능해요. Claude Code는 여러 파일을 동시에 읽고 수정할 수 있어요.' },
]

const SETTINGS = [
  {
    icon: BellIcon,
    label: '알림 설정',
    items: ['이메일 알림', '푸시 알림', '슬랙 연동'],
  },
  {
    icon: LockIcon,
    label: '개인정보 설정',
    items: ['데이터 수집 동의', '활동 기록 관리', '계정 삭제'],
  },
  {
    icon: UserIcon,
    label: '계정 설정',
    items: ['프로필 편집', '비밀번호 변경', '연결된 앱'],
  },
]

export function CollapsibleBasicDemo() {
  return (
    <div className={WRAP}>
      <Collapsible className="rounded-lg border border-border bg-background">
        <div className="px-4 py-3">
          <p className="text-sm font-medium mb-2">Claude Code란?</p>
          <CollapsibleTrigger className="rounded-md px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 hover:no-underline">
            자세히 보기
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground leading-relaxed">
              Claude Code는 Anthropic이 만든 CLI 기반 AI 코딩 어시스턴트예요. 터미널에서 직접 대화하며 코드 작성, 리팩터링, 디버깅을 함께할 수 있어요.
            </div>
          </CollapsiblePanel>
        </div>
      </Collapsible>
    </div>
  )
}

export function CollapsibleFaqDemo() {
  return (
    <div className={WRAP}>
      <div className="space-y-1">
        {FAQ.map(({ q, a }) => (
          <Collapsible key={q} className="rounded-lg border border-border bg-background">
            <div className="px-4">
              <CollapsibleTrigger className="py-3 gap-3 hover:no-underline">
                <ChevronRightIcon className="size-4 text-muted-foreground shrink-0 transition-transform [[data-open]_&]:rotate-90" />
                <span className="text-left">{q}</span>
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <p className="pb-3 text-muted-foreground leading-relaxed">{a}</p>
              </CollapsiblePanel>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

export function CollapsibleSettingsDemo() {
  return (
    <div className={WRAP}>
      <div className="space-y-1">
        {SETTINGS.map(({ icon: Icon, label, items }) => (
          <Collapsible key={label} className="rounded-lg border border-border bg-background">
            <div className="px-4">
              <CollapsibleTrigger className="py-3 gap-3 hover:no-underline">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                <ChevronDownIcon className="size-4 text-muted-foreground shrink-0 transition-transform [[data-open]_&]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <ul className="pb-3 space-y-1">
                  {items.map((item) => (
                    <li key={item} className="px-1 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer rounded-md hover:bg-muted transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </CollapsiblePanel>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
