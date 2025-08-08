'use client'

import { Button } from '@heroui/button'
import { Avatar } from '@heroui/avatar'
import { Pencil } from 'lucide-react'
import { Chip } from '@heroui/react'

interface ProfileViewProps {
  user: {
    id: string
    fullName: string | null
    imageUrl: string
    username: string | null
    email: string
    createdAt: Date
    publicMetadata: Record<string, unknown>
  }
  onEdit: () => void
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.username?.[0]?.toUpperCase() || 'U'

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar
            src={user.imageUrl}
            alt={user.fullName || 'User'}
            className='h-32 w-32 text-4xl'
          >
            {!user.imageUrl && initials}
          </Avatar>
          <div className='text-center'>
            <p className='font-medium'>@{user.username || 'user'}</p>
            <p className='text-sm text-muted-foreground'>
              Miembro desde {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='flex-1 space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-semibold'>Información del perfil</h2>
              <Button onClick={onEdit} variant='bordered' size='sm'>
                <Pencil className='w-4 h-4 mr-2' />
                Editar perfil
              </Button>
            </div>
            <p className='text-muted-foreground'>
              Gestiona tu información de cuenta y configuraciones
            </p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Chip>Nombre completo</Chip>
              <div className='text-base py-2 px-3 border rounded-md bg-muted/50'>
                {user.fullName || 'Not provided'}
              </div>
            </div>

            <div className='space-y-2'>
              <Chip>Correo electrónico</Chip>
              <div className='text-base py-2 px-3 border rounded-md bg-muted/50'>
                {user.email}
              </div>
            </div>

            <div className='space-y-2'>
              <Chip>Tipo de cuenta</Chip>
              <div className='text-base py-2 px-3 border rounded-md bg-muted/50'>
                {typeof user.publicMetadata === 'object' &&
                user.publicMetadata !== null &&
                'role' in user.publicMetadata
                  ? String(user.publicMetadata.role)
                  : 'Usuario estándar'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
