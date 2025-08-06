import { sql } from '@vercel/postgres'

export async function likePost(
  userId: string,
  postId: string
): Promise<boolean> {
  try {
    await sql`INSERT INTO likes (user_id, post_id)
      VALUES (${userId}, ${postId})
      ON CONFLICT DO NOTHING;`
    return true
  } catch (error) {
    console.error(`Error adding like: ${error}`)
    return false
  }
}

export async function unlikePost(
  userId: string,
  postId: string
): Promise<boolean> {
  try {
    await sql`
        DELETE FROM likes
        WHERE user_id = ${userId} AND post_id = ${postId}
      `
    return true
  } catch (error) {
    console.error('Error removing like:', error)
    return false
  }
}

export async function hasLikedPost(
  userId: string,
  postId: string
): Promise<boolean> {
  const { rowCount } = await sql`SELECT 1 FROM likes
    WHERE user_id = ${userId} AND post_id = ${postId}
    LIMIT 1`

  return rowCount! > 0
}
