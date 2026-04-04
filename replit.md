# CraneCorp Heavy Industries — Corporate Website

## Project Overview
A production-ready corporate website for a crane manufacturing company. Full-stack React + Vite + Express + PostgreSQL application with public-facing pages and an admin content management panel.

## Architecture

### Monorepo Structure (pnpm workspaces)
- `artifacts/crane-corp/` — Frontend (React + Vite + TypeScript + Tailwind + Framer Motion)
- `artifacts/api-server/` — Backend (Express + Drizzle ORM + PostgreSQL, port 8080)
- `lib/api-spec/` — OpenAPI spec (`openapi.yaml`)
- `lib/api-client-react/` — Auto-generated React Query hooks from OpenAPI spec
- `lib/db/` — Drizzle ORM schema and DB connection

### Routing (wouter)
- `/` — Homepage (hero carousel, stats, featured products, news preview)
- `/products` — Product catalog with category filter
- `/products/:slug` — Product detail page (gallery, specs table, similar products)
- `/corporate` — Company info, mission/vision, timeline, certifications, R&D
- `/media` — Tabbed media center (news, videos, gallery, PDF catalogs)
- `/contact` — Contact form + office locations
- `/admin` — Admin login (demo: any credentials)
- `/admin/dashboard` — Admin overview dashboard with stats
- `/admin/products` — CRUD for products
- `/admin/products/new` — Create product form
- `/admin/products/:slug/edit` — Edit product form
- `/admin/categories` — Inline CRUD for categories
- `/admin/news` — News article management
- `/admin/media` — Media library management

### Database Schema (PostgreSQL + Drizzle ORM)
- `categories` — id, name, slug, description, image, sort_order
- `products` — id, slug, category_id, name, short_description, description, capacity, cover_image, gallery, specs (jsonb), pdf_url, usage_areas, optional_equipment, status, featured, sort_order
- `news` — id, slug, title, summary, content, image, date, status
- `media` — id, title, type (video/gallery/pdf), url, thumbnail, sort_order
- `contact_submissions` — id, name, email, phone, company, department, subject, message, created_at

### API Endpoints (all under `/api`)
- `GET /healthz` — Health check
- `GET /stats` — Company statistics
- `GET /products` — List products (optional filters: categoryId, status)
- `POST /products` — Create product
- `GET /products/featured` — Get featured products
- `GET /products/:slug` — Get single product
- `PUT /products/:slug` — Update product
- `DELETE /products/:slug` — Delete product
- `GET /categories` — List all categories
- `POST /categories` — Create category
- `PUT /categories/:id` — Update category
- `DELETE /categories/:id` — Delete category
- `GET /news` — List news (optional filters: status, limit)
- `POST /news` — Create news article
- `GET /news/:slug` — Get single article
- `PUT /news/:slug` — Update article
- `DELETE /news/:slug` — Delete article
- `GET /media` — List media (optional filter: type)
- `POST /media` — Create media item
- `DELETE /media/:id` — Delete media item
- `POST /contact` — Submit contact form

## Design Theme
- Colors: Dark navy background (`#0f172a`) + amber/orange primary (`hsl(32 95% 44%)`)
- Typography: Inter font (Black/900 weight for headings, sharp industrial style)
- Border radius: `0.25rem` (square/sharp corners)
- Industrial aesthetic: uppercase text, bold labels, amber highlights

## Seeded Data
- 6 product categories (Tower, Mobile, Crawler, Overhead, Port, Telescopic Cranes)
- 6 products with real Unsplash images
- 3 news articles
- 9 media items (3 video, 3 gallery, 3 PDF)

## Codegen Workflow
To regenerate API client hooks after changing `lib/api-spec/openapi.yaml`:
```bash
pnpm --filter @workspace/api-client-react run codegen
```

## Key Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (auto-provided by Replit)
- `SESSION_SECRET` — Express session secret
- `PORT` — Port for each artifact (auto-assigned by Replit)
