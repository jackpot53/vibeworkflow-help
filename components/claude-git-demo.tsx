'use client'

import { useEffect, useRef, useState } from 'react'

interface Mapping {
  prompt: string
  claude: string
  cmd: string
  result: string
  label: string
}

const MAPPINGS: Mapping[] = [
  {
    prompt: '변경사항 확인하고 커밋 메시지 작성해서 커밋해줘',
    claude: '⏺ 변경사항 확인 후 커밋할게요',
    cmd: 'git add . && git commit -m "feat: ..."',
    result: '✓ [main a3f91c2] feat: 포트폴리오 메인 추가',
    label: '커밋',
  },
  {
    prompt: "변경사항 커밋해줘, 메시지는 'feat: 메인 페이지 추가'로 해줘",
    claude: '⏺ 해당 메시지로 커밋할게요',
    cmd: "git commit -m \"feat: 메인 페이지 추가\"",
    result: '✓ [main b1d82e5] feat: 메인 페이지 추가',
    label: '커밋 (직접 지정)',
  },
  {
    prompt: '현재 브랜치 GitHub에 푸시해줘',
    claude: '⏺ GitHub에 푸시할게요',
    cmd: 'git push origin main',
    result: '✓ main → origin/main',
    label: '푸시',
  },
  {
    prompt: 'GitHub에서 최신 내용 받아와줘',
    claude: '⏺ 최신 변경사항을 받아올게요',
    cmd: 'git pull',
    result: '✓ Already up to date.',
    label: '풀',
  },
  {
    prompt: 'feature/메인페이지 브랜치 만들고 이동해줘',
    claude: '⏺ 새 브랜치를 만들고 이동할게요',
    cmd: 'git checkout -b feature/메인페이지',
    result: "✓ Switched to a new branch 'feature/메인페이지'",
    label: '브랜치 생성',
  },
  {
    prompt: '지금 브랜치 목록 보여줘',
    claude: '⏺ 브랜치 목록을 확인할게요',
    cmd: 'git branch',
    result: '* feature/메인페이지   main',
    label: '브랜치 목록',
  },
  {
    prompt: '어떤 파일이 수정됐는지 알려줘',
    claude: '⏺ 수정된 파일을 확인할게요',
    cmd: 'git status',
    result: 'M  src/index.tsx',
    label: '상태 확인',
  },
  {
    prompt: '변경사항 요약해서 PR 만들어줘',
    claude: '⏺ PR을 생성할게요',
    cmd: 'gh pr create --title "feat: 메인 페이지 추가"',
    result: '✓ https://github.com/.../pull/1',
    label: 'PR 생성',
  },
  {
    prompt: '마지막 커밋 전으로 되돌려줘',
    claude: '⏺ 마지막 커밋을 되돌릴게요',
    cmd: 'git revert HEAD',
    result: '✓ Revert "feat: 메인 페이지 추가" created',
    label: '되돌리기',
  },
]

const ITEM_DUR = 5500

export function ClaudeGitDemo() {
  const [idx, setIdx] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const go = (i: number) => {
      timer.current = setTimeout(() => {
        const next = (i + 1) % MAPPINGS.length
        setIdx(next)
        go(next)
      }, ITEM_DUR)
    }
    go(0)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  const m = MAPPINGS[idx]

  return (
    <div
      className="not-prose"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
        borderRadius: '14px',
        padding: '20px',
        margin: '24px 0',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes cgdTypePrompt {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes cgdFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cgdFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:        0.01ms !important;
            animation-iteration-count: 1      !important;
            transition-duration:       0.01ms !important;
          }
        }
      `}</style>

      {/* ── Window chrome ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>
          ~/dev/portfolio
        </div>
        <div style={{
          fontSize: '10px', fontWeight: 600,
          color: '#a78bfa',
          padding: '2px 8px',
          borderRadius: '10px',
          background: 'rgba(139,92,246,0.12)',
          border: '1px solid rgba(139,92,246,0.25)',
        }}>
          클로드 코드
        </div>
      </div>

      {/* ── Terminal body — key forces remount on each item ── */}
      <div
        key={idx}
        style={{
          background: '#0d1117',
          borderRadius: '10px',
          padding: '16px 20px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '13px',
          minHeight: '136px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* User prompt (typing) */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{ color: '#6ee7b7', flexShrink: 0, lineHeight: '1.5' }}>{'>'}</span>
          <div style={{
            color: '#c4b5fd',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            animation: `cgdTypePrompt 1.6s steps(${m.prompt.length}) 0.1s both`,
          }}>
            {m.prompt}
          </div>
        </div>

        {/* Claude response */}
        <div style={{
          color: '#a78bfa',
          paddingLeft: '18px',
          animation: 'cgdFadeUp 0.4s ease 2.0s both',
          opacity: 0,
        }}>
          {m.claude}
        </div>

        {/* Git command */}
        <div style={{
          color: '#94a3b8',
          animation: 'cgdFadeUp 0.4s ease 2.7s both',
          opacity: 0,
        }}>
          <span style={{ color: '#6ee7b7' }}>$</span>{' '}{m.cmd}
        </div>

        {/* Result */}
        <div style={{
          color: '#4ade80',
          fontSize: '12px',
          paddingLeft: '14px',
          animation: 'cgdFadeIn 0.4s ease 3.4s both',
          opacity: 0,
        }}>
          {m.result}
        </div>
      </div>

      {/* ── Bottom indicator ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '14px' }}>
        {MAPPINGS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === idx ? 20 : 6,
              height: 6,
              borderRadius: '3px',
              background: i === idx ? '#a78bfa' : 'rgba(255,255,255,0.12)',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          />
        ))}
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '11px',
          marginLeft: '8px',
          minWidth: '72px',
        }}>
          {m.label}
        </span>
      </div>
    </div>
  )
}
