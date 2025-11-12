-- Migration: Add bilingual support to blog_posts table
-- This migration adds language-specific columns for English and Spanish content

-- Step 1: Add bilingual columns
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_es TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS content_es TEXT,
ADD COLUMN IF NOT EXISTS meta_title_en TEXT,
ADD COLUMN IF NOT EXISTS meta_title_es TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_es TEXT;

-- Step 2: Migrate existing data to language-specific columns
-- Assuming existing posts are in Spanish (based on audit)
UPDATE public.blog_posts
SET 
  title_es = title,
  excerpt_es = excerpt,
  content_es = content,
  meta_title_es = meta_title,
  meta_description_es = meta_description
WHERE title_es IS NULL;

-- Step 3: Create indexes for language-specific queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_en ON public.blog_posts(title_en) WHERE title_en IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_es ON public.blog_posts(title_es) WHERE title_es IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status) WHERE status = 'published';

-- Step 4: Add comment explaining the bilingual structure
COMMENT ON TABLE public.blog_posts IS 'Bilingual blog posts table - supports English (_en) and Spanish (_es) content. Legacy title/content/excerpt columns maintained for backward compatibility.';

-- Step 5: Create helper function to get post in preferred language with fallback
CREATE OR REPLACE FUNCTION public.get_blog_post_language(
  p_title_en TEXT,
  p_title_es TEXT,
  p_content_en TEXT,
  p_content_es TEXT,
  p_excerpt_en TEXT,
  p_excerpt_es TEXT,
  p_meta_title_en TEXT,
  p_meta_title_es TEXT,
  p_meta_description_en TEXT,
  p_meta_description_es TEXT,
  p_lang TEXT DEFAULT 'en'
) RETURNS TABLE (
  title TEXT,
  content TEXT,
  excerpt TEXT,
  meta_title TEXT,
  meta_description TEXT
) AS $$
BEGIN
  IF p_lang = 'es' THEN
    -- Return Spanish if available, fallback to English
    RETURN QUERY SELECT
      COALESCE(p_title_es, p_title_en) AS title,
      COALESCE(p_content_es, p_content_en) AS content,
      COALESCE(p_excerpt_es, p_excerpt_en) AS excerpt,
      COALESCE(p_meta_title_es, p_meta_title_en) AS meta_title,
      COALESCE(p_meta_description_es, p_meta_description_en) AS meta_description;
  ELSE
    -- Return English if available, fallback to Spanish
    RETURN QUERY SELECT
      COALESCE(p_title_en, p_title_es) AS title,
      COALESCE(p_content_en, p_content_es) AS content,
      COALESCE(p_excerpt_en, p_excerpt_es) AS excerpt,
      COALESCE(p_meta_title_en, p_meta_title_es) AS meta_title,
      COALESCE(p_meta_description_en, p_meta_description_es) AS meta_description;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION public.get_blog_post_language IS 'Helper function to get blog post content in preferred language with automatic fallback to other language if translation missing';

-- Step 6: Update RLS policies to work with new structure (policies already exist, no changes needed)
-- Existing policies will continue to work since they only check published_at and auth.role()

