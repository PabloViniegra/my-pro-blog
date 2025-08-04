'use client'

import { useRef, useState } from 'react'
import { Button, Spinner } from '@heroui/react'
import { Image as ImageIcon, Upload } from 'lucide-react'

export default function PostImageForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    console.log('Preview URL:', preview)
    setPreviewUrl(preview)

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        console.error(
          'Upload failed with status:',
          res.status,
          'Response:',
          data
        )
        throw new Error(data.error || 'Upload failed')
      }

      setImageUrl(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='space-y-4'>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        ref={fileInputRef}
        className='hidden'
        disabled={isUploading}
        id='file-upload'
      />

      <div
        className='flex items-center gap-4
        border border-dashed border-border rounded-lg p-4
        hover:bg-accent/50 transition-colors duration-200'
      >
        {previewUrl ? (
          <div className='relative w-24 h-24 flex-shrink-0'>
            <img
              src={previewUrl}
              alt='Preview'
              className='w-full h-full object-cover rounded-md'
            />
            {isUploading && (
              <div className='absolute inset-0 bg-background/80 flex items-center justify-center rounded-md'>
                <Spinner size='sm' />
              </div>
            )}
          </div>
        ) : (
          <div className='w-24 h-24 rounded-md bg-muted flex items-center justify-center'>
            <ImageIcon className='w-8 h-8 text-muted-foreground' />
          </div>
        )}

        <div className='flex-1 min-w-0'>
          <h4 className='font-sans text-sm font-medium text-foreground mb-1 truncate'>
            {previewUrl ? 'Cambiar imagen' : 'Subir una imagen'}
          </h4>
          <p className='font-mono text-xs text-muted-foreground mb-3'>
            {previewUrl
              ? 'Click para seleccionar una imagen diferente'
              : 'JPG, PNG o WEBP. Max 5MB.'}
          </p>
          <Button
            onClick={handleButtonClick}
            isDisabled={isUploading}
            startContent={
              isUploading ? (
                <Spinner size='sm' />
              ) : (
                <Upload className='w-4 h-4' />
              )
            }
            className='font-sans text-xs font-medium'
            size='sm'
            variant='flat'
            type='button'
          >
            {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
          </Button>
        </div>
      </div>
    </div>
  )
}
