// Пререндер: vite build-тен кейін әр маршрутты толық HTML-ге айналдырады.
// Жергілікті Chrome (headless --dump-dom) арқылы рендерленген DOM сақталады,
// сондықтан іздеу жүйелері мен әлеуметтік желілер дайын мазмұнды көреді.
import { spawn, execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { figures } from '../src/data/figures.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 4187

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  process.env.CHROME_PATH,
].filter(Boolean)

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.warn('⚠ Chrome табылмады — пререндер өткізілмеді (SPA күйінде қалады).')
  process.exit(0)
}

const routes = ['/', ...figures.map((f) => `/tulga/${f.slug}`)]

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  { cwd: root, stdio: 'ignore' },
)

try {
  await sleep(2800)
  for (const route of routes) {
    const html = execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--virtual-time-budget=4000',
        '--dump-dom',
        `http://localhost:${PORT}${route}`,
      ],
      { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
    )
    const outDir = route === '/' ? resolve(root, 'dist') : resolve(root, 'dist' + route)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(resolve(outDir, 'index.html'), '<!doctype html>\n' + html)
    console.log('✓ пререндер:', route)
  }
} finally {
  server.kill()
}
