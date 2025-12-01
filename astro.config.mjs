import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify/functions'; // <--- usar /functions para SSR

export default defineConfig({
  site: 'https://emotioneat.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'server', // <--- importante para SSR
  adapter: netlify()
});
