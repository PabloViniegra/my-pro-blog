'use client'

import { Skeleton } from '@heroui/react'

export default function Loading() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-8 space-y-8'>
      <div className='space-y-4'>
        <Skeleton className='h-8 w-3/4' />
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-6 w-20 rounded-full' />
          ))}
        </div>
        <Skeleton className='h-64 w-full rounded-lg' />
      </div>
      <div className='space-y-4'>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className='h-4 w-full' />
        ))}
        <Skeleton className='h-4 w-5/6' />
      </div>
      <div className='flex gap-4 pt-4'>
        <Skeleton className='h-9 w-24 rounded-md' />
        <Skeleton className='h-9 w-24 rounded-md' />
        <Skeleton className='h-9 w-24 rounded-md' />
      </div>
    </div>
  )
}
