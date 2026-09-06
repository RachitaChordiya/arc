import { copyFileSync } from 'node:fs'

// Vite requires index.html at the project root. Restore the Vite entry
// before `vite` / `vite build` (production index.html is committed for Pages).
copyFileSync('index.vite.html', 'index.html')
console.log('Restored index.html from index.vite.html')
