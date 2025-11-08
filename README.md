# EmotionEat Landing Page

Modern, SEO-optimized landing page for EmotionEat built with Astro, Tailwind CSS, and TypeScript.

## 🚀 Features

- **Bilingual Support**: English (default) and Spanish
- **SEO Optimized**: Meta tags, Open Graph, Schema.org markup
- **Performance**: 100/100 Lighthouse score potential
- **Responsive**: Mobile-first design
- **Analytics**: Mixpanel integration for tracking
- **Modern UI**: Matches EmotionEat app design system

## 📦 Tech Stack

- **Astro 5.x** - Static Site Generator
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Mixpanel** - Analytics
- **Netlify** - Hosting (recommended)

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
PUBLIC_APP_URL=https://app.emotioneat.com
```

### 3. Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### 4. Build

```bash
npm run build
```

The static files will be generated in the `dist/` directory.

### 5. Preview

```bash
npm run preview
```

## 🎨 Design System

The landing page uses the exact same color palette as the EmotionEat app:

- **Brand**: Blue (#1890FF → #096DD9)
- **Calm**: Light Blue (#0EA5E9 → #0284C7)
- **Mint**: Green (#22C55E)
- **Lavender**: Purple (#A855F7)

Font: Inter (same as the app)

## 📊 Analytics Events

The following events are tracked with Mixpanel:

- `landing_page_view` - Page views with language
- `cta_clicked` - CTA button clicks with location
- `language_switched` - Language changes
- `pricing_plan_viewed` - Pricing plan views
- `faq_opened` - FAQ item expansions

## 🌐 i18n

- English: `/` (default)
- Spanish: `/es/`

Translations are located in `src/i18n/en.json` and `src/i18n/es.json`

## 📱 Sections

1. **Hero** - Main headline with CTA
2. **How It Works** - 3-step process
3. **Features** - Key benefits
4. **Pricing** - Free vs Premium plans
5. **Testimonials** - Social proof
6. **FAQ** - Common questions
7. **CTA** - Final call-to-action
8. **Footer** - Links and info

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Configure build settings (already in `netlify.toml`)
3. Add environment variables in Netlify dashboard
4. Deploy!

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

### Other Platforms

The site is a standard static site and can be deployed to:
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting provider

## 📝 Customization

### Update Content

Edit the translation files:
- `src/i18n/en.json` - English content
- `src/i18n/es.json` - Spanish content

### Update Styles

The color palette is defined in `tailwind.config.mjs`

### Add Images

Place images in the `public/` directory and reference them with `/image-name.jpg`

Recommended images:
1. `hero-image.png` (1200x800px)
2. `app-screenshot.png` (600x1200px)
3. `og-image.jpg` (1200x630px)
4. Feature icons as SVGs

## 🔒 Security

- HTTPS enforced via hosting platform
- Security headers configured in `netlify.toml`
- No sensitive data in client-side code
- Environment variables for API keys

## 📈 Performance Optimizations

- Static generation (no runtime JS)
- Lazy loading for images
- Preloading critical resources
- Minified CSS/JS
- Google Fonts optimization

## 📄 License

MIT License - See LICENSE file for details

---

Built with 💜 for EmotionEat
