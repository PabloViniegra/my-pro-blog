import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Crown, Clock, MessageSquare } from 'lucide-react'
import { PostMostCommented, PostWithAvatar, TopUser } from '@/types'

export default function TopSection({
  users,
  recent,
  commented
}: {
  users: TopUser[]
  recent: PostWithAvatar[]
  commented: PostMostCommented[]
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {/* Top Usuarios */}
      <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
        <h3 className="font-sans text-lg font-semibold mb-5 pb-3 border-b border-border flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
          <span>Top usuarios de la semana</span>
        </h3>
        <ul className="space-y-3">
          {users.map((u, index) => (
            <li
              key={u.id}
              className={`flex items-center p-2 rounded-md transition-colors hover:bg-accent/50 ${
                index === 0 ? 'bg-accent/20' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={u.avatar_url || '/avatar.png'}
                  alt={u.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-primary/20"
                />
                {index < 3 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="font-medium text-foreground truncate">
                  {u.name || 'Usuario anónimo'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {u.post_count} publicaciones
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Posts más recientes */}
      <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md">
        <h3 className="font-sans text-lg font-semibold mb-5 pb-3 border-b border-border flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span>Posts recientes</span>
        </h3>
        <ul className="space-y-4">
          {recent.map((post: PostWithAvatar) => {
            const postDate = new Date(post.created_at)
            const formattedDate = postDate.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })

            return (
              <li key={post.id} className="group">
                <Link
                  href={`/posts/${post.id}`}
                  className="block p-2 -mx-2 rounded-md transition-colors hover:bg-accent/50"
                >
                  <h4 className="font-medium font-serif tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center mt-2 text-sm">
                    <div className="flex items-center">
                      <Image
                        src={post.author_avatar || '/avatar.png'}
                        alt={post.author_name}
                        width={24}
                        height={24}
                        className="rounded-full border border-border mr-2"
                      />
                      <span className="text-muted-foreground">
                        {post.author_name || 'Anónimo'}
                      </span>
                    </div>
                    <span
                      className="text-xs text-muted-foreground ml-auto"
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

      {/* Posts más comentados */}
      <div className="bg-card border border-border rounded-xl p-6 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
          <h3 className="font-sans text-xl font-bold flex items-center gap-3">
            <span className="font-sans text-md inline-flex items-center justify-center size- rounded-full bg-green-500/10 text-green-500">
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
          {commented.map((post: PostMostCommented) => {
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
                          src={post.avatar_url || '/avatar.png'}
                          alt={post.author_name || 'Autor'}
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
    </section>
  )
}
