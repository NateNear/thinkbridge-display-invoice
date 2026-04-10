# Display Invoice API + UI

Simple invoice web app with:
- Express API
- Swagger documentation
- Static frontend (HTML/CSS/JS)
- Supabase Postgres as database

## Tech Stack

- Node.js + Express
- PostgreSQL (`pg`)
- Supabase
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Project Structure

- `api/server.js` - Express server, API routes, Swagger setup
- `api/database.js` - Supabase/Postgres connection + DB queries
- `api/init.sql` - SQL script to create and seed tables
- `ui/` - frontend files
- `vercel.json` - Vercel routing config

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm
- Supabase project (with Postgres enabled)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in project root:

```env
SUPABASE_DB_URL=postgresql://postgres:<PASSWORD>@db.<PROJECT_REF>.supabase.co:5432/postgres
NODE_ENV=development
```

Important:
- If password contains special characters (like `@`), URL-encode them.
- Example: `@` becomes `%40`.

3. Initialize database in Supabase:
- Open Supabase Dashboard -> SQL Editor
- Run `api/init.sql`

4. Start the app:

```bash
npm start
```

## Local URLs

- App: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- API endpoint: `http://localhost:3000/api/invoice`

## API Endpoints

### `GET /api/invoice`
Returns invoice items.

Response:

```json
{
  "items": [
    { "name": "Widget A", "price": 19.99 }
  ]
}
```

### `POST /api/invoice/items`
Adds a new invoice item.

Request body:

```json
{
  "name": "Service B",
  "price": 45.0
}
```

## Swagger Documentation

Swagger is generated from JSDoc comments in `api/server.js`.

- Local: `http://localhost:3000/api-docs`
- Deployed: `https://<your-domain>/api-docs`

## Deploy to Vercel

1. Install and login:

```bash
npm i -g vercel
vercel login
```

2. Deploy:

```bash
vercel --prod
```

3. In Vercel project settings, add environment variable:
- `SUPABASE_DB_URL` = your Supabase Postgres connection string

4. Redeploy after adding env vars:

```bash
vercel --prod
```

## Common Issues

### `getaddrinfo ENOTFOUND ...supabase.co`
- Check `SUPABASE_DB_URL` host and credentials
- URL-encode special chars in password

### `Unexpected token '<'` in Swagger JS files
- Usually means HTML is returned instead of JS (routing/rewrites issue)
- Ensure latest code is deployed and open `/api-docs`

### `item.price.toFixed is not a function`
- Happens when DB numeric values are strings
- Frontend already converts values safely before formatting

## Notes

- `.env` should never be committed.
- This project currently uses one invoice (`InvoiceID = 1`) for item inserts.
