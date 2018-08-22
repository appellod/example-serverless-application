#!/bin/bash
set -e

if [ -f settings.sh ]; then
  source settings.sh
fi

knex migrate:latest
node dist/src/index.js
