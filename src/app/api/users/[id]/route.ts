import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const { rows } = await sql`
      SELECT id, clerk_id, email, name, avatar_url, created_at, updated_at
      FROM users
      WHERE id = ${id}
      LIMIT 1
    `
  if (rows.length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}
