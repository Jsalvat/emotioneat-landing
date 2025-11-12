# Zapier Automation Setup for EmotionEat Blog

This guide explains how to set up Zapier automation to automatically publish bilingual blog posts to your EmotionEat Supabase database every 3-4 days.

## 🎯 Overview

The automation will:
- Generate blog content in English using AI (ChatGPT/OpenAI)
- Translate content to Spanish
- Format and structure the data
- Insert the bilingual post into Supabase
- Run automatically every 3-4 days

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Zapier account (Free or Paid plan)
- [ ] OpenAI API key (for ChatGPT integration)
- [ ] Supabase project URL and service_role key
- [ ] Access to EmotionEat Supabase project (`stzlgcpcmafdvcwvvyvu`)

## 🔑 Required API Keys

### 1. Supabase Credentials

**Project URL:** `https://stzlgcpcmafdvcwvvyvu.supabase.co`

**Service Role Key:** (Get from Supabase Dashboard → Project Settings → API)
- **IMPORTANT:** Use the `service_role` key, NOT the `anon` key
- The service_role key has write permissions to the database
- Never expose this key publicly

### 2. OpenAI API Key

Get your API key from: https://platform.openai.com/api-keys

**Pricing estimate:**
- ~$0.03-0.05 per blog post generation (using GPT-4o-mini)
- ~$0.02-0.03 per translation
- Total: ~$0.05-0.08 per automated post

## 🔧 Zapier Workflow Setup

### Step 1: Create New Zap

1. Go to https://zapier.com/app/zaps
2. Click "Create Zap"
3. Name it: "EmotionEat Blog Auto-Publisher"

---

### Step 2: Schedule Trigger

**App:** Schedule by Zapier

**Trigger:** Every X Days

**Configuration:**
- **Frequency:** Every 3 days (or 4 days if you prefer)
- **Start Time:** 9:00 AM (your timezone)
- **Day of Week:** Any

**Why every 3-4 days?**
- Consistent fresh content for SEO
- Not overwhelming for readers
- Enough time for AI-generated content to be unique

---

### Step 3: Generate English Blog Post

**App:** OpenAI (ChatGPT)

**Action:** Create Chat Completion

**Configuration:**

**Model:** `gpt-4o-mini` (cost-effective) or `gpt-4` (higher quality)

**User Message:** 
```
Write a comprehensive, SEO-optimized blog post about emotional eating in English. 

Topic ideas (choose one randomly):
- Understanding emotional eating triggers
- The science behind stress eating
- Mindful eating techniques for emotional eaters
- How to differentiate physical vs emotional hunger
- Breaking the cycle of comfort eating
- Social situations and emotional eating
- Emotional eating and mental health connection
- Building healthy coping mechanisms
- Seasonal patterns in emotional eating
- Technology and emotional eating habits

Requirements:
1. **Title:** Catchy, SEO-friendly, 60-80 characters
2. **Excerpt:** 150-180 characters, engaging summary
3. **Content:** 1500-2500 words, structured with H2/H3 headings
4. **Tone:** Professional yet empathetic, actionable advice
5. **Format:** Markdown with proper heading structure
6. **Keywords:** Naturally include "emotional eating", "stress eating", "binge eating" where appropriate
7. **Structure:** Introduction → Problem → Solutions → Actionable steps → Conclusion
8. **Call-to-action:** Mention EmotionEat as a helpful tool in conclusion

Return the response in JSON format:
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "reading_time": 8
}
```

**System Message:**
```
You are an expert content writer specializing in mental health, nutrition, and emotional eating. Write content that is evidence-based, compassionate, and actionable. Avoid medical diagnoses and always recommend professional help when appropriate.
```

**Temperature:** 0.8 (creative but consistent)

**Response Format:** JSON object

---

### Step 4: Parse English Content

**App:** Code by Zapier

**Action:** Run Python

**Input Data:**
- `openai_response`: (output from Step 3)

