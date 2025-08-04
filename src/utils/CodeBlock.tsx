'use client'

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import { default as vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

type CodeBlockProps = {
  value: string
  language?: string
}

export default function CodeBlock({ value, language }: CodeBlockProps) {
  return (
    <div className='rounded-md overflow-x-auto text-sm my-4'>
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
