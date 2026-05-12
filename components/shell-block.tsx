import { Terminal } from 'lucide-react'
import type { ReactNode } from 'react'

export function ShellBlock({ children }: { children: ReactNode }) {
  return (
    <div className="shell-cmd-block my-4 overflow-hidden rounded-lg">
      <div className="flex items-center bg-[#0d1117] border-b border-amber-500/25 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-md">
          <Terminal size={11} />
          SHELL
        </span>
      </div>
      {children}
    </div>
  )
}
