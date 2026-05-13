'use client'

import { InfoIcon, TriangleAlertIcon, CircleCheckIcon, CircleXIcon, TerminalIcon, RocketIcon, LightbulbIcon, ShieldIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const WRAP = 'not-prose flex flex-col gap-3 rounded-xl border border-border bg-card px-6 py-5 my-4'

export function AlertBasicDemo() {
  return (
    <div className={WRAP}>
      <Alert className="bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200">
        <InfoIcon className="text-blue-500" />
        <AlertTitle>정보</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Claude Code 1.0이 출시됐어요. 새로운 멀티 에이전트 기능을 확인해 보세요.
        </AlertDescription>
      </Alert>
      <Alert className="bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200">
        <TriangleAlertIcon className="text-amber-500" />
        <AlertTitle>주의</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          이 작업은 되돌릴 수 없어요. 계속하기 전에 데이터를 백업해 주세요.
        </AlertDescription>
      </Alert>
      <Alert className="bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-200">
        <TriangleAlertIcon className="text-orange-500" />
        <AlertTitle>경고</AlertTitle>
        <AlertDescription className="text-orange-700 dark:text-orange-300">
          API 요청이 한도의 90%에 도달했어요. 플랜을 업그레이드해 주세요.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleXIcon />
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>
          요청을 처리하는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function AlertIconDemo() {
  return (
    <div className={WRAP}>
      <Alert>
        <RocketIcon />
        <AlertTitle>배포 준비 완료</AlertTitle>
        <AlertDescription>
          빌드가 성공했어요. 프로덕션 배포를 진행할 수 있어요.
        </AlertDescription>
      </Alert>
      <Alert>
        <LightbulbIcon />
        <AlertTitle>사용 팁</AlertTitle>
        <AlertDescription>
          CLAUDE.md에 자주 쓰는 명령어를 적어두면 매번 설명하지 않아도 돼요.
        </AlertDescription>
      </Alert>
      <Alert>
        <ShieldIcon />
        <AlertTitle>보안 알림</AlertTitle>
        <AlertDescription>
          90일 이상 된 API 키가 있어요. 주기적으로 교체하는 걸 권장해요.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function AlertActionDemo() {
  return (
    <div className={WRAP}>
      <Alert>
        <TerminalIcon />
        <AlertTitle>업데이트 가능</AlertTitle>
        <AlertDescription>
          Claude Code 최신 버전이 있어요. 지금 업데이트하면 새 기능을 바로 쓸 수 있어요.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">업데이트</Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>세션 만료 예정</AlertTitle>
        <AlertDescription>
          5분 후 자동 로그아웃돼요. 작업 내용을 저장해 주세요.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">연장하기</Button>
        </AlertAction>
      </Alert>
    </div>
  )
}
