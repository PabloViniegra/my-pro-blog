'use client'

import { useState, KeyboardEvent, useRef, useEffect, ChangeEvent } from 'react'
import { Chip, Input } from '@heroui/react'
import { X } from 'lucide-react'

export interface TagSelectorProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

export const TagSelector = ({
  tags = [],
  onTagsChange,
  placeholder = 'Escribe y presiona Enter para agregar tags...',
  maxTags = 10
}: TagSelectorProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newTag = inputValue.trim().replace(/^#+/, '')
      if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
        onTagsChange([...tags, newTag])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onTagsChange(tags.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }
  useEffect(() => {
    if (isFocused && inputValue === '') {
      setInputValue('#')
    }
  }, [isFocused])

  return (
    <div className='w-full rounded-lg'>
      <div
        onClick={handleContainerClick}
        className={`relative flex flex-wrap items-center gap-2 min-h-12 p-2 bg-background border ${
          isFocused ? 'border-primary' : 'border-default-200'
        } rounded-lg transition-colors cursor-text`}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant='flat'
            size='sm'
            classNames={{
              base: 'bg-sidebar text-sidebar-foreground font-mono text-xs',
              content: 'flex items-center gap-1'
            }}
            endContent={
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(tag)
                }}
                className='flex items-center justify-center rounded-full hover:bg-foreground/10 size-4'
                aria-label={`Remove ${tag}`}
              >
                <X className='size-3' />
              </button>
            }
          >
            #{tag}
          </Chip>
        ))}
        {tags.map((tag, index) => (
          <input key={index} type='hidden' name='tags[]' value={tag} />
        ))}
        <Input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={tags.length === 0 ? placeholder : ''}
          classNames={{
            input: 'font-sans text-sm rounded-lg',
            inputWrapper: 'h-auto min-h-10 bg-transparent shadow-none'
          }}
          size='sm'
          variant='flat'
          isClearable={false}
          aria-label='Añadir etiquetas'
        />
      </div>
      <div className='mt-1 flex justify-between text-xs text-foreground/60'>
        <span className='font-serif'>Presiona Enter para agregar</span>
        <span>
          {tags.length}/{maxTags} etiquetas
        </span>
      </div>
    </div>
  )
}

export default TagSelector
