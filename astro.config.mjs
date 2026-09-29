import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel'

/* Two adapters, picked by environment. Node locally, because `npm run dev` and a
   plain `node dist/server/entry.mjs` should keep working without a cloud
   account. Vercel when Vercel is doing the building, because its standalone
   server has nowhere to run there. VERCEL=1 is set by their build container. */
const onVercel = Boolean(process.env.VERCEL)

// Static output. The format pages and case studies are what carry the search
// traffic the brief is counting on, so every page ships as real HTML; React is
// used only as islands, where something genuinely has to move.
export default defineConfig({
  site: 'https://packaging.mysupplementfactory.com',
  // Pages stay static — the adapter is here only so the enquiry form has an
  // endpoint to post to. Only routes marked `prerender = false` run on a server.
  output: 'static',
  adapter: onVercel ? vercel() : node({ mode: 'standalone' }),
  // Astro's built-in origin check compares the Origin header against the request
  // URL, which behind a proxy carries an internal host — so a genuinely
  // same-origin form POST is rejected. The enquiry endpoint runs the same check
  // itself against x-forwarded-host, which is the header that survives the hop.
  security: { checkOrigin: false },
  integrations: [react(), sitemap()],
  server: { port: 4330 },
})
