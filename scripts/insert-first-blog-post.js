import { createClient } from '@supabase/supabase-js';
import { comidaEmocionalPost } from '../src/data/blog-posts/comida-emocional.ts';

// Configuración de Supabase (usa las mismas variables que el proyecto principal)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Variables de entorno de Supabase no encontradas');
  console.log('Asegúrate de tener configuradas:');
  console.log('- PUBLIC_SUPABASE_URL o VITE_SUPABASE_URL');
  console.log('- PUBLIC_SUPABASE_ANON_KEY o VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertBlogPost() {
  try {
    console.log('🚀 Iniciando inserción del primer post de blog...');

    // Verificar que la tabla existe
    console.log('📋 Verificando tabla blog_posts...');
    const { data: tables, error: tableError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);

    if (tableError) {
      console.error('❌ Error: La tabla blog_posts no existe o no hay permisos');
      console.error('Ejecuta primero la migración SQL: supabase_migrations/001_create_blog_posts_table.sql');
      return;
    }

    // Preparar los datos del post
    const postData = {
      title: comidaEmocionalPost.title,
      slug: comidaEmocionalPost.slug,
      content: comidaEmocionalPost.content,
      excerpt: comidaEmocionalPost.excerpt,
      published_at: comidaEmocionalPost.published_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cover_image_url: comidaEmocionalPost.cover_image_url,
      status: comidaEmocionalPost.status,
      meta_title: comidaEmocionalPost.meta_title,
      meta_description: comidaEmocionalPost.meta_description,
      keywords: comidaEmocionalPost.keywords,
      author: comidaEmocionalPost.author,
      reading_time: comidaEmocionalPost.reading_time
    };

    console.log('📝 Insertando post:', postData.title);
    console.log('🔗 Slug:', postData.slug);

    // Insertar el post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();

    if (error) {
      console.error('❌ Error al insertar el post:', error);
      return;
    }

    console.log('✅ ¡Post insertado exitosamente!');
    console.log('📊 Detalles del post:');
    console.log('- ID:', data[0].id);
    console.log('- Título:', data[0].title);
    console.log('- Slug:', data[0].slug);
    console.log('- Estado:', data[0].status);
    console.log('- Publicado:', data[0].published_at);

    // Verificar que se puede consultar
    console.log('🔍 Verificando consulta...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, status, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (verifyError) {
      console.error('❌ Error al verificar consulta:', verifyError);
    } else {
      console.log('✅ Consulta exitosa. Posts publicados encontrados:', verifyData.length);
      verifyData.forEach(post => {
        console.log(`  - ${post.title} (${post.slug})`);
      });
    }

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

// Ejecutar la función
insertBlogPost();
