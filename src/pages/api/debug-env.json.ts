import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const hasSupabaseUrl = !!import.meta.env.PUBLIC_SUPABASE_URL;
  const hasSupabaseKey = !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  // Don't expose actual values, just check if they exist
  const supabaseUrlPrefix = import.meta.env.PUBLIC_SUPABASE_URL 
    ? import.meta.env.PUBLIC_SUPABASE_URL.substring(0, 20) + '...'
    : 'NOT SET';

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    environment: import.meta.env.MODE,
    supabase_configured: hasSupabaseUrl && hasSupabaseKey,
    details: {
      PUBLIC_SUPABASE_URL: hasSupabaseUrl ? `${supabaseUrlPrefix}` : 'NOT SET',
      PUBLIC_SUPABASE_ANON_KEY: hasSupabaseKey ? 'SET (hidden)' : 'NOT SET',
    }
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

