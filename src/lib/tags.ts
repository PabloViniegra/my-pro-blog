import { TagName, TagPopular } from '@/types'
import { sql } from '@vercel/postgres'

export async function getPopularTags(limit: number = 10) {
  const { rows } = await sql<TagPopular>`SELECT tag, COUNT(*) AS count
    FROM (
      SELECT unnest(tags) AS tag
      FROM posts
      WHERE published = true
    ) AS all_tags
    GROUP BY tag
    ORDER BY count DESC
    LIMIT ${limit}`

  return rows
}

export async function getAllDistinctTags() {
  const { rows } = await sql<TagName>`
    SELECT DISTINCT unnest(tags) AS name
    FROM posts
    WHERE published = true
    ORDER BY name
  `
  return rows
}
