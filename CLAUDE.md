# CLAUDE.md

## Project Overview

**jinro-judgment-fansite** is a fan site for Jinro Judgment (人狼ジャッジメント), a popular social deduction game. The site covers role information, strategies, beginner guides, and team composition analysis.

- **License**: MIT
- **Author**: toukanno

## Current State

A multi-page fan site built with **Vite + React 19 + TypeScript + Tailwind CSS 3**. The site uses a hybrid architecture: most pages are standalone HTML files with vanilla JS (`js/common.js`, `js/theme.js`, `js/roles-data.js`), while the React/TypeScript app lives under `src/`. Vite handles building all HTML entry points via its multi-page configuration in `vite.config.ts`.

## Repository Structure

```
jinro-judgment-fansite/
├── index.html, roles.html, ...   # ~25 standalone HTML pages (multi-page Vite inputs)
├── css/style.css                 # Main stylesheet
├── js/                           # Vanilla JS modules (common.js, theme.js, roles-data.js)
├── src/                          # React/TypeScript app (App.tsx, main.tsx)
├── images/                       # Character images (Japanese filenames)
├── icons/                        # App icons
├── public/                       # Static assets (SW, manifest, icons)
├── vite.config.ts                # Vite config with multi-page input
├── tailwind.config.js            # Tailwind CSS config (dark theme colors, Japanese fonts)
├── postcss.config.js             # PostCSS config
├── tsconfig.json                 # TypeScript project references
├── package.json                  # Dependencies & scripts
├── sw.js                         # Service Worker
├── manifest.json                 # PWA manifest
├── sitemap.xml, robots.txt       # SEO files
├── CLAUDE.md                     # This file
├── LICENSE                       # MIT
└── README.md                     # Project description (Japanese)
```

## Development Setup

- **Install**: `npm install`
- **Dev server**: `npm run dev` (Vite)
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Preview**: `npm run preview`
- **Lint**: `npm run lint` (ESLint 9 with React hooks/refresh plugins)

## Conventions

### Language
- The site content is in **Japanese** (日本語). Code comments and documentation (like this file) are in English.
- Commit messages should be in English.

### Code Style
- ESLint 9 is configured with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins.
- Run `npm run lint` before committing.

### Git Workflow
- Branch names follow the pattern: `claude/<description>-<session-id>`
- Write clear, descriptive commit messages in English.
- Do not push to `main` without review.

## Key Decisions
- [x] Frontend framework: **Vite + React 19** (multi-page HTML + React hybrid)
- [x] Styling approach: **Tailwind CSS 3** + custom CSS (`css/style.css`)
- [x] Content management: Static HTML pages with inline data / JS data files
- [ ] Deployment target (Vercel, Netlify, GitHub Pages, etc.)
- [ ] Testing framework (Vitest, Jest, Playwright, etc.)

## Tech Stack

| Category | Choice |
|----------|--------|
| Build tool | Vite 8 |
| UI framework | React 19 + vanilla JS (hybrid) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 3 + custom CSS |
| Routing | react-router-dom 7 |
| Linting | ESLint 9 + typescript-eslint |
| PWA | Service Worker + Web App Manifest |
