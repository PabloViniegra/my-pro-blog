'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { getOrCreateUser } from '@/lib/db'
import { createPost } from '@/lib/posts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPostAction(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const clerk = await clerkClient()
  const user = await clerk.users.getUser(userId)

  const dbUser = await getOrCreateUser({
    clerk_id: userId,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    name: user.firstName ?? '',
    avatar_url: user.imageUrl ?? ''
  })

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const image_url = formData.get('image_url') as string
  const tagsRaw = formData.get('tags') as string
  const tags = JSON.parse(tagsRaw || '[]')

  await createPost({
    title,
    content,
    image_url,
    tags,
    published: true,
    author_id: dbUser.id
  })

  revalidatePath('/posts')
  redirect('/')
}
