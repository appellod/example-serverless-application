#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
nodemon src/microservices/$1/index.ts --watch "src/common/**/*.ts" --watch "src/microservices/${1}/**/*.ts"
