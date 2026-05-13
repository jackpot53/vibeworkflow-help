'use client'

import { ShieldIcon, CreditCardIcon, RefreshCwIcon, HeadphonesIcon } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const WRAP = 'not-prose rounded-xl border border-border bg-card px-6 py-5 my-4'

export function AccordionBasicDemo() {
  return (
    <div className={WRAP}>
      <Accordion defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Claude Code란 무엇인가요?</AccordionTrigger>
          <AccordionContent>
            Claude Code는 Anthropic이 만든 AI 코딩 어시스턴트예요. 터미널에서 직접 대화하며
            코드 작성, 리팩터링, 디버깅을 함께할 수 있어요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>CLAUDE.md는 어디에 만드나요?</AccordionTrigger>
          <AccordionContent>
            프로젝트 루트 디렉터리에 만들면 돼요. Claude Code가 시작할 때 자동으로 읽어요.
            하위 폴더에 두면 해당 폴더 작업 시에만 로드돼요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>여러 파일을 한 번에 수정할 수 있나요?</AccordionTrigger>
          <AccordionContent>
            네, 가능해요. Claude Code는 여러 파일을 동시에 읽고 수정할 수 있어요.
            한 번의 요청으로 관련된 파일들을 함께 수정해줘요.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export function AccordionMultipleDemo() {
  return (
    <div className={WRAP}>
      <Accordion multiple defaultValue={['item-1', 'item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>반응형 디자인이란?</AccordionTrigger>
          <AccordionContent>
            화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인 방식이에요.
            모바일·태블릿·데스크탑에서 모두 자연스럽게 보여요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>컴포넌트 기반 개발이란?</AccordionTrigger>
          <AccordionContent>
            UI를 재사용 가능한 작은 부품(컴포넌트)으로 쪼개서 만드는 방식이에요.
            버튼, 카드, 모달 등을 각각 독립적으로 관리할 수 있어요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>상태 관리란?</AccordionTrigger>
          <AccordionContent>
            앱에서 변하는 데이터(로그인 여부, 장바구니 등)를 관리하는 방법이에요.
            여러 컴포넌트가 같은 데이터를 공유할 때 필요해요.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const FAQ = [
  {
    icon: CreditCardIcon,
    q: '요금제는 어떻게 되나요?',
    a: 'Free, Pro, Team 세 가지 요금제가 있어요. Pro는 월 $20로 Claude Code를 포함한 고급 기능을 이용할 수 있어요. 사용량에 따라 추가 요금이 발생할 수 있어요.',
  },
  {
    icon: ShieldIcon,
    q: '내 코드가 학습 데이터로 사용되나요?',
    a: '기본적으로 사용자 코드는 모델 학습에 사용되지 않아요. API를 통한 상업적 사용은 데이터 정책에 따라 처리돼요. 자세한 내용은 Anthropic 개인정보 처리방침을 참고하세요.',
  },
  {
    icon: RefreshCwIcon,
    q: '컨텍스트 창이 꽉 차면 어떻게 되나요?',
    a: '대화가 길어지면 Claude Code가 자동으로 이전 내용을 요약해 컨텍스트를 정리해요. /clear 명령으로 수동으로 초기화할 수도 있어요.',
  },
  {
    icon: HeadphonesIcon,
    q: '문제가 생기면 어디에 문의하나요?',
    a: 'GitHub Issues 또는 Anthropic 공식 Discord에서 도움을 받을 수 있어요. 버그 리포트는 claude-code 리포지터리에 남겨주세요.',
  },
]

export function AccordionFaqDemo() {
  return (
    <div className={WRAP}>
      <p className="text-sm font-semibold mb-4">자주 묻는 질문</p>
      <Accordion>
        {FAQ.map(({ icon: Icon, q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>
              <span className="flex items-center gap-2.5">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                {q}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <span className="text-muted-foreground leading-relaxed">{a}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
