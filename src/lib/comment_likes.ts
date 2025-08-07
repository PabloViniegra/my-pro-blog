import { sql } from '@vercel/postgres'

export async function hasLikedComment(
  userId: string,
  commentId: string
): Promise<boolean> {
  const { rowCount } = await sql`
    SELECT 1 FROM comment_likes
    WHERE user_id = ${userId} AND comment_id = ${commentId}
  `
  return rowCount! > 0
}

export async function likeComment(userId: string, commentId: string) {
  await sql`
      INSERT INTO comment_likes (user_id, comment_id)
      VALUES (${userId}, ${commentId})
      ON CONFLICT DO NOTHING
    `
}

export async function unlikeComment(userId: string, commentId: string) {
  await sql`
      DELETE FROM comment_likes
      WHERE user_id = ${userId} AND comment_id = ${commentId}
    `
}

export async function toggleLikeComment(userId: string, commentId: string) {
  const liked = await hasLikedComment(userId, commentId)
  if (liked) {
    await unlikeComment(userId, commentId)
  } else {
    await likeComment(userId, commentId)
  }
}
