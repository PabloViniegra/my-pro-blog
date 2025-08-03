import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import type { User } from '@/types'

export async function GET(_: NextRequest) {
  const { rows } = await sql<Partial<User>[]>`
      SELECT id, clerk_id, name, avatar_url, created_at FROM users
      ORDER BY created_at DESC
    `
  return NextResponse.json(rows)
}
