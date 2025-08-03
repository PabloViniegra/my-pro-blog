import { TopUser } from '@/types'

export default async function getTopUsers(limit: number) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/week?limit=${limit}`,
    {
      next: {
        revalidate: 60,
        tags: ['topUsers']
      }
    }
  )
  const users: TopUser[] = await data.json()
  return users
}
