import { createClient } from '@supabase/supabase-js';

console.log('🔍 Verificando configuración de Supabase...');

// Variables de entorno desde el sistema (configurar en .env para desarrollo o Netlify para producción)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('📋 Variables de entorno:');
console.log('- SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
console.log('- SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurada' : '❌ Faltante');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Variables de entorno faltantes');
  process.exit(1);
}

console.log('✅ Variables configuradas correctamente');

try {
  console.log('🔌 Probando conexión a Supabase...');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Probar consulta de posts publicados
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.log('❌ Error de conexión:', error.message);
    process.exit(1);
  }

  console.log('✅ Conexión exitosa a Supabase');
  console.log('📊 Posts publicados encontrados:', data ? data.length : 0);

  if (data && data.length > 0) {
    console.log('📝 Posts disponibles:');
    data.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title}`);
      console.log(`     Slug: ${post.slug}`);
      console.log(`     Estado: ${post.status}`);
      console.log(`     Publicado: ${post.published_at}`);
      console.log('');
    });
  } else {
    console.log('⚠️  No hay posts publicados');
  }

} catch (error) {
  console.error('❌ Error inesperado:', error);
  process.exit(1);
}
