'use client'

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
