'use client'

import { useState } from 'react'
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import { FileText, Image, Search, Rocket } from 'lucide-react'

function BrowserWindow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ background: '#f8fafc', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #e2e8f0' }}>
        {(['#ff5f57', '#ffbd2e', '#28ca41'] as const).map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
        ))}
        <div style={{ flex: 1, background: '#fff', borderRadius: 3, padding: '2px 8px', marginLeft: 8, fontSize: 10, color: '#94a3b8', fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0' }}>
          localhost:3000
        </div>
      </div>
      <div style={{ padding: '16px', minHeight: 100, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </div>
    </div>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
      <path d="M3 5l4 4 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WebLayersDemo() {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [clicked, setClicked] = useState(false)

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 2500)
  }

  const rowStyle = (isOpen: boolean): React.CSSProperties => ({
    borderBottom: '1px solid #f1f5f9',
  })

  const headerStyle = (color: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 20px',
    cursor: 'pointer',
    userSelect: 'none',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  })

  const bodyStyle = (isOpen: boolean): React.CSSProperties => ({
    padding: isOpen ? '0 20px 20px' : '0 20px',
    maxHeight: isOpen ? '600px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.25s ease, padding 0.25s ease',
  })

  return (
    <div data-section-preview style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', margin: '24px 0', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        .wld-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 580px) { .wld-grid { grid-template-columns: 1fr; } }
        .wld-code {
          background: #0f172a;
          border-radius: 6px;
          padding: 14px 16px;
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 12px;
          line-height: 1.8;
          white-space: pre;
          overflow-x: auto;
        }
        .wld-header:hover { background: #fafafa !important; }
        .wld-js-btn { transition: background 0.2s, transform 0.15s; }
        .wld-js-btn:hover { filter: brightness(1.1); }
      `}</style>

      {/* Row 1 — HTML */}
      <div style={rowStyle(open['html'])}>
        <button className="wld-header" onClick={() => toggle('html')} style={headerStyle('#ea580c')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#ea580c', minWidth: 80 }}><SiHtml5 size={16} />HTML</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>뼈대 — 무엇을 보여줄지 정해요</span>
          <Chevron open={open['html']} />
        </button>
        <div style={bodyStyle(open['html'])}>
          <div className="wld-grid">
            <div className="wld-code">
              <span style={{ color: '#f97316' }}>&lt;h1&gt;</span><span style={{ color: '#e2e8f0' }}>안녕하세요</span><span style={{ color: '#f97316' }}>&lt;/h1&gt;</span>{'\n'}
              <span style={{ color: '#f97316' }}>&lt;p&gt;</span><span style={{ color: '#e2e8f0' }}>저는 김아무개입니다.</span><span style={{ color: '#f97316' }}>&lt;/p&gt;</span>{'\n'}
              <span style={{ color: '#f97316' }}>&lt;button&gt;</span><span style={{ color: '#e2e8f0' }}>인사하기</span><span style={{ color: '#f97316' }}>&lt;/button&gt;</span>
            </div>
            <BrowserWindow>
              <h1 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>안녕하세요</h1>
              <p style={{ margin: '0 0 10px', fontSize: 14 }}>저는 김아무개입니다.</p>
              <button style={{ fontSize: 13 }}>인사하기</button>
            </BrowserWindow>
          </div>
        </div>
      </div>

      {/* Row 2 — CSS */}
      <div style={rowStyle(open['css'])}>
        <button className="wld-header" onClick={() => toggle('css')} style={headerStyle('#4f46e5')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#4f46e5', minWidth: 80 }}><SiCss size={16} />CSS</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>디자인 — 색상, 크기, 모양을 입혀요</span>
          <Chevron open={open['css']} />
        </button>
        <div style={bodyStyle(open['css'])}>
          <div className="wld-grid">
            <div className="wld-code">
              <span style={{ color: '#a78bfa' }}>h1</span><span style={{ color: '#64748b' }}> {'{ '}</span><span style={{ color: '#67e8f9' }}>color</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>#1e293b</span><span style={{ color: '#64748b' }}> {'}'}</span>{'\n'}
              <span style={{ color: '#a78bfa' }}>p</span><span style={{ color: '#64748b' }}>{'  { '}</span><span style={{ color: '#67e8f9' }}>color</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>#64748b</span><span style={{ color: '#64748b' }}> {'}'}</span>{'\n\n'}
              <span style={{ color: '#a78bfa' }}>button</span><span style={{ color: '#64748b' }}> {'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#67e8f9' }}>background</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>#4f46e5</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
              {'  '}<span style={{ color: '#67e8f9' }}>color</span><span style={{ color: '#64748b' }}>:     </span><span style={{ color: '#86efac' }}>white</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
              {'  '}<span style={{ color: '#67e8f9' }}>border-radius</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>6px</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
              <span style={{ color: '#64748b' }}>{'}'}</span>
            </div>
            <BrowserWindow>
              <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>안녕하세요</h1>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: '#64748b' }}>저는 김아무개입니다.</p>
              <button style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'default' }}>
                인사하기
              </button>
            </BrowserWindow>
          </div>
        </div>
      </div>

      {/* Row 3 — CSS 도구 */}
      <div style={rowStyle(open['css-tools'])}>
        <button className="wld-header" onClick={() => toggle('css-tools')} style={headerStyle('#0d9488')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#0d9488', minWidth: 80 }}><SiTailwindcss size={16} />CSS 도구</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>Tailwind CSS · shadcn/ui — 더 빠르게 디자인해요</span>
          <Chevron open={open['css-tools']} />
        </button>
        <div style={bodyStyle(open['css-tools'])}>
          <div style={{ color: '#475569', lineHeight: 1.7 }}>
            <p style={{ marginTop: 0 }}>CSS를 직접 쓰는 건 번거로워요. 버튼 하나를 만들려면 파일을 따로 만들고, 클래스 이름을 짓고, 속성을 하나하나 입력해야 해요. 스타일이 조금 달라질 때마다 새 클래스를 추가해야 해서 파일이 금방 복잡해져요.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSS 직접 작성</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#a78bfa' }}>.button</span><span style={{ color: '#64748b' }}> {'{'}</span>{'\n'}
                  {'  '}<span style={{ color: '#67e8f9' }}>background</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>#4f46e5</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
                  {'  '}<span style={{ color: '#67e8f9' }}>color</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>white</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
                  {'  '}<span style={{ color: '#67e8f9' }}>padding</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>8px 16px</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
                  {'  '}<span style={{ color: '#67e8f9' }}>border-radius</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#86efac' }}>6px</span><span style={{ color: '#64748b' }}>;</span>{'\n'}
                  <span style={{ color: '#64748b' }}>{'}'}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0d9488', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tailwind CSS</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#f97316' }}>&lt;button</span>{'\n'}
                  {'  '}<span style={{ color: '#67e8f9' }}>class</span><span style={{ color: '#64748b' }}>="</span><span style={{ color: '#86efac' }}>bg-indigo-600</span>{'\n'}
                  {'         '}<span style={{ color: '#86efac' }}>text-white</span>{'\n'}
                  {'         '}<span style={{ color: '#86efac' }}>px-4 py-2</span>{'\n'}
                  {'         '}<span style={{ color: '#86efac' }}>rounded</span><span style={{ color: '#64748b' }}>"</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&gt;</span>
                </div>
              </div>
            </div>
            <p style={{ margin: '12px 0 4px', fontWeight: 600, color: '#1e293b', fontSize: 13 }}>shadcn/ui</p>
            <p style={{ margin: 0 }}>버튼, 카드, 모달처럼 자주 쓰는 UI 조각을 미리 만들어서 제공해요. 잘 만들어진 가구를 사다 쓰듯, 처음부터 만들 필요 없이 가져다 붙이고 원하는 부분만 고치면 돼요. <a href="https://ui.shadcn.com/docs/components/accordion" target="_blank" rel="noreferrer" style={{ color: '#0d9488' }}>어떤 컴포넌트가 있는지 살펴보기 →</a></p>
          </div>
        </div>
      </div>

      {/* Row 4 — JavaScript */}
      <div style={rowStyle(open['js'])}>
        <button className="wld-header" onClick={() => toggle('js')} style={headerStyle('#ca8a04')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#ca8a04', minWidth: 80 }}><SiJavascript size={16} />JavaScript</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>동작 — 클릭, 반응, 움직임을 만들어요</span>
          <Chevron open={open['js']} />
        </button>
        <div style={bodyStyle(open['js'])}>
          <div className="wld-grid">
            <div className="wld-code">
              <span style={{ color: '#e2e8f0' }}>button.</span><span style={{ color: '#93c5fd' }}>addEventListener</span><span style={{ color: '#e2e8f0' }}>(</span>{'\n'}
              {'  '}<span style={{ color: '#86efac' }}>'click'</span><span style={{ color: '#e2e8f0' }}>, () =&gt; {'{'}</span>{'\n'}
              {'    '}<span style={{ color: '#e2e8f0' }}>button.textContent</span>{'\n'}
              {'      '}<span style={{ color: '#e2e8f0' }}>= </span><span style={{ color: '#86efac' }}>'반가워요! 👋'</span>{'\n'}
              {'  '}<span style={{ color: '#e2e8f0' }}>{'}'}</span>{'\n'}
              <span style={{ color: '#e2e8f0' }}>)</span>
            </div>
            <BrowserWindow>
              <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>안녕하세요</h1>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: '#64748b' }}>저는 김아무개입니다.</p>
              <button
                className="wld-js-btn"
                onClick={handleClick}
                style={{
                  background: clicked ? '#16a34a' : '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transform: clicked ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {clicked ? '반가워요! 👋' : '인사하기'}
              </button>
              {clicked && (
                <p style={{ margin: '8px 0 0', fontSize: 11, color: '#16a34a' }}>✓ 클릭 이벤트가 실행됐어요</p>
              )}
            </BrowserWindow>
          </div>
        </div>
      </div>

      {/* Row 5 — TypeScript */}
      <div style={rowStyle(open['ts'])}>
        <button className="wld-header" onClick={() => toggle('ts')} style={headerStyle('#2563eb')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#2563eb', minWidth: 80 }}><SiTypescript size={16} />TypeScript</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>안전망 — 실행 전에 실수를 잡아줘요</span>
          <Chevron open={open['ts']} />
        </button>
        <div style={bodyStyle(open['ts'])}>
          <div style={{ color: '#475569', lineHeight: 1.7 }}>
            <p style={{ marginTop: 0 }}>JavaScript는 워낙 자유로운 언어라 코드를 실행해보기 전까지는 실수를 알아채기 어려워요. 숫자를 넣어야 하는 곳에 실수로 텍스트를 넣어도 아무 경고 없이 넘어가다가, 실제 서비스가 돌아갈 때 갑자기 오류가 터지는 식이에요.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>JavaScript — 실행 전까지 모름</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#93c5fd' }}>function</span><span style={{ color: '#e2e8f0' }}> </span><span style={{ color: '#fde68a' }}>add</span><span style={{ color: '#e2e8f0' }}>(a, b) {'{'}</span>{'\n'}
                  {'  '}<span style={{ color: '#93c5fd' }}>return</span><span style={{ color: '#e2e8f0' }}> a + b</span>{'\n'}
                  <span style={{ color: '#e2e8f0' }}>{'}'}</span>{'\n\n'}
                  <span style={{ color: '#fde68a' }}>add</span><span style={{ color: '#e2e8f0' }}>(</span><span style={{ color: '#86efac' }}>'5'</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86efac' }}>3</span><span style={{ color: '#e2e8f0' }}>)</span>{'\n'}
                  <span style={{ color: '#64748b' }}>// → "53" 🤔 오류 없음</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TypeScript — 작성 중에 바로 감지</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#93c5fd' }}>function</span><span style={{ color: '#e2e8f0' }}> </span><span style={{ color: '#fde68a' }}>add</span><span style={{ color: '#e2e8f0' }}>(</span>{'\n'}
                  {'  '}<span style={{ color: '#e2e8f0' }}>a: </span><span style={{ color: '#67e8f9' }}>number</span><span style={{ color: '#e2e8f0' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: '#e2e8f0' }}>b: </span><span style={{ color: '#67e8f9' }}>number</span>{'\n'}
                  <span style={{ color: '#e2e8f0' }}>) {'{'} </span><span style={{ color: '#93c5fd' }}>return</span><span style={{ color: '#e2e8f0' }}> a + b {'}'}</span>{'\n\n'}
                  <span style={{ color: '#fde68a' }}>add</span><span style={{ color: '#e2e8f0' }}>(</span><span style={{ color: '#f87171' }}>'5'</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86efac' }}>3</span><span style={{ color: '#e2e8f0' }}>)</span>{'\n'}
                  <span style={{ color: '#64748b' }}>// ↑ 빨간 줄 — 바로 알 수 있어요</span>
                </div>
              </div>
            </div>
            <p style={{ margin: 0 }}>마치 맞춤법 검사기가 오타를 실시간으로 잡아주는 것처럼, 코드를 짜는 도중에 실수를 발견할 수 있어요.</p>
          </div>
        </div>
      </div>

      {/* Row 6 — React */}
      <div style={{ borderBottom: 'none' }}>
        <button className="wld-header" onClick={() => toggle('react')} style={headerStyle('#0ea5e9')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#0ea5e9', minWidth: 80 }}><SiReact size={16} />React</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>컴포넌트 — UI를 재사용 가능한 조각으로 나눠요</span>
          <Chevron open={open['react']} />
        </button>
        <div style={bodyStyle(open['react'])}>
          <div style={{ color: '#475569', lineHeight: 1.7 }}>
            <p style={{ marginTop: 0 }}>JavaScript만으로 복잡한 화면을 만들다 보면 코드가 금방 뒤엉켜요. 버튼 하나를 수정하면 다른 곳이 깨지고, 같은 UI를 여러 페이지에 반복해서 써야 해요.</p>
            <p>React는 UI를 <strong style={{ color: '#1e293b' }}>컴포넌트</strong>라는 독립된 조각으로 쪼개요. 레고 블록처럼 한 번 만들어두면 어디서든 가져다 쓸 수 있고, 한 곳만 수정하면 쓰인 모든 곳에 자동으로 반영돼요.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>JavaScript — 반복이 생겨요</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#64748b' }}>{'// 페이지마다 직접 작성'}</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&lt;button</span><span style={{ color: '#67e8f9' }}> class</span><span style={{ color: '#64748b' }}>="btn"</span><span style={{ color: '#f97316' }}>&gt;</span>{'\n'}
                  {'  '}<span style={{ color: '#e2e8f0' }}>홈으로</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&lt;/button&gt;</span>{'\n\n'}
                  <span style={{ color: '#f97316' }}>&lt;button</span><span style={{ color: '#67e8f9' }}> class</span><span style={{ color: '#64748b' }}>="btn"</span><span style={{ color: '#f97316' }}>&gt;</span>{'\n'}
                  {'  '}<span style={{ color: '#e2e8f0' }}>저장하기</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&lt;/button&gt;</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0ea5e9', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>React — 한 번 만들고 재사용</div>
                <div className="wld-code" style={{ fontSize: 11 }}>
                  <span style={{ color: '#64748b' }}>{'// Button 컴포넌트 정의'}</span>{'\n'}
                  <span style={{ color: '#93c5fd' }}>function</span><span style={{ color: '#e2e8f0' }}> </span><span style={{ color: '#fde68a' }}>Button</span><span style={{ color: '#e2e8f0' }}>({'{ label }'}) {'{'}</span>{'\n'}
                  {'  '}<span style={{ color: '#93c5fd' }}>return</span><span style={{ color: '#e2e8f0' }}> </span><span style={{ color: '#f97316' }}>&lt;button&gt;</span><span style={{ color: '#e2e8f0' }}>{'{label}'}</span><span style={{ color: '#f97316' }}>&lt;/button&gt;</span>{'\n'}
                  <span style={{ color: '#e2e8f0' }}>{'}'}</span>{'\n\n'}
                  <span style={{ color: '#64748b' }}>{'// 어디서든 재사용'}</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&lt;Button</span><span style={{ color: '#67e8f9' }}> label</span><span style={{ color: '#64748b' }}>="홈으로"</span><span style={{ color: '#f97316' }}> /&gt;</span>{'\n'}
                  <span style={{ color: '#f97316' }}>&lt;Button</span><span style={{ color: '#67e8f9' }}> label</span><span style={{ color: '#64748b' }}>="저장하기"</span><span style={{ color: '#f97316' }}> /&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 7 — Next.js + App Router */}
      <div style={{ borderBottom: 'none' }}>
        <button className="wld-header" onClick={() => toggle('nextjs')} style={headerStyle('#18181b')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#18181b', minWidth: 80 }}><SiNextdotjs size={16} />Next.js</span>
          <span style={{ fontSize: 14, color: '#475569', flex: 1 }}>프레임워크 — 폴더 구조만으로 페이지가 만들어져요</span>
          <Chevron open={open['nextjs']} />
        </button>
        <div style={bodyStyle(open['nextjs'])}>
          <div style={{ color: '#475569', lineHeight: 1.7 }}>
            <p style={{ marginTop: 0 }}>React는 UI를 만드는 도구지만, 실제 웹사이트를 만들려면 그 외에도 준비할 게 많아요. 여러 페이지를 어떻게 연결할지, 구글에 어떻게 노출할지… 이런 것들을 직접 하나씩 붙여야 해요.</p>
            <p>Next.js는 이런 것들을 처음부터 갖춰놓은 완성형 틀이에요. 마치 빈 방이 아니라 가구가 다 갖춰진 집을 받는 것처럼요. 폴더에 파일을 추가하면 그게 바로 새 페이지가 돼요 — 별도 설정이 필요 없어요.</p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>폴더 구조</div>
              <div className="wld-code" style={{ fontSize: 11 }}>
                <span style={{ color: '#94a3b8' }}>app/</span>{'\n'}
                {'├─ '}<span style={{ color: '#e2e8f0' }}>page.tsx</span>{'        '}<span style={{ color: '#64748b' }}>→ /</span>{'\n'}
                {'├─ '}<span style={{ color: '#e2e8f0' }}>about/</span>{'\n'}
                {'│  └─ '}<span style={{ color: '#e2e8f0' }}>page.tsx</span>{'   '}<span style={{ color: '#64748b' }}>→ /about</span>{'\n'}
                {'└─ '}<span style={{ color: '#e2e8f0' }}>blog/</span>{'\n'}
                {'   └─ '}<span style={{ color: '#e2e8f0' }}>page.tsx</span>{'   '}<span style={{ color: '#64748b' }}>→ /blog</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {([
                [<FileText size={14} />, '페이지 추가', '폴더를 만들면 그게 바로 새 페이지예요. 설정 없이 파일 하나로 끝나요.'],
                [<Image size={14} />, '이미지', '사진을 그냥 넣어도 용량을 알아서 줄이고 빠르게 로딩되게 해줘요.'],
                [<Search size={14} />, '검색 노출', '구글 같은 검색엔진에 잘 잡히도록 필요한 것들을 미리 갖춰줘요.'],
                [<Rocket size={14} />, '배포', 'GitHub에 올리면 Vercel이 자동으로 인터넷에 공개해줘요.'],
              ] as [React.ReactNode, string, string][]).map(([icon, label, desc]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#18181b', marginTop: 2, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>{label}</span>
                  <span style={{ color: '#64748b' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
