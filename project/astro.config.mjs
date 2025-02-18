import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://gateway-to-aloha.netlify.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  build: {
    inlineStylesheets: 'auto'
  }
});