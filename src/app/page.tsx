import Navbar from '@/components/shared/Navbar/Navbar'
import { getMostCommentedPosts, getRecentPosts } from '@/lib/posts'
import { getPopularTags } from '@/lib/tags'
import HomeClient from '@/components/home/HomeClient'
import Footer from '@/components/shared/Footer/Footer'
import getTopUsers from '@/lib/users'

export const metadata = {
  title: 'My Pro Blog - Inicio',
  description:
    'Descubre los mejores artículos de desarrollo web, tecnología y más.'
}

export default async function Home() {
  const [users, commented, recentPosts, popularTags] = await Promise.all([
    getTopUsers(5),
    getMostCommentedPosts(),
    getRecentPosts(),
    getPopularTags()
  ])

  return (
    <main>
      <Navbar />
      <HomeClient
        posts={recentPosts}
        popularTags={popularTags}
        topUsers={users}
        mostCommented={commented}
      />
      <Footer />
    </main>
  )
}
