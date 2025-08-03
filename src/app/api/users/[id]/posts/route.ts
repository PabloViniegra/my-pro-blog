import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const { rows } = await sql`
    SELECT p.*, u.name AS author_name, u.avatar_url AS author_avatar
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.author_id = ${id} AND p.published = true
    ORDER BY p.created_at DESC
  `
  return NextResponse.json(rows)
}
