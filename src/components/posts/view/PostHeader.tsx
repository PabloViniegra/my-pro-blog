'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Chip } from '@heroui/react'
import { Avatar } from '@heroui/react'
import Image from 'next/image'

interface PostHeaderProps {
  title: string
  author: {
    name: string
    avatarUrl: string
  }
  publishedAt: string
  tags: string[]
  image: string
}

export function PostHeader({
  title,
  author,
  publishedAt,
  tags,
  image
}: PostHeaderProps) {
  const formattedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
    locale: es
  })

  return (
    <header className='mb-8'>
      <h1 className='text-4xl md:text-6xl font-extrabold mb-4 leading-tight font-display tracking-tight'>
        {title}
      </h1>
      <Image
        src={image}
        alt={title}
        width={600}
        height={600}
        style={{
          borderRadius: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      />
      <div className='flex items-center gap-4 text-sm text-muted-foreground mb-6'>
        <div className='flex items-center gap-2'>
          <Avatar className='size-6' src={author.avatarUrl} alt={author.name} />
          <span className='font-serif text-sm tracking-wide'>
            {author.name}
          </span>
        </div>
        <span>•</span>
        <time dateTime={publishedAt} className='font-serif'>
          {formattedDate}
        </time>
      </div>

      {tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-6'>
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Chip
                variant='shadow'
                className='hover:bg-secondary/80 transition-colors font-serif font-medium tracking-tight'
              >
                #{tag}
              </Chip>
            </Link>
          ))}
        </div>
      )}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8' />
    </header>
  )
}
