import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { PostWithAvatar } from '@/types'

export default function RecentPostCard({
  recent
}: {
  recent: PostWithAvatar[]
}) {
  return (
    <div className='bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md'>
      <h3 className='font-sans text-lg font-semibold mb-5 pb-3 border-b border-border flex items-center gap-2'>
        <Clock className='w-5 h-5 text-blue-500' />
        <span>Posts recientes</span>
      </h3>
      <ul className='space-y-4'>
        {recent.map((post) => {
          const postDate = new Date(post.created_at)
          const formattedDate = postDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })

          return (
            <li key={post.id} className='group'>
              <Link
                href={`/posts/${post.id}`}
                className='block p-2 -mx-2 rounded-md transition-colors hover:bg-accent/50'
              >
                <h4 className='font-medium font-serif tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2'>
                  {post.title}
                </h4>
                <div className='flex items-center mt-2 text-sm'>
                  <div className='flex items-center'>
                    <Image
                      src={post.author_avatar || '/avatar.png'}
                      alt={post.author_name}
                      width={24}
                      height={24}
                      className='rounded-full border border-border mr-2'
                    />
                    <span className='text-muted-foreground'>
                      {post.author_name || 'Anónimo'}
                    </span>
                  </div>
                  <span
                    className='text-xs text-muted-foreground ml-auto'
                    title={postDate.toLocaleString()}
                  >
                    {formattedDate}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
