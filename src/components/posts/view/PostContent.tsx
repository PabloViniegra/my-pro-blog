'use client'

import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import CodeBlock from '@/utils/CodeBlock'
import type { JSX, ReactNode } from 'react'

type CodeProps = {
  inline?: boolean
  className?: string
  children?: ReactNode
}

const Code = ({ inline, className, children }: CodeProps): JSX.Element => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1]

  if (inline) {
    return (
      <code className='bg-muted px-1 py-0.5 rounded text-sm font-mono'>
        {children}
      </code>
    )
  }

  return (
    <CodeBlock
      value={String(children).replace(/\n$/, '')}
      language={language}
    />
  )
}

const components: Components = {
  code: Code,
  a: ({ href, children }) => (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='text-primary underline underline-offset-2 hover:text-primary/80 transition-colors'
    >
      {children}
    </a>
  ),
  img: ({ src = '', alt = '' }) => {
    if (typeof src !== 'string' || !src.trim()) return null

    try {
      const url = new URL(src, 'http://localhost')
      const isValid =
        url.protocol === 'http:' ||
        url.protocol === 'https:' ||
        src.startsWith('/')
      if (!isValid) return null
    } catch {
      return null
    }

    return (
      <div className='my-4'>
        <img
          src={src}
          alt={alt}
          className='rounded-lg border border-border shadow-sm max-w-full h-auto mx-auto'
          loading='lazy'
          decoding='async'
        />
        {alt && (
          <p className='text-center text-sm text-muted-foreground mt-2'>
            {alt}
          </p>
        )}
      </div>
    )
  },
  h1: ({ children }) => (
    <h1 className='text-4xl font-bold mt-8 mb-4'>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className='text-3xl font-bold mt-8 mb-4'>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className='text-2xl font-bold mt-6 mb-3'>{children}</h3>
  ),
  p: ({ children }) => <p className='mb-4 leading-relaxed'>{children}</p>,
  ul: ({ children }) => (
    <ul className='list-disc pl-6 mb-4 space-y-2'>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className='list-decimal pl-6 mb-4 space-y-2'>{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className='border-l-4 border-primary pl-4 py-2 my-4 text-muted-foreground italic'>
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className='overflow-x-auto my-4'>
      <table className='min-w-full border-collapse'>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className='border border-border px-4 py-2 text-left bg-muted/50'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='border border-border px-4 py-2'>{children}</td>
  )
}

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className='prose prose-invert max-w-none'>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
