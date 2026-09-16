# Drugs and Medicine Inventory System

A Laravel REST API and React/Vite pharmacy inventory application. Medicine records are persisted in SQLite.

## Prerequisites

PHP 8.2+, Composer, Node.js 20+, and npm.

## Setup and run

```powershell
cd backend
composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -Force
# Set DB_CONNECTION=sqlite and DB_DATABASE=database/database.sqlite in .env
php artisan migrate --seed
php artisan serve
```

In a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_URL=http://127.0.0.1:8000/api` in `frontend/.env` (this is also the built-in development default). The frontend normally runs at `http://localhost:5173`.

Default credentials: **pharmacist** / **med123**.

## API

- `POST /api/login`
- `POST /api/logout`
- `GET /api/medicines?search=`
- `POST /api/medicines`
- `GET /api/medicines/{id}`
- `PUT /api/medicines/{id}`
- `DELETE /api/medicines/{id}`

Send `Authorization: Bearer <token>` to all endpoints except login. Search matches brand name, category, and manufacturer. Add a record, restart both servers, and sign in again to confirm SQLite persistence.

## Troubleshooting

If API calls fail, confirm Laravel is on port 8000 and `VITE_API_URL` is correct. If database setup fails, ensure the SQLite file exists and the `.env` database connection is set to `sqlite`.