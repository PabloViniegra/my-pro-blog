import Image from 'next/image'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { PostMostCommented } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function MostCommentedCard({
  commented
}: {
  commented: PostMostCommented[]
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
        <h3 className="font-sans text-xl font-bold flex items-center gap-3">
          <span className="font-sans text-md inline-flex items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <MessageSquare className="w-5 h-5" />
          </span>
          <span>Más comentados</span>
        </h3>
        <span className="text-sm text-muted-foreground">
          {commented.length}{' '}
          {commented.length === 1 ? 'publicación' : 'publicaciones'}
        </span>
      </div>
      <ul className="space-y-4">
        {commented.map((post) => {
          const postDate = post.created_at
            ? new Date(
                typeof post.created_at === 'string'
                  ? post.created_at.endsWith('Z')
                    ? post.created_at
                    : `${post.created_at}Z`
                  : post.created_at
              )
            : new Date()
          const formattedDate = format(postDate, 'd MMM', { locale: es })

          return (
            <li key={post.id} className="group">
              <Link
                href={`/posts/${post.id}`}
                className="block p-3 -mx-3 rounded-lg transition-all hover:bg-accent/30"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border/50">
                      <Image
                        src={post.last_comment_author_avatar || '/avatar.png'}
                        alt={post.last_comment_author_name || 'Autor'}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = '/avatar.png'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium font-serif tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-muted-foreground">
                        {post.author_name || 'Anónimo'} • {formattedDate}
                      </span>
                      <div className="flex items-center text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        <span>{post.comment_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
