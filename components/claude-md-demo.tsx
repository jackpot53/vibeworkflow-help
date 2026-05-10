'use client'

import { useEffect, useRef, useState } from 'react'

type Mood = 'normal' | 'confused' | 'tired' | 'reading' | 'happy'
interface Msg { role: 'user' | 'claude' | 'system'; text: string }
interface StepCfg {
  phase: 'before' | 'transition' | 'after'
  n: number
  mood: Mood
  caption: string
  dur: number
}

const BEFORE: Msg[] = [
  { role: 'user',   text: '안녕! 이 프로젝트는 Next.js야' },
  { role: 'claude', text: '알겠어요! ✅' },
  { role: 'system', text: '— 새 대화 시작 —' },
  { role: 'user',   text: '아, 맞다. 이 프로젝트는 Next.js야...' },
  { role: 'claude', text: '기억 못 했어요 😅' },
  { role: 'system', text: '— 또 새 대화 시작 —' },
  { role: 'user',   text: '이번에도... Next.js야 😮‍💨' },
]

const AFTER: Msg[] = [
  { role: 'system', text: '— 새 대화 시작 —' },
  { role: 'claude', text: '📖 CLAUDE.md 읽는 중...' },
  { role: 'user',   text: '버튼 만들어줘' },
  { role: 'claude', text: 'Next.js 기준으로 바로 만들게요! 🚀' },
]

const STEPS: StepCfg[] = [
  { phase: 'before',     n: 1, mood: 'normal',   caption: '매 세션마다 같은 설명을 반복해야 해요',     dur: 1500 },
  { phase: 'before',     n: 3, mood: 'normal',   caption: '새 세션이 시작되면 기억이 초기화돼요',      dur: 1400 },
  { phase: 'before',     n: 4, mood: 'confused', caption: '새 세션이 시작되면 기억이 초기화돼요',      dur: 1500 },
  { phase: 'before',     n: 6, mood: 'confused', caption: '새 세션이 시작되면 기억이 초기화돼요',      dur: 1400 },
  { phase: 'before',     n: 7, mood: 'tired',    caption: '이 설명, 몇 번째인지 모르겠어요...',        dur: 1800 },
  { phase: 'transition', n: 0, mood: 'normal',   caption: '',                                          dur: 2300 },
  { phase: 'after',      n: 2, mood: 'reading',  caption: 'Claude가 자동으로 프로젝트 정보를 읽어요',  dur: 1400 },
  { phase: 'after',      n: 3, mood: 'happy',    caption: '설명 없이 바로 작업 지시만 해요',            dur: 1500 },
  { phase: 'after',      n: 4, mood: 'happy',    caption: '한 번만 적으면 끝! 매 세션 설명 불필요 ✨',  dur: 2500 },
]

