'use client'

import { Button } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import PostsCarousel from '@/features/posts/PostsCarousel'
import { PostMostCommented, PostWithAvatar, TagPopular, TopUser } from '@/types'
import Hero from '@/components/Hero'
import PopularTags from '@/features/tags/PopularTags'
import TopSection from './TopSection'

function RecentPosts({ posts }: { posts: PostWithAvatar[] }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0">
            Artículos Recientes
          </h2>
          <Button
            as="a"
            href="/blog"
            variant="bordered"
            className="font-sans gap-2 px-6 py-2.5 border-foreground/20 hover:bg-accent/50 hover:border-foreground/30 transition-colors"
          >
            Ver todos los artículos
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

export function HomeClient({
  posts,
  popularTags,
  topUsers,
  MostCommented
}: {
  posts: PostWithAvatar[]
  popularTags: TagPopular[]
  topUsers: TopUser[]
  MostCommented: PostMostCommented[]
}) {
  //   const { isSignedIn, isLoaded } = useUser()
  //   const router = useRouter()

  //   useEffect(() => {
  //     if (isLoaded && !isSignedIn) {
  //       router.replace('/signin')
  //     }
  //   }, [isLoaded, isSignedIn, router])

  //   if (!isLoaded || !isSignedIn) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         <Spinner />
  //       </div>
  //     )
  //   }

  return (
    <main className="min-h-screen">
      <Hero />
      <RecentPosts posts={posts} />
      <PopularTags tags={popularTags} />
      <TopSection users={topUsers} recent={posts} commented={MostCommented} />
    </main>
  )
}
