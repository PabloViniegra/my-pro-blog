import { getPostById } from '@/lib/posts'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  if (!post) return {}

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      images: post.image_url ? [{ url: post.image_url }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.slice(0, 160),
      images: post.image_url ? [post.image_url] : []
    }
  }
}
