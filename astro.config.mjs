import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'

// Static output. The format pages and case studies are what carry the search
// traffic the brief is counting on, so every page ships as real HTML; React is
// used only as islands, where something genuinely has to move.
export default defineConfig({
  site: 'https://packaging.mysupplementfactory.com',
  // Pages stay static — the adapter is here only so the enquiry form has an
  // endpoint to post to. Only routes marked `prerender = false` run on a server.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), sitemap()],
  server: { port: 4330 },
})
