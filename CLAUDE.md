# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version Warning

**This project uses Next.js 16.2.6** — APIs and conventions differ from training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

No test suite is configured.

## Stack

- **Next.js 16.2.6** + **React 19** (App Router)
- **Nextra 4.6.1** + **nextra-theme-docs 4.6.1** — docs site framework
- **Tailwind CSS v4** — CSS-based config (no `tailwind.config.ts`; uses `@import "tailwindcss"` in `app/globals.css`)
- **shadcn/ui** (base-nova style, Tailwind v4 mode) — UI components in `components/ui/`

## Architecture

### Routing

Nextra v4 uses a single catch-all route `app/[[...mdxPath]]/page.tsx` that serves all MDX content. The `app/layout.tsx` wraps everything with the Nextra docs `Layout` and calls `getPageMap()` to build the sidebar.

### Content

All documentation lives in `content/`. Navigation is controlled by `_meta.json` files in each directory — the key is the filename/folder slug, the value is the sidebar display label.

```
content/
  _meta.json                          # Top-level nav order
  index.mdx                           # Homepage
  getting-started/
    _meta.json
    시작전-준비물/                      # Korean folder names are fine
      _meta.json
      terminal.mdx
  guides/
  reference/
  faq.mdx
```

To add a page: create an `.mdx` file and add its key to the parent `_meta.json`. To add a section with sub-pages: create a folder with `_meta.json` inside (no `index.mdx` needed — omitting it makes the section header non-clickable).

### Custom MDX Components

Registered globally in `mdx-components.tsx` — use in any MDX file without importing:

| Component | Usage |
|-----------|-------|
| `<Callout type="tip|warning|info">` | Highlighted note boxes |
| `<CommandCard command="..." description="..." example="...">` | Slash command reference cards |
| `<Screenshot src="..." alt="..." caption="...">` | Image with caption |
| `<StepBadge step={1}>` | Numbered step badge |
| `<VibeBlock>` | 사용자가 Claude에게 보내는 **자연어 프롬프트** 예시. 틸(teal) VIBE 헤더 바 표시 |
| `<ClaudeBlock>` | Claude가 응답한 내용 예시. 하늘(sky) CLAUDE 헤더 바 표시 |
| `<ShellBlock>` | 일반 shell 터미널에서 실행하는 명령 예시. 호박(amber) SHELL 헤더 바 표시. 안에 ` ```bash ` 펜스를 쓰면 `$ ` 프리픽스가 자동으로 붙음 |
| `<SlashBlock>` | Claude Code 슬래시 명령어(`/plan`, `/clear` 등) 입력 예시. 보라(purple) /CMD 헤더 바 표시 |
| `<FileBlock filename="...">` | 파일 내용 예시 (CLAUDE.md, settings.json, 슬래시 커맨드 정의 등). 슬레이트(slate) 헤더 바에 파일명이 모노스페이스로 표시됨. `filename` prop 필수 |

**VibeBlock 사용 기준**: Claude에게 보내는 **자연어** 프롬프트에만 사용. 슬래시 명령은 SlashBlock으로, 셸 명령은 ShellBlock으로 분리.

**ClaudeBlock 사용 기준**: Claude가 응답한 텍스트나 출력 내용 예시에 사용. 셸 명령 출력(`output` 코드 블록)과 구분하여, Claude의 대화/분석/계획 응답에만 사용.

**ShellBlock 사용 기준**: `npm install`, `git status` 같은 일반 셸 명령 예시에 사용. 안에 ` ```bash ` 펜스를 두면 `$ ` 프리픽스가 자동으로 붙어 터미널 느낌을 낸다.

**SlashBlock 사용 기준**: `/plan`, `/clear`, `/context` 같이 Claude Code CLI에서 `/`로 시작하는 명령 입력 예시에 사용. 안에 언어 태그 없는 코드 펜스를 쓰고 본문은 `> /command` 형태로 시작.

**FileBlock 사용 기준**: 디스크에 저장하는 구체적인 파일의 내용을 보여줄 때 사용. `filename` prop은 필수 (예: `<FileBlock filename="CLAUDE.md">`, `<FileBlock filename="~/.claude/settings.json">`). 추상 템플릿·일반 코드 예시엔 사용하지 않음. 파일의 일부 섹션도 가능 (예: `<FileBlock filename="DESIGN.md — Colors">`).

```mdx
<VibeBlock>
\`\`\`
버튼 클릭할 때 살짝 눌리는 애니메이션 추가해줘
\`\`\`
</VibeBlock>

<SlashBlock>
\`\`\`
> /plan
\`\`\`
</SlashBlock>

<ShellBlock>
\`\`\`bash
npm install
git status
\`\`\`
</ShellBlock>

<ClaudeBlock>
\`\`\`
현재 태스크를 분석하겠습니다...
\`\`\`
</ClaudeBlock>

<FileBlock filename="CLAUDE.md">
\`\`\`markdown
# Project Overview
포트폴리오 웹사이트...
\`\`\`
</FileBlock>
```

### Known Patch

`patches/nextra-theme-docs+4.6.1.patch` — fixes a Zod v4 incompatibility where `LayoutPropsSchema` required `children` as non-optional, crashing SSR. Applied automatically via `postinstall: patch-package`. Do not upgrade `nextra-theme-docs` past `4.6.1` without verifying this patch is no longer needed.

### Sidebar Depth

`app/layout.tsx` sets `sidebar={{ defaultMenuCollapseLevel: 3 }}` to show 3 levels of nesting. The Nextra default is 2.
