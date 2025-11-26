import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async () => {
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
    // Fetch all published posts (English only)
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
        excerpt_en,
        meta_title_en
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

    // Format posts (English only)
    const posts = (data || []).map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title_en || '',
      excerpt: post.excerpt_en || '',
      meta_title: post.meta_title_en || post.title_en || '',
      published_at: post.published_at,
      reading_time: post.reading_time,
      cover_image_url: post.cover_image_url,
      author: post.author,
      keywords: post.keywords || []
    }));

    // Return response with caching headers
    return new Response(JSON.stringify({
      count: posts.length,
      language: 'en',
      posts: posts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
        'Access-Control-Allow-Origin': '*',
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
