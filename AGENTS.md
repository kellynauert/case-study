# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single-page portfolio/case-study site: Vite + React 19 + TypeScript, using MUI (`@mui/material`) and `react-router-dom`. There is no backend or database — everything is client-side static content.

Package manager is npm (a `package-lock.json` is committed). Dependencies are refreshed automatically by the startup update script, so you normally don't need to run install manually.

Standard commands (see `package.json` scripts):
- `npm run dev` — Vite dev server on `http://localhost:5173/` (HMR). This is the service to run for development.
- `npm run build` — `tsc -b` typecheck + `vite build` (production bundle to `dist/`).
- `npm run lint` — `oxlint`.
- `npm run preview` — serve the built `dist/` (only useful after `build`).

Non-obvious notes:
- `npm run lint` currently reports pre-existing errors (`react-hooks/rules-of-hooks` in `src/components/blocks/Gallery.tsx`) and some warnings. These exist on `main` and are unrelated to environment setup — do not "fix" them unless that is the task. `oxlint` exits non-zero when errors are present.
- Routes are only `/` (landing) and `/case-studies/:slug` (`src/App.tsx`). Case studies are registered in `src/lib/caseStudyRegistry.ts`.
- `vite.config.ts` honors `VITE_BASE_PATH` for the router/base path; leave unset for local dev (defaults to `/`).
- GitHub Actions deploy is intentionally not automatic (see git history "Stop automatic production deploys on push to main").
