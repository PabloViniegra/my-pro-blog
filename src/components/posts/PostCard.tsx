'use client'

import { PostWithAvatar } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react'
import GridTag from '@/components/posts/GridTag'

export default function PostCard({ post }: { post: PostWithAvatar }) {
  return (
    <Card
      as={Link}
      href={`/posts/${post.id}`}
      isPressable
      isHoverable
      className="h-full transition-transform hover:-translate-y-1"
      shadow="sm"
    >
      <CardBody className="flex h-full flex-col overflow-hidden p-0">
        <div className="relative h-48 w-full flex-shrink-0">
          <Image
            src={post.image_url || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
              <GridTag key={tag} tag={tag} />
            ))}
          </div>
          <CardHeader className="px-0 pb-2 pt-0">
            <h2 className="font-sans text-xl font-semibold leading-tight text-foreground line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>
          <p className="mb-4 font-serif text-sm text-muted-foreground line-clamp-3">
            {post.content}
          </p>
          <CardFooter className="mt-auto flex items-center gap-3 p-0">
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={post.author_avatar || '/avatar.png'}
                alt={post.author_name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {post.author_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </CardFooter>
        </div>
      </CardBody>
    </Card>
  )
}
