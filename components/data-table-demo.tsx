'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Status = '대기' | '진행' | '완료' | '취소'
type Priority = '낮음' | '보통' | '높음'

type Task = {
  id: string
  title: string
  status: Status
  priority: Priority
  assignee: string
}

const TASKS: Task[] = [
  { id: 'T-001', title: '로그인 페이지 UI 구현', status: '완료', priority: '높음', assignee: '김지수' },
  { id: 'T-002', title: '사용자 인증 API 연동', status: '완료', priority: '높음', assignee: '이민준' },
  { id: 'T-003', title: '대시보드 컴포넌트 제작', status: '진행', priority: '높음', assignee: '김지수' },
  { id: 'T-004', title: '데이터베이스 스키마 설계', status: '완료', priority: '보통', assignee: '박서연' },
  { id: 'T-005', title: '파일 업로드 기능 개발', status: '진행', priority: '보통', assignee: '이민준' },
  { id: 'T-006', title: '알림 시스템 구현', status: '대기', priority: '보통', assignee: '최예린' },
  { id: 'T-007', title: '성능 최적화 — 이미지 압축', status: '대기', priority: '낮음', assignee: '박서연' },
  { id: 'T-008', title: '접근성 감사 및 개선', status: '대기', priority: '낮음', assignee: '김지수' },
  { id: 'T-009', title: '결제 모듈 통합', status: '진행', priority: '높음', assignee: '이민준' },
  { id: 'T-010', title: '이메일 템플릿 작성', status: '취소', priority: '낮음', assignee: '최예린' },
  { id: 'T-011', title: 'CI/CD 파이프라인 구성', status: '완료', priority: '보통', assignee: '박서연' },
  { id: 'T-012', title: '단위 테스트 작성', status: '대기', priority: '보통', assignee: '이민준' },
  { id: 'T-013', title: '다크 모드 지원', status: '진행', priority: '낮음', assignee: '김지수' },
  { id: 'T-014', title: '관리자 권한 설정', status: '대기', priority: '높음', assignee: '최예린' },
  { id: 'T-015', title: '모바일 반응형 대응', status: '대기', priority: '보통', assignee: '박서연' },
]

const STATUS_VARIANT: Record<Status, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  진행: 'default',
  완료: 'secondary',
  대기: 'outline',
  취소: 'destructive',
}

const PRIORITY_VARIANT: Record<Priority, 'default' | 'secondary' | 'outline'> = {
  높음: 'default',
  보통: 'secondary',
  낮음: 'outline',
}

const COLUMN_LABELS: Record<string, string> = {
  id: 'ID',
  title: '제목',
  status: '상태',
  priority: '우선순위',
  assignee: '담당자',
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.getValue('id')}</span>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        제목
        <ArrowUpDownIcon className="ml-1 size-3" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue('title')}</span>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        상태
        <ArrowUpDownIcon className="ml-1 size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue<Status>('status')
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        우선순위
        <ArrowUpDownIcon className="ml-1 size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const priority = row.getValue<Priority>('priority')
      return <Badge variant={PRIORITY_VARIANT[priority]}>{priority}</Badge>
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        담당자
        <ArrowUpDownIcon className="ml-1 size-3" />
      </Button>
    ),
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue('assignee')}</span>,
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: TASKS,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
    state: { sorting, columnFilters, columnVisibility },
  })

  return (
    <div className="not-prose flex flex-col gap-3 rounded-xl border border-border bg-muted/30 px-6 py-5 my-4">
      {/* 툴바 */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="제목으로 검색..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
          className="h-8 max-w-xs text-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="ml-auto h-8 text-xs">
                열 <ChevronDownIcon className="ml-1 size-3" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize text-sm"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {COLUMN_LABELS[col.id] ?? col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 테이블 */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/60 hover:bg-muted/60">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-20 text-center text-muted-foreground">
                  검색 결과가 없어요.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {table.getFilteredRowModel().rows.length}개 중{' '}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}
          행
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} 페이지
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── 구성 요소 테이블 셀용 컴팩트 데모 ──────────────────────────

const colDemoColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => <span className="font-medium text-xs">{row.getValue('title')}</span>,
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue<Status>('status')
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    },
  },
  {
    accessorKey: 'priority',
    header: '우선순위',
    cell: ({ row }) => {
      const priority = row.getValue<Priority>('priority')
      return <Badge variant={PRIORITY_VARIANT[priority]}>{priority}</Badge>
    },
  },
]

function MiniTable({ data }: { data: Task[] }) {
  const table = useReactTable({ data, columns: colDemoColumns, getCoreRowModel: getCoreRowModel() })
  return (
    <div className="not-prose rounded border border-border overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="bg-muted/60 hover:bg-muted/60">
              {hg.headers.map((h) => (
                <TableHead key={h.id} className="py-1.5 text-xs h-auto">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-1.5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// columns 정의 — 텍스트·Badge 등 다양한 cell 렌더러
export function DataTableColumnsDemo() {
  return <MiniTable data={TASKS.slice(0, 3)} />
}

// useReactTable — 훅 인스턴스가 렌더링을 구동
export function DataTableHookDemo() {
  return <MiniTable data={TASKS.slice(0, 3)} />
}

// 툴바 — 검색 Input + 열 표시 DropdownMenu만 표시
export function DataTableToolbarDemo() {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const table = useReactTable({
    data: TASKS.slice(0, 4),
    columns: colDemoColumns,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
  })
  return (
    <div className="not-prose flex items-center gap-1.5">
      <Input placeholder="제목 검색..." className="h-7 text-xs" readOnly />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">
              열 <ChevronDownIcon className="ml-1 size-3" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          {table.getAllColumns().filter((c) => c.getCanHide()).map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              className="text-xs"
              checked={col.getIsVisible()}
              onCheckedChange={(v) => col.toggleVisibility(!!v)}
            >
              {COLUMN_LABELS[col.id] ?? col.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// flexRender — header·cell 정의를 실제 JSX로 렌더링
export function DataTableRenderDemo() {
  return <MiniTable data={TASKS.slice(0, 3)} />
}

// 페이지네이션 — 이전/다음 버튼 + 페이지 표시만
export function DataTablePaginationDemo() {
  const table = useReactTable({
    data: TASKS.slice(0, 8),
    columns: colDemoColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } },
  })
  return (
    <div className="not-prose flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground">
        {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} 페이지
      </span>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" className="h-6 text-xs px-2"
          onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          이전
        </Button>
        <Button variant="outline" size="sm" className="h-6 text-xs px-2"
          onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          다음
        </Button>
      </div>
    </div>
  )
}
