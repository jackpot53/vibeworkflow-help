'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon,
  SearchIcon, XIcon, HomeIcon, FileIcon, BellIcon, SettingsIcon,
  UserIcon, PlusIcon, StarIcon, HeartIcon, MessageSquareIcon,
  ZapIcon, GripVerticalIcon, CalendarIcon, CommandIcon,
  ArrowUpDownIcon, Loader2Icon,
} from 'lucide-react'

/* ─── individual demos ─── */

function ChartDemo() {
  const bars = [
    { label: 'Jan', v: 40 }, { label: 'Feb', v: 65 },
    { label: 'Mar', v: 52 }, { label: 'Apr', v: 78 },
    { label: 'May', v: 61 }, { label: 'Jun', v: 85 },
  ]
  return (
    <div className="flex items-end gap-2 h-20 w-full">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-col items-center flex-1 gap-1">
          <div className="w-full rounded-t bg-primary/70" style={{ height: `${b.v}%` }} />
          <span className="text-[10px] text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="text-sm font-medium">@peduarte starred 3 repos</span>
        <button onClick={() => setOpen(!open)} className="rounded p-0.5 hover:bg-muted transition-colors">
          <ChevronDownIcon className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="mt-1 flex flex-col gap-1">
          {['@radix-ui/primitives', '@radix-ui/colors'].map((r) => (
            <div key={r} className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">{r}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const opts = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix']
  return (
    <div className="relative w-full max-w-xs">
      <button onClick={() => setOpen(!open)} className="flex h-8 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted transition-colors">
        <span className={value ? '' : 'text-muted-foreground'}>{value || 'Select framework...'}</span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-9 z-20 w-full rounded-lg border border-border bg-popover shadow-md overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <SearchIcon className="size-3.5 text-muted-foreground" />
            <input className="flex-1 text-xs outline-none bg-transparent placeholder:text-muted-foreground" placeholder="Search..." />
          </div>
          {opts.map((o) => (
            <button key={o} onClick={() => { setValue(o); setOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors">
              <CheckIcon className={`size-3.5 ${value === o ? 'opacity-100' : 'opacity-0'}`} />
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CommandDemo() {
  return (
    <div className="w-full max-w-xs rounded-lg border border-border bg-popover overflow-hidden shadow-md">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <CommandIcon className="size-3.5 text-muted-foreground" />
        <input className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted-foreground" placeholder="Type a command..." />
        <kbd className="text-[10px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground">⌘K</kbd>
      </div>
      <div className="py-1">
        {[{ label: '캘린더', icon: CalendarIcon }, { label: '설정', icon: SettingsIcon }, { label: '프로필', icon: UserIcon }].map(({ label, icon: Icon }, i) => (
          <div key={label} className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer ${i === 0 ? 'bg-muted' : 'hover:bg-muted'}`}>
            <Icon className="size-3.5 text-muted-foreground" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function ContextMenuDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">우클릭 영역</div>
      <div className="rounded-lg border border-border bg-popover shadow-md py-1 text-sm w-44">
        {['뒤로', '앞으로', null, '새로고침', '다른 이름으로 저장'].map((item, i) =>
          item === null
            ? <div key={i} className="my-1 border-t border-border" />
            : <div key={item} className="px-3 py-1 hover:bg-muted cursor-pointer">{item}</div>
        )}
      </div>
    </div>
  )
}

function DataTableDemo() {
  const rows = [
    { name: 'Alice', status: '활성', amount: '₩128,000' },
    { name: 'Bob', status: '대기', amount: '₩32,000' },
    { name: 'Carol', status: '활성', amount: '₩65,000' },
  ]
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border">
            {['이름', '상태', '금액'].map((h) => (
              <th key={h} className="px-2 py-1.5 text-left font-medium text-muted-foreground">
                <span className="flex items-center gap-0.5">{h} <ArrowUpDownIcon className="size-3" /></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/50 hover:bg-muted/30">
              <td className="px-2 py-1.5 font-medium">{r.name}</td>
              <td className="px-2 py-1.5">
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${r.status === '활성' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
              </td>
              <td className="px-2 py-1.5">{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DatePickerDemo() {
  const [selected, setSelected] = useState(10)
  return (
    <div className="w-full max-w-xs rounded-lg border border-border bg-popover p-3 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <button className="p-1 hover:bg-muted rounded"><ChevronLeftIcon className="size-4" /></button>
        <span className="text-sm font-medium">2025년 5월</span>
        <button className="p-1 hover:bg-muted rounded"><ChevronRightIcon className="size-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {['일','월','화','수','목','금','토'].map((d) => (
          <div key={d} className="text-[10px] text-muted-foreground py-1">{d}</div>
        ))}
        {[null, null, null].map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: 25 }, (_, i) => i + 1).map((d) => (
          <button key={d} onClick={() => setSelected(d)} className={`text-xs rounded py-1 hover:bg-muted transition-colors ${d === selected ? 'bg-primary text-primary-foreground' : ''}`}>{d}</button>
        ))}
      </div>
    </div>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-center">
      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setOpen(false)}>
          <div className="relative w-80 rounded-xl border border-border bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><XIcon className="size-4" /></button>
            <h3 className="text-base font-semibold mb-1">계정 삭제</h3>
            <p className="text-sm text-muted-foreground mb-4">정말 삭제하시겠어요? 이 작업은 되돌릴 수 없어요.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>삭제</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DirectionDemo() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div dir="ltr" className="rounded-lg border border-border px-3 py-2 text-sm"><span className="text-xs text-muted-foreground block">LTR</span>Hello, World! →</div>
      <div dir="rtl" className="rounded-lg border border-border px-3 py-2 text-sm"><span className="text-xs text-muted-foreground block">RTL</span>← !مرحبا بالعالم</div>
    </div>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-center">
      <Button variant="outline" onClick={() => setOpen(true)}>드로어 열기</Button>
      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-xl border-t border-border bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />
            <h3 className="text-base font-semibold mb-1">하단 드로어</h3>
            <p className="text-sm text-muted-foreground mb-4">화면 아래에서 올라오는 패널이에요.</p>
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline" onClick={() => setOpen(false)}>닫기</Button>
              <Button className="flex-1" onClick={() => setOpen(false)}>확인</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownMenuDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative flex justify-center">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        옵션 <ChevronDownIcon className="size-3.5 ml-1" />
      </Button>
      {open && (
        <div className="absolute top-9 z-20 w-44 rounded-lg border border-border bg-popover shadow-md py-1 text-sm">
          {[{ label: '프로필', icon: UserIcon }, { label: '설정', icon: SettingsIcon }, { label: '알림', icon: BellIcon }].map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setOpen(false)} className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-muted transition-colors">
              <Icon className="size-3.5 text-muted-foreground" />{label}
            </button>
          ))}
          <div className="my-1 border-t border-border" />
          <button onClick={() => setOpen(false)} className="flex w-full items-center gap-2 px-3 py-1.5 text-destructive hover:bg-muted transition-colors">
            <XIcon className="size-3.5" />로그아웃
          </button>
        </div>
      )}
    </div>
  )
}

function EmptyDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2 w-full text-center">
      <div className="rounded-full bg-muted p-3"><FileIcon className="size-5 text-muted-foreground" /></div>
      <p className="text-sm font-medium">파일이 없어요</p>
      <p className="text-xs text-muted-foreground">첫 번째 파일을 업로드해보세요.</p>
      <Button size="sm" className="mt-1"><PlusIcon className="size-3.5" />파일 추가</Button>
    </div>
  )
}

function FieldDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="f1">이름 <span className="text-destructive">*</span></Label>
        <Input id="f1" placeholder="홍길동" />
        <p className="text-xs text-muted-foreground">실명을 입력해주세요.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="f2" className="text-destructive">이메일 *</Label>
        <Input id="f2" placeholder="example@email.com" className="border-destructive" />
        <p className="text-xs text-destructive">유효한 이메일을 입력해주세요.</p>
      </div>
    </div>
  )
}

function HoverCardDemo() {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative">
      <button className="text-sm font-medium underline decoration-dotted underline-offset-4" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>@nextjs</button>
      {hovered && (
        <div className="absolute left-0 top-7 z-20 w-64 rounded-xl border border-border bg-popover p-4 shadow-md">
          <div className="flex gap-3">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center"><ZapIcon className="size-4" /></div>
            <div><p className="text-sm font-semibold">Next.js</p><p className="text-xs text-muted-foreground">@nextjs</p></div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">The React Framework for the Web.</p>
        </div>
      )}
    </div>
  )
}

function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="flex items-center rounded-lg border border-border overflow-hidden">
        <span className="px-3 py-1.5 bg-muted text-sm text-muted-foreground border-r border-border">https://</span>
        <input className="flex-1 px-3 py-1.5 text-sm outline-none bg-background" placeholder="example.com" />
      </div>
      <div className="flex items-center rounded-lg border border-border overflow-hidden">
        <input className="flex-1 px-3 py-1.5 text-sm outline-none bg-background" placeholder="검색..." />
        <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">검색</button>
      </div>
    </div>
  )
}

function InputOTPDemo() {
  const [vals, setVals] = useState(['', '', '', '', '', ''])
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {vals.map((v, i) => (
          <input key={i} maxLength={1} value={v}
            onChange={(e) => { const n = [...vals]; n[i] = e.target.value; setVals(n) }}
            className="size-10 rounded-lg border border-border bg-background text-center text-sm font-mono font-semibold outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 transition-all"
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">6자리 인증 코드를 입력하세요.</p>
    </div>
  )
}

function ItemDemo() {
  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      {[{ icon: HomeIcon, label: '홈', active: true }, { icon: FileIcon, label: '문서' }, { icon: BellIcon, label: '알림', badge: '3' }, { icon: SettingsIcon, label: '설정' }].map(({ icon: Icon, label, active, badge }) => (
        <div key={label} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors ${active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
          <span className="flex items-center gap-2"><Icon className="size-4" />{label}</span>
          {badge && <span className="rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 font-medium">{badge}</span>}
        </div>
      ))}
    </div>
  )
}

function KbdDemo() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {[
        { keys: ['⌘', 'K'], label: '명령어 팔레트' },
        { keys: ['⌘', 'S'], label: '저장' },
        { keys: ['⌘', '⇧', 'P'], label: '커맨드 팔레트' },
        { keys: ['⌃', 'C'], label: '복사' },
      ].map(({ keys, label }) => (
        <div key={label} className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <div className="flex items-center gap-1">
            {keys.map((k) => <kbd key={k} className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono shadow-sm">{k}</kbd>)}
          </div>
        </div>
      ))}
    </div>
  )
}

function MenubarDemo() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="w-full">
      <div className="flex items-center rounded-lg border border-border bg-background px-1 py-0.5">
        {['파일', '편집', '보기', '도움말'].map((m) => (
          <div key={m} className="relative">
            <button onClick={() => setOpen(open === m ? null : m)} className={`px-3 py-1 rounded text-sm transition-colors ${open === m ? 'bg-muted' : 'hover:bg-muted'}`}>{m}</button>
            {open === m && (
              <div className="absolute top-8 left-0 z-20 w-40 rounded-lg border border-border bg-popover shadow-md py-1 text-sm">
                {['새 파일', '열기...', '저장', '다른 이름으로 저장'].map((item) => (
                  <button key={item} onClick={() => setOpen(null)} className="w-full px-3 py-1.5 text-left hover:bg-muted transition-colors">{item}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function NativeSelectDemo() {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs">
      <Label>국가 선택</Label>
      <select className="h-8 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/30">
        <option>한국</option><option>미국</option><option>일본</option><option>중국</option>
      </select>
    </div>
  )
}

function NavigationMenuDemo() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <nav className="flex items-center gap-1">
      {['제품', '솔루션', '가격'].map((item) => (
        <div key={item} className="relative">
          <button onMouseEnter={() => setOpen(item)} onMouseLeave={() => setOpen(null)} className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors">
            {item} <ChevronDownIcon className="size-3 text-muted-foreground" />
          </button>
          {open === item && (
            <div className="absolute top-8 left-0 z-20 w-44 rounded-xl border border-border bg-popover shadow-md p-2" onMouseEnter={() => setOpen(item)} onMouseLeave={() => setOpen(null)}>
              {[item + ' 소개', item + ' 가이드', item + ' FAQ'].map((sub) => (
                <div key={sub} className="rounded-lg px-3 py-2 text-sm hover:bg-muted cursor-pointer">
                  <p className="font-medium text-xs">{sub}</p>
                  <p className="text-[10px] text-muted-foreground">자세히 알아보세요</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(3)
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded-lg border border-border text-sm hover:bg-muted disabled:opacity-40 transition-colors">
        <ChevronLeftIcon className="size-4" />
      </button>
      {[1, 2, 3, 4, 5].map((p) => (
        <button key={p} onClick={() => setPage(p)} className={`flex size-8 items-center justify-center rounded-lg text-sm transition-colors ${p === page ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted'}`}>{p}</button>
      ))}
      <button onClick={() => setPage(Math.min(5, page + 1))} disabled={page === 5} className="flex size-8 items-center justify-center rounded-lg border border-border text-sm hover:bg-muted disabled:opacity-40 transition-colors">
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  )
}

function PopoverDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative flex justify-center">
      <Button variant="outline" onClick={() => setOpen(!open)}>팝오버 열기</Button>
      {open && (
        <div className="absolute top-10 z-20 w-64 rounded-xl border border-border bg-popover p-4 shadow-md">
          <p className="text-sm font-semibold mb-1">알림 설정</p>
          <p className="text-xs text-muted-foreground mb-3">어떤 알림을 받을지 선택하세요.</p>
          <div className="flex flex-col gap-2 mb-3">
            {['모든 새 댓글', '직접 메시지', '멘션'].map((l) => (
              <div key={l} className="flex items-center gap-2">
                <Checkbox id={l} defaultChecked />
                <Label htmlFor={l} className="text-sm">{l}</Label>
              </div>
            ))}
          </div>
          <Button className="w-full" size="sm" onClick={() => setOpen(false)}>저장</Button>
        </div>
      )}
    </div>
  )
}

function RadioGroupDemo() {
  const [value, setValue] = useState('comfortable')
  return (
    <div className="flex flex-col gap-2">
      {[{ v: 'default', l: '기본' }, { v: 'comfortable', l: '편안하게' }, { v: 'compact', l: '좁게' }].map(({ v, l }) => (
        <label key={v} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setValue(v)}>
          <div className={`size-4 rounded-full border-2 flex items-center justify-center transition-colors ${value === v ? 'border-primary' : 'border-border'}`}>
            {value === v && <div className="size-2 rounded-full bg-primary" />}
          </div>
          <span className="text-sm">{l}</span>
        </label>
      ))}
    </div>
  )
}

function ResizableDemo() {
  const [split, setSplit] = useState(50)
  return (
    <div className="w-full rounded-lg border border-border overflow-hidden h-20 flex select-none">
      <div className="bg-muted/30 flex items-center justify-center text-xs text-muted-foreground" style={{ width: `${split}%` }}>왼쪽</div>
      <div
        className="w-1 bg-border cursor-col-resize hover:bg-primary/50 flex items-center justify-center transition-colors"
        onMouseDown={(e) => {
          const start = e.clientX; const startSplit = split
          const onMove = (me: MouseEvent) => {
            const parent = (e.target as HTMLElement).parentElement
            if (!parent) return
            const rect = parent.getBoundingClientRect()
            setSplit(Math.max(20, Math.min(80, startSplit + ((me.clientX - start) / rect.width) * 100)))
          }
          const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
          window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
        }}
      >
        <GripVerticalIcon className="size-3 text-muted-foreground" />
      </div>
      <div className="flex-1 bg-muted/10 flex items-center justify-center text-xs text-muted-foreground">오른쪽</div>
    </div>
  )
}

function ScrollAreaDemo() {
  const items = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Vercel', 'Prisma', 'tRPC', 'Zod', 'React Query', 'Framer Motion', 'Storybook']
  return (
    <div className="h-28 overflow-y-auto rounded-lg border border-border p-3 w-full">
      <div className="flex flex-col gap-1.5">
        {items.map((tag) => (
          <div key={tag} className="flex items-center justify-between text-sm">
            <span>{tag}</span>
            <Badge variant="secondary" className="text-[10px]">인기</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function SelectDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const opts = ['사과 🍎', '바나나 🍌', '오렌지 🍊', '포도 🍇', '딸기 🍓']
  return (
    <div className="relative w-full max-w-xs">
      <button onClick={() => setOpen(!open)} className="flex h-8 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted transition-colors">
        <span className={value ? '' : 'text-muted-foreground'}>{value || '과일 선택...'}</span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute top-9 z-20 w-full rounded-lg border border-border bg-popover shadow-md py-1">
          {opts.map((o) => (
            <button key={o} onClick={() => { setValue(o); setOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors">
              <CheckIcon className={`size-3.5 ${value === o ? 'opacity-100' : 'opacity-0'}`} />{o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex justify-center">
      <Button variant="outline" onClick={() => setOpen(true)}>시트 열기</Button>
      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute right-0 top-0 bottom-0 w-72 border-l border-border bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">편집 패널</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><XIcon className="size-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5"><Label>이름</Label><Input placeholder="홍길동" /></div>
              <div className="flex flex-col gap-1.5"><Label>이메일</Label><Input placeholder="email@example.com" /></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <Button className="w-full" onClick={() => setOpen(false)}>저장</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex h-28 w-full rounded-lg border border-border overflow-hidden">
      <div className={`border-r border-border bg-muted/30 flex flex-col gap-1 p-2 transition-all duration-200 ${collapsed ? 'w-10' : 'w-32'}`}>
        {[{ icon: HomeIcon, label: '홈' }, { icon: FileIcon, label: '문서' }, { icon: BellIcon, label: '알림' }, { icon: SettingsIcon, label: '설정' }].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted cursor-pointer transition-colors">
            <Icon className="size-3.5 text-muted-foreground shrink-0" />
            {!collapsed && <span>{label}</span>}
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 flex flex-col gap-1">
        <p className="text-xs font-medium">메인 콘텐츠</p>
        <button onClick={() => setCollapsed(!collapsed)} className="text-[10px] text-primary underline text-left">{collapsed ? '사이드바 펼치기' : '사이드바 접기'}</button>
      </div>
    </div>
  )
}

function SonnerDemo() {
  const [toasts, setToasts] = useState<{ id: number; type: string; msg: string }[]>([])
  const idRef = { current: 0 }
  const show = (type: string, msg: string) => {
    const id = idRef.current++
    setToasts((prev) => [...prev, { id, type, msg }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <div className="flex gap-2 flex-wrap justify-center">
        <Button size="sm" variant="outline" onClick={() => show('success', '저장 완료!')}>성공</Button>
        <Button size="sm" variant="outline" onClick={() => show('error', '오류가 발생했어요')}>오류</Button>
        <Button size="sm" variant="outline" onClick={() => show('info', '업데이트가 있어요')}>안내</Button>
      </div>
      <div className="flex flex-col gap-1.5 w-full max-w-xs">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm ${t.type === 'success' ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' : t.type === 'error' ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400' : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400'}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  )
}

function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        {['size-4', 'size-6', 'size-8'].map((s) => <Loader2Icon key={s} className={`${s} animate-spin text-primary`} />)}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2Icon className="size-4 animate-spin" />불러오는 중...
      </div>
    </div>
  )
}

function TableDemo() {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {['이름', '이메일', '역할'].map((h) => <th key={h} className="px-2 py-1.5 text-left font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[{ name: 'Alice', email: 'alice@example.com', role: '관리자' }, { name: 'Bob', email: 'bob@example.com', role: '편집자' }, { name: 'Carol', email: 'carol@example.com', role: '뷰어' }].map((r) => (
            <tr key={r.name} className="border-b border-border/50 hover:bg-muted/30">
              <td className="px-2 py-1.5 font-medium">{r.name}</td>
              <td className="px-2 py-1.5 text-muted-foreground">{r.email}</td>
              <td className="px-2 py-1.5"><Badge variant="outline" className="text-[10px]">{r.role}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ToastDemo() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative flex flex-col items-center gap-3 w-full">
      <Button variant="outline" onClick={() => { setVisible(true); setTimeout(() => setVisible(false), 3000) }}>토스트 표시</Button>
      {visible && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-lg w-full max-w-xs">
          <CheckIcon className="size-4 text-green-500 mt-0.5 shrink-0" />
          <div className="flex-1"><p className="text-sm font-medium">저장 완료</p><p className="text-xs text-muted-foreground">변경 사항이 저장되었어요.</p></div>
          <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground shrink-0"><XIcon className="size-4" /></button>
        </div>
      )}
    </div>
  )
}

function ToggleDemo() {
  const [on, setOn] = useState(false)
  const [bold, setBold] = useState(true)
  const [italic, setItalic] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => setOn(!on)} className={`w-fit flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${on ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}>
        {on ? '켜짐' : '꺼짐'}
      </button>
      <div className="flex gap-1">
        <button onClick={() => setBold(!bold)} className={`rounded-lg border px-3 py-1.5 text-sm font-bold transition-colors ${bold ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}>B</button>
        <button onClick={() => setItalic(!italic)} className={`rounded-lg border px-3 py-1.5 text-sm italic transition-colors ${italic ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}>I</button>
      </div>
    </div>
  )
}

function ToggleGroupDemo() {
  const [align, setAlign] = useState('center')
  const [view, setView] = useState('grid')
  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        {[['left', '왼쪽'], ['center', '가운데'], ['right', '오른쪽']].map(([v, l]) => (
          <button key={v} onClick={() => setAlign(v)} className={`px-3 py-1.5 text-xs border-r last:border-r-0 border-border transition-colors ${align === v ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{l}</button>
        ))}
      </div>
      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        {[['grid', '그리드'], ['list', '리스트']].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs border-r last:border-r-0 border-border transition-colors ${view === v ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{l}</button>
        ))}
      </div>
    </div>
  )
}

function TooltipDemo() {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="flex gap-3">
      {[{ id: 'like', icon: HeartIcon, label: '좋아요' }, { id: 'star', icon: StarIcon, label: '즐겨찾기' }, { id: 'msg', icon: MessageSquareIcon, label: '댓글' }].map(({ id, icon: Icon, label }) => (
        <div key={id} className="relative">
          <button onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)} className="flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors">
            <Icon className="size-4 text-muted-foreground" />
          </button>
          {hovered === id && (
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-2 py-1 text-[11px] text-background whitespace-nowrap shadow-md z-20">
              {label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function TypographyDemo() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-xl font-bold leading-tight">제목 1 (H1)</h1>
      <h2 className="text-lg font-semibold leading-tight">제목 2 (H2)</h2>
      <h3 className="text-base font-medium">제목 3 (H3)</h3>
      <p className="text-sm leading-relaxed">본문 텍스트 — 기본 단락 스타일이에요.</p>
      <p className="text-xs text-muted-foreground">설명 텍스트 — 보조 정보에 써요.</p>
      <div className="flex items-center gap-2 text-sm">
        <a href="#" className="text-primary underline underline-offset-4">링크</a>
        <span>·</span>
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">코드</code>
      </div>
    </div>
  )
}

/* ─── card list ─── */

const CARDS: { name: string; desc: string; preview: React.ReactNode }[] = [
  { name: 'Chart', desc: '데이터를 막대/선/원형 차트로 시각화해요.', preview: <ChartDemo /> },
  { name: 'Checkbox', desc: '여러 항목을 다중 선택할 때 써요.', preview: (
    <div className="flex flex-col gap-3">
      {[{ id: 'c1', l: '이메일 알림', checked: true }, { id: 'c2', l: '마케팅 수신', checked: false }, { id: 'c3', l: '이용약관 동의', checked: true }].map(({ id, l, checked }) => (
        <div key={id} className="flex items-center gap-2"><Checkbox id={id} defaultChecked={checked} /><Label htmlFor={id}>{l}</Label></div>
      ))}
    </div>
  )},
  { name: 'Collapsible', desc: '클릭하면 콘텐츠가 펼쳐지는 접힘 UI예요.', preview: <CollapsibleDemo /> },
  { name: 'Combobox', desc: '검색 가능한 드롭다운 선택 UI예요.', preview: <ComboboxDemo /> },
  { name: 'Command', desc: '키보드로 명령어를 검색·실행하는 팔레트예요.', preview: <CommandDemo /> },
  { name: 'Context Menu', desc: '우클릭 시 나타나는 컨텍스트 메뉴예요.', preview: <ContextMenuDemo /> },
  { name: 'Data Table', desc: '정렬·필터 기능이 있는 데이터 테이블이에요.', preview: <DataTableDemo /> },
  { name: 'Date Picker', desc: '캘린더에서 날짜를 선택하는 UI예요.', preview: <DatePickerDemo /> },
  { name: 'Dialog', desc: '중요한 작업을 확인하는 모달 대화상자예요.', preview: <DialogDemo /> },
  { name: 'Direction', desc: 'LTR/RTL 텍스트 방향을 제어해요.', preview: <DirectionDemo /> },
  { name: 'Drawer', desc: '화면 하단에서 올라오는 바텀 시트예요.', preview: <DrawerDemo /> },
  { name: 'Dropdown Menu', desc: '버튼 클릭 시 나타나는 메뉴 목록이에요.', preview: <DropdownMenuDemo /> },
  { name: 'Empty', desc: '콘텐츠가 없을 때 보여주는 빈 상태 UI예요.', preview: <EmptyDemo /> },
  { name: 'Field', desc: '레이블·설명·에러를 묶은 폼 필드예요.', preview: <FieldDemo /> },
  { name: 'Hover Card', desc: '마우스를 올리면 나타나는 정보 카드예요.', preview: <HoverCardDemo /> },
  { name: 'Input', desc: '텍스트를 입력받는 기본 인풋 필드예요.', preview: (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Input placeholder="이메일을 입력하세요" type="email" />
      <Input placeholder="비밀번호" type="password" />
    </div>
  )},
  { name: 'Input Group', desc: '인풋에 접두/접미 요소를 붙인 조합이에요.', preview: <InputGroupDemo /> },
  { name: 'Input OTP', desc: '6자리 인증 코드를 입력하는 UI예요.', preview: <InputOTPDemo /> },
  { name: 'Item', desc: '목록의 개별 항목 컴포넌트예요.', preview: <ItemDemo /> },
  { name: 'Kbd', desc: '키보드 단축키를 시각적으로 표시해요.', preview: <KbdDemo /> },
  { name: 'Label', desc: '폼 요소에 연결되는 레이블 텍스트예요.', preview: (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5"><Label htmlFor="l1">이름</Label><Input id="l1" placeholder="홍길동" /></div>
      <div className="flex items-center gap-2"><Checkbox id="l2" /><Label htmlFor="l2">약관에 동의합니다</Label></div>
    </div>
  )},
  { name: 'Menubar', desc: '앱 상단의 가로 메뉴 바예요.', preview: <MenubarDemo /> },
  { name: 'Native Select', desc: '브라우저 기본 드롭다운 선택 UI예요.', preview: <NativeSelectDemo /> },
  { name: 'Navigation Menu', desc: '호버 시 서브메뉴가 열리는 내비게이션이에요.', preview: <NavigationMenuDemo /> },
  { name: 'Pagination', desc: '페이지 번호를 탐색하는 UI예요.', preview: <PaginationDemo /> },
  { name: 'Popover', desc: '클릭 시 작은 오버레이 패널이 나타나요.', preview: <PopoverDemo /> },
  { name: 'Progress', desc: '작업 진행률을 막대로 시각화해요.', preview: (
    <div className="flex flex-col gap-4 w-full">
      {[{ label: '업로드 중', value: 68 }, { label: '프로필 완성도', value: 85 }, { label: '처리 완료', value: 100 }].map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground"><span>{label}</span><span>{value}%</span></div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  )},
  { name: 'Radio Group', desc: '하나만 선택하는 라디오 버튼 그룹이에요.', preview: <RadioGroupDemo /> },
  { name: 'Resizable', desc: '드래그로 크기를 조절하는 분할 패널이에요.', preview: <ResizableDemo /> },
  { name: 'Scroll Area', desc: '커스텀 스크롤바가 있는 스크롤 영역이에요.', preview: <ScrollAreaDemo /> },
  { name: 'Select', desc: '커스텀 스타일의 드롭다운 선택 UI예요.', preview: <SelectDemo /> },
  { name: 'Separator', desc: '섹션이나 요소 사이를 나누는 구분선이에요.', preview: (
    <div className="flex flex-col gap-3 w-full text-sm">
      <div>위 섹션 내용</div>
      <Separator />
      <div className="text-muted-foreground">아래 섹션 내용</div>
      <div className="flex items-center gap-3">
        <span>항목 A</span><Separator orientation="vertical" className="h-4" /><span>항목 B</span><Separator orientation="vertical" className="h-4" /><span>항목 C</span>
      </div>
    </div>
  )},
  { name: 'Sheet', desc: '화면 오른쪽에서 슬라이드 인 되는 패널이에요.', preview: <SheetDemo /> },
  { name: 'Sidebar', desc: '앱 왼쪽의 접이식 내비게이션 사이드바예요.', preview: <SidebarDemo /> },
  { name: 'Skeleton', desc: '콘텐츠 로딩 중 보여주는 플레이스홀더예요.', preview: (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
      </div>
      <Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-5/6" /><Skeleton className="h-20 w-full rounded-lg" />
    </div>
  )},
  { name: 'Slider', desc: '드래그로 값 범위를 조절하는 슬라이더예요.', preview: (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      {[{ label: '볼륨', v: [70] }, { label: '밝기', v: [40] }].map(({ label, v }) => (
        <div key={label} className="flex flex-col gap-2"><Label>{label}</Label><Slider defaultValue={v} max={100} step={1} /></div>
      ))}
    </div>
  )},
  { name: 'Sonner', desc: '액션 결과를 알려주는 토스트 알림이에요.', preview: <SonnerDemo /> },
  { name: 'Spinner', desc: '로딩 중 상태를 표시하는 회전 아이콘이에요.', preview: <SpinnerDemo /> },
  { name: 'Switch', desc: '기능을 켜고 끄는 토글 스위치예요.', preview: (
    <div className="flex flex-col gap-3">
      {[{ id: 's1', l: '다크 모드', c: true }, { id: 's2', l: '자동 저장', c: true }, { id: 's3', l: '푸시 알림', c: false }].map(({ id, l, c }) => (
        <div key={id} className="flex items-center justify-between gap-8"><Label htmlFor={id}>{l}</Label><Switch id={id} defaultChecked={c} /></div>
      ))}
    </div>
  )},
  { name: 'Table', desc: '데이터를 행과 열로 표시하는 테이블이에요.', preview: <TableDemo /> },
  { name: 'Tabs', desc: '탭으로 여러 콘텐츠 패널을 전환해요.', preview: (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="features">기능</TabsTrigger>
        <TabsTrigger value="pricing">가격</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><p className="text-sm text-muted-foreground pt-2">제품 개요 내용이 여기에 표시돼요.</p></TabsContent>
      <TabsContent value="features"><p className="text-sm text-muted-foreground pt-2">주요 기능 목록이 여기에 표시돼요.</p></TabsContent>
      <TabsContent value="pricing"><p className="text-sm text-muted-foreground pt-2">요금제 정보가 여기에 표시돼요.</p></TabsContent>
    </Tabs>
  )},
  { name: 'Textarea', desc: '여러 줄의 텍스트를 입력받는 영역이에요.', preview: (
    <div className="flex flex-col gap-1.5 w-full max-w-sm">
      <Label htmlFor="ta">프로젝트 설명</Label>
      <Textarea id="ta" placeholder="프로젝트에 대해 설명해주세요..." rows={3} />
    </div>
  )},
  { name: 'Toast', desc: '화면 모서리에 잠깐 나타나는 알림이에요.', preview: <ToastDemo /> },
  { name: 'Toggle', desc: '눌러서 on/off 상태를 바꾸는 버튼이에요.', preview: <ToggleDemo /> },
  { name: 'Toggle Group', desc: '여러 토글 버튼을 묶은 그룹이에요.', preview: <ToggleGroupDemo /> },
  { name: 'Tooltip', desc: '마우스를 올리면 설명 말풍선이 나타나요.', preview: <TooltipDemo /> },
  { name: 'Typography', desc: '제목·본문·링크·코드 등의 텍스트 스타일이에요.', preview: <TypographyDemo /> },
]

/* ─── grid ─── */

export function ShadcnComponentGrid() {
  return (
    <div className="not-prose grid grid-cols-2 gap-4 my-6">
      {CARDS.map((c) => (
        <div key={c.name} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="text-sm font-semibold text-foreground">{c.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
          </div>
          <div className="px-4 py-5 min-h-[120px] flex items-center">
            {c.preview}
          </div>
        </div>
      ))}
    </div>
  )
}
