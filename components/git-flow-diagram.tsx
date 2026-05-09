'use client'

import { useEffect, useRef, useState } from 'react'

const STAGES = [
  { icon: '✏️', label: '파일 수정', desc: '코드를 편집합니다' },
  { icon: '📦', label: 'git add', desc: '변경사항을 선택합니다' },
  { icon: '💾', label: 'git commit', desc: '스냅샷을 저장합니다' },
  { icon: '🚀', label: 'git push', desc: '원격으로 전송합니다' },
  { icon: '☁️', label: 'GitHub', desc: '원격 저장소에 반영됩니다' },
]

const STEP_MS = 750
const HOLD_MS = 1800
const RESET_MS = 500

export function GitFlowDiagram() {
  const [active, setActive] = useState(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let step = 0

    const tick = () => {
      if (step <= STAGES.length - 1) {
        setActive(step)
        step++
        timerRef.current = setTimeout(tick, STEP_MS)
      } else {
        timerRef.current = setTimeout(() => {
          setActive(-1)
          step = 0
          timerRef.current = setTimeout(tick, RESET_MS)
        }, HOLD_MS)
      }
    }

    timerRef.current = setTimeout(tick, 600)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const isDone = (i: number) => active >= i && active !== -1

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
      borderRadius: '14px',
      padding: '28px 20px 20px',
      margin: '24px 0',
      fontFamily: 'system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes gfPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes gfDot {
          0%   { left: 4px;  opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: calc(100% - 10px); opacity: 0; }
        }
        @keyframes gfSuccess {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-7px); }
          55%  { transform: translateY(-3px); }
          75%  { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Stages row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'auto',
        paddingBottom: '4px',
        gap: 0,
      }}>
        {STAGES.map((stage, i) => {
          const isActive = active === i
          const done = isDone(i)
          const isLast = i === STAGES.length - 1

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {/* Box */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: `2px solid ${done ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.08)'}`,
                background: done ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                boxShadow: isActive
                  ? '0 0 22px rgba(139,92,246,0.55), 0 0 44px rgba(139,92,246,0.2)'
                  : done ? '0 0 10px rgba(139,92,246,0.18)' : 'none',
                transition: 'all 0.35s ease',
                minWidth: '80px',
              }}>
                <span style={{
                  fontSize: '22px',
                  lineHeight: 1,
                  animation: isActive
                    ? 'gfPulse 0.55s ease-in-out'
                    : (done && isLast ? 'gfSuccess 0.7s ease' : 'none'),
                  display: 'block',
                }}>
                  {stage.icon}
                </span>
                <span style={{
                  color: done ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.3px',
                  transition: 'color 0.35s ease',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}>
                  {stage.label}
                </span>
                <span style={{
                  color: done ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                  fontSize: '10px',
                  textAlign: 'center',
                  transition: 'color 0.35s ease',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.3,
                }}>
                  {stage.desc}
                </span>
              </div>

              {/* Arrow */}
              {i < STAGES.length - 1 && (
                <div style={{
                  position: 'relative',
                  width: '36px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}>
                  {/* Fill */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                    transformOrigin: 'left',
                    transform: `scaleX(${isDone(i + 1) ? 1 : 0})`,
                    transition: 'transform 0.35s ease',
                    borderRadius: '2px',
                  }} />
                  {/* Arrowhead */}
                  <div style={{
                    position: 'absolute',
                    right: '-7px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: `8px solid ${isDone(i + 1) ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
                    transition: 'border-left-color 0.35s ease',
                  }} />
                  {/* Traveling dot */}
                  {active === i + 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#c4b5fd',
                      boxShadow: '0 0 8px #a78bfa',
                      animation: `gfDot ${STEP_MS}ms ease forwards`,
                    }} />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Zone labels */}
      <div style={{
        display: 'flex',
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: isDone(0) ? '#7c3aed' : 'rgba(255,255,255,0.15)',
            transition: 'background 0.35s ease',
          }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.5px' }}>
            내 컴퓨터 (로컬)
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px' }}>•••</span>
        <div style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: isDone(4) ? '#3b82f6' : 'rgba(255,255,255,0.15)',
            transition: 'background 0.35s ease',
          }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.5px' }}>
            원격 저장소 (GitHub)
          </span>
        </div>
      </div>
    </div>
  )
}
