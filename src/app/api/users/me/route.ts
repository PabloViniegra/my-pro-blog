import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { getOrCreateUser } from '@/lib/db'

export async function GET() {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const clerk = await clerkClient()
  const user = await clerk.users.getUser(userId)

  const dbUser = await getOrCreateUser({
    clerk_id: userId,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    name: user.firstName ?? '',
    avatar_url: user.imageUrl ?? ''
  })

  return NextResponse.json(dbUser)
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, avatar_url } = await req.json()

  const { rows } =
    await sql`UPDATE users SET name = ${name}, avatar_url = ${avatar_url} WHERE clerk_id = ${userId} RETURNING *`

  if (rows.length === 0)
    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json(rows[0])
}
