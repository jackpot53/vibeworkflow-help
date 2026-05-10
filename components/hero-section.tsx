'use client'

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

export function HeroSection() {
  return (
    <>
      <div className="not-prose flex justify-center py-8">
        <dotlottie-wc
          src="https://lottie.host/e4d8d1eb-9e43-45ea-82af-82caa824fc3a/6OyOWgo3AX.lottie"
          style={{ width: '500px', height: '500px' }}
          autoplay
          loop
        />
      </div>
    </>
  )
}