**Code:**
```python
import json
import re
from datetime import datetime

# Parse OpenAI response
response_text = input_data.get('openai_response', '{}')

try:
    # Try to extract JSON from markdown code blocks if present
    json_match = re.search(r'```json\s*(\{.*?\})\s*```', response_text, re.DOTALL)
    if json_match:
        blog_data = json.loads(json_match.group(1))
    else:
        blog_data = json.loads(response_text)
    
    # Generate URL-friendly slug
    title = blog_data.get('title', '')
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    slug = slug[:100]  # Limit length
    
    # Calculate reading time if not provided
    content = blog_data.get('content', '')
    word_count = len(content.split())
    reading_time = blog_data.get('reading_time', max(1, round(word_count / 200)))
    
    # Format for output
    output = {
        'title_en': blog_data.get('title', ''),
        'excerpt_en': blog_data.get('excerpt', ''),
        'content_en': content,
        'keywords': json.dumps(blog_data.get('keywords', [])),
        'reading_time': reading_time,
        'slug': slug,
        'timestamp': datetime.utcnow().isoformat()
    }
    
except Exception as e:
    output = {
        'error': str(e),
        'raw_response': response_text
    }

return output
```

---

### Step 5: Generate Spanish Translation

**App:** OpenAI (ChatGPT)

**Action:** Create Chat Completion

**Configuration:**

**Model:** `gpt-4o-mini` or `gpt-4`

**User Message:**
```
Translate the following blog post from English to Spanish (Spain). Maintain the same tone, structure, and Markdown formatting. Ensure the translation is natural and culturally appropriate for Spanish (Spain) audience, not a literal translation.

Title: {{title_en from Step 4}}

Excerpt: {{excerpt_en from Step 4}}

Content:
{{content_en from Step 4}}

Return the response in JSON format:
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "meta_title": "...",
  "meta_description": "..."
}
```

**System Message:**
```
You are an expert translator specializing in Spanish (Spain) localization for mental health and wellness content. Translate naturally, maintaining empathy and professionalism. Use "tú" form, not "usted". Adapt cultural references where needed.
```

**Temperature:** 0.7

**Response Format:** JSON object

---

### Step 6: Parse Spanish Translation

**App:** Code by Zapier

**Action:** Run Python

**Input Data:**
- `openai_translation`: (output from Step 5)

**Code:**
```python
import json
import re

# Parse OpenAI translation response
response_text = input_data.get('openai_translation', '{}')

try:
    # Try to extract JSON from markdown code blocks if present
    json_match = re.search(r'```json\s*(\{.*?\})\s*```', response_text, re.DOTALL)
    if json_match:
        translation = json.loads(json_match.group(1))
    else:
        translation = json.loads(response_text)
    
    # Format for output
    output = {
        'title_es': translation.get('title', ''),
        'excerpt_es': translation.get('excerpt', ''),
        'content_es': translation.get('content', ''),
        'meta_title_es': translation.get('meta_title', translation.get('title', '')),
        'meta_description_es': translation.get('meta_description', translation.get('excerpt', ''))
    }
    
except Exception as e:
    output = {
        'error': str(e),
        'raw_response': response_text
    }

return output
```

---

### Step 7: Get Cover Image (Optional)

**Option A: Static Image**
Use a consistent placeholder:
```
https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop
```

**Option B: Unsplash API (Dynamic)**

**App:** Webhooks by Zapier

**Action:** GET request

**URL:** `https://api.unsplash.com/photos/random?query=healthy+food+emotions&orientation=landscape`

**Headers:**
```
Authorization: Client-ID YOUR_UNSPLASH_ACCESS_KEY
```

**Parse response:**
- Image URL: `urls.regular`

---

### Step 8: Generate Meta Tags

**App:** Code by Zapier

**Action:** Run Python

**Input Data:**
- `title_en`: from Step 4
- `excerpt_en`: from Step 4
- `title_es`: from Step 6
- `excerpt_es`: from Step 6

**Code:**
```python
# Generate SEO-optimized meta titles and descriptions

title_en = input_data.get('title_en', '')
excerpt_en = input_data.get('excerpt_en', '')
title_es = input_data.get('title_es', '')
excerpt_es = input_data.get('excerpt_es', '')

output = {
    'meta_title_en': f"{title_en} | EmotionEat Blog"[:60],
    'meta_description_en': excerpt_en[:155],
    'meta_title_es': f"{title_es} | Blog EmotionEat"[:60],
    'meta_description_es': excerpt_es[:155]
}

return output
```

