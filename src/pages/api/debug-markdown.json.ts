import type { APIRoute } from 'astro';
import { supabase, getBlogPostInLanguage } from '../../lib/supabase';
import { marked } from 'marked';

// Configure marked for better HTML output
marked.setOptions({
	breaks: true,
	gfm: true,
});

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug') || 'mindfulness-and-emotional-eating-extended';

  try {
    // Get the post
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      return new Response(JSON.stringify({
        error: 'Post not found',
        slug,
        details: error?.message
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test both languages
    const localizedEn = getBlogPostInLanguage(post, 'en');
    const localizedEs = getBlogPostInLanguage(post, 'es');

    // Convert markdown to HTML
    const htmlEn = await marked.parse(localizedEn.content);
    const htmlEs = await marked.parse(localizedEs.content);

    return new Response(JSON.stringify({
      success: true,
      slug,
      original_content_en: post.content_en?.substring(0, 200) + '...',
      original_content_es: post.content_es?.substring(0, 200) + '...',
      localized_content_en: localizedEn.content?.substring(0, 200) + '...',
      localized_content_es: localizedEs.content?.substring(0, 200) + '...',
      html_en_preview: htmlEn?.substring(0, 300) + '...',
      html_es_preview: htmlEs?.substring(0, 300) + '...',
      has_markdown_en: localizedEn.content?.includes('# '),
      has_markdown_es: localizedEs.content?.includes('# '),
      html_contains_tags: htmlEn?.includes('<h1>') || htmlEn?.includes('<p>'),
      marked_version: '3.x'
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

