-- Simple bilingual blog post INSERT
-- Already ran: ALTER TABLE to remove NOT NULL constraints
-- Just run this:

INSERT INTO public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  title_en,
  title_es,
  excerpt_en,
  excerpt_es,
  content_en,
  content_es,
  meta_title_en,
  meta_title_es,
  meta_description_en,
  meta_description_es,
  status,
  published_at,
  reading_time,
  cover_image_url,
  author
)
VALUES (
  'emotional-eating-guide',
  'Emotional Eating',
  'Learn about emotional eating patterns',
  '# Emotional Eating

Full content here',
  'Emotional Eating: How to Identify and Overcome It',
  'Comida Emocional: Cómo Identificarla y Superarla',
  'Emotional eating affects millions worldwide. Learn to identify patterns.',
  'La comida emocional afecta a millones de personas en todo el mundo.',
  '# Emotional Eating: How to Identify and Overcome It

Emotional eating is when we eat in response to feelings rather than hunger.

## What Is Emotional Eating?

Emotional eating is the act of eating not to satisfy physiological hunger but to manage negative emotions.

## Signs You''re Eating for Emotional Reasons

- Sudden hunger
- Specific cravings
- Eating quickly
- Eating after stress

## Strategies to Manage It

1. Keep an emotional journal
2. Practice mindfulness
3. Exercise regularly
4. Seek professional support',
  '# Comida Emocional: Cómo Identificarla y Superarla

La comida emocional es cuando comemos en respuesta a sentimientos en lugar de hambre.

## ¿Qué es la Comida Emocional?

La comida emocional es el acto de comer no para satisfacer el hambre fisiológico sino para gestionar emociones negativas.

## Señales de que Estás Comiendo por Emociones

- Hambre repentina
- Craving específico
- Comer rápido
- Comer después del estrés

## Estrategias para Manejarlo

1. Lleva un diario emocional
2. Practica mindfulness
3. Haz ejercicio regularmente
4. Busca apoyo profesional',
  'Emotional Eating: How to Identify and Overcome It',
  'Comida Emocional: Cómo Identificarla y Superarla',
  'Discover what emotional eating is and how to overcome it.',
  'Descubre qué es la comida emocional y cómo superarla.',
  'published',
  NOW(),
  8,
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&q=80',
  'EmotionEat Team'
);

