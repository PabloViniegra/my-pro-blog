import { FooterBrand } from '@/components/shared/Footer/FooterBrand'
import { FooterLinks } from '@/components/shared/Footer/FooterLinks'
import { FooterContact } from '@/components/shared/Footer/FooterContact'
import { FooterBottom } from '@/components/shared/Footer/FooterBottom'
import { FooterLegalLinks } from '@/components/shared/Footer/FooterLegalLinks'

export function Footer() {
  return (
    <footer className='border-t border-border/20 bg-background/50 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-4 py-12 md:py-16'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
          <FooterBrand />
          <FooterLinks />
          <FooterLegalLinks />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
