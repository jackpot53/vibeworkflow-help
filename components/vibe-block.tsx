import type { ReactNode } from 'react'

export function VibeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-block my-4">
      <div className="flex items-center bg-[#0d1117] border-b border-violet-500/25 px-3 py-1.5">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
          VIBE
        </span>
      </div>
      {children}
    </div>
  )
}
