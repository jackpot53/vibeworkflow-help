import { Terminal } from 'lucide-react'
import type { ReactNode } from 'react'

export function ShellBlock({ children }: { children: ReactNode }) {
  return (
    <div data-block className="shell-cmd-block my-4 overflow-hidden rounded-t-lg border border-amber-400">
      <div className="flex items-center bg-amber-50 border-b border-amber-400 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-amber-100 text-amber-700 border border-amber-300">
          <Terminal size={11} />
          터미널 입력
        </span>
      </div>
      {children}
    </div>
  )
}
