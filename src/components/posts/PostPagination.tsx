'use client'

import { Pagination } from '@heroui/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Props = {
  page: number
  totalPages: number
}

export default function PostPagination({ page, totalPages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  let searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-center my-8">
      <Pagination
        total={totalPages}
        page={page}
        variant="bordered"
        onChange={handlePageChange}
        showControls
        loop
      />
    </div>
  )
}
