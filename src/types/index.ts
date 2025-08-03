export interface User {
  id: string
  clerk_id: string
  email: string
  name: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface UserSimple {
  clerk_id: string
  email: string
  name: string
  avatar_url: string
}

export interface Post {
  id: string
  title: string
  content: string
  image_url: string
  tags: string[]
  published: boolean
  author_id: string
  created_at: string
  updated_at: string
}

export interface PostWithAvatar {
  id: string
  title: string
  content: string
  image_url: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
  author_name: string
  author_avatar: string
}

export interface TagPopular {
  tag: string
  count: number
}

export interface TopUser {
  id: string
  name: string
  avatar_url: string
  post_count: number
}

export interface PostMostCommented {
  id: string
  title: string
  comment_count: number
  author_name: string
  avatar_url: string
  created_at: string
}
