import { Button } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import PostsCarousel from '@/components/home/PostsCarousel'
import type { PostWithAvatar } from '@/types'

export default function RecentPostsSection({
  posts
}: {
  posts: PostWithAvatar[]
}) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0">
            Artículos Recientes
          </h2>
          <Button
            as="a"
            href="/posts"
            variant="bordered"
            className="font-sans gap-2 px-6 py-2.5 border-foreground/20 hover:bg-accent/50 hover:border-foreground/30 transition-colors"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <PostsCarousel posts={posts} />
        </div>
      </div>
    </section>
  )
}
