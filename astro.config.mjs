import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// Static output. The format pages and case studies are what carry the search
// traffic the brief is counting on, so every page ships as real HTML; React is
// used only as islands, where something genuinely has to move.
export default defineConfig({
  site: 'https://packaging.mysupplementfactory.com',
  integrations: [react(), sitemap()],
  server: { port: 4330 },
})
