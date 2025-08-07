import { sql } from '@vercel/postgres'
import type { Comment, CommentCreate, CommentTreeNode } from '@/types'

export async function getCommentsByPostId(postId: string) {
  const { rows } = await sql<Comment>`SELECT 
      c.*, 
      u.name AS author_name, 
      u.avatar_url AS author_avatar
    FROM comments c
    JOIN users u ON c.author_id = u.id
    WHERE c.post_id = ${postId}
    ORDER BY c.created_at ASC`
  return rows
}

export async function createComment({
  postId,
  authorId,
  content,
  parentId = null
}: CommentCreate) {
  const { rows } =
    await sql`INSERT INTO comments (post_id, author_id, content, parent_id)
    VALUES (${postId}, ${authorId}, ${content}, ${parentId})
    RETURNING *`

  return rows[0]
}

export async function getCommentsTree(
  postId: string,
  userId: string
): Promise<CommentTreeNode[]> {
  const { rows } = await sql<Comment>`  
      SELECT 
        c.*,
        u.name AS author_name,
        u.avatar_url AS author_avatar
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ${postId}
      ORDER BY c.created_at ASC
    `
  const likedIds = new Set<string>()
  if (userId) {
    const { rows: liked } =
      await sql`SELECT comment_id FROM comment_likes WHERE user_id = ${userId}`
    liked.forEach((row) => likedIds.add(row.comment_id))
  }

  const map = new Map<string, CommentTreeNode>()
  const root: CommentTreeNode[] = []

  for (const comment of rows) {
    const node: CommentTreeNode = {
      ...comment,
      children: [],
      has_liked: likedIds.has(comment.id)
    }

    map.set(comment.id, node)

    if (!comment.parent_id) {
      root.push(node)
    } else {
      const parent = map.get(comment.parent_id)
      if (parent) {
        parent.children.push(node)
      }
    }
  }

  return root
}