function RobotFace({ mood }: { mood: Mood }) {
  const isHappy    = mood === 'happy'
  const isTired    = mood === 'tired'
  const isConfused = mood === 'confused'
  const isReading  = mood === 'reading'
  const accent = isHappy ? '#c4b5fd' : '#a78bfa'
  const border = isTired || isConfused ? '#581c87' : isHappy ? '#a78bfa' : '#7c3aed'

  return (
    <svg width="52" height="58" viewBox="0 0 52 58" fill="none" style={{ flexShrink: 0, transition: 'all 0.5s ease' }}>
      {/* Antenna */}
      <line x1="26" y1="11" x2="26" y2="4" stroke={border} strokeWidth="2" strokeLinecap="round" style={{ transition: 'stroke 0.5s ease' }}/>
      <circle cx="26" cy="3" r="2.5" fill={accent} style={{ transition: 'fill 0.5s ease' }}/>
      {/* Head */}
      <rect x="3" y="11" width="46" height="43" rx="9" fill="#0f172a" stroke={border} strokeWidth="1.5"
        style={{ transition: 'stroke 0.5s ease, filter 0.5s ease', filter: isHappy ? 'drop-shadow(0 0 6px rgba(167,139,250,0.5))' : 'none' }}
      />
      {/* Eyes */}
      {isReading ? (
        <>
          <circle cx="15" cy="28" r="7" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.55"/>
          <circle cx="37" cy="28" r="7" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.55"/>
          <line x1="22" y1="28" x2="30" y2="28" stroke={accent} strokeWidth="1.5"/>
          <circle cx="15" cy="28" r="2.5" fill={accent}/>
          <circle cx="37" cy="28" r="2.5" fill={accent}/>
        </>
      ) : isTired ? (
        <>
          <path d="M10 28 Q15 25 20 28" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 28 Q37 25 42 28" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <circle cx="15" cy="28" r="4" fill={accent} style={{ transition: 'all 0.5s ease' }}/>
          <circle cx="37" cy="28" r="4" fill={accent} style={{ transition: 'all 0.5s ease' }}/>
          {isHappy && (
            <>
              <circle cx="15" cy="28" r="2"   fill="#0f172a"/>
              <circle cx="37" cy="28" r="2"   fill="#0f172a"/>
              <circle cx="16.5" cy="26.5" r="1" fill="white" opacity="0.9"/>
              <circle cx="38.5" cy="26.5" r="1" fill="white" opacity="0.9"/>
            </>
          )}
          {isConfused && (
            <path d="M33 21 Q37 23 33 25" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
          )}
        </>
      )}
      {/* Mouth */}
      {isHappy    && <path d="M15 44 Q26 51 37 44" stroke={accent} strokeWidth="2" strokeLinecap="round"/>}
      {isTired    && <path d="M15 47 Q26 43 37 47" stroke={accent} strokeWidth="2" strokeLinecap="round"/>}
      {isConfused && <path d="M15 46 Q26 42 37 46" stroke={accent} strokeWidth="2" strokeLinecap="round"/>}
      {!isHappy && !isTired && !isConfused && (
        <line x1="15" y1="44" x2="37" y2="44" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      )}
    </svg>
  )
}

