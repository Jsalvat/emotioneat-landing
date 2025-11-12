# Configuración de Supabase para el Blog de EmotionEat

## 📋 Requisitos Previos

Asegúrate de tener una cuenta activa en [Supabase](https://supabase.com) y un proyecto creado.

## 🔧 Variables de Entorno

Agrega estas variables a tu archivo `.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Cómo Obtener tus Credenciales de Supabase:

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`

## 🗄️ Configuración de la Base de Datos

### Ejecutar Migraciones

Conecta a tu base de datos de Supabase y ejecuta las siguientes migraciones en orden:

#### 1. Crear tabla `blog_posts`

Ejecuta el archivo: `migrations/001_create_blog_posts.sql`

#### 2. Insertar primer post

Ejecuta el archivo: `migrations/002_insert_first_blog_post.sql`

### Verificación

Después de ejecutar las migraciones, verifica que la tabla se creó correctamente:

```sql
SELECT * FROM blog_posts WHERE slug = 'que-es-la-comida-emocional-y-como-superarla';
```

Deberías ver el post sobre comida emocional.

## 🚀 Funcionalidades del Blog

### URLs Disponibles

- **Lista de posts**: `/blog`
- **Post individual**: `/blog/que-es-la-comida-emocional-y-como-superarla`

### Características Implementadas

- ✅ **Lista paginada** de posts publicados
- ✅ **Páginas individuales** de posts
- ✅ **SEO optimizado** (meta tags, Open Graph)
- ✅ **Imágenes destacadas** opcionales
- ✅ **Fechas de publicación** formateadas
- ✅ **Responsive design** con Tailwind CSS
- ✅ **Row Level Security** (RLS) habilitado
- ✅ **Índices de rendimiento** creados

## 🔒 Seguridad

La configuración incluye:

- **Row Level Security (RLS)** activado
- Políticas para lectura pública de posts publicados
- Políticas para gestión administrativa (para futuro panel admin)

## 📝 Próximos Pasos

### Para Crear Más Posts

Puedes crear posts adicionales ejecutando queries SQL como:

```sql
INSERT INTO blog_posts (title, slug, content, excerpt, published_at)
VALUES (
    'Tu Título Aquí',
    'tu-slug-unico-aqui',
    'Contenido HTML/Markdown aquí...',
    'Extracto del post...',
    NOW()
);
```

### Integración con Zapier + OpenAI

Para automatizar la creación de posts:

1. Configura un webhook en Zapier que reciba triggers
2. Usa OpenAI para generar contenido basado en prompts
3. Inserta el contenido generado en la tabla `blog_posts` vía la API de Supabase

## 🐛 Solución de Problemas

### Error: "Missing Supabase environment variables"

Asegúrate de que las variables `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén definidas en tu `.env`.

### Error: "relation blog_posts does not exist"

Ejecuta la migración `001_create_blog_posts.sql` en tu base de datos de Supabase.

### Error: "No posts found"

Verifica que los posts tengan `published_at` establecido y no sea `NULL`.

## 📊 Monitoreo

### Consultas Útiles para Monitoreo

```sql
-- Contar posts publicados
SELECT COUNT(*) FROM blog_posts WHERE published_at IS NOT NULL;

-- Posts más recientes
SELECT title, published_at FROM blog_posts
WHERE published_at IS NOT NULL
ORDER BY published_at DESC LIMIT 5;

-- Verificar RLS
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'blog_posts';
```

## 🎯 Optimizaciones Futuras

- **Panel de administración** para gestionar posts
- **Sistema de categorías/tags**
- **Búsqueda y filtros**
- **Comentarios en posts**
- **Newsletter integration**
- **Analytics de posts**
