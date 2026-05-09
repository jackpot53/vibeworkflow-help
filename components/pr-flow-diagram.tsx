'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = ['commit1', 'commit2', 'commit3', 'pr_open', 'reviewing', 'approved', 'merging', 'merged'] as const
type Step = typeof STEPS[number]

const STEP_DELAY: Record<Step, number> = {
  commit1: 420,
  commit2: 420,
  commit3: 420,
  pr_open: 620,
  reviewing: 750,
  approved: 650,
  merging: 620,
  merged: 650,
}

export function PRFlowDiagram() {
  const [stepIdx, setStepIdx] = useState(-1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const run = () => {
      let idx = -1
      const advance = () => {
        idx++
        if (idx < STEPS.length) {
          setStepIdx(idx)
          timer.current = setTimeout(advance, STEP_DELAY[STEPS[idx]])
        } else {
          timer.current = setTimeout(() => {
            setStepIdx(-1)
            timer.current = setTimeout(run, 500)
          }, 2200)
        }
      }
      timer.current = setTimeout(advance, STEP_DELAY.commit1)
    }
    timer.current = setTimeout(run, 600)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  const gte = (s: Step) => stepIdx >= STEPS.indexOf(s)

  const commitCount = gte('commit3') ? 3 : gte('commit2') ? 2 : gte('commit1') ? 1 : 0
  const prOpen     = gte('pr_open')
  const reviewing  = gte('reviewing')
  const approved   = gte('approved')
  const merging    = gte('merging')
  const merged     = gte('merged')

  // Layout
  const W = 620, H = 174
  const mainY = 50, featY = 134
  const forkX = 68
  const cx = [148, 212, 276]
  const prL = 322, prR = 470, prT = 80, prB = 124
  const prMX = (prL + prR) / 2
  const prMY = (prT + prB) / 2
  const mergeX = 558

  const mainC  = '#60a5fa'
  const featC  = '#a78bfa'
  const prC    = approved ? '#34d399' : '#fbbf24'
  const prBg   = approved ? 'rgba(52,211,153,0.14)' : 'rgba(251,191,36,0.11)'
  const mergeC = '#34d399'

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
      borderRadius: 14,
      padding: '24px 16px 14px',
      margin: '24px 0',
      overflowX: 'auto',
    }}>
      <style>{`
        @keyframes prFadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes prSlideIn  { from { opacity:0; transform:translateY(7px) } to { opacity:1; transform:none } }
        @keyframes prDrawLine { from { stroke-dashoffset:200 } to { stroke-dashoffset:0 } }
        @keyframes prPopIn    { 0%{opacity:0;transform:scale(0)} 65%{transform:scale(1.15)} 100%{opacity:1;transform:scale(1)} }
      `}</style>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: 440, display: 'block' }}>

        {/* ── MAIN BRANCH ── */}
        <line x1={20} y1={mainY} x2={mergeX + 44} y2={mainY}
          stroke={mainC} strokeWidth={2.5} opacity={0.35} />
        <circle cx={20} cy={mainY} r={5} fill={mainC} opacity={0.7} />
        <text x={20} y={mainY - 13} fill={mainC} fontSize={11}
          fontFamily="monospace" fontWeight={700} opacity={0.75}>main</text>

        {/* ── FEATURE BRANCH ── */}
        <path d={`M ${forkX} ${mainY} C ${forkX} ${mainY+28} ${forkX} ${featY-22} ${forkX} ${featY}`}
          fill="none" stroke={featC} strokeWidth={2} opacity={0.5} />
        <line x1={forkX} y1={featY} x2={prL - 6} y2={featY}
          stroke={featC} strokeWidth={2} opacity={0.35} />
        <text x={forkX + 6} y={featY + 15} fill={featC} fontSize={10}
          fontFamily="monospace" fontWeight={700} opacity={0.7}>feature/login</text>

        {/* ── COMMITS ── */}
        {commitCount >= 1 && (
          <g style={{ animation: 'prFadeIn 0.3s ease-out' }}>
            <circle cx={cx[0]} cy={featY} r={6} fill={featC} />
            <text x={cx[0]} y={featY - 12} fill={featC} fontSize={9}
              fontFamily="system-ui" textAnchor="middle" opacity={0.65}>코드 작성</text>
          </g>
        )}
        {commitCount >= 2 && (
          <g style={{ animation: 'prFadeIn 0.3s ease-out' }}>
            <circle cx={cx[1]} cy={featY} r={6} fill={featC} />
            <text x={cx[1]} y={featY - 12} fill={featC} fontSize={9}
              fontFamily="system-ui" textAnchor="middle" opacity={0.65}>기능 추가</text>
          </g>
        )}
        {commitCount >= 3 && (
          <g style={{ animation: 'prFadeIn 0.3s ease-out' }}>
            <circle cx={cx[2]} cy={featY} r={6} fill={featC} />
            <text x={cx[2]} y={featY - 12} fill={featC} fontSize={9}
              fontFamily="system-ui" textAnchor="middle" opacity={0.65}>테스트</text>
          </g>
        )}

        {/* ── CONNECTOR: feature → PR box ── */}
        {prOpen && (
          <line x1={prL - 6} y1={featY} x2={prL} y2={prMY}
            stroke={prC} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.55} />
        )}

        {/* ── PR BOX ── */}
        {prOpen && (
          <g style={{ animation: 'prSlideIn 0.35s ease-out' }}>
            <rect x={prL} y={prT} width={prR - prL} height={prB - prT}
              rx={9} fill={prBg} stroke={prC} strokeWidth={2} />
            {!approved ? (
              <>
                <text x={prMX} y={prT + 20} fill={prC} fontSize={11}
                  fontFamily="system-ui" textAnchor="middle" fontWeight={700}>PR 생성</text>
                <text x={prMX} y={prT + 36} fill="rgba(255,255,255,0.5)" fontSize={9}
                  fontFamily="system-ui" textAnchor="middle">
                  {reviewing ? '👀 팀원 코드 리뷰 중...' : 'Pull Request 열림'}
                </text>
              </>
            ) : (
              <>
                <text x={prMX} y={prT + 20} fill={prC} fontSize={11}
                  fontFamily="system-ui" textAnchor="middle" fontWeight={700}>✅ 승인됨</text>
                <text x={prMX} y={prT + 36} fill="rgba(255,255,255,0.5)" fontSize={9}
                  fontFamily="system-ui" textAnchor="middle">Merge 준비 완료</text>
              </>
            )}
          </g>
        )}

        {/* ── MERGE CURVE: PR box → main ── */}
        {merging && (
          <path
            d={`M ${prR} ${prMY} C ${prR+38} ${prMY} ${mergeX-18} ${mainY+22} ${mergeX} ${mainY}`}
            fill="none" stroke={mergeC} strokeWidth={2.5}
            strokeDasharray="200" strokeDashoffset="200"
            style={{ animation: 'prDrawLine 0.65s ease-in-out forwards' }}
          />
        )}

        {/* ── MERGE COMMIT DOT on main ── */}
        {merged && (
          <g style={{ animation: 'prPopIn 0.45s ease-out' }}>
            <circle cx={mergeX} cy={mainY} r={9} fill={mergeC} />
            <text x={mergeX} y={mainY - 16} fill={mergeC} fontSize={10}
              fontFamily="system-ui" textAnchor="middle" fontWeight={700}>main 반영 ✓</text>
          </g>
        )}

      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
        {[
          { c: featC,    t: 'feature 브랜치에서 개발' },
          { c: '#fbbf24', t: 'PR 생성 & 코드 리뷰' },
          { c: mergeC,   t: 'main에 merge' },
        ].map(({ c, t }) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
