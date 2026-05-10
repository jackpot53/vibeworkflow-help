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
| `<VibeBlock>` | Claude Code CLI 입력 예시 코드 블록 — 사용자가 직접 터미널에 입력하는 명령어나 프롬프트를 보여줄 때 사용. 보라색 VIBE 헤더 바가 코드 블록 위에 붙어서 표시됨 |

**VibeBlock 사용 기준**: Claude Code 터미널에 사용자가 **직접 입력하는** 명령어(`/plan`, `/model` 등) 또는 Claude에게 보내는 자연어 프롬프트 예시에 사용. 일반 코드 예시(출력 결과, 설정 파일, API 응답 등)에는 사용하지 않음.

```mdx
<VibeBlock>
\`\`\`
> /plan
\`\`\`
</VibeBlock>
```

### Known Patch

`patches/nextra-theme-docs+4.6.1.patch` — fixes a Zod v4 incompatibility where `LayoutPropsSchema` required `children` as non-optional, crashing SSR. Applied automatically via `postinstall: patch-package`. Do not upgrade `nextra-theme-docs` past `4.6.1` without verifying this patch is no longer needed.

### Sidebar Depth

`app/layout.tsx` sets `sidebar={{ defaultMenuCollapseLevel: 3 }}` to show 3 levels of nesting. The Nextra default is 2.
