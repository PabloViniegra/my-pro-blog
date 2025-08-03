import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getOrCreateUser } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const q = searchParams.get('q') ?? ''
  const tag = searchParams.get('tag') ?? ''
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '10', 10), 50)
  const offset = (page - 1) * limit

  let where = `p.published = true`
  let params: any[] = []
  let idx = 1

  if (q) {
    where += ` AND (LOWER(p.title) LIKE $${idx} OR LOWER(p.content) LIKE $${idx})`
    params.push(`%${q.toLowerCase()}%`)
    idx++
  }
  if (tag) {
    where += ` AND $${idx} = ANY(p.tags)`
    params.push(tag)
    idx++
  }

  const postsQuery = sql`
  SELECT p.*, u.name as author_name, u.avatar_url as author_avatar
  FROM posts p
  JOIN users u ON p.author_id = u.clerk_id
  WHERE ${where}
  ORDER BY p.created_at DESC
  LIMIT ${limit} OFFSET ${offset}`

  const countQuery = sql`
    SELECT COUNT(*) AS total
    FROM posts p
    WHERE ${where}
  `

  const { rows } = await postsQuery
  const { rows: countRows } = await countQuery
  const total = parseInt(countRows[0]?.total ?? '0', 10)

  return NextResponse.json({
    data: rows,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
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
