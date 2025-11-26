import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Create client even if env vars are missing (for build time)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for blog posts (English only)
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  // English fields (primary)
  title_en?: string
  excerpt_en?: string
  content_en?: string
  meta_title_en?: string
  meta_description_en?: string
  // Common fields
  published_at: string
  created_at: string
  updated_at: string
  cover_image_url?: string
  meta_title?: string
  meta_description?: string
  keywords?: string[]
  author?: string
  status: 'draft' | 'published' | 'archived'
  reading_time?: number
}

// Helper function to get blog post content (English only)
export function getBlogPostInLanguage(
  post: BlogPost,
  lang: 'en' = 'en'
): {
  title: string
  content: string
  excerpt: string
  meta_title: string
  meta_description: string
} {
  return {
    title: post.title_en || post.title || '',
    content: post.content_en || post.content || '',
    excerpt: post.excerpt_en || post.excerpt || '',
    meta_title: post.meta_title_en || post.meta_title || post.title_en || post.title || '',
    meta_description: post.meta_description_en || post.meta_description || post.excerpt_en || post.excerpt || ''
  }
}
