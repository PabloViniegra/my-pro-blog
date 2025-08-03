'use client'

import { TagPopular } from '@/types'

export default function PopularTags({
  tags,
  onTagClick
}: {
  tags: TagPopular[]
  onTagClick?: (tag: string) => void
}) {
  return (
    <section className='max-w-5xl mx-auto px-4 py-12'>
      <h2 className='font-sans text-3xl md:text-4xl font-bold text-foreground mb-6'>
        Destacados
      </h2>
      <div className='flex flex-wrap gap-3'>
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            className='group inline-flex items-center px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200
                     bg-card text-foreground border border-border hover:border-primary/50 hover:bg-accent/20
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background'
            onClick={() => onTagClick?.(tag)}
            type='button'
          >
            <span className='text-primary group-hover:text-primary/80 font-mono font-semibold'>
              #{tag}
            </span>
            <span className='ml-2 text-xs font-mono bg-muted rounded-full px-2 py-0.5 text-muted-foreground'>
              {count}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
