# Vibeworkflow Help — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 15 + Nextra + Tailwind CSS + shadcn/ui로 비개발자를 위한 Claude Code 한국어 도움말 사이트 8페이지 MVP 구축

**Architecture:** Nextra docs theme이 사이드바/검색/TOC/다크모드를 처리. Next.js의 pages/ 디렉토리에 MDX 파일로 콘텐츠 관리 (Nextra 표준 방식). Tailwind + shadcn/ui로 커스텀 컴포넌트(Callout, CommandCard, Screenshot, StepBadge)를 구축해 MDX 안에서 사용.

**Tech Stack:** Next.js 15, Nextra 2 (docs theme), Tailwind CSS, shadcn/ui, TypeScript, MDX

---

## 파일 구조 맵

```
vibeworkflow-help/
├── pages/                          # Nextra 콘텐츠 (MDX 문서)
│   ├── _app.tsx                    # Nextra theme 적용
│   ├── _meta.json                  # 최상위 사이드바 구성
│   ├── index.mdx                   # 홈페이지
│   ├── getting-started/
│   │   ├── _meta.json
│   │   ├── what-is-claude-code.mdx
│   │   ├── installation.mdx
│   │   └── first-conversation.mdx
│   ├── guides/
│   │   ├── _meta.json
│   │   ├── basic-usage.mdx
│   │   ├── writing-prompts.mdx
│   │   └── handling-errors.mdx
│   ├── reference/
│   │   ├── _meta.json
│   │   └── slash-commands.mdx
│   └── faq.mdx
├── components/
│   ├── ui/                         # shadcn/ui 자동 생성
│   ├── callout.tsx                 # 팁/주의사항 (shadcn Alert 기반)
│   ├── command-card.tsx            # 명령어 카드 (shadcn Card 기반)
│   ├── screenshot.tsx              # 스크린샷 래퍼
│   └── step-badge.tsx              # 단계 번호 뱃지
├── styles/
│   └── globals.css                 # Tailwind 지시어 + shadcn 변수
├── public/
│   └── screenshots/                # 스크린샷 이미지 (placeholder)
├── lib/
│   └── utils.ts                    # shadcn cn() 유틸
├── next.config.mjs                 # Nextra 플러그인 설정
├── theme.config.tsx                # Nextra docs 테마 설정
├── tailwind.config.ts              # Tailwind 설정
└── tsconfig.json
```

---

### Task 1: 프로젝트 초기화

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: 기존 디렉토리에서 Next.js 프로젝트 초기화**

```bash
cd /Users/amiz/dev/vibeworkflow-help
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

기존 `README.md` 덮어쓸지 묻는 경우 **No** 선택.

- [ ] **Step 2: 개발 서버 기동 확인**

```bash
npm run dev
```

Expected: `http://localhost:3000` 에서 Next.js 기본 페이지 확인. `Ctrl+C`로 종료.

- [ ] **Step 3: 커밋**

```bash
git init
git add package.json package-lock.json next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs app/ public/ .eslintrc.json .gitignore
git commit -m "chore: initialize Next.js 15 project"
```

---

### Task 2: Nextra 설치 및 설정

**Files:**
- Create: `next.config.mjs` (next.config.ts 대체)
- Create: `theme.config.tsx`
- Create: `pages/_app.tsx`
- Create: `pages/_meta.json`

- [ ] **Step 1: Nextra 패키지 설치**

```bash
npm install nextra nextra-theme-docs
```

- [ ] **Step 2: next.config.ts 삭제 후 next.config.mjs 생성**

```bash
rm next.config.ts
```

`next.config.mjs` 생성:

```js
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
})

export default withNextra({})
```

- [ ] **Step 3: theme.config.tsx 생성**

```tsx
import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>🤖 바이브코딩 도움말</span>,
  footer: {
    text: '비개발자를 위한 Claude Code 도움말 © 2026',
  },
  editLink: { component: null },
  feedback: { content: null },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    title: '이 페이지',
  },
  search: {
    placeholder: '검색...',
  },
}

export default config
```

- [ ] **Step 4: pages/_app.tsx 생성 (Nextra theme 적용)**

