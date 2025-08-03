import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file)
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  if (!file.type.startsWith('/image'))
    return NextResponse.json({ error: 'Not an image' }, { status: 400 })

  const blob = await put(file.name, file, { access: 'public' })
  return NextResponse.json({ url: blob.url })
}
