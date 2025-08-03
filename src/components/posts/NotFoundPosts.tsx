import { Search } from 'lucide-react'

export default function NotFoundPosts({ search }: { search?: string }) {
  return (
    <div className='text-center py-16'>
      <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4'>
        <Search className='w-8 h-8 text-accent' />
      </div>
      <h2 className='text-xl font-sans font-semibold mb-2'>
        No se encontraron posts
      </h2>
      <p className='text-muted-foreground font-serif'>
        {search
          ? 'Prueba con otros términos de búsqueda.'
          : 'Parece que aún no hay publicaciones disponibles.'}
      </p>
    </div>
  )
}