```tsx
import type { AppProps } from 'next/app'
import { type ReactElement } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}
```

- [ ] **Step 5: pages/_meta.json 생성 (최상위 사이드바)**

```json
{
  "index": "홈",
  "getting-started": "시작하기",
  "guides": "가이드",
  "reference": "레퍼런스",
  "faq": "자주 묻는 질문"
}
```

- [ ] **Step 6: app/ 디렉토리 삭제 (Nextra는 pages/ 사용)**

```bash
rm -rf app/
```

- [ ] **Step 7: styles/globals.css 생성**

```bash
mkdir -p styles
```

`styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: 빌드 확인**

```bash
npm run build
```

Expected: 빌드 오류 없음 (경고는 무시 가능).

- [ ] **Step 9: 커밋**

```bash
git add next.config.mjs theme.config.tsx pages/ styles/
git rm --cached next.config.ts 2>/dev/null || true
git commit -m "chore: install and configure Nextra docs theme"
```

---

### Task 3: Tailwind + shadcn/ui 설정

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`
- Create: `lib/utils.ts`
- Create: `components/ui/alert.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/separator.tsx`

- [ ] **Step 1: tailwind.config.ts 수정 (pages/ 포함)**

`tailwind.config.ts` 전체 내용:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './theme.config.tsx',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: shadcn/ui 초기화**

```bash
npx shadcn@latest init -d
```

프롬프트가 뜨면:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

- [ ] **Step 3: 필요한 컴포넌트 설치**

```bash
npx shadcn@latest add alert badge button card separator
```

- [ ] **Step 4: styles/globals.css 확인**

shadcn init이 globals.css를 업데이트함. `@tailwind` 지시어가 있는지 확인:

```bash
head -5 styles/globals.css
```

Expected: `@tailwind base;` 등이 포함되어 있음.

- [ ] **Step 5: 빌드 확인**

```bash
npm run build
```

Expected: 오류 없음.

- [ ] **Step 6: 커밋**

```bash
git add components/ui/ lib/ styles/globals.css tailwind.config.ts components.json
git commit -m "chore: install shadcn/ui (alert, badge, button, card, separator)"
```

---

### Task 4: 커스텀 MDX 컴포넌트 생성

**Files:**
- Create: `components/callout.tsx`
- Create: `components/command-card.tsx`
- Create: `components/screenshot.tsx`
- Create: `components/step-badge.tsx`

- [ ] **Step 1: Callout 컴포넌트 생성**

`components/callout.tsx`:

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'warning' | 'info'

