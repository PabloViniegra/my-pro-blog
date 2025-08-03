import { Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export function FooterContact() {
  return (
    <div className='space-y-5'>
      <h3 className='font-sans text-lg font-semibold tracking-tight text-foreground'>
        Contacto
      </h3>
      <ul className='space-y-3.5'>
        <li>
          <Link
            href='mailto:pablovpmadrid@gmail.com'
            className='group flex items-center space-x-3 text-muted-foreground transition-colors hover:text-foreground'
            aria-label='Enviar correo electrónico'
          >
            <Mail className='h-4.5 w-4.5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-foreground' />
            <span className='font-sans text-sm leading-relaxed'>
              pablovpmadrid@gmail.com
            </span>
          </Link>
        </li>
        <li className='flex items-start space-x-3'>
          <MapPin className='h-4.5 w-4.5 flex-shrink-0 text-muted-foreground mt-0.5' />
          <span className='font-sans text-sm leading-relaxed text-muted-foreground'>
            Madrid, España
          </span>
        </li>
      </ul>
    </div>
  )
}
