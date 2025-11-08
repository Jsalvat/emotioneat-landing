# EmotionEat Landing Page - Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Netlify account (free tier is fine)

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**

Create or edit the `.env` file in the root directory:

```env
PUBLIC_MIXPANEL_TOKEN=your_actual_mixpanel_token_here
PUBLIC_APP_URL=http://localhost:5173
```

**Important:** Get your Mixpanel token from:
- Go to `EmotionEat/src/config/mixpanel.ts`
- Or check your Mixpanel dashboard
- Use the SAME token as the main app to track both landing and app together

3. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:4321` (default Astro port)

4. **Build for production:**
```bash
npm run build
```

The static files will be in the `dist/` directory.

---

## Deploying to Netlify (Recommended)

### Option 1: Deploy from Git (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - EmotionEat Landing Page"
git branch -M main
git remote add origin https://github.com/yourusername/emotioneat-landing.git
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Netlify will auto-detect the settings from `netlify.toml`

3. **Configure Environment Variables:**
   - In Netlify dashboard, go to: Site settings → Environment variables
   - Add:
     - `PUBLIC_MIXPANEL_TOKEN` = your_mixpanel_token
     - `PUBLIC_APP_URL` = https://your-app-domain.com

4. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete (~1-2 minutes)
   - Your site will be live at `https://random-name.netlify.app`

5. **Custom Domain (Optional):**
   - Go to: Site settings → Domain management
   - Click "Add custom domain"
   - Follow instructions to configure DNS

### Option 2: Deploy from CLI

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Initialize site:**
```bash
netlify init
```

4. **Deploy:**
```bash
netlify deploy --prod
```

---

## Deploying to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Add environment variables:**
```bash
vercel env add PUBLIC_MIXPANEL_TOKEN
vercel env add PUBLIC_APP_URL
```

4. **Redeploy with env vars:**
```bash
vercel --prod
```

---

## Deploying to GitHub Pages

1. **Install GitHub Pages adapter:**
```bash
npm install -D @astrojs/github-pages
```

2. **Update `astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://yourusername.github.io',
  base: '/emotioneat-landing'
});
```

3. **Create GitHub Actions workflow:**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. **Enable GitHub Pages:**
   - Go to repository settings
   - Pages → Source → gh-pages branch
   - Save

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_MIXPANEL_TOKEN` | Your Mixpanel project token | `abc123def456...` |
| `PUBLIC_APP_URL` | URL of your EmotionEat app | `https://app.emotioneat.com` |

### How to Get Mixpanel Token

1. Open `EmotionEat/src/config/mixpanel.ts`
2. Copy the value of `VITE_MIXPANEL_TOKEN` from your `.env` file
3. Or go to Mixpanel dashboard → Settings → Project Settings

**Note:** Use the SAME token for both landing and app to track the full user journey.

---

## Post-Deployment Checklist

- [ ] Site loads on all pages (/, /es)
- [ ] All CTAs link to correct app URL
- [ ] Language switcher works
- [ ] Mixpanel events are being tracked (check Mixpanel dashboard)
- [ ] Images are loading (or placeholders visible)
- [ ] Mobile responsive design works
- [ ] SEO meta tags are correct (view page source)
- [ ] SSL certificate is active (https://)
- [ ] Custom domain configured (if applicable)

---

## Testing Mixpanel Integration

After deployment, test that events are tracked:

1. Visit your deployed site
2. Open Mixpanel dashboard → Live View
3. Perform these actions and verify events appear:
   - Load page → `landing_page_view`
   - Click CTA button → `cta_clicked`
   - Switch language → `language_switched`
   - Scroll to pricing → `pricing_plan_viewed`
   - Open FAQ → `faq_opened`

---

## Updating the Site

### For Git-based deployments (Netlify/Vercel):

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push:
```bash
git add .
git commit -m "Update landing page"
git push
```

The site will auto-deploy in 1-2 minutes.

### For CLI deployments:

```bash
npm run build
netlify deploy --prod
# or
vercel --prod
```

---

## Adding Images

1. Place images in the `public/` directory
2. Reference them in components with `/image-name.jpg`
3. See `IMAGES_NEEDED.md` for requirements

Example:
```astro
<img src="/hero-image.jpg" alt="EmotionEat hero" />
```

---

## Troubleshooting

### Site builds but shows blank page
- Check browser console for errors
- Verify environment variables are set
- Check `PUBLIC_` prefix on env vars (required for Astro)

### Mixpanel events not tracking
- Verify `PUBLIC_MIXPANEL_TOKEN` is set correctly
- Check browser console for Mixpanel errors
- Test token in Mixpanel dashboard

### Language switcher doesn't work
- Verify both `/` and `/es/index.astro` exist
- Check `netlify.toml` redirects
- Clear browser cache

### Custom domain not working
- Check DNS records (can take 24-48 hours)
- Verify SSL certificate status
- Check hosting provider's custom domain docs

---

## Performance Optimization

The site should achieve 100/100 Lighthouse scores. If not:

1. **Optimize images:**
   - Compress with TinyPNG
   - Use WebP format
   - Add width/height attributes

2. **Check bundle size:**
   - Run `npm run build` and check output
   - Mixpanel is the only JS dependency

3. **Verify CDN:**
   - Netlify/Vercel provide global CDN automatically
   - No additional configuration needed

---

## Support

For issues:
1. Check this deployment guide
2. Review `README.md`
3. Check Astro docs: https://docs.astro.build
4. Check Netlify docs: https://docs.netlify.com

---

**Built with 💜 for EmotionEat**

