import { Button } from '@heroui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className='relative py-16 md:py-24 bg-gradient-to-br from-background to-muted/50 dark:from-foreground/5 dark:to-muted/20'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
          Bienvenido a mi Blog
        </h1>
        <p className='font-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
          Descubre artículos interesantes sobre desarrollo web, tecnología y
          más.
        </p>
        <Button
          as='a'
          href='/posts'
          size='lg'
          className='gap-2 font-serif bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
        >
          Explorar artículos
          <ArrowRight className='w-5 h-5' />
        </Button>
      </div>
    </section>
  )
}
