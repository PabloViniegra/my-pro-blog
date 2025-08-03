import { NextResponse, NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { rows } = await sql`
      SELECT id, clerk_id, email, name, avatar_url, created_at, updated_at
      FROM users
      WHERE id = ${params.id}
      LIMIT 1
    `
  if (rows.length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}
