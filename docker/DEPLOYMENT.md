# Al Khanjry ERP — Docker/Coolify Deployment Guide

## Architecture

**Only the frontend is exposed to the public internet.**
The backend and database are strictly internal to the Docker network.

```
                  ┌───────────────────────────────────────┐
                  │         Docker Networks               │
                  │  alkhanjry-network  +  coolify        │
                  │                                       │
  ┌─────────┐     ┌──────────────┐    ┌──────────────┐  │
  │  User   │────▶│  Frontend    │───▶│   Backend    │──┤──▶  MySQL
  │ (Public)│     │  Nginx :80   │    │PHP-FPM+Nginx │  │     (Coolify)
  └─────────┘     └──────────────┘    └──────────────┘  │
                            ↑                ▲           │
                            │                │           │
                            │  /api/* ───────┘           │
                            │   internal proxy_pass       │
                            │   (no public internet)    │
                            └─────────────────────────────┘
```

### Traffic Flow

| Path | Route | Description |
|------|-------|-------------|
| `/` | Public → Frontend Nginx | React SPA + static assets |
| `/api/*` | Frontend Nginx → Backend Container | **Internal proxy** — never leaves Docker network |
| SQL | Backend Container → MySQL Container | **Internal** — Docker DNS resolves `DB_HOST` |

**The backend is never exposed to the public internet.**

## Services

| Service | Container Name | Exposed Port | Visibility |
|---------|---------------|-------------|------------|
| Frontend | `alkhanjry-frontend` | `80` | **Public** (Coolify proxy/Traefik) |
| Backend | `alkhanjry-backend` | `80` | **Internal only** (Docker network) |

## Environment Variables (Required)

| Variable | Description |
|----------|-------------|
| `APP_KEY` | `php artisan key:generate --show` |
| `DB_HOST` | MySQL container/service **name** in Coolify network |
| `DB_DATABASE` | Database name |
| `DB_USERNAME` | DB user |
| `DB_PASSWORD` | DB password |

### Backend Internal Settings (Auto-configured)

| Variable | Internal Value |
|----------|----------------|
| `APP_URL` | `http://alkhanjry-backend` (internal container name) |
| `FRONTEND_URL` | Your public frontend domain (set in Coolify UI) |

### Sanctum / CORS

Since frontend → backend is internal proxy, CORS is handled by Nginx proxy headers:
```nginx
proxy_set_header Origin "";
```

Sanctum's `SANCTUM_STATEFUL_DOMAINS` should be set to your **public frontend domain**.

## Setup Steps

### 1. Prepare Coolify

Add a new project → import this GitHub repo → choose "Docker Compose" deploy type.

### 2. Set Environment Variables in Coolify UI

```
APP_KEY=base64:...
DB_HOST=mysql             # ← Coolify MySQL service name
DB_DATABASE=alkhanjry_erp
DB_USERNAME=root
DB_PASSWORD=...
FRONTEND_URL=https://erp.yourdomain.com
SESSION_DOMAIN=.yourdomain.com
```

### 3. Deploy

Coolify will build and start containers. Only frontend's port `80` is published.

### 4. Initial Setup (Run Once)

```bash
# Generate key if not set
docker compose exec backend php artisan key:generate

# Migrate & seed
docker compose exec backend php artisan migrate --force
docker compose exec backend php artisan db:seed --force

# Cache in production
docker compose exec backend php artisan config:cache
docker compose exec backend php artisan route:cache
```

## Networking

- **Frontend → Backend**: Uses Docker internal DNS: `http://alkhanjry-backend:80/api/...`
- **Backend → MySQL**: Uses Coolify internal Docker DNS via `DB_HOST`
- **User → Frontend**: Via Coolify reverse proxy (Traefik)

## Frontend API URLs

Frontend Nginx proxies all `/api/*` to backend internally:
```nginx
location /api/ {
    proxy_pass http://alkhanjry-backend:80/api/;
}
```

The frontend React app makes `fetch('/api/v1/...')` — Nginx handles the proxy.

## Health Checks

| Service | Endpoint | Visibility |
|---------|----------|------------|
| Backend | `http://localhost:80/api/v1/health` | Internal only |
| Frontend | `http://localhost:80/` | Public via proxy |

## Troubleshooting

### 502 Bad Gateway
- Backend health: `docker compose exec backend curl http://localhost:80/api/v1/health`
- Check backend container logs: `docker compose logs backend --tail 50`
- Check Nginx proxy logs: `docker compose exec frontend cat /var/log/nginx/error.log`

### Database Connection Failed
- Verify `DB_HOST` is the Coolify MySQL **service/container name**
- Check MySQL is on the `coolify` network
- Verify `DB_USERNAME`/`DB_PASSWORD`

### CORS Errors
- Since frontend proxies to backend internally, CORS is Nginx-managed
- Verify `FRONTEND_URL` in Coolify matches the actual public URL
- Ensure `SESSION_DOMAIN` includes the frontend domain
