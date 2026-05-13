'use client'

import { MoreHorizontalIcon, TrendingUpIcon, UsersIcon, ZapIcon, CheckCircle2Icon, CreditCardIcon, LayoutDashboardIcon, ListIcon, SparklesIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const WRAP = 'not-prose flex flex-col gap-4 rounded-xl border border-border bg-muted/30 px-6 py-5 my-4'

export function CardWhenDemo() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 my-4">
      {/* 설정·폼 */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <CreditCardIcon className="size-3.5" /> 설정·폼 영역
        </p>
        <Card size="sm">
          <CardHeader>
            <CardTitle>결제 정보</CardTitle>
            <CardDescription>카드 번호를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground bg-muted rounded px-3 py-2">**** **** **** 4242</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">저장</Button>
            <Button size="sm" variant="outline">취소</Button>
          </CardFooter>
        </Card>
      </div>

      {/* 데이터 요약 */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <LayoutDashboardIcon className="size-3.5" /> 데이터 요약
        </p>
        <Card size="sm">
          <CardHeader>
            <CardDescription>이번 달 요청</CardDescription>
            <CardAction><ZapIcon className="size-4 text-muted-foreground" /></CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3,291</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">+14% 지난달 대비</p>
          </CardContent>
        </Card>
      </div>

      {/* 콘텐츠 목록 */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <ListIcon className="size-3.5" /> 콘텐츠 목록
        </p>
        <Card size="sm">
          <CardHeader>
            <CardTitle>팀 멤버</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {[{ name: '김지수', role: '디자이너' }, { name: '이민준', role: '프론트엔드' }].map(({ name, role }) => (
                <li key={name} className="flex items-center justify-between text-xs">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">{role}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 상품·서비스 소개 */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <SparklesIcon className="size-3.5" /> 상품·서비스 소개
        </p>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Pro 플랜</CardTitle>
            <CardDescription>팀을 위한 모든 기능을 포함해요.</CardDescription>
            <CardAction><Badge>추천</Badge></CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">₩29,000 <span className="text-xs font-normal text-muted-foreground">/ 월</span></p>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">시작하기</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export function CardBasicDemo() {
  return (
    <div className={WRAP}>
      <Card>
        <CardHeader>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription>이메일과 푸시 알림 수신 여부를 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-green-500" /> 새 댓글 알림</li>
            <li className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-green-500" /> 멘션 알림</li>
            <li className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-muted-foreground/40" /> 마케팅 이메일</li>
          </ul>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">저장</Button>
          <Button size="sm" variant="outline">취소</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const MEMBERS = [
  { name: '김지수', role: '디자이너', active: true },
  { name: '이민준', role: '프론트엔드', active: true },
  { name: '박서연', role: '백엔드', active: false },
]

export function CardActionDemo() {
  return (
    <div className={WRAP}>
      <Card>
        <CardHeader>
          <CardTitle>팀 멤버</CardTitle>
          <CardDescription>현재 프로젝트에 참여 중인 멤버예요.</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {MEMBERS.map(({ name, role, active }) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
                <Badge variant={active ? 'default' : 'secondary'}>
                  {active ? '활성' : '비활성'}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

const STATS = [
  { label: '총 사용자', value: '12,480', delta: '+8.2%', icon: UsersIcon },
  { label: '이번 달 요청', value: '3,291', delta: '+14%', icon: ZapIcon },
  { label: '응답 성공률', value: '99.4%', delta: '+0.3%', icon: TrendingUpIcon },
]

export function CardUsageDemo() {
  return (
    <div className={`${WRAP} flex-row flex-wrap`}>
      {STATS.map(({ label, value, delta, icon: Icon }) => (
        <Card key={label} className="flex-1 min-w-[160px]">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardAction>
              <Icon className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">{delta} 지난달 대비</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
