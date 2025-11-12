import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Create client even if env vars are missing (for build time)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for blog posts
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
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