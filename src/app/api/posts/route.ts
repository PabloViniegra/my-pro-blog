import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getOrCreateUser } from '@/lib/db'
import { getAllPosts } from '@/lib/posts'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const q = searchParams.get('search') ?? ''
  const tag = searchParams.get('tag') ?? ''
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '10', 10), 50)
  const offset = (page - 1) * limit

  const data = await getAllPosts(q, tag, page, limit, offset)

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const clerk = await clerkClient()
  const userData = await clerk.users.getUser(userId)

  await getOrCreateUser({
    clerk_id: userId,
    email: userData.emailAddresses[0]?.emailAddress ?? '',
    name: userData.firstName ?? '',
    avatar_url: userData.imageUrl ?? ''
  })

  const { title, content, image_url, tags, published = true } = await req.json()
  if (!title || !content) {
    return NextResponse.json(
      { error: 'Title and content are required' },
      { status: 400 }
    )
  }

  const { rows } = await sql`
    INSERT INTO posts (title, content, image_url, tags, published, author_id)
    VALUES (${title}, ${content}, ${image_url}, ${tags}, ${published}, ${userId})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}
