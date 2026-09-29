# ImageMarker（隱私圖片工具箱）- Replit.md

## Overview

ImageMarker (https://imagemarker.app) is a **100% client-side** image toolbox. Every tool runs in
the browser; images are never uploaded. It started as an ID-copy watermark tool and now includes
watermark (single / batch / PDF), EXIF removal, mosaic, background removal, compression, format
conversion, resizing and social-media cropping, in Traditional Chinese, English and (partly) Japanese.

**README.md is the source of truth** for features, commands and directory layout. This file only keeps
what a Replit agent needs on top of that.

## Architecture (short)

- React 18 + TypeScript + Vite, routing with wouter, UI with shadcn/ui + Tailwind CSS.
- **No backend, no database, no API.** Forms (feature requests / Pro waitlist) use Netlify Forms.
- Routes live in `client/src/routes.tsx`; each page is its own code-split chunk.
- `pnpm build` = Vite build + Puppeteer prerender of every sitemap route (`scripts/prerender.mjs`).
- Deployed on **Netlify** (`netlify.toml`). CI: `.github/workflows/ci.yml`.

## Notes for Replit

- `pnpm dev` (or `npm run dev`) serves the app on port 5000.
- `.replit` still lists `postgresql-16` and a `npm run start` deployment command from the old
  full-stack template. Neither is used: there is no database and no `start` script. Production
  deploys go through Netlify, not Replit.

## Changelog
```
Changelog:
- September 27, 2026. Rewrote this file to match the current codebase
  - Removed the Express / Drizzle / PostgreSQL sections: that backend was deleted on July 12, 2025
  - The canonical project description is now README.md
- July 12, 2025. Converted to pure client-side static website
  - Removed all server-side dependencies (Express, database, API routes)
  - Simplified to use only Vite development server
  - All watermark processing remains client-side for privacy
  - Fixed Replit cartographer plugin compatibility issues
  - Updated project structure for static deployment
- January 12, 2025. Enhanced SEO optimization
  - Added comprehensive meta tags for better search engine visibility
  - Implemented Open Graph and Twitter Card meta tags for social sharing
  - Added structured data (JSON-LD) for rich snippets
  - Created robots.txt and sitemap.xml for search engine crawling
  - Enhanced PWA manifest with screenshots and shortcuts
  - Improved accessibility with ARIA labels and semantic HTML
  - Fixed CSS import order for better performance
- July 04, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```