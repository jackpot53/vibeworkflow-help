'use client'

import { useState } from 'react'

const WRAP = 'not-prose rounded-2xl border border-border overflow-hidden my-6'

export function NavbarDemo() {
  return (
    <div className={WRAP}>
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100">
        <span className="text-lg font-bold text-gray-900">MyApp</span>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {['기능', '요금', '문의'].map(label => (
            <a key={label} href="#" onClick={e => e.preventDefault()} className="hover:text-gray-900">{label}</a>
          ))}
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-lg">시작하기</button>
      </nav>
    </div>
  )
}

export function HeroDemo() {
  return (
    <div className={WRAP}>
      <section className="flex flex-col items-center text-center py-14 px-6 bg-white">
        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-5">
          새로 출시됨
        </span>
        <h1 className="text-4xl font-bold text-gray-900 max-w-md leading-tight">
          더 빠르게, 더 스마트하게 만드세요
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-sm">
          Claude와 함께 아이디어를 코드로 바꾸세요. 지금 바로 시작해보세요.
        </p>
        <div className="mt-7 flex gap-3">
          <button className="bg-black text-white px-5 py-2.5 rounded-xl font-medium text-sm">
            무료로 시작하기
          </button>
          <button className="border border-gray-200 px-5 py-2.5 rounded-xl text-gray-700 font-medium text-sm">
            데모 보기
          </button>
        </div>
      </section>
    </div>
  )
}

export function FeaturesDemo() {
  const features = [
    { title: '빠른 배포', desc: '클릭 몇 번으로 프로덕션 배포까지 완료하세요.' },
    { title: '팀 협업', desc: '실시간으로 팀원과 함께 작업하세요.' },
    { title: '강력한 보안', desc: '엔터프라이즈 수준의 보안을 기본 제공합니다.' },
  ]
  return (
    <div className={WRAP}>
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1.5">주요 기능</h2>
        <p className="text-center text-gray-500 text-sm mb-8">팀 생산성을 높이는 핵심 기능들</p>
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {features.map(({ title, desc }) => (
            <div key={title} className="p-5 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-black rounded-lg mb-3" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function HowItWorksDemo() {
  const steps = [
    { n: 1, title: '계정 만들기', desc: '이메일로 무료 계정을 만들고 바로 시작하세요.' },
    { n: 2, title: '프로젝트 설정', desc: '템플릿을 선택하거나 빈 화면에서 시작하세요.' },
    { n: 3, title: '배포하기', desc: '한 번의 클릭으로 전 세계에 서비스를 배포하세요.' },
  ]
  return (
    <div className={WRAP}>
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1.5">사용 방법</h2>
        <p className="text-center text-gray-500 text-sm mb-8">3단계로 시작하세요</p>
        <div className="max-w-md mx-auto space-y-3">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm">
              <span className="flex-shrink-0 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                {n}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function PricingDemo() {
  const plans = [
    { name: 'Free', price: '₩0', sub: '무료로 시작', features: ['프로젝트 3개', '기본 기능', '커뮤니티 지원'], dark: false, cta: '시작하기' },
    { name: 'Pro', price: '₩29,000', sub: '/월', features: ['프로젝트 무제한', '모든 기능', '우선 지원'], dark: true, popular: true, cta: '시작하기' },
    { name: 'Enterprise', price: '문의', sub: '맞춤 견적', features: ['Pro 모든 기능', '전담 매니저', 'SLA 보장'], dark: false, cta: '문의하기' },
  ]
  return (
    <div className={WRAP}>
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1.5">요금제</h2>
        <p className="text-center text-gray-500 text-sm mb-8">14일 무료 체험 가능</p>
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {plans.map(({ name, price, sub, features, dark, popular, cta }) => (
            <div key={name} className={`rounded-2xl p-5 relative ${dark ? 'bg-black text-white' : 'border border-gray-200'}`}>
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
                  인기
                </span>
              )}
              <h3 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
              <p className={`text-2xl font-bold mt-1.5 ${dark ? 'text-white' : 'text-gray-900'}`}>{price}</p>
              <p className={`text-xs mb-4 mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`}>{sub}</p>
              <ul className={`space-y-1.5 text-xs mb-5 ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
                {features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button className={`w-full py-2 rounded-xl text-xs font-medium ${dark ? 'bg-white text-black' : 'border border-gray-300 text-gray-700'}`}>
                {cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function TestimonialsDemo() {
  const items = [
    { quote: '"이 서비스 덕분에 개발 시간이 절반으로 줄었어요."', name: '김철수', role: '프리랜서 개발자' },
    { quote: '"직관적인 UI로 팀 온보딩이 훨씬 빨라졌어요."', name: '이지은', role: '스타트업 CTO' },
    { quote: '"고객 지원이 빠르고 친절해요. 문제가 바로 해결됩니다."', name: '박민준', role: 'UX 디자이너' },
  ]
  return (
    <div className={WRAP}>
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">사용자 후기</h2>
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {items.map(({ quote, name, role }) => (
            <div key={name} className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-yellow-400 text-sm mb-3">★★★★★</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{quote}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function FAQDemo() {
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [
    { q: '무료로 사용할 수 있나요?', a: '네, 기본 기능은 무료로 제공됩니다. 업그레이드 없이도 충분히 사용 가능합니다.' },
    { q: '언제든지 해지할 수 있나요?', a: '네, 약정 기간 없이 언제든지 해지 가능합니다.' },
    { q: '팀 계정은 어떻게 만드나요?', a: 'Pro 플랜 이상에서 팀 초대 기능을 사용하실 수 있습니다.' },
  ]
  return (
    <div className={WRAP}>
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">자주 묻는 질문</h2>
        <div className="max-w-md mx-auto space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-3.5 text-left text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors"
              >
                {q}
                <span className={`text-gray-400 text-xs transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed bg-white">{a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function CTADemo() {
  return (
    <div className={WRAP}>
      <section className="py-14 px-6 bg-black text-white text-center">
        <h2 className="text-3xl font-bold leading-tight max-w-xs mx-auto">
          지금 바로 시작해보세요
        </h2>
        <p className="mt-3 text-gray-400 text-sm max-w-xs mx-auto">
          무료로 시작하고, 필요할 때 업그레이드하세요.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button className="bg-white text-black px-5 py-2.5 rounded-xl font-semibold text-sm">
            무료로 시작하기
          </button>
          <button className="border border-gray-700 text-white px-5 py-2.5 rounded-xl text-sm hover:border-gray-500 transition-colors">
            데모 예약
          </button>
        </div>
      </section>
    </div>
  )
}

export function FooterDemo() {
  const cols = [
    { title: '제품', links: ['기능', '요금제', '로드맵'] },
    { title: '회사', links: ['소개', '블로그', '채용'] },
    { title: '지원', links: ['문서', 'FAQ', '문의하기'] },
  ]
  return (
    <div className={WRAP}>
      <footer className="bg-white py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div>
              <span className="text-base font-bold text-gray-900">MyApp</span>
              <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">더 빠르고 스마트한 개발 플랫폼</p>
            </div>
            {cols.map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold text-gray-900 text-xs mb-3">{title}</h4>
                <ul className="space-y-2 text-xs text-gray-500">
                  {links.map(l => (
                    <li key={l}>
                      <a href="#" onClick={e => e.preventDefault()} className="hover:text-gray-900">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <p className="text-xs text-gray-400">© 2024 MyApp. All rights reserved.</p>
            <div className="flex gap-3 text-xs text-gray-400">
              {['개인정보처리방침', '이용약관'].map(l => (
                <a key={l} href="#" onClick={e => e.preventDefault()} className="hover:text-gray-900">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
