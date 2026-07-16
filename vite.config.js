import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const TOOL_ROUTES = ['/', '/severance', '/unemployment', '/leave']

const TIP_SLUGS = [
  'salary-negotiation-basics',
  'four-insurance-check',
  'year-end-tax-prep',
  'job-change-salary',
  'non-taxable-meal',
  'net-pay-budget',
  'pension-gap',
  'child-tax-credit',
  'side-income-tax',
  'severance-in-annual',
]

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '')
      const siteUrl = (env.VITE_SITE_URL || 'https://salaryfit.vercel.app').replace(/\/$/, '')
      const lastmod = new Date().toISOString().slice(0, 10)

      const urls = [
        ...TOOL_ROUTES.map((path) => ({
          loc: path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`,
          priority: path === '/' ? '1.0' : '0.9',
        })),
        ...TIP_SLUGS.map((slug) => ({
          loc: `${siteUrl}/tips/${slug}`,
          priority: '0.6',
        })),
      ]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
      writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml, 'utf-8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  test: {
    environment: 'node',
  },
})
