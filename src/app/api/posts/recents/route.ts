import { PostWithAvatar } from '@/types'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Fetching recent posts...')
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

    if (!rows || rows.length === 0) {
      console.warn('No published posts found')
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error in /api/posts/recents:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch recent posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
