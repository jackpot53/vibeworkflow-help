# Vibeworkflow Help — 디자인 스펙

**날짜:** 2026-05-09  
**프로젝트:** 비개발자를 위한 바이브코딩 도움말 사이트  
**상태:** 승인됨

---

## 1. 개요

Claude Code를 처음 접하는 완전 비개발자를 위한 한국어 도움말 문서 사이트. 전문 용어 없이 개념 설명을 포함한 단계별 튜토리얼과 레퍼런스를 함께 제공한다.

**목표 독자:** 코드를 전혀 모르는 일반인, 기획자, 디자이너  
**중심 툴:** Claude Code  
**언어:** 한국어 단일

---

## 2. 기술 스택

| 역할 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 문서 프레임워크 | Nextra (docs theme) |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui |
| 콘텐츠 형식 | MDX |
| 배포 | Vercel (GitHub 연동) |

---

## 3. 프로젝트 구조

```
vibeworkflow-help/
├── app/                        # Next.js App Router
│   └── layout.tsx              # 기본 메타데이터 (lang="ko")
├── content/                    # MDX 문서 파일
│   ├── index.mdx               # 홈페이지
│   ├── _meta.json              # 사이드바 순서/이름
│   ├── getting-started/        # 시작하기 (튜토리얼)
│   │   ├── _meta.json
│   │   ├── what-is-claude-code.mdx
│   │   ├── installation.mdx
│   │   └── first-conversation.mdx
│   ├── guides/                 # 가이드
│   │   ├── _meta.json
│   │   ├── basic-usage.mdx
│   │   ├── writing-prompts.mdx
│   │   └── handling-errors.mdx
│   ├── reference/              # 레퍼런스
│   │   ├── _meta.json
│   │   └── slash-commands.mdx
│   └── faq.mdx                 # 자주 묻는 질문
├── components/                 # 커스텀 컴포넌트
│   ├── callout.tsx             # 팁/주의사항 (shadcn Alert 기반)
│   ├── command-card.tsx        # 명령어 레퍼런스 카드
│   ├── screenshot.tsx          # 스크린샷 래퍼
│   └── step-badge.tsx          # 단계 번호 뱃지
└── public/
    └── screenshots/            # 스크린샷 이미지
```

---

## 4. 콘텐츠 구성 (MVP — 8페이지)

### 시작하기 (3페이지)
1. **Claude Code란?** — 바이브코딩 개념, Claude Code가 무엇인지 쉬운 언어로 설명
2. **설치하기** — 터미널 열기부터 설치 완료까지 스크린샷 포함 단계별 안내
3. **첫 번째 대화** — Claude Code를 처음 실행하고 간단한 작업 요청해보기

### 가이드 (3페이지)
4. **기본 사용법** — 대화 시작, 작업 요청, 결과 확인하는 흐름
5. **좋은 프롬프트 쓰는 법** — 비개발자가 효과적으로 요청하는 방법, 예시 포함
6. **오류 대처법** — 자주 발생하는 오류 상황과 대처 방법

### 레퍼런스 (1페이지)
7. **주요 슬래시 명령어** — `/help`, `/clear`, `/compact` 등 자주 쓰는 명령어 카드 형식

### FAQ (1페이지)
8. **자주 묻는 질문** — 비개발자가 처음 막히는 지점 모음

---

## 5. UI/UX 설계

### 레이아웃 (Nextra 기본)
- 좌측 사이드바: 내비게이션
- 우측: 현재 페이지 목차 (TOC)
- 상단: 검색창, 다크/라이트 모드 토글

### 홈페이지 구성
- 한 줄 소개 문구
- "시작하기" CTA 버튼 (shadcn Button)
- "이 문서는 누구를 위한 건가요?" 설명 섹션
- 빠른 링크 카드 3개: 시작하기 / 주요 명령어 / FAQ (shadcn Card)

### shadcn/ui 컴포넌트 활용
| 컴포넌트 | 용도 |
|----------|------|
| `Alert` | Callout (팁/주의사항) |
| `Badge` | 명령어 태그, 난이도 표시 |
| `Card` | 홈 빠른 링크, 명령어 카드 |
| `Button` | CTA 버튼 |
| `Separator` | 섹션 구분 |

### 콘텐츠 원칙
- 전문 용어 사용 시 괄호로 풀어 설명 (예: `터미널 (명령어를 입력하는 검은 창)`)
- 각 단계마다 스크린샷 삽입 위치 명시
- "왜 이렇게 하는지" 한 줄 이유 설명 포함
- 코드 블록 최소화, 필요 시 복사 버튼 강조

---

## 6. SEO & 메타데이터

- `layout.tsx`에 `lang="ko"` 설정
- 각 MDX 파일 frontmatter: `title`, `description` 필수
- Nextra 기본 Open Graph 설정 활용

---

## 7. 배포

- GitHub 저장소 연동
- Vercel 자동 배포 (main 브랜치 푸시 시)
- 별도 서버 관리 불필요

---

## 8. 범위 외 (MVP에 포함하지 않음)

- 다국어 지원 (i18n)
- 사용자 인증/로그인
- 댓글/피드백 시스템
- 동영상 임베드
- 버전 관리 (문서 버전)
