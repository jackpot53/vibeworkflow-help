import type { Metadata } from 'next'
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Script from 'next/script'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | 바이브코딩 도움말',
    default: '바이브코딩 도움말',
  },
  description: '바이브코딩 워크플로우 도움말 문서',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />
<body suppressHydrationWarning>
        <Layout pageMap={pageMap} sidebar={{ defaultMenuCollapseLevel: 3 }}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
