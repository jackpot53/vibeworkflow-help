'use client'

const SECTIONS = [
  {
    name: 'Navbar',
    height: 36,
    bg: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.4)',
    label: '#a5b4fc',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: 48, height: 8, borderRadius: 4, background: 'rgba(165,180,252,0.5)' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[32, 28, 32].map((w, i) => (
            <div key={i} style={{ width: w, height: 7, borderRadius: 3, background: 'rgba(165,180,252,0.25)' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Hero',
    height: 80,
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.35)',
    label: '#c4b5fd',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 6 }}>
        <div style={{ width: 110, height: 10, borderRadius: 4, background: 'rgba(196,181,253,0.5)' }} />
        <div style={{ width: 80, height: 7, borderRadius: 3, background: 'rgba(196,181,253,0.25)' }} />
        <div style={{ width: 52, height: 18, borderRadius: 6, background: 'rgba(139,92,246,0.5)', marginTop: 2 }} />
      </div>
    ),
  },
  {
    name: 'Features',
    height: 68,
    bg: 'rgba(59,130,246,0.10)',
    border: 'rgba(59,130,246,0.30)',
    label: '#93c5fd',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', paddingTop: 4 }}>
        <div style={{ width: 70, height: 7, borderRadius: 3, background: 'rgba(147,197,253,0.4)', alignSelf: 'center' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'How it works',
    height: 56,
    bg: 'rgba(20,184,166,0.10)',
    border: 'rgba(20,184,166,0.30)',
    label: '#5eead4',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', paddingTop: 4 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(20,184,166,0.3)', border: '1px solid rgba(94,234,212,0.4)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#5eead4', fontSize: 9, fontWeight: 700 }}>{i}</span>
            </div>
            <div style={{ flex: 1, height: 7, borderRadius: 3, background: 'rgba(94,234,212,0.2)' }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Pricing',
    height: 72,
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.28)',
    label: '#fde047',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', paddingTop: 4 }}>
        <div style={{ width: 52, height: 7, borderRadius: 3, background: 'rgba(253,224,71,0.35)', alignSelf: 'center' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 32, borderRadius: 6, background: i === 2 ? 'rgba(234,179,8,0.18)' : 'rgba(234,179,8,0.07)', border: i === 2 ? '1px solid rgba(253,224,71,0.4)' : '1px solid rgba(234,179,8,0.15)' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Testimonials',
    height: 52,
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.25)',
    label: '#f9a8d4',
    content: (
      <div style={{ display: 'flex', gap: 6, width: '100%', paddingTop: 4 }}>
        {[1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(236,72,153,0.10)', border: '1px solid rgba(249,168,212,0.2)', padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: '80%', height: 5, borderRadius: 2, background: 'rgba(249,168,212,0.3)' }} />
            <div style={{ width: '60%', height: 5, borderRadius: 2, background: 'rgba(249,168,212,0.18)' }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'FAQ',
    height: 48,
    bg: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.25)',
    label: '#fdba74',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', paddingTop: 2 }}>
        {[1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
            <div style={{ width: '75%', height: 6, borderRadius: 3, background: 'rgba(253,186,116,0.3)' }} />
            <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(253,186,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fdba74', fontSize: 8 }}>+</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'CTA',
    height: 52,
    bg: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.40)',
    label: '#c4b5fd',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 4 }}>
        <div style={{ width: 90, height: 8, borderRadius: 4, background: 'rgba(196,181,253,0.45)' }} />
        <div style={{ width: 64, height: 20, borderRadius: 6, background: 'rgba(139,92,246,0.55)', border: '1px solid rgba(196,181,253,0.4)' }} />
      </div>
    ),
  },
  {
    name: 'Footer',
    height: 40,
    bg: 'rgba(100,116,139,0.12)',
    border: 'rgba(100,116,139,0.30)',
    label: '#94a3b8',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: 40, height: 6, borderRadius: 3, background: 'rgba(148,163,184,0.35)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[20, 20, 20].map((w, i) => (
            <div key={i} style={{ width: w, height: 6, borderRadius: 3, background: 'rgba(148,163,184,0.2)' }} />
          ))}
        </div>
      </div>
    ),
  },
]

export function SectionMap() {
  return (
    <div
      className="not-prose"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
        borderRadius: 14,
        padding: '20px 20px 16px',
        margin: '24px 0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Browser chrome */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '10px 10px 0 0',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />
        ))}
        <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.06)', marginLeft: 6 }} />
      </div>

      {/* Page layout */}
      <div style={{
        background: '#0f172a',
        borderRadius: '0 0 10px 10px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: 'none',
      }}>
        {SECTIONS.map((s, i) => (
          <div
            key={s.name}
            style={{
              position: 'relative',
              height: s.height,
              background: s.bg,
              borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
            }}
          >
            {/* Section name label */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: s.border,
              color: s.label,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: '2px 8px',
              borderRadius: '0 0 6px 0',
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
            }}>
              {s.name}
            </div>

            {/* Section content sketch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              paddingTop: 10,
            }}>
              {s.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
