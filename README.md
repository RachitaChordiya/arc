# ARC

Portfolio site for ARC (Rachita Chordiya) — Vite + React + TypeScript.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:5173/arc/](http://localhost:5173/arc/).

## GitHub Pages

Images live once in `public/images/` (Vite copies them into `dist/` on build). Deploy is `.github/workflows/deploy.yml` → `dist` Pages artifact — do not commit `docs/` or `dist/`.

**Settings → Pages → Source must be GitHub Actions** (not branch `/docs` or root).

1. Push to `main` (or run the workflow manually).
2. Live site: [https://rachitachordiya.github.io/arc/](https://rachitachordiya.github.io/arc/)

The Actions run summary will show the Pages URL after a successful deploy.