const variants: Record<CalloutType, { title: string; className: string }> = {
  tip: {
    title: '💡 팁',
    className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
  },
  warning: {
    title: '⚠️ 주의',
    className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
  },
  info: {
    title: 'ℹ️ 참고',
    className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
  },
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType
  children: React.ReactNode
}) {
  const { title, className } = variants[type]
  return (
    <Alert className={cn('my-4', className)}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-1 text-sm">{children}</AlertDescription>
    </Alert>
  )
}
```

- [ ] **Step 2: CommandCard 컴포넌트 생성**

`components/command-card.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CommandCard({
  command,
  description,
  example,
}: {
  command: string
  description: string
  example?: string
}) {
  return (
    <Card className="my-3">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Badge variant="secondary" className="font-mono text-sm px-2 py-0.5">
            {command}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-sm text-muted-foreground">
        <p>{description}</p>
        {example && (
          <p className="mt-2 font-mono text-xs bg-muted px-3 py-1.5 rounded">
            예시: {example}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Screenshot 컴포넌트 생성**

`components/screenshot.tsx`:

```tsx
import Image from 'next/image'

export function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-6">
      <div className="rounded-lg border overflow-hidden shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
```

- [ ] **Step 4: StepBadge 컴포넌트 생성**

`components/step-badge.tsx`:

```tsx
import { Badge } from '@/components/ui/badge'

export function StepBadge({ step }: { step: number }) {
  return (
    <Badge className="mr-2 rounded-full w-7 h-7 p-0 inline-flex items-center justify-center text-xs font-bold">
      {step}
    </Badge>
  )
}
```

- [ ] **Step 5: TypeScript 오류 없음 확인**

```bash
npx tsc --noEmit
```

Expected: 오류 없음.

- [ ] **Step 6: 커밋**

```bash
git add components/callout.tsx components/command-card.tsx components/screenshot.tsx components/step-badge.tsx
git commit -m "feat: add custom MDX components (Callout, CommandCard, Screenshot, StepBadge)"
```

---

### Task 5: MDX 컴포넌트 전역 등록 + 콘텐츠 구조 설정

**Files:**
- Modify: `pages/_app.tsx`
- Create: `pages/getting-started/_meta.json`
- Create: `pages/guides/_meta.json`
- Create: `pages/reference/_meta.json`

- [ ] **Step 1: _app.tsx에 MDX 컴포넌트 주입**

Nextra는 `MDXProvider`를 통해 커스텀 컴포넌트를 전역으로 등록할 수 있음. `pages/_app.tsx` 수정:

```tsx
import type { AppProps } from 'next/app'
import { type ReactElement } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Callout } from '@/components/callout'
import { CommandCard } from '@/components/command-card'
import { Screenshot } from '@/components/screenshot'
import { StepBadge } from '@/components/step-badge'
import '../styles/globals.css'

const components = {
  Callout,
  CommandCard,
  Screenshot,
  StepBadge,
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
```

- [ ] **Step 2: @mdx-js/react 설치**

```bash
npm install @mdx-js/react
```

- [ ] **Step 3: getting-started/_meta.json 생성**

```bash
mkdir -p pages/getting-started
```

`pages/getting-started/_meta.json`:

```json
{
  "what-is-claude-code": "Claude Code란?",
  "installation": "설치하기",
  "first-conversation": "첫 번째 대화"
}
```

- [ ] **Step 4: guides/_meta.json 생성**

```bash
mkdir -p pages/guides
```

`pages/guides/_meta.json`:

```json
{
  "basic-usage": "기본 사용법",
  "writing-prompts": "좋은 프롬프트 쓰는 법",
  "handling-errors": "오류 대처법"
}
```

- [ ] **Step 5: reference/_meta.json 생성**

```bash
mkdir -p pages/reference
```

`pages/reference/_meta.json`:

```json
{
  "slash-commands": "슬래시 명령어"
}
```

- [ ] **Step 6: 빌드 확인**

```bash
npm run build
```

Expected: 오류 없음.

- [ ] **Step 7: 커밋**

```bash
git add pages/_app.tsx pages/getting-started/_meta.json pages/guides/_meta.json pages/reference/_meta.json
git commit -m "feat: register MDX components globally and set up content structure"
```

---

### Task 6: 홈페이지 작성

**Files:**
- Create: `pages/index.mdx`

- [ ] **Step 1: pages/index.mdx 생성**

```mdx
---
title: 바이브코딩 도움말
description: 코드를 몰라도 괜찮아요. Claude Code로 나만의 서비스를 만들어보세요.
---

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

# 바이브코딩 도움말

**코드를 전혀 몰라도 괜찮습니다.** 이 문서는 Claude Code를 처음 사용하는 분들을 위한 안내서예요.

<div className="mt-6 mb-10">
  <Link href="/getting-started/what-is-claude-code">
    <Button size="lg">시작하기 →</Button>
  </Link>
</div>

## 이 문서는 누구를 위한 건가요?

개발 경험이 없는 분들을 위해 만들었어요. 기획자, 디자이너, 창업자, 혹은 그냥 뭔가를 만들고 싶은 누구든 환영합니다. 전문 용어는 최대한 피하고, 꼭 필요한 경우에는 쉽게 풀어서 설명합니다.

---

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  <Card>
    <CardHeader>
      <CardTitle className="text-base">🚀 시작하기</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      Claude Code가 무엇인지, 어떻게 설치하는지, 처음 대화를 어떻게 시작하는지 알아봐요.
      <div className="mt-3">
        <Link href="/getting-started/what-is-claude-code" className="text-primary underline text-sm">
          Claude Code란? →
        </Link>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle className="text-base">📋 슬래시 명령어</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      자주 쓰는 명령어를 한눈에 볼 수 있는 빠른 참고 카드입니다.
      <div className="mt-3">
        <Link href="/reference/slash-commands" className="text-primary underline text-sm">
          명령어 보기 →
        </Link>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle className="text-base">❓ 자주 묻는 질문</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      처음 사용할 때 막히는 지점들을 모아놨어요.
      <div className="mt-3">
        <Link href="/faq" className="text-primary underline text-sm">
          FAQ 보기 →
        </Link>
      </div>
    </CardContent>
  </Card>
</div>
```

- [ ] **Step 2: 개발 서버에서 홈페이지 확인**

```bash
npm run dev
```

`http://localhost:3000` 에서 홈페이지 확인. 카드 3개, CTA 버튼이 보여야 함. `Ctrl+C`로 종료.

- [ ] **Step 3: 커밋**

```bash
git add pages/index.mdx
git commit -m "feat: add home page with hero, CTA button, and quick link cards"
```

---

### Task 7: 시작하기 페이지 3개 작성

**Files:**
- Create: `pages/getting-started/what-is-claude-code.mdx`
- Create: `pages/getting-started/installation.mdx`
- Create: `pages/getting-started/first-conversation.mdx`

- [ ] **Step 1: what-is-claude-code.mdx 작성**

`pages/getting-started/what-is-claude-code.mdx`:

```mdx
---
title: Claude Code란?
description: 바이브코딩과 Claude Code가 무엇인지 쉽게 알아봅니다.
---

# Claude Code란?

## 바이브코딩이 뭔가요?

바이브코딩(Vibe Coding)은 코드를 직접 작성하는 대신, **AI에게 말로 설명해서 원하는 것을 만들어내는 방식**이에요.

예를 들어 이렇게 요청할 수 있어요:

> "간단한 할 일 목록 앱을 만들어줘. 항목을 추가하고 완료 표시도 할 수 있어야 해."

그러면 AI가 필요한 코드를 직접 작성해줍니다.

<Callout type="tip">
  코드를 몰라도 괜찮아요! 무엇을 만들고 싶은지 말로 설명할 수 있으면 충분합니다.
</Callout>

## Claude Code는 무엇인가요?

Claude Code는 Anthropic이 만든 AI 코딩 도구예요. 터미널 (명령어를 입력하는 검은 창)에서 실행하며, 대화하듯 요청하면 코드 작성, 파일 수정, 오류 수정까지 도와줍니다.

### 무엇을 할 수 있나요?

- 새 기능 추가 요청
- 오류 수정 요청
- 기존 코드 설명 요청
- 파일 생성 및 수정

## 일반 ChatGPT와 뭐가 다른가요?

| | ChatGPT | Claude Code |
|---|---|---|
| 코드 직접 수정 | ❌ (복사해서 붙여넣기) | ✅ 자동으로 파일 수정 |
| 프로젝트 파일 읽기 | ❌ | ✅ |
| 명령어 실행 | ❌ | ✅ |

Claude Code는 실제로 여러분의 컴퓨터 파일을 직접 수정할 수 있어요.

<Callout type="warning">
  Claude Code는 파일을 직접 수정하기 때문에, 중요한 작업 전에는 항상 백업을 해두는 것이 좋아요.
</Callout>
```

- [ ] **Step 2: installation.mdx 작성**

`pages/getting-started/installation.mdx`:

```mdx
---
title: 설치하기
description: Claude Code를 컴퓨터에 설치하는 방법을 단계별로 안내합니다.
---

# 설치하기

Claude Code를 사용하려면 두 가지를 설치해야 해요: **Node.js**와 **Claude Code** 자체입니다.

<Callout type="info">
  설치는 한 번만 하면 돼요. 이후에는 터미널을 열고 바로 사용할 수 있습니다.
</Callout>

## 1단계: Node.js 설치

Node.js는 Claude Code가 실행되기 위해 필요한 기반 프로그램이에요. 이미 설치되어 있다면 이 단계를 건너뛰세요.

**설치 확인 방법:**

터미널 (명령어를 입력하는 검은 창)을 열고 아래를 입력하세요:

```bash
node --version
```

`v18.0.0` 처럼 버전 번호가 나오면 이미 설치된 거예요. 오류가 나오면 아래에서 설치하세요.

**Node.js 설치:** [nodejs.org](https://nodejs.org) 에서 **LTS 버전** 다운로드 후 설치.

{/* Screenshot 예시: <Screenshot src="/screenshots/nodejs-download.png" alt="Node.js 다운로드 페이지" caption="LTS 버전을 선택하세요" /> */}

## 2단계: Claude Code 설치

터미널에서 아래 명령어를 입력하세요:

```bash
npm install -g @anthropic-ai/claude-code
```

설치가 완료되면 아래 명령어로 확인하세요:

```bash
claude --version
```

버전 번호가 나오면 성공이에요!

## 3단계: 로그인

```bash
claude
```

처음 실행하면 Anthropic 계정으로 로그인하라는 안내가 나와요. 브라우저가 열리면 로그인하면 됩니다.

<Callout type="tip">
  Anthropic 계정이 없다면 [claude.ai](https://claude.ai) 에서 먼저 가입하세요.
</Callout>

로그인이 완료되면 터미널에 `>` 프롬프트가 나타납니다. 이제 사용할 준비가 됐어요!
```

- [ ] **Step 3: first-conversation.mdx 작성**

`pages/getting-started/first-conversation.mdx`:

```mdx
---
title: 첫 번째 대화
description: Claude Code를 처음 실행하고 간단한 작업을 요청해봅니다.
---

# 첫 번째 대화

설치가 완료됐나요? 이제 Claude Code와 첫 대화를 시작해봐요.

## 터미널 열기

- **Mac:** `Cmd + Space` → "터미널" 검색 → 실행
- **Windows:** `Win + R` → `cmd` 입력 → 확인

## Claude Code 시작

```bash
claude
```

`>` 프롬프트가 나타나면 준비 완료입니다.

## 첫 번째 요청

아래처럼 입력해보세요:

```
안녕! 간단한 HTML 파일을 만들어줘. 제목은 "나의 첫 페이지"이고, "Hello, World!"라는 텍스트가 있으면 좋겠어.
```

Enter를 누르면 Claude Code가 파일을 생성합니다.

<Callout type="tip">
  한국어로 요청해도 잘 이해해요! 편한 언어로 말하듯이 요청하세요.
</Callout>

## 결과 확인

Claude Code가 파일을 만들었다고 하면, 해당 파일을 찾아서 브라우저로 열어보세요.

## 대화 종료

```
/exit
```

또는 `Ctrl+C`를 누르면 종료됩니다.

<Callout type="info">
  다음 단계로 기본 사용법 가이드를 읽어보세요. 더 효과적으로 요청하는 방법을 배울 수 있어요.
</Callout>
```

- [ ] **Step 4: 개발 서버에서 3페이지 확인**

```bash
npm run dev
```

`http://localhost:3000/getting-started/what-is-claude-code` 확인.
사이드바에 "시작하기" 메뉴와 하위 3페이지가 보여야 함.

- [ ] **Step 5: 커밋**

```bash
git add pages/getting-started/
git commit -m "feat: add Getting Started pages (3 pages)"
```

---

### Task 8: 가이드 페이지 3개 작성

**Files:**
- Create: `pages/guides/basic-usage.mdx`
- Create: `pages/guides/writing-prompts.mdx`
- Create: `pages/guides/handling-errors.mdx`

- [ ] **Step 1: basic-usage.mdx 작성**

`pages/guides/basic-usage.mdx`:

```mdx
---
title: 기본 사용법
description: Claude Code와 대화를 시작하고 작업을 요청하는 기본 흐름을 배웁니다.
---

# 기본 사용법

## Claude Code 기본 흐름

Claude Code 사용은 크게 세 단계로 이루어져요:

**<StepBadge step={1} /> 터미널에서 Claude Code 시작**

작업할 폴더로 이동한 뒤 Claude Code를 실행해요.

```bash
cd 내-프로젝트-폴더
claude
```

**<StepBadge step={2} /> 원하는 작업 요청**

말하듯이 자연스럽게 요청하면 됩니다.

```
로그인 버튼의 색깔을 파란색으로 바꿔줘.
```

**<StepBadge step={3} /> 결과 확인 후 피드백**

Claude Code가 변경한 내용을 확인하고, 맘에 들지 않으면 바로 피드백을 주세요.

```
버튼이 너무 진한 파란색이야. 좀 더 밝은 하늘색으로 바꿔줘.
```

<Callout type="tip">
  대화를 이어가면서 계속 수정할 수 있어요. 처음부터 완벽하게 요청하지 않아도 됩니다.
</Callout>

## 자주 쓰는 요청 패턴

| 상황 | 예시 요청 |
|------|-----------|
| 새 기능 추가 | "회원가입 폼을 추가해줘" |
| 디자인 수정 | "글자 크기를 더 크게 해줘" |
| 오류 수정 | "이 오류 메시지가 뭔지 설명하고 고쳐줘" |
| 코드 설명 | "이 파일이 어떤 역할을 하는지 설명해줘" |

## 작업 범위 지정하기

어느 파일, 어느 부분을 수정해야 하는지 알려주면 더 정확하게 작업해요.

```
header.tsx 파일에서 로고 이미지 크기를 50px로 변경해줘.
```
```

- [ ] **Step 2: writing-prompts.mdx 작성**

`pages/guides/writing-prompts.mdx`:

```mdx
---
title: 좋은 프롬프트 쓰는 법
description: Claude Code에게 효과적으로 요청하는 방법을 예시와 함께 배웁니다.
---

# 좋은 프롬프트 쓰는 법

같은 요청이라도 어떻게 말하느냐에 따라 결과가 크게 달라져요.

## 구체적으로 요청하기

**나쁜 예:**
```
버튼 고쳐줘.
```

**좋은 예:**
```
로그인 페이지의 "제출" 버튼이 클릭이 안 돼. 클릭하면 폼 데이터를 서버로 전송하도록 고쳐줘.
```

<Callout type="tip">
  누가, 무엇을, 어떻게, 왜를 포함해서 요청하면 더 좋은 결과를 얻을 수 있어요.
</Callout>

## 맥락 제공하기

현재 상황을 설명해주면 Claude Code가 더 적절한 해결책을 찾아요.

**예시:**
```
쇼핑몰 사이트를 만들고 있어. 상품 목록 페이지에서 상품을 클릭하면 
상품 상세 페이지로 이동해야 하는데, 현재는 클릭해도 아무 반응이 없어.
```

## 한 번에 하나씩 요청하기

여러 가지를 한 번에 요청하면 실수가 생길 수 있어요.

**피하세요:**
```
버튼 색 바꾸고, 폰트 크기도 키우고, 이미지도 추가하고, 반응형도 만들어줘.
```

**권장:**
```
버튼 색을 파란색으로 바꿔줘. (완료 후) 
다음으로 제목 폰트 크기를 24px로 키워줘.
```

## 결과물 형태 지정하기

어떤 형태의 결과를 원하는지 알려주세요.

```
사용자 목록을 보여주는 테이블을 만들어줘. 
이름, 이메일, 가입일 컬럼이 있어야 해.
```

## 예시 제공하기

비슷한 예시를 보여주면 의도를 정확히 전달할 수 있어요.

```
이 버튼 디자인처럼 둥근 모서리에 그림자 효과가 있는 스타일로 만들어줘:
border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
```
```

- [ ] **Step 3: handling-errors.mdx 작성**

`pages/guides/handling-errors.mdx`:

```mdx
---
title: 오류 대처법
description: 자주 발생하는 오류 상황과 대처 방법을 알아봅니다.
---

# 오류 대처법

Claude Code를 사용하다 보면 가끔 오류가 생길 수 있어요. 당황하지 말고 아래 방법을 시도해보세요.

## 오류 메시지를 Claude Code에게 보여주기

가장 쉬운 방법이에요. 오류 메시지를 그대로 복사해서 붙여넣으세요.

```
이런 오류가 났어. 어떻게 고치면 돼?

Error: Cannot find module './utils'
```

<Callout type="tip">
  오류 메시지를 직접 입력하지 말고, 복사-붙여넣기(Ctrl+C, Ctrl+V)를 활용하세요. 오타 없이 정확하게 전달할 수 있어요.
</Callout>

## 자주 발생하는 오류

### "명령어를 찾을 수 없습니다" 오류

```
command not found: claude
```

**원인:** Claude Code가 제대로 설치되지 않았거나 터미널을 재시작해야 함.

**해결:**
1. 터미널을 닫고 다시 열기
2. 그래도 안 되면 `npm install -g @anthropic-ai/claude-code` 다시 실행

### 인증 오류

```
Error: Authentication required
```

**원인:** 로그인이 만료됨.

**해결:** `claude` 실행 후 다시 로그인.

### 파일 수정 권한 오류

```
Error: EACCES: permission denied
```

**원인:** 해당 파일/폴더에 대한 권한이 없음.

**해결:** Claude Code에게 "이 오류가 났어, 어떻게 해결해?"라고 물어보거나, 올바른 폴더에서 실행하는지 확인.

## Claude Code가 이상한 결과를 냈을 때

원하지 않는 방향으로 수정됐다면:

```
방금 수정한 내용을 되돌려줘.
```

또는

```
아니야, 내가 원하는 건 이런 거야: [다시 설명]
```

<Callout type="warning">
  Claude Code가 파일을 수정하기 전에 git commit을 해두면, 언제든지 이전 상태로 돌아갈 수 있어요. 습관으로 만들어두면 좋아요.
</Callout>

## 해결이 안 될 때

Claude Code에게 직접 도움을 요청하세요:

```
이 문제를 어떻게 디버깅할 수 있는지 단계별로 알려줘.
```
```

- [ ] **Step 4: 개발 서버에서 확인**

```bash
npm run dev
```

`http://localhost:3000/guides/basic-usage` 확인. StepBadge, Callout 컴포넌트가 렌더링되어야 함.

- [ ] **Step 5: 커밋**

```bash
git add pages/guides/
git commit -m "feat: add Guide pages (basic usage, writing prompts, error handling)"
```

---

### Task 9: 레퍼런스 + FAQ 페이지 작성

**Files:**
- Create: `pages/reference/slash-commands.mdx`
- Create: `pages/faq.mdx`

- [ ] **Step 1: slash-commands.mdx 작성**

`pages/reference/slash-commands.mdx`:

```mdx
---
title: 슬래시 명령어
description: Claude Code에서 자주 사용하는 슬래시 명령어 목록입니다.
---

# 슬래시 명령어

대화 중 `/`로 시작하는 명령어를 입력하면 특별한 동작을 실행할 수 있어요.

<Callout type="info">
  `/`를 입력하면 사용 가능한 명령어 목록이 자동으로 나타나요.
</Callout>

## 자주 쓰는 명령어

<CommandCard
  command="/help"
  description="사용 가능한 모든 명령어와 기능을 보여줍니다."
  example="/help"
/>

<CommandCard
  command="/clear"
  description="현재 대화 내용을 지우고 새로 시작합니다. Claude Code가 느려지거나 엉뚱한 대답을 할 때 유용해요."
  example="/clear"
/>

<CommandCard
  command="/compact"
  description="대화 내용을 요약해서 토큰을 절약합니다. 긴 작업을 계속할 때 사용하세요."
  example="/compact"
/>

<CommandCard
  command="/exit"
  description="Claude Code를 종료합니다."
  example="/exit"
/>

<CommandCard
  command="/status"
  description="현재 세션 상태, 사용한 토큰 수 등을 확인합니다."
  example="/status"
/>

<CommandCard
  command="/undo"
  description="마지막으로 Claude Code가 수행한 파일 변경을 되돌립니다."
  example="/undo"
/>

## 언제 어떤 명령어를 쓸까요?

| 상황 | 명령어 |
|------|--------|
| 대화가 산으로 갈 때 | `/clear` |
| 작업이 길어질 때 | `/compact` |
| 실수로 파일이 수정됐을 때 | `/undo` |
| 사용법을 모를 때 | `/help` |
```

- [ ] **Step 2: faq.mdx 작성**

`pages/faq.mdx`:

```mdx
---
title: 자주 묻는 질문
description: Claude Code를 처음 사용할 때 자주 막히는 부분들을 모았습니다.
---

# 자주 묻는 질문

## Claude Code는 유료인가요?

Claude Code 자체는 무료로 설치할 수 있지만, 사용하려면 Anthropic 계정이 필요하고 사용량에 따라 요금이 부과될 수 있어요. 요금 정책은 [Anthropic 공식 사이트](https://anthropic.com)에서 확인하세요.

## 터미널이 뭔가요?

터미널은 마우스 대신 키보드로 컴퓨터에 명령을 내리는 창이에요.
- **Mac:** `Cmd + Space` 누르고 "터미널" 검색
- **Windows:** `Win + R` 누르고 `cmd` 입력

처음엔 낯설지만, Claude Code와 대화할 때는 그냥 명령어 몇 개만 알면 충분해요.

## Claude Code가 제 파일을 망가뜨릴 수도 있나요?

가능성은 있어요. 그래서 중요한 파일은 미리 백업해두는 것을 권장해요. Git (버전 관리 도구)을 사용하면 언제든지 이전 상태로 되돌릴 수 있어요.

<Callout type="tip">
  작업 전에 항상 `/undo` 명령어가 있다는 걸 기억하세요. 방금 한 변경을 되돌릴 수 있어요.
</Callout>

## 한국어로 요청해도 되나요?

네! 한국어로 요청해도 잘 이해해요. 편한 언어로 자연스럽게 말하면 됩니다.

## Claude Code가 너무 느려요.

대화가 길어지면 느려질 수 있어요. 이럴 때는:
1. `/compact` 명령어로 대화를 압축
2. 또는 `/clear`로 새로 시작

## 오류가 계속 반복돼요.

같은 오류가 반복된다면:
1. `/clear`로 대화를 초기화하고 다시 시작
2. 오류 메시지를 정확히 복사해서 붙여넣기
3. 어떤 작업을 하다가 오류가 났는지 맥락을 설명

## 인터넷이 없어도 사용할 수 있나요?

아니요, Claude Code는 인터넷 연결이 필요해요. Anthropic 서버와 통신하면서 작동하기 때문이에요.
```

- [ ] **Step 3: 전체 사이트 최종 확인**

```bash
npm run dev
```

아래 페이지 모두 확인:
- `http://localhost:3000` — 홈
- `http://localhost:3000/getting-started/what-is-claude-code`
- `http://localhost:3000/getting-started/installation`
- `http://localhost:3000/getting-started/first-conversation`
- `http://localhost:3000/guides/basic-usage`
- `http://localhost:3000/guides/writing-prompts`
- `http://localhost:3000/guides/handling-errors`
- `http://localhost:3000/reference/slash-commands`
- `http://localhost:3000/faq`

검색창에서 "Claude Code" 검색 시 결과가 나오는지 확인.

- [ ] **Step 4: 프로덕션 빌드 최종 확인**

```bash
npm run build
```

Expected: 오류 없음, 9개 페이지 빌드 완료.

- [ ] **Step 5: 커밋**

```bash
git add pages/reference/ pages/faq.mdx
git commit -m "feat: add Reference (slash commands) and FAQ pages — MVP complete"
```

---

## 완료 후 확인 체크리스트

- [ ] 개발 서버에서 8개 문서 페이지 모두 정상 렌더링
- [ ] 사이드바 내비게이션 올바른 순서로 표시
- [ ] Callout, CommandCard, StepBadge 컴포넌트 MDX에서 정상 동작
- [ ] 다크모드 토글 작동
- [ ] 검색 기능 작동
- [ ] `npm run build` 오류 없음

## Vercel 배포 (선택)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

GitHub 저장소 연동 후 main 브랜치 푸시 시 자동 배포 설정 권장.