---

### Step 9: Insert into Supabase

**App:** Supabase

**Action:** Insert Row

**Configuration:**

**Project URL:** `https://stzlgcpcmafdvcwvvyvu.supabase.co`

**API Key:** YOUR_SERVICE_ROLE_KEY

**Table:** `blog_posts`

**Row Data:**
```json
{
  "slug": "{{slug from Step 4}}",
  "title_en": "{{title_en from Step 4}}",
  "title_es": "{{title_es from Step 6}}",
  "excerpt_en": "{{excerpt_en from Step 4}}",
  "excerpt_es": "{{excerpt_es from Step 6}}",
  "content_en": "{{content_en from Step 4}}",
  "content_es": "{{content_es from Step 6}}",
  "meta_title_en": "{{meta_title_en from Step 8}}",
  "meta_title_es": "{{meta_title_es from Step 8}}",
  "meta_description_en": "{{meta_description_en from Step 8}}",
  "meta_description_es": "{{meta_description_es from Step 8}}",
  "keywords": "{{keywords from Step 4}}",
  "reading_time": "{{reading_time from Step 4}}",
  "cover_image_url": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop",
  "author": "EmotionEat Team",
  "status": "published",
  "published_at": "{{timestamp from Step 4}}"
}
```

**Alternative: Custom Request (if Supabase app unavailable)**

**App:** Webhooks by Zapier

**Action:** POST request

**URL:** `https://stzlgcpcmafdvcwvvyvu.supabase.co/rest/v1/blog_posts`

**Headers:**
```
Content-Type: application/json
apikey: YOUR_SERVICE_ROLE_KEY
Authorization: Bearer YOUR_SERVICE_ROLE_KEY
Prefer: return=representation
```

**Body:** (same JSON as above)

---

### Step 10: Error Notification (Optional)

**App:** Email by Zapier or Slack

**Action:** Send notification if any step fails

**Configuration:**
- **Filter:** Only if previous steps have errors
- **Message:** Include error details and which step failed
- **Recipient:** Your email or Slack channel

---

## 🎨 Content Customization

### Topic Rotation Strategy

To keep content fresh, rotate through these categories:

**Week 1:** Understanding Triggers
- What triggers emotional eating
- Time-based patterns
- Environmental factors

**Week 2:** Scientific Insights
- Psychology of emotional eating
- Neuroscience behind cravings
- Hormones and eating

**Week 3:** Practical Strategies
- Mindfulness techniques
- Coping mechanisms
- Journaling methods

**Week 4:** Lifestyle & Context
- Social situations
- Seasonal changes
- Work-life balance

### Prompt Variables

Make Step 3 more dynamic by using a Lookup Table:

**App:** Formatter by Zapier

**Action:** Lookup Table

**Input:** Random number 1-10

**Lookup Table:**
```
1 -> Understanding emotional eating triggers in daily life
2 -> The science behind stress eating and cortisol
3 -> Mindful eating: A practical guide for emotional eaters
4 -> Physical hunger vs emotional hunger: How to tell the difference
5 -> Breaking the comfort eating cycle: Evidence-based strategies
6 -> Navigating social events without emotional eating
7 -> The mind-gut connection in emotional eating
8 -> Building a toolkit of healthy coping mechanisms
9 -> How seasons affect our eating patterns
10 -> Digital wellness: Technology's role in emotional eating
```

Use the lookup result in the ChatGPT prompt.

---

## 🧪 Testing Your Zap

Before enabling:

1. **Test Each Step Individually**
   - Click "Test" after each step
   - Verify outputs match expectations
   - Check for formatting issues

2. **Do a Complete Test Run**
   - Check if post appears in Supabase
   - Verify both languages are correct
   - Test the live blog pages
   - Check SEO meta tags

3. **Verify Blog Display**
   - English: `https://emotioneat.com/blog/[slug]`
   - Spanish: `https://emotioneat.com/es/blog/[slug]`
   - Blog index: `https://emotioneat.com/blog`

---

## 💰 Cost Estimate

