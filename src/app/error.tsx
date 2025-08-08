'use client'

import { Button } from '@heroui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background'>
      <div className='mb-8'>
        <svg
          width='200'
          height='200'
          viewBox='0 0 200 200'
          className='w-48 h-48 mx-auto text-destructive'
        >
          <path
            d='M100 30L20 170h160L100 30z'
            fill='none'
            stroke='currentColor'
            strokeWidth='8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M100 80v30'
            stroke='currentColor'
            strokeWidth='6'
            strokeLinecap='round'
          />
          <circle cx='100' cy='140' r='5' fill='currentColor' />
        </svg>
      </div>

      <h1 className='text-6xl font-bold mb-6 font-display text-foreground'>
        ¡Ups! Algo salió mal
      </h1>

      <p className='text-xl mb-10 max-w-2xl leading-relaxed font-sans text-muted-foreground'>
        Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde o
        contáctanos si el problema persiste.
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        <Button
          onPress={reset}
          className='px-8 py-6 text-md font-medium font-mono rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow hover:shadow-md transition-all duration-200'
        >
          Reintentar
        </Button>
        <Button
          variant='bordered'
          onPress={() => router.push('/')}
          className='px-8 py-6 text-md font-medium font-mono rounded-full border-2 border-foreground/20 hover:border-foreground/40 text-foreground hover:bg-foreground/5 transition-all duration-200'
        >
          Volver al inicio
        </Button>
      </div>

      {error.digest && (
        <div className='mt-8 p-4 bg-muted/50 rounded-lg max-w-2xl w-full text-left'>
          <p className='text-sm font-mono text-muted-foreground mb-2'>
            Error ID: <span className='text-foreground'>{error.digest}</span>
          </p>
          <details className='text-sm'>
            <summary className='cursor-pointer text-muted-foreground hover:text-foreground'>
              Ver detalles
            </summary>
            <pre className='mt-2 p-3 bg-background rounded overflow-auto text-xs text-muted-foreground'>
              {error.message}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}
