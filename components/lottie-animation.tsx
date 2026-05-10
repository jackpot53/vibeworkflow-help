'use client'

import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        autoplay?: boolean | string
        loop?: boolean | string
      }
    }
  }
}

export function LottieAnimation({
  src,
  width = 300,
  height = 300,
}: {
  src: string
  width?: number
  height?: number
}) {
  return (
    <>
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className="not-prose flex justify-center py-4">
        <dotlottie-wc
          src={src}
          style={{ width: `${width}px`, height: `${height}px` }}
          autoplay
          loop
        />
      </div>
    </>
  )
}
