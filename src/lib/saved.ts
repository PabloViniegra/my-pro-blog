import { sql } from '@vercel/postgres'

export async function savePost(userId: string, postId: string) {
  await sql`
    INSERT INTO saved_posts (user_id, post_id)
    VALUES (${userId}, ${postId})
    ON CONFLICT (user_id, post_id) DO NOTHING
  `
}

export async function unsavePost(userId: string, postId: string) {
  await sql`
    DELETE FROM saved_posts
    WHERE user_id = ${userId} AND post_id = ${postId}
  `
}

export async function hasSavedPost(
  userId: string,
  postId: string
): Promise<boolean> {
  const { rows } = await sql`
    SELECT 1 FROM saved_posts
    WHERE user_id = ${userId} AND post_id = ${postId}
    LIMIT 1
  `
  return rows.length > 0
}
