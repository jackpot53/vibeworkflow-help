'use client'

import { Separator } from '@/components/ui/separator'

const WRAP = 'not-prose rounded-xl border border-border bg-card px-6 py-5 my-4'

export function SeparatorBasicDemo() {
  return (
    <div className={`${WRAP} space-y-3`}>
      <div>
        <p className="text-sm font-medium">홍길동</p>
        <p className="text-xs text-muted-foreground">프론트엔드 개발자</p>
      </div>
      <Separator />
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>프로젝트 12개</span>
        <span>팔로워 340명</span>
        <span>팔로잉 128명</span>
      </div>
    </div>
  )
}

export function SeparatorOrientationDemo() {
  return (
    <div className={`${WRAP} space-y-6`}>
      <div>
        <p className="text-xs text-muted-foreground mb-3">horizontal (기본값)</p>
        <Separator />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3">vertical</p>
        <div className="flex items-center gap-4 h-6">
          <span className="text-sm">블로그</span>
          <Separator orientation="vertical" />
          <span className="text-sm">문서</span>
          <Separator orientation="vertical" />
          <span className="text-sm">소스코드</span>
        </div>
      </div>
    </div>
  )
}

const MENU_ITEMS = [
  { group: '계정', items: ['프로필 편집', '비밀번호 변경'] },
  { group: '설정', items: ['알림', '언어 및 지역'] },
  { group: null, items: ['로그아웃'] },
]

export function SeparatorMenuDemo() {
  return (
    <div className={`${WRAP} w-52`}>
      {MENU_ITEMS.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && <Separator className="my-2" />}
          {group.group && (
            <p className="text-xs font-semibold text-muted-foreground px-2 mb-1">{group.group}</p>
          )}
          {group.items.map((item) => (
            <div
              key={item}
              className="text-sm px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
