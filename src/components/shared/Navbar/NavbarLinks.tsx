import Link from 'next/link'
import { NavbarContent, NavbarItem } from '@heroui/react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/posts', label: 'Blogs' },
  { href: '/explore', label: 'Explorar' },
  { href: '/contact', label: 'Contacto' }
]

export default function NavbarLinks() {
  const pathName = usePathname()
  console.log(pathName)
  return (
    <NavbarContent className="flex items-center gap-8">
      {links.map((link) => (
        <NavbarItem key={link.href}>
          <Link
            href={link.href}
            className={`text-md font-sans font-medium text-foreground/80 hover:text-foreground transition-colors ${
              pathName === link.href
                ? 'text-foreground underline font-extrabold'
                : ''
            }`}
          >
            {link.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  )
}
