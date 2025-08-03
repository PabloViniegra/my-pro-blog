'use client'

import { Navbar as HerouiNavbar, NavbarContent } from '@heroui/react'
import NavbarBrand from '@/components/shared/Navbar/NavbarBrand'
import NavbarLinks from '@/components/shared/Navbar/NavbarLinks'
import NavbarSearch from '@/components/shared/Navbar/NavbarSearch'
import NavbarUserMenu from '@/components/shared/Navbar/NavbarUserMenu'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Navbar() {
  return (
    <HerouiNavbar
      isBordered
      className='bg-background/80 backdrop-blur-sm border-b border-border/40'
      maxWidth='full'
    >
      <header className='w-full flex items-center'>
        <div className='flex-shrink-0'>
          <NavbarBrand />
        </div>
        <div className='hidden md:flex mx-auto'>
          <NavbarLinks />
        </div>
        <div className='flex items-center gap-4 ml-auto'>
          <div className='hidden md:block'>
            <NavbarSearch />
          </div>
          <NavbarUserMenu />
          <ThemeSwitcher />
        </div>
      </header>
    </HerouiNavbar>
  )
}
