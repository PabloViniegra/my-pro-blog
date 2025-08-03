import Navbar from '@/features/shared/Navbar'
import { getMostCommentedPosts, getRecentPosts } from '@/lib/posts'
import { getPopularTags } from '@/lib/tags'
import { HomeClient } from '@/components/HomeClient'
import Loading from './loading'
import { Suspense } from 'react'
import Footer from '@/features/shared/Footer'
import getTopUsers from '@/lib/users'

export default async function Home() {
  const recentPosts = await getRecentPosts()
  const popularTags = await getPopularTags()
  const [users, commented] = await Promise.all([
    getTopUsers(5),
    getMostCommentedPosts()
  ])

  return (
    <main>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <HomeClient
          posts={recentPosts}
          popularTags={popularTags}
          topUsers={users}
          MostCommented={commented}
        />
      </Suspense>
      <Footer />
    </main>
  )
}
