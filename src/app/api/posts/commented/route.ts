import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = parseInt(searchParams.get('limit') ?? '5', 10)
  const { rows } =
    await sql`SELECT p.id, p.title, COUNT(c.id) AS comment_count, u.name AS author_name, u.avatar_url, p.created_at
    FROM posts p
    LEFT JOIN comments c ON c.post_id = p.id AND c.created_at >= NOW() - INTERVAL '30 days'
    JOIN users u ON p.author_id = u.id
    WHERE p.published = true
    GROUP BY p.id, u.name, u.avatar_url
    ORDER BY comment_count DESC, p.created_at DESC
    LIMIT ${limit}`

  return NextResponse.json(rows)
}
