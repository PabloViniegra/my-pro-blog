'use client'

import { toggleLike } from '@/app/actions/likePost'
import { toggleSave } from '@/app/actions/savePost'
import { Button } from '@heroui/react'
import { Heart, Share2, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { useTransition } from 'react'

interface Props {
  isLike: boolean
  isSave: boolean
  postId: string
}

export function PostActions({ isLike, isSave, postId }: Props) {
  const [likePending, likeStartTransition] = useTransition()
  const [savePending, saveStartTransition] = useTransition()

  const handleLike = () => {
    likeStartTransition(() => {
      toggleLike(postId)
    })
  }

  const handleBookmark = () => {
    saveStartTransition(() => {
      toggleSave(postId)
    })
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <div className='flex items-center gap-2 border-t border-border pt-6 mt-8'>
      <Button
        variant='ghost'
        size='sm'
        isLoading={likePending}
        onPress={handleLike}
        className={`flex items-center gap-2 font-serif ${
          isLike ? 'text-red-500' : 'text-muted-foreground'
        }`}
      >
        <Heart className={`h-4 w-4 ${isLike ? 'fill-current' : ''}`} />
        <span>Me gusta</span>
      </Button>

      <Button
        variant='ghost'
        size='sm'
        onPress={handleShare}
        className='text-muted-foreground flex items-center gap-2 font-serif'
      >
        <Share2 className='h-4 w-4' />
        <span>Compartir</span>
      </Button>

      <Button
        variant='ghost'
        size='sm'
        isLoading={savePending}
        onPress={handleBookmark}
        className={`ml-auto flex items-center gap-2 font-serif ${
          isSave ? 'text-yellow-500' : 'text-muted-foreground'
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isSave ? 'fill-current' : ''}`} />
        <span>{isSave ? 'Guardado' : 'Guardar'}</span>
      </Button>
    </div>
  )
}
