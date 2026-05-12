import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

export function VibeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-block my-4 overflow-hidden rounded-lg">
      <div className="flex items-center bg-[#0d1117] border-b border-teal-500/25 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
          <Sparkles size={11} />
          프롬프트
        </span>
      </div>
      {children}
    </div>
  )
}
