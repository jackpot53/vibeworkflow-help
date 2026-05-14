'use client'

import { useEffect, useRef, useState } from 'react'

const STEP_MS = 900
const HOLD_MS = 2200
const RESET_MS = 600
const ARROW_TOP = '40px'
const SUB_ITEMS = ['Next.js', 'App Router', 'TypeScript', 'Tailwind', 'shadcn/ui']

function HArrow({ filled, animating }: { filled: boolean; animating: boolean }) {
  return (
    <div style={{ position: 'relative', width: '32px', height: '2px', background: 'rgba(255,255,255,0.08)', flexShrink: 0, marginTop: ARROW_TOP }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', transformOrigin: 'left', transform: `scaleX(${filled ? 1 : 0})`, transition: 'transform 0.35s ease', borderRadius: '2px' }} />
      <div style={{ position: 'absolute', right: '-7px', top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${filled ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`, transition: 'border-left-color 0.35s ease' }} />
      {animating && (
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: '#c4b5fd', boxShadow: '0 0 8px #a78bfa', animation: `stackDot ${STEP_MS}ms ease forwards` }} />
      )}
    </div>
  )
}

function SBox({ icon, label, desc, filled, animating, isLast }: { icon: string; label: string; desc: string; filled: boolean; animating: boolean; isLast?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '12px 14px', borderRadius: '10px', border: `2px solid ${filled ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.08)'}`, background: filled ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)', boxShadow: animating ? '0 0 22px rgba(139,92,246,0.55), 0 0 44px rgba(139,92,246,0.2)' : filled ? '0 0 10px rgba(139,92,246,0.18)' : 'none', transition: 'all 0.35s ease', minWidth: '80px', flexShrink: 0 }}>
      <span style={{ fontSize: '20px', lineHeight: 1, animation: animating ? 'stackPulse 0.55s ease-in-out' : (filled && isLast ? 'stackSuccess 0.7s ease' : 'none'), display: 'block' }}>{icon}</span>
      <span style={{ color: filled ? '#a78bfa' : 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.3px', transition: 'color 0.35s ease', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ color: filled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', fontSize: '10px', textAlign: 'center', transition: 'color 0.35s ease', whiteSpace: 'nowrap', lineHeight: '1.3' }}>{desc}</span>
    </div>
  )
}

export function StackArchitectureDiagram() {
  const [active, setActive] = useState(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let step = 0
    const tick = () => {
      if (step <= 3) {
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
    timerRef.current = setTimeout(tick, 800)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const done = (i: number) => active >= i && active !== -1

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)', borderRadius: '14px', padding: '28px 20px 20px', margin: '24px 0', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        @keyframes stackPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes stackSuccess { 0% { transform: translateY(0); } 30% { transform: translateY(-7px); } 55% { transform: translateY(-3px); } 75% { transform: translateY(-5px); } 100% { transform: translateY(0); } }
        @keyframes stackDot { 0% { left: 4px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% - 10px); opacity: 0; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowX: 'auto', gap: 0, paddingBottom: '4px' }}>

        {/* Box 0: 내 컴퓨터 (wide, with sub-item chips) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '12px 14px', borderRadius: '10px', border: `2px solid ${done(0) ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.08)'}`, background: done(0) ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)', boxShadow: active === 0 ? '0 0 22px rgba(139,92,246,0.55), 0 0 44px rgba(139,92,246,0.2)' : done(0) ? '0 0 10px rgba(139,92,246,0.18)' : 'none', transition: 'all 0.35s ease', minWidth: '155px', flexShrink: 0 }}>
          <span style={{ fontSize: '20px', lineHeight: 1, animation: active === 0 ? 'stackPulse 0.55s ease-in-out' : 'none', display: 'block' }}>💻</span>
          <span style={{ color: done(0) ? '#a78bfa' : 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.3px', transition: 'color 0.35s ease', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>내 컴퓨터</span>
          <span style={{ color: done(0) ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', fontSize: '10px', textAlign: 'center', transition: 'color 0.35s ease', marginBottom: '4px' }}>코드 작성</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center' }}>
            {SUB_ITEMS.map(item => (
              <span key={item} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '4px', border: `1px solid ${done(0) ? 'rgba(139,92,246,0.45)' : 'rgba(255,255,255,0.1)'}`, color: done(0) ? 'rgba(167,139,250,0.85)' : 'rgba(255,255,255,0.2)', transition: 'all 0.35s ease', whiteSpace: 'nowrap' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <HArrow filled={done(1)} animating={active === 1} />

        <SBox icon="📦" label="GitHub" desc="코드 보관" filled={done(1)} animating={active === 1} />

        <HArrow filled={done(2)} animating={active === 2} />

        {/* Vercel + Supabase column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <SBox icon="🚀" label="Vercel" desc="자동 배포" filled={done(2)} animating={active === 2} />
          {/* Bidirectional vertical connector */}
          <div style={{ width: '2px', height: '22px', position: 'relative', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #7c3aed, #a78bfa)', transform: `scaleY(${done(2) ? 1 : 0})`, transformOrigin: 'top', transition: 'transform 0.5s ease', borderRadius: '2px' }} />
            {done(2) && <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid #a78bfa' }} />}
            {done(2) && <div style={{ position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '5px solid #a78bfa' }} />}
          </div>
          {/* Supabase */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '10px 14px', borderRadius: '10px', border: `2px solid ${done(2) ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.07)'}`, background: done(2) ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)', boxShadow: done(2) ? '0 0 10px rgba(139,92,246,0.18)' : 'none', transition: 'all 0.4s ease', minWidth: '80px', flexShrink: 0 }}>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>🗄️</span>
            <span style={{ color: done(2) ? '#a78bfa' : 'rgba(255,255,255,0.25)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.3px', transition: 'color 0.35s ease', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>Supabase</span>
            <span style={{ color: done(2) ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)', fontSize: '10px', textAlign: 'center', transition: 'color 0.35s ease', whiteSpace: 'nowrap' }}>데이터 보관</span>
          </div>
        </div>

        <HArrow filled={done(3)} animating={active === 3} />

        <SBox icon="🌐" label="방문자" desc="브라우저 접속" filled={done(3)} animating={active === 3} isLast />
      </div>

      {/* Zone labels */}
      <div style={{ display: 'flex', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)', gap: '8px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: done(0) ? '#7c3aed' : 'rgba(255,255,255,0.15)', transition: 'background 0.35s ease' }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.5px' }}>코드 작성·배포 영역</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px' }}>•••</span>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: done(3) ? '#0d9488' : 'rgba(255,255,255,0.15)', transition: 'background 0.35s ease' }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.5px' }}>사용자가 만나는 영역</span>
        </div>
      </div>
    </div>
  )
}
