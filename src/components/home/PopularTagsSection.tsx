import PopularTags from '@/components/PopularTags'
import type { TagPopular } from '@/types'

export default function PopularTagSection({ tags }: { tags: TagPopular[] }) {
  return <PopularTags tags={tags} />
}
