'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { ProfileView } from './ProfileView'
import { ProfileForm } from './ProfileForm'
import { useRouter } from 'next/navigation'

export function Profile() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  if (!isLoaded) {
    return <ProfileSkeleton />
  }

  if (!isSignedIn || !user) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Por favor, inicia sesión para ver tu perfil
          </h2>
          <Button
            onPress={() => {
              router.push('/signin')
            }}
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    )
  }

  const handleSave = async (name: string) => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Tu perfil</h1>
      </div>

      <Card className='p-6'>
        {isEditing ? (
          <ProfileForm
            user={{
              id: user.id,
              fullName: user.fullName,
              imageUrl: user.imageUrl,
              username: user.username,
              email: user.primaryEmailAddress?.emailAddress || '',
              createdAt: new Date(user.createdAt || 0),
              publicMetadata: user.publicMetadata
            }}
            onCancel={() => {
              setIsEditing(false)
            }}
            onSave={handleSave}
            isSaving={isSaving}
          />
        ) : (
          <ProfileView
            user={{
              id: user.id,
              fullName: user.fullName,
              imageUrl: user.imageUrl,
              username: user.username,
              email: user.primaryEmailAddress?.emailAddress || '',
              createdAt: new Date(user.createdAt || 0),
              publicMetadata: user.publicMetadata
            }}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </Card>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className='space-y-8'>
      <Skeleton className='h-10 w-48' />
      <Card className='p-6'>
        <div className='space-y-6'>
          <Skeleton className='h-8 w-64' />
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-9 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-9 w-full' />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
