'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircleIcon, InfoIcon } from 'lucide-react'

const CARDS: { name: string; desc: string; preview: React.ReactNode }[] = [
  {
    name: 'Button',
    desc: '클릭 가능한 기본 액션 버튼. variant로 스타일을 바꿀 수 있어요.',
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button>기본</Button>
        <Button variant="outline">외곽선</Button>
        <Button variant="secondary">보조</Button>
        <Button variant="ghost">고스트</Button>
        <Button variant="destructive">삭제</Button>
      </div>
    ),
  },
  {
    name: 'Badge',
    desc: '상태, 태그, 숫자를 표시하는 작은 라벨이에요.',
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>기본</Badge>
        <Badge variant="secondary">보조</Badge>
        <Badge variant="outline">외곽선</Badge>
        <Badge variant="destructive">오류</Badge>
      </div>
    ),
  },
  {
    name: 'Card',
    desc: '정보를 묶어 보여주는 컨테이너예요. Header, Content, Footer로 구성돼요.',
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
          <CardDescription>카드 설명을 여기에 써요.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">본문 내용이 들어가는 영역이에요.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">확인</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: 'Alert',
    desc: '사용자에게 중요한 메시지를 강조해 보여줘요.',
    preview: (
      <div className="flex flex-col gap-3 w-full">
        <Alert>
          <InfoIcon />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>변경 사항은 즉시 저장됩니다.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>요청을 처리하지 못했습니다.</AlertDescription>
        </Alert>
      </div>
    ),
  },
  {
    name: 'Input',
    desc: '텍스트를 입력받는 기본 인풋 필드예요.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email-demo">이메일</Label>
          <Input id="email-demo" type="email" placeholder="example@email.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pw-demo">비밀번호</Label>
          <Input id="pw-demo" type="password" placeholder="••••••••" />
        </div>
      </div>
    ),
  },
  {
    name: 'Textarea',
    desc: '여러 줄의 텍스트를 입력받는 영역이에요.',
    preview: (
      <div className="flex flex-col gap-1.5 w-full max-w-sm">
        <Label htmlFor="desc-demo">프로젝트 설명</Label>
        <Textarea id="desc-demo" placeholder="프로젝트에 대해 설명해주세요..." rows={3} />
      </div>
    ),
  },
  {
    name: 'Checkbox',
    desc: '여러 항목을 다중 선택할 때 써요.',
    preview: (
      <div className="flex flex-col gap-3">
        {[
          { id: 'noti', label: '이메일 알림 받기', defaultChecked: true },
          { id: 'mkt', label: '마케팅 정보 수신', defaultChecked: false },
          { id: 'terms', label: '이용약관 동의 (필수)', defaultChecked: true },
        ].map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox id={item.id} defaultChecked={item.defaultChecked} />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Switch',
    desc: '기능을 켜고 끄는 토글 스위치예요.',
    preview: (
      <div className="flex flex-col gap-3">
        {[
          { id: 'sw1', label: '다크 모드', defaultChecked: true },
          { id: 'sw2', label: '자동 저장', defaultChecked: true },
          { id: 'sw3', label: '푸시 알림', defaultChecked: false },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-8">
            <Label htmlFor={item.id}>{item.label}</Label>
            <Switch id={item.id} defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Progress',
    desc: '작업 진행률을 막대로 시각화해요.',
    preview: (
      <div className="flex flex-col gap-4 w-full">
        {[
          { label: '업로드 중', value: 68 },
          { label: '프로필 완성도', value: 85 },
          { label: '처리 완료', value: 100 },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <Progress value={item.value} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Slider',
    desc: '드래그로 값 범위를 조절하는 슬라이더예요.',
    preview: (
      <div className="flex flex-col gap-5 w-full max-w-sm">
        {[
          { label: '볼륨', defaultValue: [70] },
          { label: '밝기', defaultValue: [40] },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <Label>{item.label}</Label>
            <Slider defaultValue={item.defaultValue} max={100} step={1} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Tabs',
    desc: '탭으로 여러 콘텐츠 패널을 전환하는 UI예요.',
    preview: (
      <Tabs defaultValue="overview" className="w-full max-w-sm">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="features">기능</TabsTrigger>
          <TabsTrigger value="pricing">가격</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-sm text-muted-foreground pt-2">제품 개요 내용이 여기에 표시돼요.</p>
        </TabsContent>
        <TabsContent value="features">
          <p className="text-sm text-muted-foreground pt-2">주요 기능 목록이 여기에 표시돼요.</p>
        </TabsContent>
        <TabsContent value="pricing">
          <p className="text-sm text-muted-foreground pt-2">요금제 정보가 여기에 표시돼요.</p>
        </TabsContent>
      </Tabs>
    ),
  },
  {
    name: 'Accordion',
    desc: '클릭하면 펼쳐지는 접힌 콘텐츠 목록이에요.',
    preview: (
      <Accordion className="w-full max-w-sm">
        {[
          { value: 'q1', trigger: '무료로 사용할 수 있나요?', content: '네, 기본 플랜은 무료로 이용하실 수 있어요.' },
          { value: 'q2', trigger: '환불 정책은 어떻게 되나요?', content: '결제 후 14일 이내에 전액 환불이 가능해요.' },
          { value: 'q3', trigger: '팀으로 사용할 수 있나요?', content: '프로 플랜 이상에서 팀 기능을 지원해요.' },
        ].map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
  },
  {
    name: 'Skeleton',
    desc: '콘텐츠 로딩 중에 보여주는 플레이스홀더예요.',
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    ),
  },
  {
    name: 'Separator',
    desc: '섹션이나 요소 사이를 나누는 구분선이에요.',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-sm text-sm">
        <div>위 섹션 내용</div>
        <Separator />
        <div className="text-muted-foreground">아래 섹션 내용</div>
        <div className="flex items-center gap-3">
          <span>항목 A</span>
          <Separator orientation="vertical" className="h-4" />
          <span>항목 B</span>
          <Separator orientation="vertical" className="h-4" />
          <span>항목 C</span>
        </div>
      </div>
    ),
  },
]

export function ShadcnComponentGrid() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="not-prose flex flex-col gap-4 my-5">
      {CARDS.map((c) => (
        <div
          key={c.name}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-semibold text-foreground">{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.desc}</span>
          </div>
          {/* Preview */}
          <div className="px-5 py-5">
            {c.preview}
          </div>
        </div>
      ))}
    </div>
  )
}
