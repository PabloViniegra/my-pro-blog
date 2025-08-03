import { NextRequest, NextResponse } from 'next/server'
import { getPopularTags } from '@/lib/tags'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = parseInt(searchParams.get('limit') ?? '10', 10)
  const tags = await getPopularTags(limit)
  return NextResponse.json(tags)
}
