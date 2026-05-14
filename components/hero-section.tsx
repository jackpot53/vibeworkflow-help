'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        autoplay?: boolean | string
        loop?: boolean | string
      }
    }
  }
}

function LottieSkeleton() {
  return (
    <img
      src="/images/day1company-main-web.webp"
      alt=""
      style={{ width: '500px', height: 'auto' }}
      className="rounded-2xl"
    />
  )
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onReady = () => setReady(true)
    el.addEventListener('load', onReady)
    el.addEventListener('play', onReady)
    return () => {
      el.removeEventListener('load', onReady)
      el.removeEventListener('play', onReady)
    }
  }, [])

  return (
    <div className="not-prose flex justify-center py-8">
      {!ready && <LottieSkeleton />}
      <dotlottie-wc
        ref={ref}
        src="https://lottie.host/e4d8d1eb-9e43-45ea-82af-82caa824fc3a/6OyOWgo3AX.lottie"
        style={{ width: '500px', height: '500px', display: ready ? undefined : 'none' }}
        autoplay
        loop
      />
    </div>
  )
}
