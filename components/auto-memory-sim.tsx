'use client'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

function UserAvatar() {
  return (
    <Avatar size="sm" className="flex-shrink-0">
      <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="사용자" />
      <AvatarFallback>나</AvatarFallback>
    </Avatar>
  )
}

function ClaudeAvatar() {
  return (
    <Avatar size="sm" className="flex-shrink-0">
      <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1024px-Claude_AI_logo.svg.png" alt="Claude" />
      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold text-xs">C</AvatarFallback>
    </Avatar>
  )
}

function UserCard({ text, time, badge }: { text: string; time: string; badge?: string }) {
  return (
    <div data-sim="card" className="max-w-lg w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <UserAvatar />
          <div className="min-w-0">
            <div className="font-bold text-gray-900 text-sm">사용자</div>
            <div className="text-gray-500 text-xs">@user</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {badge && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">
              {badge}
            </span>
          )}
          <span className="text-gray-400 text-xs">{time}</span>
        </div>
      </div>
      <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  )
}

function ClaudeCard({
  intro,
  code,
  memoryNote,
  time,
  memoryRead,
}: {
  intro?: string
  code: string
  memoryNote?: string
  time: string
  memoryRead?: string
}) {
  return (
    <div data-sim="card" className="max-w-lg w-full bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <ClaudeAvatar />
          <div className="min-w-0">
            <div className="font-bold text-gray-900 text-sm">Claude</div>
            <div className="text-gray-500 text-xs">claude.ai/code</div>
          </div>
        </div>
        <span className="text-gray-400 text-xs flex-shrink-0">{time}</span>
      </div>

      {memoryRead && (
        <div data-sim="inner" className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-3">
          <Bookmark size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-blue-600">{memoryRead}</span>
        </div>
      )}

      {intro && <p className="text-gray-700 text-sm mb-2 leading-relaxed">{intro}</p>}

      <pre data-sim="pre" className="bg-gray-900 text-green-400 text-xs rounded-lg p-3 font-mono overflow-x-auto leading-6 whitespace-pre">
        {code}
      </pre>

      {memoryNote && (
        <div data-sim="inner" className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mt-3">
          <Bookmark size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-amber-700 mb-0.5">메모리 저장</div>
            <div className="text-xs text-amber-600 leading-relaxed">{memoryNote}</div>
          </div>
        </div>
      )}

    </div>
  )
}

function SessionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 border-t border-dashed border-gray-200" />
      <span data-sim="badge" className="text-xs text-gray-400 font-medium px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
        {label}
      </span>
      <div className="flex-1 border-t border-dashed border-gray-200" />
    </div>
  )
}

export function AutoMemorySimDemo() {
  return (
    <div className="my-6 flex flex-col gap-3 max-w-lg" data-section-preview>
      <UserCard text="작업한 내용 커밋해줘" time="오전 10:30" badge="첫 번째 세션" />

      <ClaudeCard
        intro="변경사항을 커밋할게요."
        code={`$ git add .\n$ git commit -m "Fix user authentication bug"\n\n[main 3f2a1c4] Fix user authentication bug\n 2 files changed, 14 insertions(+), 3 deletions(-)`}
        time="오전 10:30"
      />

      <UserCard text="커밋 메시지는 한국어로 써줘, 이모지도 앞에 붙여줘" time="오전 10:31" />

      <ClaudeCard
        intro="알겠어요, 다시 커밋할게요."
        code={`$ git commit --amend -m "🐛 사용자 인증 버그 수정"\n\n[main 3f2a1c4] 🐛 사용자 인증 버그 수정\n 2 files changed, 14 insertions(+), 3 deletions(-)`}
        memoryNote="커밋 메시지는 한국어로 작성, 앞에 관련 이모지 붙이기 (예: 🐛 버그, ✨ 기능)"
        time="오전 10:31"
      />

      <SessionDivider label="다음 세션" />

      <UserCard text="작업한 내용 커밋해줘" time="오전 9:15" badge="새 세션" />

      <ClaudeCard
        memoryRead="MEMORY.md 확인 — 커밋 메시지: 한국어 + 이모지"
        code={`$ git add .\n$ git commit -m "✨ 메인 페이지 레이아웃 개선"\n\n[main 8c1d3a2] ✨ 메인 페이지 레이아웃 개선\n 3 files changed, 28 insertions(+), 5 deletions(-)`}
        time="오전 9:15"
      />
    </div>
  )
}
