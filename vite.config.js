import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '')
      const siteUrl = (env.VITE_SITE_URL || 'https://salaryfit.vercel.app').replace(/\/$/, '')
      const lastmod = new Date().toISOString().slice(0, 10)
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml, 'utf-8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
})
