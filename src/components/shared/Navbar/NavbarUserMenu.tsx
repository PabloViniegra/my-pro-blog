'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button
} from '@heroui/react'
import { BookOpen, Mail, LogOut, Plus } from 'lucide-react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function NavbarUserMenu() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            as='button'
            className='transition-transform'
            color='primary'
            size='sm'
            src={user?.imageUrl}
            name={user?.fullName || 'User'}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2' isReadOnly>
            <p className='font-sans font-semibold tracking-normal leading-relaxed'>
              Iniciado como
            </p>
            <p className='font-mono text-xs tracking-normal leading-relaxed'>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </DropdownItem>
          <DropdownItem
            key='my-blogs'
            as={Link}
            href='/blogs'
            startContent={<BookOpen className='text-foreground/70' size={16} />}
            className='font-sans text-sm'
          >
            Mis blogs
          </DropdownItem>
          <DropdownItem
            key='create-post'
            as={Link}
            href='/posts/new'
            startContent={<Plus className='text-foreground/70' size={16} />}
            className='font-sans text-sm'
          >
            Crear Post
          </DropdownItem>
          <DropdownItem
            key='contact'
            as={Link}
            href='/contact'
            startContent={<Mail className='text-foreground/70' size={16} />}
            className='font-sans text-sm'
          >
            Contacto
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger font-sans text-sm'
            color='danger'
            startContent={<LogOut className='text-danger' size={16} />}
          >
            <SignOutButton signOutOptions={{ redirectUrl: '/signin' }}>
              Cerrar sesión
            </SignOutButton>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  return (
    <section className='flex items-center gap-2'>
      <Button
        as='a'
        href='/signin'
        variant='light'
        size='sm'
        className='font-sans text-sm h-9'
      >
        Iniciar Sesión
      </Button>
      <Button
        as='a'
        href='/signup'
        color='primary'
        size='sm'
        className='font-sans text-sm h-9'
      >
        Registrarse
      </Button>
    </section>
  )
}
