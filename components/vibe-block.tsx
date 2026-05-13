import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

export function VibeBlock({ children }: { children: ReactNode }) {
  return (
    <div data-block className="vibe-block my-4 overflow-hidden rounded-lg border border-teal-200">
      <div className="flex items-center bg-teal-50 border-b border-teal-200 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-teal-100 text-teal-700 border border-teal-300">
          <Sparkles size={11} />
          프롬프트
        </span>
      </div>
      {children}
    </div>
  )
}
