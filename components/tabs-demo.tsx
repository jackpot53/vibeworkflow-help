'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BellIcon, KeyRoundIcon, LayoutDashboardIcon, ListIcon, UserIcon } from 'lucide-react'

const WRAP = 'not-prose flex flex-col gap-4 rounded-xl border border-border bg-muted/30 px-6 py-5 my-4'


export function TabsBasicDemo() {
  return (
    <div className={WRAP}>
      <Tabs defaultValue="overview">
        <div className="flex justify-center">
          <TabsList className="rounded-full">
            <TabsTrigger value="overview" className="rounded-full">개요</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-full">활동</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full">설정</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 개요</CardTitle>
              <CardDescription>현재 진행 중인 프로젝트의 요약이에요.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>마감일</span><span className="font-medium text-foreground">2026-06-30</span></li>
                <li className="flex justify-between"><span>팀 규모</span><span className="font-medium text-foreground">5명</span></li>
                <li className="flex justify-between"><span>진행률</span><span className="font-medium text-foreground">72%</span></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>지난 7일간의 작업 내역이에요.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  { user: '김지수', action: 'UI 디자인 완료', time: '2시간 전' },
                  { user: '이민준', action: 'API 연동 PR 생성', time: '5시간 전' },
                  { user: '박서연', action: '데이터베이스 마이그레이션', time: '1일 전' },
                ].map(({ user, action, time }) => (
                  <li key={user} className="flex items-center justify-between">
                    <span><span className="font-medium">{user}</span> — {action}</span>
                    <span className="text-xs text-muted-foreground">{time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 설정</CardTitle>
              <CardDescription>프로젝트 이름과 공개 여부를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span>프로젝트 이름</span>
                <span className="font-medium">vibeworkflow-help</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>공개 여부</span>
                <Badge variant="secondary">비공개</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm">저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function TabsSettingsDemo() {
  return (
    <div className={WRAP}>
      <Tabs defaultValue="account">
        <div className="flex justify-center">
          <TabsList className="rounded-full">
            <TabsTrigger value="account" className="rounded-full gap-1.5">
              <UserIcon className="size-3.5" />계정
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-full gap-1.5">
              <BellIcon className="size-3.5" />알림
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-full gap-1.5">
              <KeyRoundIcon className="size-3.5" />보안
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account" className="mt-4 flex flex-col gap-3">
          {[
            { label: '이름', value: '김지수' },
            { label: '이메일', value: 'jisu@example.com' },
            { label: '역할', value: '관리자' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="notifications" className="mt-4 flex flex-col gap-3">
          {[
            { label: '새 댓글', enabled: true },
            { label: '멘션 알림', enabled: true },
            { label: '마케팅 이메일', enabled: false },
          ].map(({ label, enabled }) => (
            <div key={label} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
              <span>{label}</span>
              <Badge variant={enabled ? 'default' : 'secondary'}>{enabled ? '켜짐' : '꺼짐'}</Badge>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="security" className="mt-4 flex flex-col gap-3">
          {[
            { label: '비밀번호 변경', action: '변경' },
            { label: '2단계 인증', action: '설정' },
            { label: '활성 세션', action: '관리' },
          ].map(({ label, action }) => (
            <div key={label} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
              <span>{label}</span>
              <Button size="sm" variant="outline">{action}</Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function TabsDashboardDemo() {
  return (
    <div className={WRAP}>
      <Tabs defaultValue="stats">
        <div className="flex justify-center">
          <TabsList className="rounded-full">
            <TabsTrigger value="stats" className="rounded-full gap-1.5">
              <LayoutDashboardIcon className="size-3.5" />통계
            </TabsTrigger>
            <TabsTrigger value="list" className="rounded-full gap-1.5">
              <ListIcon className="size-3.5" />목록
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '총 요청', value: '3,291', delta: '+14%' },
              { label: '성공률', value: '99.4%', delta: '+0.3%' },
              { label: '평균 응답', value: '1.2s', delta: '-0.4s' },
            ].map(({ label, value, delta }) => (
              <Card key={label}>
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">{label}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xl font-semibold">{value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{delta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <ul className="flex flex-col divide-y">
                {[
                  { name: '사용자 인증 API', count: 1204, status: '정상' },
                  { name: '데이터 조회 API', count: 987, status: '정상' },
                  { name: '파일 업로드 API', count: 342, status: '점검 중' },
                  { name: '알림 API', count: 758, status: '정상' },
                ].map(({ name, count, status }) => (
                  <li key={name} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{count.toLocaleString()}건</span>
                      <Badge variant={status === '정상' ? 'default' : 'secondary'}>{status}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
