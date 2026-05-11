import type { ReactNode } from 'react'

export function ClaudeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="claude-block my-4">
      <div className="flex items-center bg-[#0d1117] border-b border-sky-500/25 px-3 py-1.5">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
          CLAUDE
        </span>
      </div>
      {children}
    </div>
  )
}
