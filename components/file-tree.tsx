import { FolderOpen, FileText } from 'lucide-react'

export interface TreeNode {
  name: string
  note?: string
  children?: TreeNode[]
}

interface FlatRow {
  prefix: string
  connector: string
  type: 'dir' | 'file'
  name: string
  note?: string
}

function flatten(node: TreeNode, prefix: string, isLast: boolean, depth: number): FlatRow[] {
  const isRoot = depth === 0
  const type: 'dir' | 'file' = node.children !== undefined ? 'dir' : 'file'
  const connector = isRoot ? '' : isLast ? '└── ' : '├── '
  const rows: FlatRow[] = [{
    prefix: isRoot ? '' : prefix,
    connector,
    type,
    name: node.name,
    note: node.note,
  }]

  if (node.children) {
    const childPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ')
    node.children.forEach((child, i) => {
      rows.push(...flatten(child, childPrefix, i === node.children!.length - 1, depth + 1))
    })
  }

  return rows
}

export function FileTree({ root }: { root: TreeNode }) {
  const rows = flatten(root, '', true, 0)

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <th className="text-left px-4 py-2.5 text-gray-500 dark:text-slate-400 font-medium text-xs tracking-wider uppercase w-1/2">
              이름
            </th>
            <th className="text-left px-4 py-2.5 text-gray-500 dark:text-slate-400 font-medium text-xs tracking-wider uppercase border-l border-gray-200 dark:border-slate-700">
              설명
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="px-4 py-2">
                <div className="flex items-center font-mono text-xs">
                  <span className="text-gray-300 dark:text-slate-600 select-none whitespace-pre">{row.prefix}{row.connector}</span>
                  {row.type === 'dir'
                    ? <FolderOpen size={13} className="text-amber-500 mr-1.5 flex-shrink-0" />
                    : <FileText size={12} className="text-gray-400 dark:text-slate-500 mr-1.5 flex-shrink-0" />
                  }
                  <span className={row.type === 'dir'
                    ? 'text-gray-800 dark:text-slate-200 font-semibold'
                    : 'text-gray-700 dark:text-slate-300'
                  }>
                    {row.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 text-gray-500 dark:text-slate-400 text-xs border-l border-gray-100 dark:border-slate-800 leading-relaxed">
                {row.note ?? ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
