# ARC

Static portfolio site for ARC (Rachita Chordiya).

Live: [https://rachitachordiya.github.io/arc/](https://rachitachordiya.github.io/arc/)

## Deploy

This repo is **static files only** (no Vite/npm). GitHub Pages should use:

**Deploy from a branch → `main` → `/` (root)**

Push to `main`; Pages serves root `index.html`, `assets/`, and `images/`.

## Edit content later

The React/Vite source was removed. To change design or content, restore source from git history (before the static-only commit), rebuild, and copy the new `index.html` / `assets/` / `images/` back to the repo root — or edit the committed static files directly.
