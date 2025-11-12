import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Create client even if env vars are missing (for build time)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for blog posts (bilingual support)
export interface BlogPost {
  id: string
  // Legacy fields (maintained for backward compatibility)
  title: string
  slug: string
  content: string
  excerpt?: string
  // Bilingual fields
  title_en?: string
  title_es?: string
  excerpt_en?: string
  excerpt_es?: string
  content_en?: string
  content_es?: string
  meta_title_en?: string
  meta_title_es?: string
  meta_description_en?: string
  meta_description_es?: string
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

// Helper function to get blog post content in preferred language
export function getBlogPostInLanguage(
  post: BlogPost,
  lang: 'en' | 'es' = 'en'
): {
  title: string
  content: string
  excerpt: string
  meta_title: string
  meta_description: string
} {
  if (lang === 'es') {
    return {
      title: post.title_es || post.title_en || post.title || '',
      content: post.content_es || post.content_en || post.content || '',
      excerpt: post.excerpt_es || post.excerpt_en || post.excerpt || '',
      meta_title: post.meta_title_es || post.meta_title_en || post.meta_title || post.title_es || post.title_en || post.title || '',
      meta_description: post.meta_description_es || post.meta_description_en || post.meta_description || post.excerpt_es || post.excerpt_en || post.excerpt || ''
    }
  } else {
    return {
      title: post.title_en || post.title_es || post.title || '',
      content: post.content_en || post.content_es || post.content || '',
      excerpt: post.excerpt_en || post.excerpt_es || post.excerpt || '',
      meta_title: post.meta_title_en || post.meta_title_es || post.meta_title || post.title_en || post.title_es || post.title || '',
      meta_description: post.meta_description_en || post.meta_description_es || post.meta_description || post.excerpt_en || post.excerpt_es || post.excerpt || ''
    }
  }
}