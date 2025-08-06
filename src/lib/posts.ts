import {
  PostCreate,
  PostMostCommented,
  PostResponse,
  PostWithAvatar
} from '@/types'
import { sql } from '@vercel/postgres'

export async function getRecentPosts() {
  const { rows } = await sql<PostWithAvatar>`
      SELECT 
          p.id, 
          p.title, 
          p.content,
          p.image_url,
          p.tags,
          p.published,
          p.created_at, 
          u.name AS author_name, 
          u.avatar_url AS author_avatar
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.published = true
        ORDER BY p.created_at DESC
        LIMIT 6
    `

  return rows
}

export async function getMostCommentedPosts(limit: number = 6) {
  const { rows } = await sql<PostMostCommented>`
    SELECT 
    p.id,
    p.title,
    COUNT(c.id) AS comment_count,
    u.name AS author_name,
    u.avatar_url AS author_avatar,
    p.created_at,
    c2.id AS last_comment_id,
    c2.content AS last_comment_content,
    u2.name AS last_comment_author_name,
    u2.avatar_url AS last_comment_author_avatar
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
JOIN users u ON p.author_id = u.id
LEFT JOIN LATERAL (
    SELECT c1.*
    FROM comments c1
    WHERE c1.post_id = p.id
    ORDER BY c1.created_at DESC
    LIMIT 1
) c2 ON TRUE
LEFT JOIN users u2 ON c2.author_id = u2.id
WHERE p.published = true
GROUP BY p.id, u.name, u.avatar_url, c2.id, c2.content, u2.name, u2.avatar_url, p.created_at
ORDER BY comment_count DESC, p.created_at DESC
LIMIT ${limit}
  `

  return rows
}

export async function getAllPosts({
  search,
  tag,
  page = 1,
  limit = 10,
  offset
}: {
  search?: string
  tag?: string
  page?: number
  limit?: number
  offset?: number
}): Promise<PostResponse> {
  const conditions = ['p.published = true']
  const params: (string | number)[] = []

  if (search) {
    conditions.push(
      `(LOWER(p.title) LIKE $${params.length + 1} OR LOWER(p.content) LIKE $${
        params.length + 1
      })`
    )
    params.push(`%${search.toLowerCase()}%`)
  }
  if (tag) {
    conditions.push(`$${params.length + 1} = ANY(p.tags)`)
    params.push(tag)
  }

  const whereClause = conditions.join(' AND ')
  params.push(limit)
  params.push(offset ?? 0)

  const postsSql = `
    SELECT p.*, u.name as author_name, u.avatar_url as author_avatar
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE ${whereClause}
    ORDER BY p.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `

  const { rows } = await sql.query<PostWithAvatar>(postsSql, params)

  const countParams = params.slice(0, params.length - 2)
  const countSql = `
    SELECT COUNT(*) AS total
    FROM posts p
    WHERE ${whereClause}
  `
  const { rows: countRows } = await sql.query<{ total: string }>(
    countSql,
    countParams
  )
  const total = parseInt(countRows[0]?.total ?? '0', 10)

  return {
    data: rows,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

export async function createPost(post: PostCreate) {
  const tagsArray = `{${post.tags.map((tag) => `"${tag}"`).join(',')}}`

  const { rows } = await sql`
    INSERT INTO posts (title, content, image_url, tags, published, author_id)
    VALUES (
      ${post.title},
      ${post.content},
      ${post.image_url},
      ${tagsArray}::text[],
      ${post.published},
      ${post.author_id}
    )
    RETURNING *
  `

  return rows[0]
}

export async function getPostById(id: string) {
  const { rows } = await sql<PostWithAvatar>`
    SELECT p.*, u.name as author_name, u.avatar_url as author_avatar
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.id = ${id}
    LIMIT 1
  `

  return rows[0]
}
