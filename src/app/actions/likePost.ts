'use server'

import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import { hasLikedPost, likePost, unlikePost } from '@/lib/likes'
import { revalidatePath } from 'next/cache'

export async function toggleLike(postId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const user = await getUserByClerkId(userId)
  const hasLiked = await hasLikedPost(user.id, postId)

  if (hasLiked) {
    await unlikePost(user.id, postId)
  } else {
    await likePost(user.id, postId)
  }

  revalidatePath(`/posts/${postId}/view`)
}
