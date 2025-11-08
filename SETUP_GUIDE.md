# EmotionEat Landing Page - Setup Guide

## 🎉 You're Almost Ready!

This guide will help you get the landing page running in 5 minutes.

---

## Step 1: Configure Environment Variables

The landing page needs to know your Mixpanel token and where your app is hosted.

### Copy the token from your main app:

1. Open `../EmotionEat/.env` (or wherever you have it)
2. Find the line with `VITE_MIXPANEL_TOKEN`
3. Copy that value

### Create your .env file:

The `.env` file already exists in this directory. Edit it:

```env
# Replace with your actual Mixpanel token (same as the main app)
PUBLIC_MIXPANEL_TOKEN=your_token_here

# URL where your EmotionEat app is running
PUBLIC_APP_URL=http://localhost:5173
```

**Important Notes:**
- The prefix must be `PUBLIC_` (Astro requirement)
- Use the SAME Mixpanel token as your main app
- For production, change `PUBLIC_APP_URL` to your live app URL

---

## Step 2: Add Images (Optional but Recommended)

The landing page works with placeholders, but it will look much better with real images.

See `IMAGES_NEEDED.md` for a complete list, but the most important ones are:

1. **`public/og-image.jpg`** (1200x630px)
   - For social media previews
   - Should say "EmotionEat - Break Free from Emotional Eating"

2. **`public/hero-image.png`** (1200x800px)
   - Main image on the homepage
   - Person meditating or eating mindfully

3. **`public/app-screenshot.png`** (600x1200px)
   - Screenshot of your actual EmotionEat app
   - Shows credibility

### Quick Image Tips:
- Use Canva (free) for quick designs
- Use the brand colors: #1890FF (blue), #0EA5E9 (cyan), #22C55E (green)
- Compress images before adding (use TinyPNG.com)

---

## Step 3: Test Locally

```bash
npm run dev
```

The site will open at: **http://localhost:4321**

### What to Test:

- ✅ Page loads without errors
- ✅ Click "Start Your Journey Free" → Goes to your app URL
- ✅ Click language switcher (EN/ES) → Content changes
- ✅ Scroll through all sections
- ✅ Open FAQ items
- ✅ Mobile view (resize browser)

### Check Mixpanel:

1. Open [Mixpanel Live View](https://mixpanel.com/report/live)
2. Load the landing page
3. You should see `landing_page_view` event
4. Click a CTA → See `cta_clicked` event

If events don't appear, check your token in `.env`

---

## Step 4: Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Preview the production build:

```bash
npm run preview
```

---

## Step 5: Deploy to Netlify

### Quick Deploy (Drag & Drop):

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder
4. Set environment variables in Netlify dashboard

### Better: Deploy from Git:

See `DEPLOYMENT.md` for complete instructions.

Quick version:
1. Push to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy automatically

---

## Common Issues

### "Mixpanel is not defined" error
**Fix:** Add `PUBLIC_MIXPANEL_TOKEN` to your `.env` file

### CTAs go to wrong URL
**Fix:** Update `PUBLIC_APP_URL` in `.env`

### Language switcher doesn't work
**Fix:** Check that both `/` and `/es/` routes exist and build successfully

### Images don't show
**Fix:** Make sure images are in the `public/` folder and referenced as `/image-name.jpg`

---

## Customization

### Change Content:

Edit the translation files:
- `src/i18n/en.json` - English
- `src/i18n/es.json` - Spanish

### Change Colors:

Edit `tailwind.config.mjs` - the color palette matches your app exactly.

### Change Components:

All components are in `src/components/` and are easy to modify.

---

## File Structure

```
EmotionEat-Landing/
├── src/
│   ├── components/       # All UI components
│   ├── i18n/            # Translations (EN/ES)
│   ├── layouts/         # Base layout with SEO
│   ├── pages/           # Routes (/, /es)
│   └── scripts/         # Mixpanel tracking
├── public/              # Static files (images, etc.)
├── .env                 # Your config (don't commit!)
└── package.json
```

---

## Next Steps

1. ✅ Configure `.env` with your Mixpanel token
2. ✅ Test locally (`npm run dev`)
3. ✅ Add images (optional but recommended)
4. ✅ Deploy to Netlify (see `DEPLOYMENT.md`)
5. ✅ Configure custom domain (optional)
6. ✅ Share with users! 🎉

---

## Need Help?

- **Deployment:** See `DEPLOYMENT.md`
- **Images:** See `IMAGES_NEEDED.md`
- **Content:** Edit `src/i18n/en.json` and `es.json`
- **Astro Docs:** https://docs.astro.build

---

## What You Get

✨ **SEO Optimized:** Meta tags, Open Graph, Schema.org
✨ **Bilingual:** English (default) + Spanish
✨ **Fast:** 100/100 Lighthouse score potential
✨ **Analytics:** Full Mixpanel integration
✨ **Responsive:** Beautiful on mobile & desktop
✨ **Accessible:** WCAG compliant components

---

**Ready to launch? Let's go! 🚀**

Built with 💜 for EmotionEat

