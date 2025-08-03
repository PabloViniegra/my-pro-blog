import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = parseInt(searchParams.get('limit') ?? '5', 10)
  const { rows } =
    await sql`SELECT u.id, u.name, u.avatar_url, COUNT(p.id) AS post_count
    FROM users u
    JOIN posts p ON p.author_id = u.id
    WHERE p.published = true
      AND p.created_at >= NOW() - INTERVAL '7 days'
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT ${limit}`

  return NextResponse.json(rows)
}
