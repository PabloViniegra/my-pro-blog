import TopUsersCard from '@/components/home/top/TopUsersCard'
import RecentPostCard from '@/components/home/top/RecentPostCard'
import MostCommentedCard from '@/components/home/top/MostCommentedCard'
import type { PostMostCommented, PostWithAvatar, TopUser } from '@/types'

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
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 mb-7">
      <TopUsersCard users={users} />
      <RecentPostCard recent={recent} />
      <MostCommentedCard commented={commented} />
    </section>
  )
}
