'use client'

import Link from 'next/link'
import { Button, cn } from '@heroui/react'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <svg
          width='200'
          height='200'
          viewBox='0 0 200 200'
          className='w-48 h-48 mx-auto'
        >
          <motion.path
            d='M40,100 C40,66.9 66.9,40 100,40 C133.1,40 160,66.9 160,100 C160,133.1 133.1,160 100,160 C66.9,160 40,133.1 40,100 Z'
            fill='none'
            stroke='hsl(var(--primary))'
            strokeWidth='8'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.path
            d='M100,100 L140,60 M100,100 L60,60 M100,100 L140,140 M100,100 L60,140'
            stroke='hsl(var(--destructive))'
            strokeWidth='4'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      <motion.h1
        className={cn(
          'text-8xl font-bold mb-6',
          'font-display',
          'bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>

      <motion.h2
        className={cn(
          'text-4xl font-bold mb-6',
          'font-display text-foreground'
        )}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Página no encontrada
      </motion.h2>

      <motion.p
        className={cn(
          'text-xl mb-10 max-w-2xl leading-relaxed',
          'font-sans text-muted-foreground'
        )}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Lo sentimos, no pudimos encontrar la página que estás buscando.
        <span className='block mt-2'>
          Puede que la dirección sea incorrecta o la página se haya movido.
        </span>
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className='px-8 py-6 text-lg font-medium rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow hover:shadow-md transition-all duration-200'>
          <Link
            href='/'
            className='flex items-center gap-2 font-mono tracking-tight text-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Volver al inicio
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className='mt-12 text-sm text-muted-foreground/70'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Código de error: 404 - Página no encontrada
      </motion.div>
    </div>
  )
}

export default NotFound
