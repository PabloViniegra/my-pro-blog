import Navbar from '@/components/shared/Navbar/Navbar'
import { getAllPosts } from '@/lib/posts'
import PostsHeader from '@/components/posts/PostsHeader'
import NotFoundPosts from '@/components/posts/NotFoundPosts'
import PostCard from '@/components/posts/PostCard'
import Footer from '@/components/shared/Footer/Footer'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface SearchParams {
  search?: string | string[]
  page?: string | string[]
}

export default async function PostsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect('/signin')
  }

  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0] || ''
    : searchParams.search || ''

  const page = Array.isArray(searchParams.page)
    ? parseInt(searchParams.page[0] || '1', 10)
    : parseInt(searchParams.page || '1', 10)

  const limit = 10
  const offset = (page - 1) * limit

  const result = await getAllPosts({
    search: search.trim(),
    page,
    limit,
    offset
  })
  const posts = result.data || []
  const meta = result.meta || {}

  return (
    <section className='min-h-screen'>
      <Navbar />
      <div className='max-w-4xl mx-auto mt-20 mb-10'>
        <PostsHeader search={search} meta={meta} />
        {posts.length === 0 ? (
          <NotFoundPosts search={search} />
        ) : (
          <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </section>
  )
}
