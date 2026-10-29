# The Himachali Way

Website for [thehimachaliway.com](https://thehimachaliway.com): handmade Himachali pickles from Bilaspur, Himachal Pradesh.

React + Vite + Tailwind on the frontend, Cloudflare Pages Functions + D1 for the contact form and admin dashboard.

## Structure

```
src/
  app/          pages (Home, Products, Product detail, Blogs, About, Contact, Legal, Thank you, Dashboard, 404)
  components/   shared UI sections (header, footer, hero, product card, FAQ, ...)
  data/         products, blog posts, FAQs, testimonials, contact form rules
  lib/          page meta + scroll helpers
functions/      Cloudflare Pages Functions (served under /api)
  api/contact.js            saves contact form queries
  api/auth/*                dashboard secret-link login
  api/dashboard/*           queries list, status updates, stats, CSV export
server/auth.js  session cookie helpers used by the functions
migrations/     D1 database schema
public/         images, sitemap.xml, robots.txt, catalog PDF
```

## Develop

```bash
npm install
npm run dev
```

`npm run dev` serves the site only. To run the site together with the `/api` functions and a local database:

```bash
npx wrangler d1 migrations apply himachaliway-db --local
npm run build
npx wrangler pages dev dist
```

For local dashboard access create `.dev.vars` (not committed) with `DASHBOARD_KEY=<any test key>` and open `/dashboard?key=<that key>`.

## Deploy

```bash
npm run deploy
```

Builds and uploads to the Cloudflare Pages project `thehimachaliway` (needs `wrangler login`).

## Dashboard access

`/dashboard` is opened with a private link `/dashboard?key=...`. The key is the Cloudflare Pages secret `DASHBOARD_KEY` and is never stored in this repo. To change it (and log everyone out):

```bash
npx wrangler pages secret put DASHBOARD_KEY --project-name thehimachaliway
npm run deploy
```

## Adding a product or blog post

- Products: `src/data/products.js`, then add the product URL to `public/sitemap.xml`.
- Blog posts: `src/data/blog.js` (card details in `blogPosts`, recipe in `blogContent` under the same `id`).
