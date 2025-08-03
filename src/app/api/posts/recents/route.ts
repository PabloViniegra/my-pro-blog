import { getRecentPosts } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await getRecentPosts()
  return NextResponse.json(data)
}
