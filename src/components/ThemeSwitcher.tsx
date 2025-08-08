'use client'

import { Button } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant='light'
        aria-label='Toggle theme'
        className='w-9 h-9'
      >
        <Sun className='h-4 w-4' />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Moon className='h-4 w-4' />
      case 'dark':
        return <Sun className='h-4 w-4' />
      default:
        return <Monitor className='h-4 w-4' />
    }
  }

  return (
    <div className='flex items-center'>
      <Button
        isIconOnly
        variant='light'
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className='w-9 h-9 text-foreground/80 hover:text-foreground hover:bg-accent/50'
      >
        {getThemeIcon()}
      </Button>
    </div>
  )
}
