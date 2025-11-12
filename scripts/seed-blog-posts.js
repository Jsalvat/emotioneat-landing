import { createClient } from '@supabase/supabase-js'
import { comidaEmocionalPost } from '../src/data/blog-posts/comida-emocional.ts'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedBlogPosts() {
  try {
    console.log('🌱 Starting blog posts seeding...')

    // Check if post already exists
    const { data: existingPost, error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', comidaEmocionalPost.slug)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingPost) {
      console.log('⚠️  Post already exists, skipping...')
      return
    }

    // Insert the blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: comidaEmocionalPost.title,
        slug: comidaEmocionalPost.slug,
        content: comidaEmocionalPost.content,
        excerpt: comidaEmocionalPost.excerpt,
        published_at: comidaEmocionalPost.published_at,
        cover_image_url: comidaEmocionalPost.cover_image_url
      })
      .select()

    if (error) {
      throw error
    }

    console.log('✅ Blog post inserted successfully!')
    console.log('📝 Title:', data[0].title)
    console.log('🔗 Slug:', data[0].slug)
    console.log('📅 Published:', new Date(data[0].published_at).toLocaleDateString('es-ES'))

  } catch (error) {
    console.error('❌ Error seeding blog posts:', error)
    process.exit(1)
  }
}

// Run the seeding function
seedBlogPosts().then(() => {
  console.log('🎉 Seeding completed!')
  process.exit(0)
})
