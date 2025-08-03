'use client'

import HeroSection from '@/components/home/HeroSection'
import RecentPostsSection from '@/components/home/RecentPostsSection'
import PopularTagsSection from '@/components/home/PopularTagsSection'
import TopSection from '@/components/home/top/TopSection'
import type {
  PostMostCommented,
  PostWithAvatar,
  TagPopular,
  TopUser
} from '@/types'

export default function HomeClient({
  posts,
  popularTags,
  topUsers,
  mostCommented
}: {
  posts: PostWithAvatar[]
  popularTags: TagPopular[]
  topUsers: TopUser[]
  mostCommented: PostMostCommented[]
}) {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RecentPostsSection posts={posts} />
      <PopularTagsSection tags={popularTags} />
      <TopSection users={topUsers} recent={posts} commented={mostCommented} />
    </main>
  )
}
