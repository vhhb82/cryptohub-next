import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

interface SanityImageProps {
  image: any
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function SanityImage({ 
  image, 
  alt = '', 
  width = 800, 
  height = 600, 
  className = '',
  priority = false 
}: SanityImageProps) {
  if (!image?.asset) {
    return null
  }

  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .quality(80)
    .url()

  return (
    <Image
      src={imageUrl}
      alt={alt || image.alt || ''}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
