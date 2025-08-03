export async function getPopularTags(limit: number = 10) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tags/popular?limit=${limit}`,
    {
      next: {
        revalidate: 60,
        tags: ['popularTags']
      }
    }
  )
  const tags = await res.json()
  return tags
}
