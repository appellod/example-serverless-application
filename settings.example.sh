#!/bin/bash
set -a

# ====================
# COMMON
# ====================

# Loggly (Uncomment to activate Loggly)
# LOGGLY_INPUT_TOKEN="e123456c-d1cd-1e12-123a-123ed1fd1c12"
# LOGGLY_SUBDOMAIN="example"
# LOGGLY_TAGS="example_local"

# Mailgun
MAILGUN_DOMAIN="sandbox123456a1a1234567bdb5d1234fa12345.mailgun.org"
MAILGUN_KEY="12345e1c1dfe123fece1ff1a12a1b12c-123fe1a1-dc123456"

# Mongo
MONGO_DATABASE="example_local"
MONGO_HOST="127.0.0.1"
MONGO_PORT="27017"

# Password Reset
PASSWORD_RESET_COMPANY="The Example Team"
PASSWORD_RESET_FROM="Example Support Team <no-reply@example.com>"
PASSWORD_RESET_URL="http://127.0.0.1:3001/reset-password.html"

# Postgres
POSTGRES_DATABASE="example_local"
POSTGRES_HOST="127.0.0.1"
POSTGRES_PORT="5432"

# Redis
REDIS_DATABASE="0"
REDIS_URL="redis://127.0.0.1:6379"

# ====================
# MICROSERVICES
# ====================

# Authentication
AUTHENTICATION_SERVER_PORT="3000"

# Rest
REST_SERVER_PORT="3001"