### Monthly Costs (posting every 3 days → ~10 posts/month)

**Zapier:**
- Free plan: 100 tasks/month (might be enough)
- Starter: $19.99/month (750 tasks/month)

**OpenAI:**
- Per post: ~$0.08
- Monthly (10 posts): ~$0.80
- Yearly: ~$10

**Unsplash API:**
- Free: 50 requests/hour

**Total estimated cost:** $0.80 - $20/month depending on Zapier plan

---

## 🔍 Monitoring & Maintenance

### Weekly Checks

- [ ] Verify new posts are appearing
- [ ] Check translation quality
- [ ] Monitor Zapier task history
- [ ] Review any failed runs

### Monthly Reviews

- [ ] Analyze blog traffic (Google Analytics)
- [ ] Review content quality
- [ ] Update topic rotation if needed
- [ ] Check OpenAI costs

### Quarterly Optimization

- [ ] A/B test different prompts
- [ ] Update keywords based on SEO data
- [ ] Refine translation prompts
- [ ] Add new topic categories

---

## 🚨 Troubleshooting

### Common Issues

**Issue:** Zap fails at Supabase insert

**Solution:**
- Check service_role key is correct
- Verify RLS policies allow insert
- Check required fields are not null

**Issue:** Translation is too literal

**Solution:**
- Adjust temperature to 0.8
- Add more context to system message
- Specify "natural Spanish (Spain)" explicitly

**Issue:** Content is repetitive

**Solution:**
- Implement topic rotation (see above)
- Increase prompt variety
- Add previous titles to prompt to avoid duplicates

**Issue:** Costs are higher than expected

**Solution:**
- Switch to GPT-4o-mini (cheaper)
- Reduce post frequency to every 4 days
- Optimize prompts to be shorter

---

## 📊 Success Metrics

Track these KPIs to measure automation success:

- **Publishing consistency:** Posts every 3-4 days ✅
- **Translation quality:** Native speakers can't tell it's AI
- **SEO performance:** Organic traffic from blog posts
- **Time saved:** ~2-3 hours per post (manual writing)
- **Cost efficiency:** <$1 per bilingual post

---

## 🔄 Alternative: Make.com (Integromat)

If you prefer Make.com over Zapier:

**Advantages:**
- Visual workflow editor
- Better error handling
- More generous free tier (1,000 operations/month)
- Built-in data transformations

**Similar workflow:**
1. Scheduler trigger
2. HTTP module → OpenAI API (English generation)
3. HTTP module → OpenAI API (Spanish translation)
4. Tools → Set variables (format data)
5. HTTP module → Supabase API (insert row)

---

## 📝 Manual Post Creation (Backup)

If automation fails, manually insert via Supabase SQL Editor:

```sql
INSERT INTO public.blog_posts (
  slug,
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
  keywords,
  author,
  status,
  published_at,
  reading_time,
  cover_image_url
) VALUES (
  'your-post-slug',
  'English Title',
  'Título en Español',
  'English excerpt here...',
  'Extracto en español aquí...',
  'Full English content in markdown...',
  'Contenido completo en español en markdown...',
  'English Title | EmotionEat Blog',
  'Título en Español | Blog EmotionEat',
  'English meta description...',
  'Meta descripción en español...',
  ARRAY['emotional eating', 'stress eating'],
  'EmotionEat Team',
  'published',
  NOW(),
  8,
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop'
);
```

---

## ✅ Checklist: Before Going Live

- [ ] Zapier account set up
- [ ] OpenAI API key obtained and added
- [ ] Supabase service_role key added (NOT anon key)
- [ ] All 9 steps configured and tested
- [ ] Test post successfully inserted
- [ ] Test post displays correctly on website
- [ ] Both English and Spanish versions work
- [ ] Error notifications configured
- [ ] Schedule set (every 3-4 days)
- [ ] Zap turned ON

---

## 📞 Support

If you encounter issues:

1. **Zapier Community:** https://community.zapier.com
2. **Supabase Discord:** https://discord.supabase.com
3. **OpenAI Help Center:** https://help.openai.com

---

**Last updated:** November 12, 2025
**Maintained by:** EmotionEat Development Team

