import { FileText } from 'lucide-react'
import type { ReactNode } from 'react'

export function FileBlock({ filename, children }: { filename: string; children: ReactNode }) {
  return (
    <div data-block className="file-block my-4 overflow-hidden rounded-lg border border-slate-200">
      <div className="flex items-center bg-slate-100 border-b border-slate-200 px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide px-2 py-0.5 bg-slate-200 text-slate-700 border border-slate-300 font-mono">
          <FileText size={11} />
          {filename}
        </span>
      </div>
      {children}
    </div>
  )
}
