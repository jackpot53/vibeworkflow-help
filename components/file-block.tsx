import { FileText } from 'lucide-react'
import type { ReactNode } from 'react'

export function FileBlock({ filename, children }: { filename: string; children: ReactNode }) {
  return (
    <div className="file-block my-4 overflow-hidden rounded-lg">
      <div className="flex items-center bg-[#0d1117] border-b border-slate-500/25 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide px-2 py-0.5 bg-slate-500/15 text-white border border-slate-500/30 font-mono">
          <FileText size={11} />
          {filename}
        </span>
      </div>
      {children}
    </div>
  )
}
