'use server'

import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import { createComment } from '@/lib/comments'
import { revalidatePath } from 'next/cache'

export async function createCommentAction(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const user = await getUserByClerkId(userId)
  if (!user) throw new Error('User not found')

  const postId = formData.get('postId') as string
  const content = formData.get('content') as string
  const parentId = formData.get('parentId') as string | null

  if (!postId || !content) throw new Error('Missing required fields')

  await createComment({
    postId,
    authorId: user.id,
    content,
    parentId: parentId ?? null
  })

  revalidatePath(`/posts/${postId}/view`)
}
