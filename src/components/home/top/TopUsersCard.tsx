import Image from 'next/image'
import { Crown } from 'lucide-react'
import type { TopUser } from '@/types'

export default function TopUsersCard({ users }: { users: TopUser[] }) {
  return (
    <div className='bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md'>
      <h3 className='font-sans text-lg font-semibold mb-5 pb-3 border-b border-border flex items-center gap-2'>
        <Crown className='w-5 h-5 text-yellow-500 fill-yellow-500/20' />
        <span>Top usuarios de la semana</span>
      </h3>
      <ul className='space-y-3'>
        {users.map((u, index) => (
          <li
            key={u.id}
            className={`flex items-center p-2 rounded-md transition-colors hover:bg-accent/50 ${
              index === 0 ? 'bg-accent/20' : ''
            }`}
          >
            <div className='relative flex-shrink-0'>
              <Image
                src={u.avatar_url || '/avatar.png'}
                alt={u.name}
                width={40}
                height={40}
                className='rounded-full border-2 border-primary/20'
              />
              {index < 3 && (
                <span className='absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {index + 1}
                </span>
              )}
            </div>
            <div className='ml-3 overflow-hidden'>
              <p className='font-medium text-foreground truncate'>
                {u.name || 'Usuario anónimo'}
              </p>
              <p className='text-xs text-muted-foreground'>
                {u.post_count} publicaciones
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
