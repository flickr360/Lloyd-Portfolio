# Brutalist Portfolio — Astro + Tailwind CSS + Vercel

A single-page portfolio template with a raw, dossier/index-card aesthetic.
The background (grid, two registration marks, and a scanline) is fixed
behind the content and animates purely from scroll position — no scroll
libraries, just a few CSS custom properties updated on scroll.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

or connect the repo at vercel.com/new — Astro is zero-config on Vercel.

## Customize

- Copy: edit `src/pages/index.astro` — swap `[YOUR NAME]`, project rows,
  capabilities, and contact details.
- Colors/fonts: `tailwind.config.cjs` and the `:root` variables at the top
  of `src/styles/global.css`.
- Background animation: `src/components/ScrollBackground.astro`. It sets
  `--scroll-y` and `--scroll-progress` on `<html>`; any CSS can read them.
  Respects `prefers-reduced-motion`.
