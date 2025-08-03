import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getOrCreateUser } from '@/lib/db'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const { rows } = await sql`
    SELECT p.*, u.name AS author_name, u.avatar_url AS author_avatar
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.id = ${id}
    LIMIT 1
  `
  if (rows.length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
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

  const { rows: postRows } =
    await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`
  if (postRows.length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (postRows[0].author_id !== userId)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { title, content, imageUrl, tags, published } = await req.json()
  const { rows } = await sql`
    UPDATE posts SET
      title = ${title},
      content = ${content},
      image_url = ${imageUrl},
      tags = ${tags},
      published = ${published},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
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

  const { rows: postRows } =
    await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`
  if (postRows.length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (postRows[0].author_id !== userId)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await sql`DELETE FROM posts WHERE id = ${id}`
  return NextResponse.json({ success: true })
}
