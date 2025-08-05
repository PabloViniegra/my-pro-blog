import { sql } from '@vercel/postgres'
import type { UserSimple } from '@/types'

export async function getOrCreateUser({
  clerk_id,
  email,
  name,
  avatar_url
}: Omit<UserSimple, 'id'>) {
  const { rows } =
    await sql<UserSimple>`SELECT id, clerk_id, email, name, avatar_url FROM users WHERE clerk_id = ${clerk_id}`

  if (rows.length > 0) return rows[0]

  const result =
    await sql<UserSimple>`INSERT INTO users (clerk_id, email, name, avatar_url) VALUES (${clerk_id}, ${email}, ${name}, ${avatar_url}) RETURNING *`

  return result.rows[0]
}
