import type { ReactNode } from 'react'

export function ClaudeBlock({ children }: { children: ReactNode }) {
  return (
    <div data-block className="claude-block my-4 overflow-hidden rounded-t-lg border border-sky-400">
      <div className="flex items-center bg-sky-50 border-b border-sky-400 px-3 py-1.5">
        <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-sky-100 text-sky-700 border border-sky-300">
          클로드코드 출력
        </span>
      </div>
      {children}
    </div>
  )
}
