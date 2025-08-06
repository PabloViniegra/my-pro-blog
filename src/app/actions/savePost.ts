'use server'

import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import { hasSavedPost, savePost, unsavePost } from '@/lib/saved'
import { revalidatePath } from 'next/cache'

export async function toggleSave(postId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const user = await getUserByClerkId(userId)
  const hasSaved = await hasSavedPost(user.id, postId)

  if (hasSaved) {
    await unsavePost(user.id, postId)
  } else {
    await savePost(user.id, postId)
  }

  revalidatePath(`/posts/${postId}/view`)
}
