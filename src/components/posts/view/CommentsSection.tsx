'use client'

import type { CommentTreeNode } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import {
  UserCircle2,
  MessageSquare,
  Clock,
  ThumbsUp,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CommentForm from '@/components/posts/view/CommentForm'
import { toggleCommentLikeAction } from '@/app/actions/likeComment'
import { useTransition } from 'react'

interface CommentProps {
  comment: CommentTreeNode
  isPostAuthor?: boolean
}

function Comment({ comment, isPostAuthor = false }: CommentProps) {
  const [showReply, setShowReply] = useState(false)
  const [isPending, startTransition] = useTransition()
  function handleLike() {
    startTransition(() => toggleCommentLikeAction(comment.id, comment.post_id))
  }
  return (
    <div>
      <div
        className={`group relative mb-6 rounded-lg border p-4 transition-all hover:shadow-sm ${
          isPostAuthor
            ? 'border-primary/20 bg-primary/5'
            : 'border-border bg-card'
        }`}
      >
        <div className='mb-3 flex items-center gap-3'>
          {comment.author_avatar ? (
            <Image
              src={comment.author_avatar}
              alt={comment.author_name || 'User'}
              width={40}
              height={40}
              className='h-10 w-10 rounded-full object-cover'
            />
          ) : (
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground'>
              <UserCircle2 className='h-6 w-6' />
            </div>
          )}
          <div>
            <h4 className='font-sans text-sm font-medium text-foreground'>
              <div className='flex items-center gap-2'>
                {comment.author_name || 'Anonymous'}
                {isPostAuthor && (
                  <span className='rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
                    Author
                  </span>
                )}
              </div>
            </h4>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <Clock className='h-3 w-3' />
              <time
                dateTime={comment.created_at}
                className='font-mono text-[11px] tracking-tighter'
              >
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true
                })}
              </time>
            </div>
          </div>
        </div>
        <p className='font-sans tracking-tight text-foreground'>
          {comment.content}
        </p>
        <div className='mt-3 flex items-center gap-4 text-sm text-muted-foreground'>
          <button
            onClick={handleLike}
            disabled={isPending}
            className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-200 ease-out ${
              comment.has_liked
                ? 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-900/40'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className='relative flex items-center'>
              {isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <>
                  <ThumbsUp
                    className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                      comment.has_liked ? 'fill-current' : ''
                    }`}
                  />
                  {!comment.has_liked && (
                    <span className='absolute inset-0 -z-10 scale-75 rounded-full bg-green-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
                  )}
                </>
              )}
            </span>
            <span
              className={`text-sm font-medium tracking-tight ${
                comment.has_liked ? 'font-semibold' : ''
              }`}
            >
              {comment.has_liked ? 'Liked' : 'Like'}
            </span>
            <span className='pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full opacity-0 transition-opacity group-active:opacity-30 group-active:duration-300'>
              <span className='absolute inset-0 bg-green-500/30' />
            </span>
          </button>
          <button
            className='flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground'
            onClick={() => setShowReply(!showReply)}
          >
            <MessageSquare className='h-4 w-4' />
            <span>Reply</span>
          </button>
        </div>

        <AnimatePresence>
          {showReply && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
              className='ml-6 overflow-hidden border-l-2 border-border pl-4'
            >
              <div className='mt-2 pl-2'>
                <CommentForm postId={comment.post_id} parentId={comment.id} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {comment.children?.length > 0 && (
        <div className='relative ml-8'>
          <div className='absolute left-0 top-0 bottom-0 w-px bg-border' />

          {comment.children.map((child) => (
            <div key={child.id} className='relative pl-6'>
              <div className='absolute left-0 top-6 w-4 h-px bg-border' />

              <div className='pt-4'>
                <Comment
                  comment={child}
                  isPostAuthor={child.author_name === comment.author_name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface CommentsSectionProps {
  comments: CommentTreeNode[]
  postAuthorName?: string
}

export default function CommentsSection({
  comments,
  postAuthorName
}: CommentsSectionProps) {
  return (
    <section className='mt-12'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='font-display text-2xl font-bold text-foreground'>
          Comentarios
          {comments.length > 0 && (
            <span className='ml-2 rounded-full bg-accent px-2.5 py-0.5 text-sm font-normal text-accent-foreground'>
              {comments.length}
            </span>
          )}
        </h2>
      </div>

      {comments.length === 0 ? (
        <div className='rounded-lg border border-dashed border-border p-8 text-center'>
          <MessageSquare className='mx-auto mb-3 h-10 w-10 text-muted-foreground' />
          <h3 className='mb-1 font-display text-lg font-medium text-foreground'>
            Sin comentarios todavía
          </h3>
          <p className='text-muted-foreground font-sans'>
            ¡Sé el primero en compartir tus pensamientos!
          </p>
        </div>
      ) : (
        <div className='space-y-6'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              isPostAuthor={comment.author_name === postAuthorName}
            />
          ))}
        </div>
      )}
    </section>
  )
}
