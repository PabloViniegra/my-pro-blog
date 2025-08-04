'use client'

import ReactMarkdown from 'react-markdown'
import CodeBlock from '@/utils/CodeBlock'
import type { JSX, ReactNode } from 'react'
import type { Components } from 'react-markdown'
import Image from 'next/image'

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
  img: ({ src, alt }) => {
    if (!src) return null
    return (
      <Image
        src={src.toString()}
        alt={alt || ''}
        className='rounded-lg border border-border shadow-sm'
      />
    )
  }
}

export default function MdEditor({ value }: Props) {
  return (
    <div className='prose prose-invert max-w-none'>
      <ReactMarkdown components={components}>{value || ''}</ReactMarkdown>
    </div>
  )
}
