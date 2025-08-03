import { TopUser } from '@/types'
import { sql } from '@vercel/postgres'

export default async function getTopUsers(limit: number) {
  const { rows } =
    await sql<TopUser>`SELECT u.id, u.name, u.avatar_url, COUNT(p.id) AS post_count
    FROM users u
    JOIN posts p ON p.author_id = u.id
    WHERE p.published = true
      AND p.created_at >= NOW() - INTERVAL '7 days'
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT ${limit}`

  return rows
}
