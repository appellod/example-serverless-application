#!/bin/bash
set -e

# Feel free to edit these variables
MAX_VERSIONS=3
REPO="git@bitbucket.org:appellod/restful-api.git"

# Do not change these variables
ENV="${1:-dev}"
BRANCH="${2:-master}"
TIMESTAMP=$(date +%s%N)

# Create the environment directory
mkdir -p ${ENV}
cd ${ENV}

# Create root folder structure
mkdir -p releases
mkdir -p shared
mkdir -p shared/node_modules
cd releases

# Get timestamp and make release folder
mkdir -p ${TIMESTAMP}

# Remove old releases
ls -t | sort -r | tail -n +$(( MAX_VERSIONS + 1 )) | xargs rm -rf --

# Clone repo into release folder
git clone ${REPO} ${TIMESTAMP}
cd ${TIMESTAMP}

# Symlink dependencies
ln -s ../../shared/node_modules node_modules

# Install Node modules
npm install
npm run update-docs

# Compile Typescript
npm run grunt

# Run migrations
npm run migrations:run

# Symlink the current release
cd ../../
rm current || true
ln -s releases/${TIMESTAMP} current

# Start PM2
cd current
pm2 delete restful-api-${ENV} || true
NODE_ENV=${ENV} pm2 start dist/index.js --name restful-api-${ENV}
pm2 save