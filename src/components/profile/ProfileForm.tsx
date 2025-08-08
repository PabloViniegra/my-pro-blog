'use client'

import { useState } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Save, X } from 'lucide-react'
import { Avatar } from '@heroui/avatar'
import { Chip } from '@heroui/react'

interface ProfileFormProps {
  user: {
    id: string
    fullName: string | null
    imageUrl: string
    username: string | null
    email: string
    createdAt: Date
    publicMetadata: Record<string, unknown>
  }
  onCancel: () => void
  onSave: (name: string) => Promise<void>
  isSaving: boolean
}

export function ProfileForm({
  user,
  onCancel,
  onSave,
  isSaving
}: ProfileFormProps) {
  const [editedName, setEditedName] = useState(user.fullName || '')
  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.username?.[0]?.toUpperCase() || 'U'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(editedName)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar
            src={user.imageUrl}
            alt={user.fullName || 'User'}
            className='h-32 w-32 text-4xl'
          >
            {!user.imageUrl && initials}
          </Avatar>
          <Button variant='bordered' size='sm' className='w-full' type='button'>
            Cambiar foto
          </Button>
        </div>

        <div className='flex-1 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>Editar perfil</h2>
            <p className='text-muted-foreground'>
              Actualiza tu información de cuenta y configuraciones
            </p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Chip>Nombre completo</Chip>
              <Input
                id='name'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder='Introduce tu nombre completo'
                required
              />
            </div>

            <div className='space-y-2'>
              <Chip>Correo electrónico</Chip>
              <div className='text-base py-2 px-3 border rounded-md bg-muted/50'>
                {user.email}
              </div>
              <p className='text-sm text-muted-foreground'>
                Contacta con soporte para cambiar tu dirección de correo
              </p>
            </div>

            <div className='space-y-2'>
              <Chip>Tipo de cuenta</Chip>
              <div className='text-base py-2 px-3 border rounded-md bg-muted/50'>
                {typeof user.publicMetadata === 'object' &&
                user.publicMetadata !== null &&
                'role' in user.publicMetadata
                  ? String(user.publicMetadata.role)
                  : 'Standard User'}
              </div>
            </div>

            <div className='flex justify-end space-x-2 pt-4'>
              <Button
                type='button'
                variant='bordered'
                onClick={onCancel}
                disabled={isSaving}
              >
                <X className='w-4 h-4 mr-2' />
                Cancelar
              </Button>
              <Button type='submit' disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
                {!isSaving && <Save className='w-4 h-4 ml-2' />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
