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
import { getCommentsTree } from '@/lib/comments'
import CommentForm from '@/components/posts/view/CommentForm'
import { CommentTreeNode } from '@/types'
import CommentsSection from '@/components/posts/view/CommentsSection'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params
  const post = await getPostById(id)

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
  const { id } = await params
  if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
    notFound()
  }

  const post = await getPostById(id)
  if (!post) notFound()

  const { userId } = await auth()
  let isLike = false
  let isSave = false
  let commentsTree: CommentTreeNode[] = []
  if (userId) {
    const dbUser = await getUserByClerkId(userId)
    isLike = await hasLikedPost(dbUser.id, post.id)
    isSave = await hasSavedPost(dbUser.id, post.id)
    commentsTree = await getCommentsTree(post.id, dbUser.id)
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
        <PostActions postId={post.id} isLike={isLike} isSave={isSave} />
        <section className='mt-10'>
          <CommentForm postId={post.id} />
          <CommentsSection
            comments={commentsTree}
            postAuthorName={post.author_name}
          />
        </section>
      </article>
    </>
  )
}
