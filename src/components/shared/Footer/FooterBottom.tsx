import Link from 'next/link'

export function FooterBottom() {
  const currentYear = new Date().getFullYear()
  return (
    <div className='mt-12 border-t border-border/20 pt-8'>
      <div className='flex flex-col items-center justify-between md:flex-row'>
        <p className='text-muted-foreground font-sans text-sm'>
          © {currentYear} My Pro Blog. Todos los derechos reservados.
        </p>
        <div className='mt-4 flex space-x-6 md:mt-0'>
          <Link
            href='/rss'
            className='text-muted-foreground hover:text-foreground font-sans text-sm transition-colors'
          >
            RSS
          </Link>
          <Link
            href='/sitemap.xml'
            className='text-muted-foreground hover:text-foreground font-sans text-sm transition-colors'
          >
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  )
}
