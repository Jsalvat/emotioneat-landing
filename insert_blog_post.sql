-- Simple INSERT for bilingual blog post
-- Copy and paste this into Supabase SQL Editor

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
  'Emotional Eating: How to Identify and Overcome It',
  'Emotional eating affects millions worldwide. Learn to identify patterns and overcome emotional eating with practical strategies.',
  '# Emotional Eating: How to Identify and Overcome It

Emotional eating is a phenomenon that affects millions of people around the world. Beyond satisfying physical hunger, we often eat for deep emotional reasons that can sabotage our health and well-being goals.

## What Is Emotional Eating?

Emotional eating is the act of eating not to satisfy physiological hunger but to manage negative emotions or seek emotional comfort. While physiological hunger develops gradually, emotional eating arises suddenly and targets specific foods—usually rich in sugar, fats, or refined carbohydrates.

## Signs You''re Eating for Emotional Reasons

**Physical Signs:**
- Sudden hunger unrelated to meal times
- Specific cravings for unhealthy foods
- Eating quickly without chewing
- Eating until discomfort

**Emotional Signs:**
- After stressful situations
- Moments of loneliness or boredom
- Frustration or anger

## Strategies to Manage Emotional Eating

1. **Awareness and Recognition:** Keep an emotional journal to track patterns
2. **Healthy Emotional Management:** Practice meditation, exercise, and grounding techniques
3. **Nutritional Strategies:** Plan meals, wait 10 minutes before eating, practice mindful eating
4. **Professional Support:** Consider therapy, support groups, or specialized apps like EmotionEat

## Conclusion

Emotional eating is a learned coping strategy that can be unlearned. With awareness, practical tools, and support, you can develop a healthy relationship with food.',
  'Emotional Eating: How to Identify and Overcome It',
  'Comida Emocional: Cómo Identificarla y Superarla',
  'Emotional eating affects millions worldwide. Learn to identify patterns and overcome emotional eating with practical strategies.',
  'La comida emocional afecta a millones de personas. Aprende a identificar patrones y superar la alimentación emocional con estrategias prácticas.',
  '# Comida Emocional: Cómo Identificarla y Superarla

La comida emocional es un fenómeno que afecta a millones de personas en todo el mundo. Más allá de satisfacer el hambre fisiológico, muchas veces comemos por razones emocionales profundas que pueden sabotear nuestros objetivos de salud y bienestar.

## ¿Qué es la Comida Emocional?

La comida emocional es el acto de comer no para satisfacer el hambre fisiológico, sino para gestionar emociones negativas o buscar comodidad emocional. Mientras que el hambre fisiológico surge gradualmente, la comida emocional surge repentinamente y busca alimentos específicos, generalmente ricos en azúcares, grasas o carbohidratos refinados.

## Señales de que Estás Comiendo por Emociones

**Señales Físicas:**
- Hambre repentina sin relación con las comidas
- Craving específico por alimentos poco saludables
- Comer rápido sin masticar
- Comer hasta el malestar

**Señales Emocionales:**
- Después de situaciones estresantes
- Momentos de soledad o aburrimiento
- Frustración o ira

## Estrategias para Manejar la Comida Emocional

1. **Reconocimiento y Conciencia:** Lleva un diario emocional para seguir patrones
2. **Gestión Emocional Saludable:** Practica meditación, ejercicio y técnicas de grounding
3. **Estrategias Alimentarias:** Planifica comidas, espera 10 minutos antes de comer, come con consciencia
4. **Apoyo Profesional:** Considera terapia, grupos de apoyo o aplicaciones especializadas como EmotionEat

## Conclusión

La comida emocional es una estrategia de coping aprendida que puede desaprenderse. Con consciencia, herramientas prácticas y apoyo, puedes desarrollar una relación saludable con la comida.',
  'Emotional Eating: How to Identify and Overcome It | EmotionEat Blog',
  'Comida Emocional: Cómo Identificarla y Superarla | Blog EmotionEat',
  'Discover what emotional eating is, how to recognize it, and effective strategies to manage it. Expert guidance for a healthier relationship with food.',
  'Descubre qué es la comida emocional, cómo reconocerla y estrategias efectivas para manejarla. Guía experta para una relación más saludable con la comida.',
  'published',
  NOW(),
  12,
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&q=80',
  'EmotionEat Team'
)
ON CONFLICT (slug) 
DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  title_en = EXCLUDED.title_en,
  title_es = EXCLUDED.title_es,
  excerpt_en = EXCLUDED.excerpt_en,
  excerpt_es = EXCLUDED.excerpt_es,
  content_en = EXCLUDED.content_en,
  content_es = EXCLUDED.content_es,
  meta_title_en = EXCLUDED.meta_title_en,
  meta_title_es = EXCLUDED.meta_title_es,
  meta_description_en = EXCLUDED.meta_description_en,
  meta_description_es = EXCLUDED.meta_description_es,
  status = 'published',
  published_at = NOW(),
  updated_at = NOW();

