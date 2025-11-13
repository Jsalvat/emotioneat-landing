// Test script to verify Supabase configuration
// Run with: node test-supabase-config.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')
  
  try {
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('id, slug, title_en, title_es, status', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching blog posts:', error)
      return
    }

    console.log(`✅ Successfully connected to Supabase!`)
    console.log(`📊 Found ${count} published posts:\n`)
    
    data.forEach((post, index) => {
      console.log(`${index + 1}. ${post.slug}`)
      console.log(`   EN: ${post.title_en}`)
      console.log(`   ES: ${post.title_es}`)
      console.log(`   Status: ${post.status}\n`)
    })
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testConnection()












