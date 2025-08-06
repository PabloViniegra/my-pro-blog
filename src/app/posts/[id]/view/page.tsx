import { notFound } from 'next/navigation'
import { PostHeader } from '@/components/posts/view/PostHeader'
import { PostContent } from '@/components/posts/view/PostContent'
import { PostActions } from '@/components/posts/view/PostActions'
import { getPostById } from '@/lib/posts'
import Navbar from '@/components/shared/Navbar/Navbar'
import { hasLikedPost } from '@/lib/likes'
import { getUserByClerkId } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { hasSavedPost } from '@/lib/saved'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post) return {}

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      images: [{ url: post.image_url || '/og-default.png' }]
    }
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  if (!/^[0-9a-fA-F-]{36}$/.test(params.id)) {
    notFound()
  }

  const post = await getPostById(params.id)
  if (!post) notFound()

  const { userId } = await auth()
  let isLike = false
  let isSave = false
  if (userId) {
    const dbUser = await getUserByClerkId(userId)
    isLike = await hasLikedPost(dbUser.id, post.id)
    isSave = await hasSavedPost(dbUser.id, post.id)
  }

  return (
    <>
      <Navbar />
      <article className='max-w-3xl mx-auto px-4 py-8'>
        <PostHeader
          title={post.title}
          author={{
            name: post.author_name,
            avatarUrl: post.author_avatar
          }}
          publishedAt={post.created_at}
          tags={post.tags}
          image={post.image_url}
        />

        <div className='prose prose-invert max-w-none'>
          <PostContent content={post.content} />
        </div>

        <PostActions isLike={isLike} isSave={isSave} postId={post.id} />
      </article>
    </>
  )
}
