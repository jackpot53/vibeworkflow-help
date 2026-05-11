export function Screenshot({
  src,
  alt,
  caption,
  width = 'full',
}: {
  src: string
  alt: string
  caption?: string
  width?: 'full' | 'half'
}) {
  return (
    <figure className={`my-6 ${width === 'half' ? 'max-w-[50%]' : ''}`}>
      <div className="rounded-lg border overflow-hidden shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
