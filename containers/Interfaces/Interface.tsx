export interface User {
  github_username?: string
  name: string
  profile_image?: string
  profile_image_90?: string
  twitter_username?: string
  username?: string
  website_url?: null | string
}

export interface FlareTag {
  name?: string
  bg_color_hex?: string
  text_color_hex?: string
}

export interface BlogPost {
  id: number
  title: string
  description: string
  type_of: string
  canonical_url: string
  slug: string
  body_markdown: string
  tag_list: string[]
  comments_count: number
  cover_image: string
  page_views_count: number
  path: string
  positive_reactions_count: number
  public_reactions_count: number
  published: boolean
  published_at: string
  published_timestamp: string
  url: string
  user: User
  flare_tag?: FlareTag
  readable_publish_date: string
  collection_id: null | number
  social_image: string
  created_at: string
  edited_at: string | null
  crossposted_at: null | string
  last_comment_at: string
  body_html: string
}

export interface AllBlogProps {
  hopeBlog: BlogPost
}

export interface Props {
  posts: BlogPost[]
}
