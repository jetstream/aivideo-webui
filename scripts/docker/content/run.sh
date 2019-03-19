#!/usr/bin/env bash
set -e

# call in current shell.
echo "Creating/Updating web config"
. /app/set_env.sh AUTH authRequired TENANT aadTenantId INSTANCE_URL "-"

echo "Starting server"
# serve the app via nginx
mkdir -p /app/logs
nginx -c /app/nginx.conf
