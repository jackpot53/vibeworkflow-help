'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const WRAP = 'not-prose rounded-xl border border-border bg-card px-10 py-8 my-4 flex justify-center'

const IMAGES = [
  { src: 'https://picsum.photos/seed/carousel1/600/400', alt: '슬라이드 1' },
  { src: 'https://picsum.photos/seed/carousel2/600/400', alt: '슬라이드 2' },
  { src: 'https://picsum.photos/seed/carousel3/600/400', alt: '슬라이드 3' },
  { src: 'https://picsum.photos/seed/carousel4/600/400', alt: '슬라이드 4' },
  { src: 'https://picsum.photos/seed/carousel5/600/400', alt: '슬라이드 5' },
]

export function CarouselBasicDemo() {
  return (
    <div className={WRAP}>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {IMAGES.map(({ src, alt }, i) => (
            <CarouselItem key={i}>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const ITEMS_PER_VIEW = [
  { title: '디자인 원칙', tag: 'Design', color: 'bg-violet-100 dark:bg-violet-900/30' },
  { title: '타이포그래피', tag: 'Style', color: 'bg-sky-100 dark:bg-sky-900/30' },
  { title: '컬러 시스템', tag: 'Color', color: 'bg-rose-100 dark:bg-rose-900/30' },
  { title: '레이아웃 그리드', tag: 'Layout', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { title: '컴포넌트 구조', tag: 'Component', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
]

export function CarouselSizeDemo() {
  return (
    <div className={WRAP}>
      <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
        <CarouselContent className="-ml-2">
          {ITEMS_PER_VIEW.map(({ title, tag, color }) => (
            <CarouselItem key={title} className="pl-2 basis-1/2">
              <div className={`rounded-xl p-4 h-28 flex flex-col justify-between ${color}`}>
                <Badge variant="secondary" className="w-fit text-xs">{tag}</Badge>
                <p className="text-sm font-medium leading-snug">{title}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const REVIEWS = [
  { name: '김민준', role: '프론트엔드 개발자', text: 'Claude Code 덕분에 PR 리뷰 시간이 절반으로 줄었어요. 코드 품질도 눈에 띄게 올라갔고요.', rating: 5 },
  { name: '이서연', role: '디자이너', text: '비개발자인데도 CLAUDE.md만 잘 쓰면 원하는 UI를 바로 만들 수 있어요. 진짜 신기해요.', rating: 5 },
  { name: '박지호', role: '백엔드 개발자', text: '컨텍스트 윈도우 관리 방법을 배우고 나서 훨씬 긴 작업도 거뜬히 해내게 됐어요.', rating: 4 },
]

export function CarouselCardDemo() {
  return (
    <div className={WRAP}>
      <Carousel opts={{ align: 'center' }} className="w-full max-w-sm">
        <CarouselContent>
          {REVIEWS.map(({ name, role, text, rating }) => (
            <CarouselItem key={name}>
              <Card>
                <CardContent className="py-6 px-5 flex flex-col gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{text}"</p>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
