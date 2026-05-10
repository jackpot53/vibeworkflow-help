'use client'

import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'labels' | 'click' | 'clipboard' | 'paste' | 'result'

interface StepCfg { phase: Phase; dur: number; caption: string }

const STEPS: StepCfg[] = [
  { phase: 'idle',      dur: 1200, caption: '개발 중인 페이지예요. 어느 영역이 어떤 컴포넌트인지 눈에 보이지 않아요.' },
  { phase: 'labels',    dur: 2000, caption: '컴포넌트 영역마다 라벨이 자동으로 붙어요. 섹션 · 컴포넌트 · 하위 영역을 색으로 구분해요.' },
  { phase: 'click',     dur: 1800, caption: '원하는 영역의 라벨을 클릭해요.' },
  { phase: 'clipboard', dur: 1500, caption: 'components/HeroSection.tsx - HeroSection 형태로 클립보드에 담겨요.' },
  { phase: 'paste',     dur: 2600, caption: '클립보드 내용을 Claude Code에 붙여넣고 원하는 수정을 요청해요.' },
  { phase: 'result',    dur: 2000, caption: 'Claude가 정확한 위치를 바로 찾아서 수정해줘요.' },
]

const CLIPBOARD_TEXT = 'components/HeroSection.tsx - HeroSection'
const TERM_L1 = `> ${CLIPBOARD_TEXT}`
const TERM_L2 = '  배경색을 짙은 남색으로 바꿔줘.'
const CLAUDE_RESP = '⏺ HeroSection.tsx의 배경색을 수정할게요.'

// inline label badge
function LBadge({
  text, depth, show, clicked,
  animDelay = '0s',
}: {
  text: string
  depth: 1 | 2 | 3
  show: boolean
  clicked?: boolean
  animDelay?: string
}) {
  const cfg = {
    1: { bg: '#3b82f6', pos: { top: 0, left: 0 }, radius: '0 0 5px 0' },
    2: { bg: '#a78bfa', pos: { top: 0, right: 0 }, radius: '0 0 0 5px' },
    3: { bg: '#f59e0b', pos: { bottom: 0, left: 0 }, radius: '0 5px 0 0' },
  }[depth]

  return (
    <div style={{
      position: 'absolute',
      ...cfg.pos,
      background: cfg.bg,
      color: 'white',
      fontSize: '9px',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontWeight: 700,
      padding: '2px 7px',
      borderRadius: cfg.radius,
      opacity: show ? 0.85 : 0,
      transition: `opacity 0.3s ease ${animDelay}`,
      whiteSpace: 'nowrap',
      zIndex: 10,
      pointerEvents: 'none',
      animation: show && clicked ? 'dldPulse 0.35s ease' : undefined,
    }}>
      {clicked ? '✓ copied' : text}
    </div>
  )
}

