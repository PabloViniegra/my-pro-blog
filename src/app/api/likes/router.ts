import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import { hasLikedPost, likePost, unlikePost } from '@/lib/likes'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const body = await req.json()
  const { postId } = body
  const user = await getUserByClerkId(userId!)
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const hasLiked = await hasLikedPost(user.id, postId)
  if (hasLiked) {
    await unlikePost(user.id, postId)
  } else {
    await likePost(user.id, postId)
  }

  return NextResponse.json({ hasLiked: !hasLiked })
}
