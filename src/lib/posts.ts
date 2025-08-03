import { PostMostCommented, PostWithAvatar } from '@/types'

export async function getRecentPosts() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recents`,
    {
      next: {
        revalidate: 60,
        tags: ['recentPosts']
      }
    }
  )
  const posts: PostWithAvatar[] = await data.json()
  return posts
}

export async function getMostCommentedPosts() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/commented`,
    {
      next: {
        revalidate: 60,
        tags: ['mostCommentedPosts']
      }
    }
  )
  const posts: PostMostCommented[] = await data.json()
  return posts
}
