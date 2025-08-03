import getTopUsers from '@/lib/users'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = parseInt(searchParams.get('limit') ?? '5', 10)
  const data = await getTopUsers(limit)
  return NextResponse.json(data)
}
