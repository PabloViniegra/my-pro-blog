import { getMostCommentedPosts } from '@/lib/posts'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = parseInt(searchParams.get('limit') ?? '5', 10)
  const data = await getMostCommentedPosts(limit)

  return NextResponse.json(data)
}
