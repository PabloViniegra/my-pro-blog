import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('Upload request received')
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    console.log('File received:', file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : 'No file')

    if (!file) {
      console.error('No file in the request')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ error: 'File must be an image (jpg, png, webp, etc.)' }, { status: 400 })
    }

    console.log('Uploading file to Vercel Blob...')
    const blob = await put(file.name, file, { 
      access: 'public',
      addRandomSuffix: true // Ensure unique filenames
    })
    
    console.log('File uploaded successfully:', blob.url)
    return NextResponse.json({ url: blob.url })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' }, 
      { status: 500 }
    )
  }
}