export function DevLabelDemo() {
  const [step, setStep] = useState(0)
  const [clicked, setClicked] = useState(false)
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const go = (s: number) => {
      loopRef.current = setTimeout(() => {
        const next = (s + 1) % STEPS.length
        setStep(next)
        go(next)
      }, STEPS[s].dur)
    }
    go(0)
    return () => { if (loopRef.current) clearTimeout(loopRef.current) }
  }, [])

  useEffect(() => {
    setClicked(false)
    if (STEPS[step].phase === 'click') {
      clickRef.current = setTimeout(() => setClicked(true), 700)
    }
    return () => { if (clickRef.current) clearTimeout(clickRef.current) }
  }, [step])

  const { phase, caption } = STEPS[step]
  const showLabels = phase !== 'idle'
  const isPaste    = phase === 'paste'
  const isResult   = phase === 'result'
  const isClip     = phase === 'clipboard'
  const isClick    = phase === 'click'

  const phaseMeta: Record<Phase, string> = {
    idle:      '1 · 라벨 없음',
    labels:    '2 · 라벨 등장',
    click:     '3 · 클릭',
    clipboard: '4 · 클립보드',
    paste:     '5 · Claude 요청',
    result:    '6 · 수정 완료',
  }

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
        minHeight: '300px',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes dldFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dldPulse {
          0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
          40%  { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(59,130,246,0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
        @keyframes dldChip {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.85) translateY(-8px); }
          20%  { opacity: 1; transform: translate(-50%, -50%) scale(1) translateY(0); }
          80%  { opacity: 1; transform: translate(-50%, -50%) scale(1) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.95) translateY(6px); }
        }
        @keyframes dldToast {
          0%   { opacity: 0; transform: translateX(-50%) translateY(6px); }
          20%  { opacity: 1; transform: translateX(-50%) translateY(0); }
          75%  { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-6px); }
        }
        @keyframes dldType1 {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes dldType2 {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes dldClaudeResp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dldHeroBg {
          from { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); }
          to   { background: linear-gradient(135deg, #0c1e3a 0%, #0a1628 100%); }
        }
        @keyframes dldDone {
          0%   { opacity: 0; transform: scale(0.7); }
          60%  { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes dldCursorMove {
          0%   { opacity: 0; left: 55%; top: 75px; }
          12%  { opacity: 1; left: 55%; top: 75px; }
          65%  { opacity: 1; left: 22px; top: 70px; }
          85%  { opacity: 1; left: 22px; top: 70px; }
          100% { opacity: 0; left: 22px; top: 70px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Phase indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '16px',
        flexWrap: 'wrap',
      }}>
        {(Object.keys(phaseMeta) as Phase[]).map((p) => (
          <span key={p} style={{
            padding: '2px 9px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 600,
            background: phase === p ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: phase === p ? '#a78bfa' : 'rgba(255,255,255,0.18)',
            border: phase === p ? '1px solid rgba(139,92,246,0.45)' : '1px solid transparent',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}>
            {phaseMeta[p]}
          </span>
        ))}
      </div>

      {/* ── Paste phase: terminal ── */}
      {isPaste && (
        <div style={{
          background: '#0d1117',
          borderRadius: '10px',
          padding: '18px 20px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '12px',
          animation: 'dldFadeIn 0.3s ease',
          minHeight: '120px',
        }}>
          {/* line 1 */}
          <div style={{
            color: '#c4b5fd',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            animation: `dldType1 0.9s steps(${TERM_L1.length}) 0.15s both`,
            marginBottom: '3px',
          }}>
            {TERM_L1}
          </div>
          {/* line 2 */}
          <div style={{
            color: '#e2e8f0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            animation: `dldType2 0.6s steps(${TERM_L2.length}) 1.15s both`,
            marginBottom: '14px',
          }}>
            {TERM_L2}
          </div>
          {/* Claude response */}
          <div style={{
            color: '#6ee7b7',
            animation: 'dldClaudeResp 0.4s ease 1.9s both',
          }}>
            {CLAUDE_RESP}
          </div>
        </div>
      )}

      {/* ── Mock page (all non-paste phases) ── */}
      {!isPaste && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* Hero Section card */}
          <div style={{
            position: 'relative',
            background: isResult
              ? 'linear-gradient(135deg, #0c1e3a 0%, #0a1628 100%)'
              : 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            borderRadius: '10px',
            padding: '14px 16px 14px',
            transition: 'background 1.0s ease',
            minHeight: '82px',
          }}>
            <LBadge
              text="section: HeroSection"
              depth={1}
              show={showLabels}
              clicked={isClick && clicked}
            />

            <div style={{ paddingTop: showLabels ? '14px' : '0', transition: 'padding-top 0.3s ease' }}>
              <div style={{
                color: isResult ? '#93c5fd' : '#e2e8f0',
                fontWeight: 700,
                fontSize: '13px',
                marginBottom: '3px',
                transition: 'color 1.0s ease',
              }}>
                안녕하세요, 저는 홍길동입니다
              </div>
              <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', marginBottom: '10px' }}>
                풀스택 개발자 · 사이드 프로젝트 좋아함
              </div>
            </div>

            {/* Hero button */}
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <LBadge
                text="comp: HeroButton"
                depth={2}
                show={showLabels}
                animDelay="0.12s"
              />
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#e2e8f0',
                fontSize: '11px',
                padding: '5px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                marginTop: showLabels ? '14px' : '0',
                transition: 'margin-top 0.3s ease',
              }}>
                프로젝트 보기
              </div>
            </div>

            {/* Done badge */}
            {isResult && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(34,197,94,0.2)',
                border: '1px solid rgba(34,197,94,0.5)',
                color: '#86efac',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '20px',
                animation: 'dldDone 0.5s ease 0.3s both',
              }}>
                Done ✓
              </div>
            )}
          </div>

          {/* Project cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { title: '포트폴리오 사이트', tags: ['React', 'TypeScript'], delay: '0.22s', subDelay: '0.34s' },
              { title: '할일 관리 앱',       tags: ['Vue', 'Pinia'],         delay: '0.28s', subDelay: '0.40s' },
            ].map((card, i) => (
              <div key={i} style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '8px',
                padding: '10px 12px 14px',
              }}>
                <LBadge
                  text="comp: ProjectCard"
                  depth={2}
                  show={showLabels}
                  animDelay={card.delay}
                />
                <div style={{
                  color: '#cbd5e1',
                  fontSize: '11px',
                  fontWeight: 600,
                  marginBottom: '6px',
                  paddingTop: showLabels ? '12px' : '2px',
                  transition: 'padding-top 0.3s ease',
                }}>
                  {card.title}
                </div>
                {/* Tags row with sub label */}
                <div style={{ position: 'relative', paddingBottom: showLabels ? '14px' : '0', transition: 'padding-bottom 0.3s ease' }}>
                  <LBadge
                    text="sub: TagList"
                    depth={3}
                    show={showLabels}
                    animDelay={card.subDelay}
                  />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {card.tags.map((tag) => (
                      <span key={tag} style={{
                        background: 'rgba(139,92,246,0.15)',
                        color: '#c4b5fd',
                        fontSize: '10px',
                        padding: '2px 7px',
                        borderRadius: '4px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Cursor indicator (click phase, before click) ── */}
      {isClick && !clicked && (
        <div style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(59,130,246,0.9)',
          border: '2px solid white',
          boxShadow: '0 0 10px rgba(59,130,246,0.8)',
          animation: 'dldCursorMove 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          pointerEvents: 'none',
          zIndex: 20,
        }} />
      )}

      {/* ── Toast (click phase, after click) ── */}
      {isClick && clicked && (
        <div style={{
          position: 'absolute',
          bottom: '52px',
          left: '50%',
          background: 'rgba(30,41,59,0.95)',
          border: '1px solid rgba(59,130,246,0.5)',
          color: '#93c5fd',
          fontSize: '11px',
          fontWeight: 700,
          padding: '7px 16px',
          borderRadius: '20px',
          animation: 'dldToast 1.2s ease forwards',
          whiteSpace: 'nowrap',
          zIndex: 20,
          backdropFilter: 'blur(6px)',
        }}>
          ✓ 클립보드에 복사됐어요
        </div>
      )}

      {/* ── Clipboard chip (clipboard phase) ── */}
      {isClip && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          background: 'rgba(15,23,42,0.97)',
          border: '1px solid rgba(59,130,246,0.4)',
          borderRadius: '10px',
          padding: '12px 20px',
          animation: 'dldChip 1.5s ease both',
          zIndex: 20,
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', marginBottom: '5px', letterSpacing: '0.5px' }}>
            📋 클립보드
          </div>
          <div style={{
            color: '#93c5fd',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {CLIPBOARD_TEXT}
          </div>
        </div>
      )}

      {/* ── Caption ── */}
      <div key={step} style={{
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        color: 'rgba(148,163,184,0.7)',
        fontSize: '11px',
        textAlign: 'center',
        letterSpacing: '0.3px',
        animation: 'dldFadeIn 0.3s ease',
      }}>
        {caption}
      </div>
    </div>
  )
}
