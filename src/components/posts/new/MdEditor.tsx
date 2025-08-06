'use client'

import ReactMarkdown from 'react-markdown'
import CodeBlock from '@/utils/CodeBlock'
import type { JSX, ReactNode } from 'react'
import type { Components } from 'react-markdown'

interface Props {
  value?: string
}

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
      <img
        src={src}
        alt={alt}
        className='rounded-lg border border-border shadow-sm max-w-full h-auto'
        loading='lazy'
        decoding='async'
      />
    )
  }
}

function sanitizeMarkdown(md: string = '') {
  return md.replace(/!\[[^\]]*\]\((\{.*\}|\s*)\)/g, '')
}

export default function MdEditor({ value }: Props) {
  return (
    <div className='prose prose-invert max-w-none'>
      <ReactMarkdown components={components}>
        {sanitizeMarkdown(value || '')}
      </ReactMarkdown>
    </div>
  )
}
