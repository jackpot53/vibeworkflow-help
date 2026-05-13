'use client'

import { CircleCheckIcon, CircleXIcon, ClockIcon, SparklesIcon, FlameIcon, ZapIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const WRAP = 'not-prose flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-6 py-5 my-4'

const VARIANTS = [
  { variant: 'default', label: 'default', desc: '주요 상태, 강조' },
  { variant: 'secondary', label: 'secondary', desc: '보조 정보, 중립적 상태' },
  { variant: 'destructive', label: 'destructive', desc: '오류, 삭제, 위험' },
  { variant: 'outline', label: 'outline', desc: '카테고리, 태그' },
  { variant: 'ghost', label: 'ghost', desc: '비강조, 호버 시 배경' },
] as const

export function BadgeVariantTableDemo() {
  return (
    <div className="not-prose rounded-xl border border-border bg-card my-4 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">미리보기</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">variant</th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">주요 용도</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map(({ variant, label, desc }) => (
            <tr key={variant} className="border-b border-border last:border-0">
              <td className="px-4 py-3">
                <Badge variant={variant}>{label}</Badge>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{label}</td>
              <td className="px-4 py-3 text-muted-foreground">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BadgeVariantsDemo() {
  return (
    <div className={WRAP}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

const FEATURES = [
  { label: '멀티 에이전트', tag: 'NEW', variant: 'default' as const },
  { label: '웹 검색', tag: 'BETA', variant: 'secondary' as const },
  { label: '파일 업로드', tag: 'HOT', variant: 'outline' as const },
  { label: 'v1 API', tag: 'DEPRECATED', variant: 'destructive' as const },
]

export function BadgeStatusDemo() {
  return (
    <div className="not-prose flex flex-col gap-2 rounded-xl border border-border bg-card px-6 py-5 my-4">
      {FEATURES.map(({ label, tag, variant }) => (
        <div key={label} className="flex items-center justify-between py-1 border-b border-border last:border-0">
          <span className="text-sm">{label}</span>
          <Badge variant={variant}>{tag}</Badge>
        </div>
      ))}
    </div>
  )
}

const STATUSES = [
  { icon: CircleCheckIcon, label: '배포 완료', variant: 'outline' as const, color: 'text-green-500' },
  { icon: ClockIcon, label: '배포 중', variant: 'secondary' as const, color: 'text-amber-500' },
  { icon: CircleXIcon, label: '배포 실패', variant: 'destructive' as const, color: '' },
  { icon: SparklesIcon, label: '신규', variant: 'default' as const, color: '' },
  { icon: FlameIcon, label: '인기', variant: 'outline' as const, color: 'text-orange-500' },
  { icon: ZapIcon, label: '빠른', variant: 'secondary' as const, color: '' },
]

export function BadgeWithIconDemo() {
  return (
    <div className={WRAP}>
      {STATUSES.map(({ icon: Icon, label, variant, color }) => (
        <Badge key={label} variant={variant}>
          <Icon className={color || undefined} />
          {label}
        </Badge>
      ))}
    </div>
  )
}
