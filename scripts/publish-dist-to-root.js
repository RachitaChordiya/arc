import {
  cpSync,
  existsSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'

if (!existsSync(dist)) {
  console.error('dist/ missing — run vite build first')
  process.exit(1)
}

// Replace previously published asset bundles (hashed filenames change each build).
if (existsSync('assets')) {
  rmSync('assets', { recursive: true, force: true })
}

const skip = new Set(['.git', 'node_modules', 'src', 'public', 'scripts', 'dist'])

for (const name of readdirSync(dist)) {
  const from = join(dist, name)
  const to = join('.', name)

  if (name === 'assets') {
    cpSync(from, to, { recursive: true })
    continue
  }

  if (name === 'images') {
    if (existsSync(to)) {
      rmSync(to, { recursive: true, force: true })
    }
    cpSync(from, to, { recursive: true })
    continue
  }

  // index.html, favicon, and other root files from dist
  if (!skip.has(name)) {
    cpSync(from, to, { recursive: true })
  }
}

// Avoid Jekyll processing on branch-based GitHub Pages.
writeFileSync('.nojekyll', '')

console.log('Published dist/ → repo root (index.html, assets/, images/, …)')
