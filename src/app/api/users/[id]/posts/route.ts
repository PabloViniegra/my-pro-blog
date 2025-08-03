import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { rows } = await sql`
    SELECT p.*, u.name AS author_name, u.avatar_url AS author_avatar
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.author_id = ${params.id} AND p.published = true
    ORDER BY p.created_at DESC
  `
  return NextResponse.json(rows)
}
