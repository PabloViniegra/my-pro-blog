'use client'

import { Logo } from './Logo'
import {
  Navbar as HerouiNavbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Input,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react'
import { Search, LogOut, BookOpen, Compass, Mail } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <HerouiNavbar
      isBordered
      className="bg-background/80 backdrop-blur-sm border-b border-border/40"
      maxWidth="full"
    >
      <NavbarContent className="gap-6" justify="start">
        <NavbarBrand className="gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-full"
          >
            <Logo className="size-10 text-foreground" />
            <span className="font-bold text-lg font-sans tracking-tight">
              My Pro Blog
            </span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-12">
          <NavbarItem>
            <Link
              href="/"
              className="text-md font-sans font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/blogs"
              className="text-md font-sans font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Mis Blogs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/explore"
              className="text-md font-sans font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Explora
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/contact"
              className="text-md font-sans font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center">
            <Input
              classNames={{
                base: 'w-48',
                input: 'text-xs font-mono tracking-tight font-normal',
                inputWrapper:
                  'h-9 bg-background border-border/50 hover:bg-background/80'
              }}
              placeholder="Search something"
              size="sm"
              startContent={<Search className="text-foreground/50" size={16} />}
              type="search"
              variant="bordered"
            />
          </div>
        </div>

        {isSignedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                src={user?.imageUrl}
                name={user?.fullName || 'User'}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-sans font-semibold tracking-normal leading-relaxed">
                  Iniciado como
                </p>
                <p className="font-mono text-xs tracking-normal leading-relaxed">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </DropdownItem>
              <DropdownItem
                key="my-blogs"
                startContent={
                  <BookOpen className="text-foreground/70" size={16} />
                }
                className="font-sans text-sm"
              >
                Mis blogs
              </DropdownItem>
              <DropdownItem
                key="explore"
                startContent={
                  <Compass className="text-foreground/70" size={16} />
                }
                className="font-sans text-sm"
              >
                Explorar
              </DropdownItem>
              <DropdownItem
                key="contact"
                startContent={<Mail className="text-foreground/70" size={16} />}
                className="font-sans text-sm"
              >
                Contacto
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger font-sans text-sm"
                color="danger"
                startContent={<LogOut className="text-danger" size={16} />}
              >
                <SignOutButton
                  signOutOptions={{
                    redirectUrl: '/signin'
                  }}
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              as="a"
              href="/signin"
              variant="light"
              size="sm"
              className="font-sans text-sm h-9"
            >
              Iniciar Sesión
            </Button>
            <Button
              as="a"
              href="/signup"
              color="primary"
              size="sm"
              className="font-sans text-sm h-9"
            >
              Registrarse
            </Button>
          </div>
        )}
      </NavbarContent>
      <ThemeSwitcher />
    </HerouiNavbar>
  )
}
