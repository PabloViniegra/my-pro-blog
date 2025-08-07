'use server'

import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import { toggleLikeComment } from '@/lib/comment_likes'
import { revalidatePath } from 'next/cache'

export async function toggleCommentLikeAction(
  commentId: string,
  postId: string
) {
  const { userId } = await auth()
  if (!userId) throw new Error('No autorizado')

  const dbUser = await getUserByClerkId(userId)
  await toggleLikeComment(dbUser.id, commentId)

  revalidatePath(`/posts/${postId}`)
}
