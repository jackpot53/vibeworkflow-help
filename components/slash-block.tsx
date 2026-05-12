import { Command } from 'lucide-react'
import type { ReactNode } from 'react'

export function SlashBlock({ children }: { children: ReactNode }) {
  return (
    <div className="slash-block my-4 overflow-hidden rounded-lg">
      <div className="flex items-center bg-[#0d1117] border-b border-purple-500/25 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-md">
          <Command size={11} />
          /CMD
        </span>
      </div>
      {children}
    </div>
  )
}
