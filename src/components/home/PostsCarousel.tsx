'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { PostWithAvatar } from '@/types'
import Image from 'next/image'
import { getSafeImageSrc } from '@/utils/utils'

export default function PostsCarousel({ posts }: { posts: PostWithAvatar[] }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={3}
      spaceBetween={2}
      loop
      autoplay={{ delay: 5000 }}
      grabCursor={true}
      pagination={{ clickable: true }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id} className='h-auto'>
          <div
            className='bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-5 flex flex-col w-72 h-[420px] overflow-hidden'
            onClick={() => (window.location.href = `/posts/${post.id}/view`)}
          >
            <div className='h-48 mb-4 overflow-hidden rounded-xl'>
              <Image
                src={getSafeImageSrc(post.image_url) || '/avatar.png'}
                alt={post.title}
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                width={400}
                height={200}
                priority
              />
            </div>
            <h3 className='text-lg font-bold mb-2 font-sans line-clamp-2 h-14'>
              {post.title}
            </h3>
            <div className='flex flex-wrap gap-2 mb-4 min-h-16 items-start'>
              {post.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-sans'
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='mt-auto pt-4 border-t border-border/20'>
              <div className='flex items-center justify-end'>
                <div className='text-right mr-3'>
                  <p className='text-xs text-gray-500 dark:text-gray-400 font-mono'>
                    {new Date(post.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Image
                  src={getSafeImageSrc(post.author_avatar) || '/avatar.png'}
                  className='rounded-full border-2 border-white dark:border-zinc-800'
                  alt='User avatar'
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
