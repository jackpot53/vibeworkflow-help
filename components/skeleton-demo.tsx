'use client'

import { Skeleton } from '@/components/ui/skeleton'

const WRAP = 'not-prose flex flex-col gap-4 rounded-xl border border-border bg-card px-6 py-5 my-4'

// ─── 기본 스켈레톤 ──────────────────────────────────────────────────────────

export function SkeletonBasicDemo() {
  return (
    <div className={WRAP}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  )
}

// ─── 카드 로딩 ──────────────────────────────────────────────────────────────

export function SkeletonCardDemo() {
  return (
    <div className={`${WRAP} flex-row flex-wrap gap-4`}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 flex-1 min-w-[180px]">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-7 rounded-full shrink-0" />
            <Skeleton className="h-3.5 w-24" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-8 w-full rounded-md mt-1" />
        </div>
      ))}
    </div>
  )
}

// ─── 피드 로딩 ──────────────────────────────────────────────────────────────

export function SkeletonFeedDemo() {
  return (
    <div className={WRAP}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
          <Skeleton className="size-9 rounded-full shrink-0 mt-0.5" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      ))}
    </div>
  )
}
