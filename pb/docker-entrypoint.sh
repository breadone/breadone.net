#!/usr/bin/env bash
set -e

# if there are no users yet, create the superuser
# we check the sqlite file for any existing record in the users table
# /pb/pocketbase superuser create "${PB_ADMIN_EMAIL}" "${PB_ADMIN_PASSWORD}"
if [[ -f "${PB_DATA_DIR}/pb_data.db" ]]
      sqlite3 "${PB_DATA_DIR}/data.db" "SELECT id FROM _superusers WHERE email='${PB_ADMIN_EMAIL}' LIMIT 1;" | grep -q .; then

  echo ">>> Creating PocketBase superuser: ${PB_ADMIN_EMAIL}"
  /pb/pocketbase superuser create "${PB_ADMIN_EMAIL}" "${PB_ADMIN_PASSWORD}"
else
  echo ">>> Superuser ${PB_ADMIN_EMAIL} already exists, skipping creation."
fi

# exec the real pocketbase binary with any passed arguments
exec /pb/pocketbase "$@"
