import { MetaPost } from '@/types'

export default function PostsHeader({
  search,
  meta
}: {
  search?: string
  meta?: MetaPost
}) {
  return (
    <div className='mb-12 text-center'>
      <h1 className='text-4xl font-bold font-sans mb-4'>
        {search ? `Resultados para "${search}"` : 'Todos los posts'}
      </h1>
      <p className='text-muted-foreground font-serif tracking-wide'>
        {search
          ? `${meta?.total} ${
              meta?.total === 1
                ? 'resultado encontrado'
                : 'resultados encontrados'
            }`
          : 'Explora nuestras últimas publicaciones'}
      </p>
    </div>
  )
}
