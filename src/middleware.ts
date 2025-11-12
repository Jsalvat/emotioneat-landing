import type { MiddlewareHandler } from 'astro';

// Idiomas soportados
const SUPPORTED_LOCALES = ['en', 'es'];
const DEFAULT_LOCALE = 'en';

// Función para detectar el idioma preferido del navegador
function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  // Parsear el header Accept-Language
  // Ejemplo: "es-ES,es;q=0.9,en;q=0.8"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.replace('q=', ''));
      return { locale: locale.split('-')[0], quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Buscar el primer idioma soportado
  for (const { locale } of languages) {
    if (SUPPORTED_LOCALES.includes(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, request } = context;
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  // No hacer nada si:
  // 1. Ya está en una ruta de idioma específico (/es/...)
  // 2. Es una ruta de assets estáticos (_astro, favicon, robots.txt, etc.)
  // 3. Es una ruta de API
  // 4. Hay un parámetro de query que fuerza el idioma
  // 5. Es un archivo estático (imágenes, CSS, JS, etc.)
  if (
    pathname.startsWith('/es') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/og-image') ||
    urlObj.searchParams.has('lang') ||
    /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return next();
  }

  // Si está en la raíz (/), detectar idioma y redirigir si es necesario
  // SOLO si no hay parámetro lang (primera visita)
  if ((pathname === '/' || pathname === '/index.html') && !urlObj.searchParams.has('lang')) {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLocale(acceptLanguage);

    // Si detecta español y no está ya en /es, redirigir
    if (detectedLocale === 'es') {
      return new Response(null, {
        status: 307,
        headers: {
          Location: '/es',
        },
      });
    }
  }

  return next();
};

