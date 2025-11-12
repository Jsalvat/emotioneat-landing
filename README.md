# EmotionEat Landing Page

SEO-optimized landing page for EmotionEat - Break free from emotional eating with AI-powered support.

## 🚀 Features

- **Multi-language support**: English and Spanish (ES)
- **SEO optimized**: Meta tags, Schema.org, canonical URLs
- **Analytics ready**: Google Analytics 4 & Google Search Console
- **Responsive design**: Mobile-first with Tailwind CSS
- **Performance optimized**: Fast loading with Astro framework
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Blog system**: Dynamic blog posts stored in Supabase
- **Static generation**: Blog posts pre-rendered for optimal performance

## 🛠 Tech Stack

- **Framework**: Astro 5.1.2
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4
- **SEO**: Google Search Console
- **Database**: Supabase (for blog posts)
- **Deployment**: Netlify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Jsalvat/emotioneat-landing.git
cd emotioneat-landing
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase database:
```bash
# Follow SUPABASE_SETUP.md for database configuration
```

4. Create environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values (GA4, GSC, Supabase)
```

5. Start development server:
```bash
npm run dev
```

## 🚀 Deployment to Netlify

### Option 1: Deploy from GitHub (Recommended)

1. **Connect to GitHub**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the `emotioneat-landing` repository

2. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

3. **Set environment variables** in Netlify dashboard:
   ```
   PUBLIC_GA4_ID=your_ga4_id_here
   PUBLIC_GSC_VERIFICATION_CODE=your_gsc_verification_code
   PUBLIC_APP_URL=https://your-app-url.com
   ```

4. **Deploy**: Click "Deploy site"

### Option 2: Manual Deploy

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
```bash
npx netlify-cli deploy --prod --dir=dist
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Google Analytics 4
PUBLIC_GA4_ID=your_ga4_measurement_id

# Google Search Console (optional - if using HTML verification)
PUBLIC_GSC_VERIFICATION_CODE=your_gsc_verification_code

# App URL
PUBLIC_APP_URL=https://your-app-domain.com
```

## 📊 SEO & Analytics Setup

### Google Analytics 4
- ✅ **Already configured** (set your GA4 ID in environment variables)
- Tracks page views, user engagement, conversions
- Multi-language support (EN/ES)

### Google Search Console
- ✅ **Already configured** via TXT record (recommended method)
- Monitors search rankings and indexing
- Provides technical SEO insights
- **Note**: HTML meta tag verification is optional backup

### SEO Optimizations Completed
- ✅ Meta tags optimized for primary keywords
- ✅ Schema.org structured data implemented
- ✅ Canonical URLs for multi-language support
- ✅ Sitemap auto-generated
- ✅ Robots.txt configured
- ✅ Image alt attributes optimized

## 📱 Supported Languages

- **English (EN)**: `/`
- **Spanish (ES)**: `/es`

## 🏗 Project Structure

```
emotion-eat-landing/
├── public/
│   ├── _redirects          # Netlify redirects
│   ├── robots.txt          # SEO robots configuration
│   ├── favicon.png         # Site favicon
│   └── images/             # Optimized images
├── src/
│   ├── components/         # Astro components
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── HowItWorks.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   └── Header.astro
│   ├── layouts/
│   │   └── Layout.astro    # Main layout with SEO
│   ├── lib/
│   │   └── supabase.ts     # Supabase client and blog functions
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro # Blog listing page
│   │   │   └── [slug].astro # Individual blog posts
│   │   ├── index.astro     # English homepage
│   │   └── es/
│   │       └── index.astro # Spanish homepage
│   └── i18n/               # Translation files
│       ├── en.json
│       └── es.json
├── migrations/             # Database migrations
│   ├── 001_create_blog_posts.sql
│   └── 002_insert_first_blog_post.sql
├── SUPABASE_SETUP.md       # Database setup instructions
├── astro.config.mjs        # Astro configuration
├── netlify.toml           # Netlify deployment config
├── tailwind.config.mjs    # Tailwind configuration
└── package.json
```

## 🎯 SEO Keywords Targeted

### English Keywords (High Volume)
- "emotional eating" (3,600 searches/month)
- "stress eating" (5,400 searches/month)
- "stop emotional eating" (210 searches/month)

### Spanish Keywords
- "ansiedad" (260 searches/month)
- "depresión" (480 searches/month)
- "comer compulsivo" (10 searches/month)

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Optimized
- **Bundle Size**: Minified and optimized
- **Image Optimization**: Automatic compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

For questions or support:
- Email: support@emotioneat.com
- Issues: [GitHub Issues](https://github.com/Jsalvat/emotioneat-landing/issues)

---

**Built with ❤️ for mental health and wellness**