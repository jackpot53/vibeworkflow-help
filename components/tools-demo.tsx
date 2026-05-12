'use client'

import { useEffect, useRef, useState } from 'react'

type Line =
  | { t: 'tool';     tool: string; arg: string }
  | { t: 'result';   text: string }
  | { t: 'thinking'; text: string }
  | { t: 'success';  text: string }

const SCENARIO: Array<{ delay: number; line: Line }> = [
  { delay: 1900, line: { t: 'tool',     tool: 'Grep',  arg: '"auth"' } },
  { delay: 2600, line: { t: 'result',   text: 'src/auth/login.ts · src/auth/middleware.ts · src/utils/token.ts' } },
  { delay: 3100, line: { t: 'tool',     tool: 'Read',  arg: '"src/auth/login.ts"' } },
  { delay: 3700, line: { t: 'tool',     tool: 'Read',  arg: '"src/auth/middleware.ts"' } },
  { delay: 4600, line: { t: 'thinking', text: '만료 토큰 재사용 버그 발견 — middleware.ts:47' } },
  { delay: 5500, line: { t: 'tool',     tool: 'Edit',  arg: '"src/auth/middleware.ts"' } },
  { delay: 6100, line: { t: 'result',   text: '+12 / −4 lines' } },
  { delay: 6700, line: { t: 'tool',     tool: 'Bash',  arg: '"npm test -- --testPathPattern=auth"' } },
  { delay: 8300, line: { t: 'success',  text: '✓  12 passed, 0 failed  (1.3s)' } },
]

const PROMPT_TEXT = '인증 관련 버그 고쳐줘'
const LOOP_DELAY = 2800

export function ToolsDemo() {
  const [cycle, setCycle] = useState(0)
  const [count, setCount] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setCount(0)

    SCENARIO.forEach((item, i) => {
      const tid = setTimeout(() => setCount(i + 1), item.delay)
      timers.current.push(tid)
    })

    const last = SCENARIO[SCENARIO.length - 1].delay + LOOP_DELAY
    const loopTid = setTimeout(() => setCycle(c => c + 1), last)
    timers.current.push(loopTid)

    return () => timers.current.forEach(clearTimeout)
  }, [cycle])

  const visibleLines = SCENARIO.slice(0, count)

  return (
    <div
      className="not-prose"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
        borderRadius: '14px',
        padding: '20px',
        margin: '32px 0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes tdType {
          from { width: 0 }
          to   { width: 100% }
        }
        @keyframes tdFadeUp {
          from { opacity: 0; transform: translateY(5px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes tdBlink {
          0%, 100% { opacity: 1 }
          50%       { opacity: 0 }
        }
        @keyframes tdSpin {
          to { transform: rotate(360deg) }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: 'monospace' }}>
          ~/dev/myapp
        </div>
        <div style={{
          fontSize: '10px', fontWeight: 600, color: '#a78bfa',
          padding: '2px 8px', borderRadius: '10px',
          background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
        }}>
          claude
        </div>
      </div>

      {/* Terminal body — key forces full remount on loop */}
      <div
        key={cycle}
        style={{
          background: '#0d1117',
          borderRadius: '10px',
          padding: '18px 20px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '13px',
          minHeight: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
      >
        {/* User prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ color: '#6ee7b7', flexShrink: 0 }}>{'>'}</span>
          <div style={{
            color: '#c4b5fd',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            animation: `tdType 1.4s steps(${PROMPT_TEXT.length}) 0.2s both`,
          }}>
            {PROMPT_TEXT}
          </div>
          {count === 0 && (
            <div style={{
              width: '7px', height: '15px',
              background: '#c4b5fd',
              animation: 'tdBlink 1s step-end infinite',
              flexShrink: 0,
            }} />
          )}
        </div>

        {/* Tool lines */}
        {visibleLines.map((item, i) => (
          <LineRow key={i} line={item.line} isLast={i === visibleLines.length - 1} />
        ))}
      </div>
    </div>
  )
}

function LineRow({ line, isLast }: { line: Line; isLast: boolean }) {
  const base: React.CSSProperties = {
    animation: 'tdFadeUp 0.3s ease both',
    marginBottom: '2px',
  }

  if (line.t === 'tool') {
    return (
      <div style={{ ...base, display: 'flex', alignItems: 'center', gap: '7px', padding: '3px 0' }}>
        {isLast
          ? <Spinner />
          : <span style={{ color: '#f97316', fontSize: '10px', lineHeight: 1 }}>⏺</span>
        }
        <span style={{ color: '#fbbf24', fontWeight: 600 }}>{line.tool}</span>
        <span style={{ color: '#475569' }}>(</span>
        <span style={{ color: '#94a3b8' }}>{line.arg}</span>
        <span style={{ color: '#475569' }}>)</span>
        {isLast && (
          <span style={{ color: '#475569', fontSize: '11px', animation: 'tdFadeUp 0.2s 0.3s both', opacity: 0 }}>…</span>
        )}
      </div>
    )
  }

  if (line.t === 'result') {
    return (
      <div style={{ ...base, paddingLeft: '20px', paddingBottom: '6px', color: '#475569', fontSize: '12px' }}>
        {line.text}
      </div>
    )
  }

  if (line.t === 'thinking') {
    return (
      <div style={{ ...base, padding: '8px 0 6px 0', color: '#a78bfa', fontStyle: 'italic', fontSize: '12px' }}>
        {line.text}
      </div>
    )
  }

  if (line.t === 'success') {
    return (
      <div style={{
        ...base,
        marginTop: '8px',
        padding: '8px 14px',
        background: 'rgba(74,222,128,0.08)',
        border: '1px solid rgba(74,222,128,0.2)',
        borderRadius: '6px',
        color: '#4ade80',
        fontWeight: 600,
      }}>
        {line.text}
      </div>
    )
  }

  return null
}

function Spinner() {
  return (
    <div style={{
      width: '10px', height: '10px', flexShrink: 0,
      border: '1.5px solid rgba(249,115,22,0.25)',
      borderTopColor: '#f97316',
      borderRadius: '50%',
      animation: 'tdSpin 0.7s linear infinite',
    }} />
  )
}
