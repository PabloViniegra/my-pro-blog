declare module 'react-syntax-highlighter/dist/esm/prism' {
  import * as React from 'react'
  interface SyntaxHighlighterProps {
    children?: string
    language?: string
    style?: any
  }
  const SyntaxHighlighter: React.FC<SyntaxHighlighterProps>
  export default SyntaxHighlighter
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const coy: any
  export const dracula: any
  export const oneDark: any
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus' {
  const style: { [key: string]: React.CSSProperties }
  export default style
}
