// sitemap.xml жасайды. vite build алдында іске қосылады (public/ ішіне жазады).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { figures } from '../src/data/figures.js'
import { SITE_URL } from '../src/seo/config.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const base = SITE_URL.replace(/\/$/, '')

const urls = [
  { loc: `${base}/`, priority: '1.0' },
  ...figures.map((f) => ({ loc: `${base}/tulga/${f.slug}`, priority: '0.8' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml жазылды (${urls.length} URL)`)
