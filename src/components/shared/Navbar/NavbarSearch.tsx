'use client'

import { Input } from '@heroui/react'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function NavbarSearch() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const [query, setQuery] = useState(searchParams.get('search') ?? '')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams()
      if (query) {
        params.set('search', query)
      }
      replace(`/posts?${params.toString()}`)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)

    if (value === '') {
      const params = new URLSearchParams(searchParams)
      params.delete('search')
      replace(`${pathName}?${params.toString()}`)
    }
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
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
