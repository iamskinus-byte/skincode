# skincode

A small full-stack web app for building and tracking a skincare routine. Add the
products you use, organized by routine step (cleanser, serum, sunscreen, …) and
tagged for your AM / PM routine.

Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript, and
Tailwind CSS. The backend is implemented with Next.js Route Handlers and a small
file-backed JSON store, so it runs with zero external services.

## Getting started

Requirements: Node.js 20+ (the project is developed against Node 22).

```bash
npm install      # install dependencies
npm run dev      # start the dev server on http://localhost:3000
```

Then open [http://localhost:3000](http://localhost:3000) and add a product to
your routine.

## Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the development server (hot reload).   |
| `npm run build`    | Create a production build.                   |
| `npm run start`    | Serve the production build.                  |
| `npm run lint`     | Run ESLint.                                  |
| `npm run typecheck`| Type-check with the TypeScript compiler.     |

## API

The UI is powered by a small JSON API:

| Method   | Route                 | Description                       |
| -------- | --------------------- | --------------------------------- |
| `GET`    | `/api/products`       | List all routine products.        |
| `POST`   | `/api/products`       | Add a product to the routine.     |
| `DELETE` | `/api/products/:id`   | Remove a product from the routine.|

`POST /api/products` accepts a JSON body:

```json
{
  "name": "Hydrating Serum",
  "brand": "The Ordinary",
  "step": "Serum",
  "timeOfDay": "AM"
}
```

## Data storage

Routine data is persisted to `.data/routine.json` (created on first run and
git-ignored). Delete that file to reset to the seed routine.

## Project structure

```
src/
  app/
    api/products/route.ts        # GET (list) + POST (create)
    api/products/[id]/route.ts   # DELETE
    page.tsx                     # routine UI
    layout.tsx                   # root layout + metadata
  lib/
    store.ts                     # file-backed JSON store
    types.ts                     # shared domain types
```
