'use client'

import { Chip } from '@heroui/react'

export default function GridTag({ tag }: { tag: string }) {
  return (
    <Chip
      key={tag}
      className="inline-flex items-center rounded-full bg-accent/50 px-2 py-0.5 text-[10px] font-medium font-mono tracking-tight text-foreground/80 hover:bg-accent/70 hover:scale-105 transition-all duration-200"
    >
      {tag}
    </Chip>
  )
}
