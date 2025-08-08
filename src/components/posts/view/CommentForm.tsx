'use client'

import { createCommentAction } from '@/app/actions/createComment'
import { useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input, Textarea, Button, Card, CardBody } from '@heroui/react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      variant='solid'
      disabled={pending}
      isLoading={pending}
      className={`relative overflow-hidden group font-medium transition-all duration-200 ${
        pending ? 'opacity-80' : 'hover:opacity-90'
      }`}
    >
      <span className='relative z-10 flex items-center gap-2 font-display'>
        {pending ? 'Enviando...' : 'Publicar comentario'}
      </span>
      <span className='absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
    </Button>
  )
}

export default function CommentForm({
  postId,
  parentId
}: {
  postId: string
  parentId?: string
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const handleSubmit = async (formData: FormData) => {
    await createCommentAction(formData)
    setValue('')
    setShowSuccess(true)
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <Card className='mt-6 overflow-visible'>
        <CardBody className='p-4 sm:p-6'>
          <form action={handleSubmit} className='space-y-4'>
            <Input type='hidden' name='postId' value={postId} />
            {parentId && (
              <Input type='hidden' name='parentId' value={parentId} />
            )}

            <div className='relative'>
              <Textarea
                id='comment'
                name='content'
                required
                variant='bordered'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Escribe un comentario...'
                aria-label='Escribe tu comentario aquí'
                minRows={4}
                classNames={{
                  input: `py-3 font-sans text-sm ${
                    isFocused ? 'border-primary' : ''
                  }`,
                  inputWrapper: 'h-auto'
                }}
              />
              <div className='absolute bottom-3 right-3 text-xs text-foreground-500 font-mono'>
                {value.length}/1000
              </div>
            </div>

            <div className='flex justify-end'>
              <SubmitButton />
            </div>
          </form>
        </CardBody>
      </Card>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='mt-4'
          >
            <Card className='bg-success-50 dark:bg-success-900/30 border-success-200 dark:border-success-800'>
              <CardBody className='flex flex-row items-center gap-2 p-3 text-sm text-success-700 dark:text-success-300'>
                <svg
                  className='w-4 h-4 flex-shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>¡Comentario publicado con éxito!</span>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
