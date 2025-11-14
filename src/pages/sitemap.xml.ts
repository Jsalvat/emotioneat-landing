import type { APIRoute } from 'astro';

const pages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/blog/comida-emocional-causas-consecuencias-estrategias', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/emotional-eating-how-to-identify-and-overcome-it', priority: '0.8', changefreq: 'monthly' },
];

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Site not configured', { status: 500 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Generate URLs for English (default)
  const englishUrls = pages.map(page => `
  <url>
    <loc>${new URL(page.path || '/', site).href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  // Generate URLs for Spanish
  const spanishUrls = pages.map(page => {
    const spanishPath = page.path ? `/es${page.path}` : '/es';
    const priority = parseFloat(page.priority) - 0.1; // Slightly lower priority for Spanish
    return `
  <url>
    <loc>${new URL(spanishPath, site).href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${englishUrls}${spanishUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