export function ClaudeMdDemo() {
  const [step, setStep] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const go = (s: number) => {
      timer.current = setTimeout(() => {
        const next = (s + 1) % STEPS.length
        setStep(next)
        go(next)
      }, STEPS[s].dur)
    }
    go(0)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  const cfg      = STEPS[step]
  const isBefore = cfg.phase === 'before'
  const isAfter  = cfg.phase === 'after'
  const isTrans  = cfg.phase === 'transition'
  const msgs     = isBefore ? BEFORE.slice(0, cfg.n) : isAfter ? AFTER.slice(0, cfg.n) : []

  return (
    <div
      className="not-prose"
      style={{
        background: isAfter
          ? 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1a0a1a 100%)',
        borderRadius: '14px',
        padding: '20px',
        margin: '24px 0',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '195px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.8s ease',
      }}
    >
      <style>{`
        @keyframes cmdFadeUp {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes cmdFileDrop {
          0%   { opacity: 0; transform: translateY(-22px) scale(0.84); }
          65%  { transform: translateY(3px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes cmdSparkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
        @keyframes cmdBgPulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.9;  }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:       0.01ms !important;
            animation-iteration-count: 1     !important;
            transition-duration:      0.01ms !important;
          }
        }
      `}</style>

      {/* ── Phase badge ─────────────────────────────── */}
      {!isTrans && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '20px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px',
            background: isBefore ? 'rgba(239,68,68,0.12)'    : 'rgba(139,92,246,0.18)',
            color:      isBefore ? '#f87171'                  : '#a78bfa',
            border: `1px solid ${isBefore ? 'rgba(239,68,68,0.25)' : 'rgba(139,92,246,0.35)'}`,
          }}>
            {isBefore ? 'CLAUDE.md 없을 때' : 'CLAUDE.md 있을 때'}
          </span>
          {isAfter && (
            <span style={{
              padding: '3px 10px', borderRadius: '20px',
              fontSize: '11px', fontWeight: 600,
              background: 'rgba(139,92,246,0.1)',
              color: '#c4b5fd',
              border: '1px solid rgba(139,92,246,0.3)',
            }}>
              📄 CLAUDE.md
            </span>
          )}
        </div>
      )}

      {/* ── Transition scene ────────────────────────── */}
      {isTrans && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '155px', gap: '14px',
          animation: 'cmdFadeUp 0.35s ease',
        }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.32) 0%, transparent 70%)',
              animation: 'cmdBgPulse 1.6s ease infinite',
            }}/>
            <div style={{
              width: '68px', height: '68px', borderRadius: '14px',
              background: 'rgba(139,92,246,0.12)',
              border: '2px solid rgba(139,92,246,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '30px', position: 'relative', zIndex: 1,
              animation: 'cmdFileDrop 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
            }}>📄</div>
            {[
              { top: '4px',   right: '-2px'  },
              { top: '-4px',  right: '18px'  },
              { bottom: '4px', left: '-2px'  },
              { bottom: '-4px', left: '18px' },
            ].map((pos, i) => (
              <span key={i} style={{
                position: 'absolute', fontSize: '13px',
                animation: `cmdSparkle 1.2s ease ${i * 0.18}s infinite`,
                ...pos,
              }}>✨</span>
            ))}
          </div>
          <div style={{ color: '#c4b5fd', fontWeight: 700, fontSize: '15px', animation: 'cmdFadeUp 0.4s ease 0.25s both' }}>
            CLAUDE.md 생성됨!
          </div>
          <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '12px', animation: 'cmdFadeUp 0.4s ease 0.45s both' }}>
            이제 Claude가 매 세션마다 이 파일을 자동으로 읽어요
          </div>
        </div>
      )}

      {/* ── Chat scene ──────────────────────────────── */}
      {!isTrans && (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          {/* Character */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0, paddingTop: '2px' }}>
            <RobotFace mood={cfg.mood} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.3px' }}>Claude</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
            {msgs.map((msg, i) => {
              const msgKey = `${cfg.phase[0]}${i}`
              const delay  = `${i * 105}ms`

              if (msg.role === 'system') return (
                <div key={msgKey} style={{ display: 'flex', alignItems: 'center', gap: '8px', animation: `cmdFadeUp 0.28s ease ${delay} both` }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>{msg.text}</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}/>
                </div>
              )

              if (msg.role === 'user') return (
                <div key={msgKey} style={{ display: 'flex', justifyContent: 'flex-end', animation: `cmdFadeUp 0.28s ease ${delay} both` }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '11px 11px 2px 11px',
                    padding: '7px 12px',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '13px', maxWidth: '76%',
                  }}>{msg.text}</div>
                </div>
              )

              return (
                <div key={msgKey} style={{ display: 'flex', justifyContent: 'flex-start', animation: `cmdFadeUp 0.28s ease ${delay} both` }}>
                  <div style={{
                    background: isAfter ? 'rgba(139,92,246,0.13)' : 'rgba(139,92,246,0.07)',
                    border: `1px solid ${isAfter ? 'rgba(139,92,246,0.35)' : 'rgba(139,92,246,0.18)'}`,
                    borderRadius: '11px 11px 11px 2px',
                    padding: '7px 12px',
                    color: isAfter ? '#c4b5fd' : '#a78bfa',
                    fontSize: '13px', maxWidth: '76%',
                  }}>{msg.text}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Caption ─────────────────────────────────── */}
      {!isTrans && cfg.caption && (
        <div style={{
          marginTop: '14px', paddingTop: '12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          color: isBefore ? 'rgba(248,113,113,0.52)' : 'rgba(167,139,250,0.62)',
          fontSize: '11px', textAlign: 'center', letterSpacing: '0.3px',
        }}>
          {cfg.caption}
        </div>
      )}
    </div>
  )
}
