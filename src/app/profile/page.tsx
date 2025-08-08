import { Suspense } from 'react'
import { Profile } from '@/components/profile/Profile'
import { Skeleton } from '@heroui/skeleton'
import Navbar from '@/components/shared/Navbar/Navbar'

export const dynamic = 'force-dynamic'

function ProfileSkeleton() {
  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='space-y-8'>
        <Skeleton className='h-10 w-48' />
        <div className='p-6 rounded-lg border border-border bg-card'>
          <div className='space-y-6'>
            <Skeleton className='h-8 w-64' />
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-9 w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <section className='container mx-auto py-8 px-4'>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </section>
    </>
  )
}
