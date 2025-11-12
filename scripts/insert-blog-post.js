import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Variables de entorno faltantes');
  console.error('Asegúrate de tener:');
  console.error('- PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY (service role key, no anon key)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertBlogPost() {
  try {
    // Leer el archivo JSON del post
    const postPath = join(__dirname, '../src/content/blog-posts/comida-emocional-primer-post.json');
    const postData = JSON.parse(readFileSync(postPath, 'utf8'));

    console.log('📝 Insertando post de blog:', postData.title);

    // Insertar el post en Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();

    if (error) {
      console.error('❌ Error al insertar el post:', error);
      return;
    }

    console.log('✅ Post insertado exitosamente!');
    console.log('📊 Datos del post:');
    console.log('- ID:', data[0].id);
    console.log('- Slug:', data[0].slug);
    console.log('- Estado:', data[0].status);
    console.log('- Fecha publicación:', data[0].published_at);

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar la función
insertBlogPost();
