'use client'

import { Input } from '@heroui/react'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, KeyboardEvent } from 'react'

export default function NavbarSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')

  // Sync with URL search param on initial load
  useEffect(() => {
    const searchParam = searchParams.get('search') || ''
    setQuery(searchParam)
  }, [searchParams])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams()
      
      if (query.trim()) {
        params.set('search', query.trim())
      } else {
        params.delete('search')
      }
      
      router.push(`/posts?${params.toString()}`)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div className='hidden md:flex items-center gap-4'>
      <div className='flex items-center'>
        <Input
          classNames={{
            base: 'w-48',
            input: 'text-xs font-mono tracking-tight font-normal',
            inputWrapper:
              'h-9 bg-background border-border/50 hover:bg-background/80'
          }}
          placeholder='Buscar artículos'
          size='sm'
          startContent={<Search className='text-foreground/50' size={16} />}
          type='search'
          variant='bordered'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
