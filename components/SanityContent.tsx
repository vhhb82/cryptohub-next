import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

interface SanityContentProps {
  content: any[]
  className?: string
}

export default function SanityContent({ content, className = '' }: SanityContentProps) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText
        value={content}
        components={{
          types: {
            image: ({ value }) => (
              <SanityImage 
                image={value} 
                alt={value.alt || ''} 
                className="rounded-lg my-4"
              />
            ),
          },
          block: {
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
            h4: ({ children }) => <h4 className="text-lg font-semibold mb-2">{children}</h4>,
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            link: ({ children, value }) => (
              <a 
                href={value.href} 
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  )
}
