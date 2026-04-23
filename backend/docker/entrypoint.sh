#!/usr/bin/env bash
set -e

# ------------------------------------------------------------------------------
# Laravel Container Entrypoint — for Coolify + Kubernetes style orchestration
# ------------------------------------------------------------------------------
# 1. Generates APP_KEY if not set (empty or "base64:...")
# 2. Caches config/routes for production
# 3. Runs migrations (only if DB is reachable)
# 4. Clears old cache but keeps route+config cached
# 5. Starts the actual CMD (supervisord)
# ------------------------------------------------------------------------------

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Al Khanjry ERP — Container Boot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Ensure APP_KEY exists ───────────────────────────────
if [ -z "${APP_KEY}" ] || [ "${APP_KEY}" = "your-app-key-here" ]; then
  echo "APP_KEY not found — generating..."
  php artisan key:generate --show

  # Read the generated key
  export APP_KEY=$(php artisan key:generate --show 2>/dev/null || echo "")

  # If still empty, regenerate
  if [ -z "${APP_KEY}" ]; then
    echo "APP_KEY generation failed, regenerating..."
    php artisan key:generate --force
    export APP_KEY=$(php -r "echo 'base64:' . base64_encode(random_bytes(32));")
  fi

  # Write to .env
  if [ -f ".env" ]; then
    sed -i "s/APP_KEY=.*/APP_KEY=${APP_KEY}/g" .env
    sed -i "s/APP_KEY=.*/APP_KEY=${APP_KEY}/g" .env.docker
  else
    echo "APP_KEY=${APP_KEY}" >> .env
  fi

  echo "APP_KEY generated and set."
fi

# ── 2. Set APP_KEY in the running environment ──────────────
# Composer post-autoload-dump scripts may need it
export APP_KEY

# ── 3. Production caching (if APP_ENV=production) ─────────
if [ "${APP_ENV:-production}" = "production" ]; then
  echo "Caching config, routes, views..."
  php artisan config:cache || true
  php artisan route:cache    || true
  php artisan view:cache     || true
  php artisan event:cache    || true
fi

# ── 4. Wait for database (10 retries, 5s interval) ────────
echo "Checking database connectivity..."
RETRIES=10
COUNT=0
while ! php artisan db:monitor &> /dev/null; do
  COUNT=$((COUNT + 1))
  if [ $COUNT -ge $RETRIES ]; then
    echo "Database not reachable after ${RETRIES} attempts — continuing without migrations."
    break
  fi
  echo "Waiting for DB... ($COUNT/${RETRIES})"
  sleep 5
done

if [ $COUNT -lt $RETRIES ]; then
  echo "Database connected. Running migrations..."
  php artisan migrate --force || true

  echo "Seeding data..."
  php artisan db:seed --force || true

  echo "Caching optimization..."
  php artisan optimize || true
else
  echo "Database unreachable. Skipping migrations."
fi

# ── 5. Storage link ──────────────────────────────────────
php artisan storage:link 2> /dev/null || true

# ── 6. Fix permissions (ensure www-data can write) ──────────
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R u+rw /var/www/html/storage /var/www/html/bootstrap/cache

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Container Ready — Starting Services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 7. Exec the CMD (supervisord) ─────────────────────────
exec "$@"
