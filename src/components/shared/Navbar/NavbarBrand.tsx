import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export default function NavbarBrand() {
  return (
    <Link
      href='/'
      className='flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-full'
    >
      <Logo className='size-10 text-foreground' />
      <span className='font-bold text-lg font-display tracking-tight'>
        My Pro Blog
      </span>
    </Link>
  )
}
