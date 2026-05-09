import type { Metadata } from 'next'
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { Geist, Sunflower } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const sunflower = Sunflower({ weight: '300', variable: '--font-content' });

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
    <html lang="ko" dir="ltr" suppressHydrationWarning className={cn("font-sans", geist.variable, sunflower.variable)}>
      <Head />
<body>
        <Layout pageMap={pageMap} sidebar={{ defaultMenuCollapseLevel: 3 }}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
