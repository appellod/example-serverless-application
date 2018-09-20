#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

./scripts/documentation.sh
./scripts/build.sh

knex migrate:latest
node build/src/microservices/$1/index.js
