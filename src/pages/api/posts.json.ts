import type { APIRoute } from 'astro';
import { supabase, getBlogPostInLanguage, type BlogPost } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  // Get language from query parameter (default: en)
  const lang = (url.searchParams.get('lang') || 'en') as 'en' | 'es';

  // Validate language
  if (!['en', 'es'].includes(lang)) {
    return new Response(JSON.stringify({
      error: 'Invalid language. Use "en" or "es".'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Check if Supabase is configured
  if (!supabase) {
    return new Response(JSON.stringify({
      error: 'Database not configured',
      count: 0,
      posts: []
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // Fetch all published posts
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        published_at,
        reading_time,
        cover_image_url,
        author,
        keywords,
        title_en,
        title_es,
        excerpt_en,
        excerpt_es,
        meta_title_en,
        meta_title_es
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return new Response(JSON.stringify({
        error: 'Failed to fetch posts',
        count: 0,
        posts: []
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Localize posts based on requested language
    const localizedPosts = (data || []).map((post: any) => {
      const title = lang === 'es' 
        ? (post.title_es || post.title_en || '') 
        : (post.title_en || post.title_es || '');
      
      const excerpt = lang === 'es' 
        ? (post.excerpt_es || post.excerpt_en || '') 
        : (post.excerpt_en || post.excerpt_es || '');
      
      const meta_title = lang === 'es'
        ? (post.meta_title_es || post.meta_title_en || title)
        : (post.meta_title_en || post.meta_title_es || title);

      return {
        id: post.id,
        slug: post.slug,
        title,
        excerpt,
        meta_title,
        published_at: post.published_at,
        reading_time: post.reading_time,
        cover_image_url: post.cover_image_url,
        author: post.author,
        keywords: post.keywords || []
      };
    });

    // Return response with caching headers
    return new Response(JSON.stringify({
      count: localizedPosts.length,
      language: lang,
      posts: localizedPosts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=600', // Cache for 5 min client, 10 min CDN
        'Access-Control-Allow-Origin': '*', // Allow CORS for external access
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      count: 0,
      posts: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Handle OPTIONS request for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};

