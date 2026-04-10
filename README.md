# Display Invoice API + UI
🔗 **Deployed Link (Live):**
https://thinkbridge-display-invoice.vercel.app/

🔗 **Swagger UI (Live):**
https://thinkbridge-display-invoice.vercel.app/api-docs/

---

# Images :
<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/9ce004cd-b596-49a2-ac40-6786779782d1" />

<img width="1886" height="901" alt="image" src="https://github.com/user-attachments/assets/81d261db-c942-416e-be7f-c0d848d2b64a" />


Simple invoice web app with:

* Express API
* Swagger documentation
* Static frontend (HTML/CSS/JS)
* Supabase Postgres as database

## Tech Stack

* Node.js + Express
* PostgreSQL (`pg`)
* Supabase
* Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Project Structure

* `api/server.js` - Express server, API routes, Swagger setup
* `api/database.js` - Supabase/Postgres connection + DB queries
* `api/init.sql` - SQL script to create and seed tables
* `ui/` - frontend files
* `vercel.json` - Vercel routing config

## Prerequisites

* Node.js 18+ (LTS recommended)
* npm
* Supabase project (with Postgres enabled)

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

* If password contains special characters (like `@`), URL-encode them.
* Example: `@` becomes `%40`.

3. Initialize database in Supabase:

* Open Supabase Dashboard -> SQL Editor
* Run `api/init.sql`

4. Start the app:

```bash
npm start
```

## Local URLs

* App: `http://localhost:3000`
* Swagger UI: `http://localhost:3000/api-docs`
* API endpoint: `http://localhost:3000/api/invoice`

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

* Local: `http://localhost:3000/api-docs`
* Deployed: https://thinkbridge-display-invoice.vercel.app/api-docs/

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

* `SUPABASE_DB_URL` = your Supabase Postgres connection string

4. Redeploy after adding env vars:

```bash
vercel --prod
```

## Notes

* `.env` should never be committed.
* This project currently uses one invoice (`InvoiceID = 1`) for item inserts.
