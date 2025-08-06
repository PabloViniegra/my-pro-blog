'use client'

import { useState } from 'react'
import PostImageForm from '@/components/posts/new/PostImageForm'
import { Input, Textarea, Button } from '@heroui/react'
import MdEditor from './MdEditor'
import { FilePlus } from 'lucide-react'
import TagSelector from './TagSelector'
import { createPostAction } from '@/app/actions/createPost'




export default function FormCreate() {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <section className='w-full max-w-6xl mx-auto mt-10 px-4'>
      <h1 className='text-3xl font-bold mb-8 font-sans tracking-tight'>
        Crea tu blog
      </h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setIsSubmitting(true)
          
          try {
            const form = e.currentTarget
            const formData = new FormData(form)

            formData.set('title', title)
            formData.set('content', content)
            formData.set('image_url', imageUrl || '')
            formData.set('tags', JSON.stringify(tags))

            await createPostAction(formData)
          } finally {
            setIsSubmitting(false)
          }
        }}
        className='flex flex-col gap-4'
      >
        <header className='flex flex-row items-center justify-between max-w-6xl'>
          <h6 className='text-md font-medium font-serif tracking-tight text-foreground/70'>
            Imagen
          </h6>
          <Button
            type='submit'
            variant='flat'
            isLoading={isSubmitting}
            startContent={
              !isSubmitting && (
                <FilePlus className='size-4 transition-transform group-hover:scale-110' />
              )
            }
            className='group relative overflow-hidden bg-sidebar rounded-full font-mono tracking-tight text-sidebar-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-medium px-7 py-2.5 border border-primary/20 hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isSubmitting}
          >
            <span className='relative z-10 flex items-center gap-2'>
              {isSubmitting ? 'Creando...' : 'Crear publicación'}
            </span>
            <span className='absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300 -skew-x-12 -translate-x-full group-hover:translate-x-full'></span>
          </Button>
        </header>
        <PostImageForm onChange={setImageUrl} />
        <Input
          name='title'
          placeholder='Título del post'
          variant='faded'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classNames={{
            input: [
              'font-serif',
              'text-lg',
              'font-bold',
              'py-2',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none',
              'focus:ring-0',
              'focus-visible:ring-0',
              'focus-visible:ring-offset-0',
              'border-0',
              'px-0',
              'rounded-none',
              'border-b',
              'border-border',
              'focus:border-primary',
              'transition-colors',
              'duration-200',
              'ease-in-out'
            ],
            inputWrapper: [
              'bg-transparent',
              'shadow-none',
              'px-0',
              'data-[hover=true]:bg-transparent',
              'group-data-[focus=true]:bg-transparent',
              'border-0',
              'rounded-none'
            ]
          }}
        />
        <h6 className='text-md font-medium font-serif tracking-tight text-foreground/70 mt-10'>
          Tags
        </h6>
        <TagSelector
          tags={tags}
          onTagsChange={setTags}
          placeholder='Escribe y presiona Enter para agregar tags...'
          maxTags={10}
        />
        <input type='hidden' name='tags' value={JSON.stringify(tags)} />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 h-[calc(100vh-250px)] mb-12'>
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between mb-2'>
              <h6 className='text-md font-medium font-sans tracking-tight text-foreground/70'>
                Editor Markdown
              </h6>
              <span className='text-xs text-muted-foreground'>
                {content.length} caracteres
              </span>
            </div>

            <div className='flex-1 flex flex-col rounded-lg border border-border bg-background overflow-hidden shadow-sm'>
              <div className='px-4 py-2 border-b border-border bg-muted/20'>
                <div className='flex gap-2'>
                  {[
                    '#',
                    '**B**',
                    '*I*',
                    '`',
                    '>',
                    '-',
                    '1.',
                    '[Link]()',
                    '![Image](src)'
                  ].map((item, i) => (
                    <button
                      key={i}
                      type='button'
                      className='text-xs px-2 py-1 rounded hover:bg-muted/50 transition-colors'
                      onClick={() => {
                        const textarea = document.querySelector('textarea')
                        if (textarea) {
                          const start = textarea.selectionStart
                          const end = textarea.selectionEnd
                          const selectedText = content.substring(start, end)
                          const newText =
                            content.substring(0, start) +
                            item +
                            selectedText +
                            content.substring(end)
                          setContent(newText)
                          setTimeout(() => {
                            textarea.focus()
                            textarea.selectionStart = start + item.length
                            textarea.selectionEnd = start + item.length
                          }, 0)
                        }
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                name='content'
                placeholder='Escribe tu contenido en markdown...'
                variant='flat'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                classNames={{
                  input: [
                    'font-mono',
                    'text-sm',
                    'py-4',
                    'px-4',
                    'resize-none',
                    'focus:outline-none',
                    'focus:ring-0',
                    'focus-visible:ring-0',
                    'focus-visible:ring-offset-0',
                    'h-full',
                    'min-h-[500px]',
                    'w-full',
                    'bg-transparent',
                    'text-foreground',
                    'leading-relaxed',
                    'whitespace-pre-wrap',
                    'break-words',
                    'overflow-auto',
                    'scrollbar-thin',
                    'scrollbar-thumb-muted-foreground/20',
                    'scrollbar-thumb-rounded-full',
                    'hover:scrollbar-thumb-muted-foreground/30'
                  ],
                  inputWrapper: [
                    'bg-transparent',
                    'h-full',
                    'flex-1',
                    'p-0',
                    'border-0',
                    'rounded-none',
                    'shadow-none',
                    'data-[hover=true]:bg-transparent',
                    'group-data-[focus=true]:bg-transparent',
                    'overflow-hidden',
                    'transition-all',
                    'duration-200',
                    'ease-in-out'
                  ]
                }}
              />
            </div>
          </div>
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between mb-2'>
              <h6 className='text-md font-medium font-sans tracking-tight text-foreground/70'>
                Vista Previa
              </h6>
              <span className='text-xs text-muted-foreground'>
                {content.split('\n').length} líneas
              </span>
            </div>

            <div className='flex-1 flex flex-col overflow-y-auto rounded-lg border border-border bg-background shadow-sm'>
              <div className='px-4 py-2 border-b border-border bg-muted/20 flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>
                  {content
                    ? 'Vista previa en tiempo real'
                    : 'La vista previa aparecerá aquí'}
                </span>
                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                  <span className='inline-flex h-2 w-2 rounded-full bg-emerald-500/80'></span>
                  <span>Markdown</span>
                </div>
              </div>
              <div className='p-6 overflow-y-auto h-full'>
                {content ? (
                  <MdEditor value={content} />
                ) : (
                  <div className='h-full flex items-center justify-center text-muted-foreground/50 text-sm'>
                    Comienza a escribir para ver la vista previa...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
