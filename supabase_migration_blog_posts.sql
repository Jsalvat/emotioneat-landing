-- Migration: Create blog_posts table for EmotionEat blog
-- Compatible with existing Supabase MCP setup

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cover_image_url TEXT,
  -- SEO and metadata fields
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  -- Author and status
  author TEXT DEFAULT 'EmotionEat Team',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  -- Reading time estimate
  reading_time INTEGER DEFAULT 5
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published posts
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Create policies for authenticated users (if needed for admin)
-- These can be adjusted based on your authentication setup

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE blog_posts IS 'Blog posts for EmotionEat website - contains articles about emotional eating, nutrition, and mental health';
COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly identifier for the blog post';
COMMENT ON COLUMN blog_posts.excerpt IS 'Short summary for blog listing and SEO';
COMMENT ON COLUMN blog_posts.published_at IS 'When the post should be published (can be in the future)';
COMMENT ON COLUMN blog_posts.reading_time IS 'Estimated reading time in minutes';
