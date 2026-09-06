# ARC

Portfolio site for ARC (Rachita Chordiya) — Vite + React + TypeScript.

Live: [https://rachitachordiya.github.io/arc/](https://rachitachordiya.github.io/arc/)

## Local development

```bash
npm install
npm run dev
```

`npm run dev` restores the Vite entry (`index.vite.html` → `index.html`) then starts the dev server. Open [http://localhost:5173/arc/](http://localhost:5173/arc/).

Source of truth for the Vite HTML entry is **`index.vite.html`** (points at `/src/main.tsx`). Do not hand-edit the committed root `index.html` — that file is the **production** build for GitHub Pages.

## Production build (repo-root publish)

```bash
npm run build
```

This:

1. Restores the Vite entry from `index.vite.html`
2. Typechecks and builds with `base: '/arc/'` into `dist/`
3. Copies `dist/` → repo root (`index.html`, `assets/`, `images/`, favicon, `.nojekyll`)

Commit those published root files so GitHub Pages can serve them when Source is **Deploy from a branch → main → / (root)**.

Keep editing images in `public/images/` (source). Root `images/` is the published copy.

## GitHub Pages

**Current setup (no Settings needed):** Pages is already “Deploy from a branch / main / root”. The committed production `index.html` + `assets/` at repo root are what go live after push.

**Optional (owner/admin only):** Settings → Pages → Source → **GitHub Actions**, then re-run **Deploy to GitHub Pages**. Workflow `.github/workflows/deploy.yml` uploads `dist/`. Collaborators with write access cannot change Pages source.

Deleting old workflow runs does **not** fix blank/404 pages — that was caused by serving the Vite-dev `index.html` (`/src/main.tsx`) from the branch root.
