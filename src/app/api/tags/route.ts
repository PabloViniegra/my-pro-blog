import { NextResponse } from 'next/server'
import { getAllDistinctTags } from '@/lib/tags'

export async function GET() {
  const tags = await getAllDistinctTags()
  return NextResponse.json(tags)
}
