import { Command } from 'lucide-react'
import type { ReactNode } from 'react'

export function SlashBlock({ children }: { children: ReactNode }) {
  return (
    <div data-block className="slash-block my-4 overflow-hidden rounded-lg border border-purple-200">
      <div className="flex items-center bg-purple-50 border-b border-purple-200 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-300">
          <Command size={11} />
          /CMD
        </span>
      </div>
      {children}
    </div>
  )
}
